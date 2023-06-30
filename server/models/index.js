const config = require("../config/db.config.js");
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  logging: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
  define: {
    timestamps: false,
    underscored: true,
  },
});

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js")
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// Associate the models
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Sync the database
(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database synced");
  } catch (error) {
    console.error("Unable to sync database:", error);
  }
})();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);

module.exports = db;
