import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { updatePassword } from "../APIs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const ChangePassword = () => {
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    password: "",
    new_password: "",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    new_password: Yup.string()
      .required("New password is required")
      .min(8, "New password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirm_password: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
  });

  const handleSubmit = async (values) => {
    setisLoading(true);
    try {
      const formData = new FormData();
      formData.append("password", values.password);
      formData.append("new_password", values.new_password);

      await updatePassword(formData);
      navigate("/profile");
      toast.success("Password Updated Successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="profile-form">
      <Card className="mx-auto" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Change Password</h2>
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
                <Form.Group controlId="password">
                  <Form.Label className="input-label">Old password</Form.Label>
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

                <Form.Group controlId="new_password">
                  <Form.Label className="input-label">New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    name="new_password"
                    value={values.new_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.new_password && !!errors.new_password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.new_password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="new_password">
                  <Form.Label className="input-label">
                    Confirm Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    name="confirm_password"
                    value={values.confirm_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={
                      touched.confirm_password && !!errors.confirm_password
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirm_password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  disabled={isLoading}
                  variant="primary"
                  type="submit"
                  className="w-100 mt-4"
                >
                  Update
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ChangePassword;
