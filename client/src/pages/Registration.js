import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { register } from "../APIs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Register = () => {
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
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    gender: Yup.string().required("Gender is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(
        /^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?$/,
        "Invalid phone number"
      ),
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
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("gender", values.gender);
      formData.append("phone", values.phone);
      formData.append("password", values.password);

      const { data } = await register(formData);

      localStorage.setItem("user", JSON.stringify(data?.user));
      localStorage.setItem("token", data?.token);

      navigate("/");
      toast.success("Registered Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to registered");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="register-form">
      <Card className="mx-auto" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">SignUp</h2>
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
              setFieldValue,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label className="input-label">Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.name && !!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

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

                <Form.Group controlId="gender">
                  <Form.Label className="input-label">Gender</Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      name="gender"
                      value="male"
                      label="Male"
                      onChange={handleChange}
                      isInvalid={touched.gender && !!errors.gender}
                    />
                    <Form.Check
                      type="radio"
                      name="gender"
                      value="female"
                      label="Female"
                      onChange={handleChange}
                      isInvalid={touched.gender && !!errors.gender}
                    />
                    <Form.Check
                      type="radio"
                      name="gender"
                      value="other"
                      label="Other"
                      onChange={handleChange}
                      isInvalid={touched.gender && !!errors.gender}
                    />
                  </div>
                  <Form.Control.Feedback type="invalid">
                    {errors.gender}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="phone">
                  <Form.Label className="input-label">Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your phone number"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.phone && !!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>

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
                  Submit
                </Button>

                <p className="text-center mt-3">
                  Already have an account? <Link to="/signin">Login here</Link>
                </p>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;
