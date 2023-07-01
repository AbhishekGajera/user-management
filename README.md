# Project Documentation

This project contains two folders: `client` and `server`.

## Client Side

The client side code is developed using React.js. To run the client side code, follow these steps:

1. Open a terminal and navigate to the `client` folder:

```cd client```

```npm i```

3. Start the client side application:
```npm start```

## Server Side

The server side project is a Node.js and Express.js application. It utilizes a MySQL database with Sequelize as the ORM. To run the server side project, perform the following steps:

1. Open a terminal and navigate to the `server` folder:
```cd server```

2. Install the required dependencies:
```npm i```

3. Start the server:
```npm start```

## Prerequisites

Before running the project, ensure that you have the following prerequisites installed:

- MySQL
- Node.js version 14+

## Environment Setup

For proper configuration of the project, consider the following:

- Client Side: 
- The base URL of the API in the client is set to `http://localhost:8000`. Update it if your server is running on a different URL.

- Server Side: 
- Change the MySQL database credentials in the server as per your local setup.

## Accessing the Application

- To view the frontend, visit [http://localhost:3000](http://localhost:3000).
- To access the backend, visit [http://localhost:8000](http://localhost:8000).

## Viewing List of Users

To view the list of users, navigate to [http://localhost:8000/users](http://localhost:8000/users). This page provides a static list of all users and allows you to search, sort, paginate, and change the status of users.
