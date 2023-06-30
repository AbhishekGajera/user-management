import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { login } from "../APIs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Login = () => {
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    gender: "",
    phone: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  const handleSubmit = async (values) => {
    setisLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);

      const { data } = await login(formData);

      localStorage.setItem("user", JSON.stringify(data?.user));
      localStorage.setItem("token", data?.token);

      navigate("/");
      toast.success("Logged in Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to registered");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="login-form">
      <Card className="mx-auto" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">SignIn</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                  <Form.Label className="input-label">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <br />
                <Form.Group controlId="password">
                  <Form.Label className="input-label">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && !!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  disabled={isLoading}
                  variant="primary"
                  type="submit"
                  className="w-100 mt-4"
                >
                  Login
                </Button>

                <p className="text-center mt-3">
                  Don't have an account? <Link to="/signup">Register here</Link>
                </p>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
