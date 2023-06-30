import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { update } from "../APIs";
import { toast } from "react-toastify";

const Profile = () => {
  const [isLoading, setisLoading] = useState(false);
  const { name, email, gender, phone, profile_pic } = JSON.parse(
    localStorage.getItem("user")
  );
  const image_url = process.env.REACT_APP_BASE_URL + '/images/' + profile_pic

  const initialValues = {
    name,
    email,
    gender,
    phone,
    avatar: profile_pic,
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
  });

  const handleSubmit = async (values) => {
    setisLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("gender", values.gender);
      formData.append("phone", values.phone);

      if (values.avatar && typeof values?.avatar !== "string") {
        formData.append("image", values.avatar);
      }

      const { data } = await update(formData);

      localStorage.setItem("user", JSON.stringify(data?.user));

      toast.success("Profile Updated Successfully");
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
          <h2 className="text-center mb-4">Profile</h2>
          <div className="text-center mb-4">
            <img
              src={image_url}
              alt="Profile"
              className="rounded-circle"
              style={{ width: "150px", height: "150px" }}
            />
          </div>
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
                      defaultChecked={values?.gender === "male"}
                      onChange={handleChange}
                      isInvalid={touched.gender && !!errors.gender}
                    />
                    <Form.Check
                      type="radio"
                      name="gender"
                      value="female"
                      label="Female"
                      defaultChecked={values?.gender === "female"}
                      onChange={handleChange}
                      isInvalid={touched.gender && !!errors.gender}
                    />
                    <Form.Check
                      type="radio"
                      name="gender"
                      value="other"
                      label="Other"
                      defaultChecked={values?.gender === "other"}
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

                <Form.Group controlId="avatar">
                  <Form.Label className="input-label">Avatar</Form.Label>
                  <Form.Control
                    type="file"
                    name="avatar"
                    onChange={(event) => {
                      setFieldValue("avatar", event.currentTarget.files[0]);
                    }}
                    onBlur={handleBlur}
                    isInvalid={touched.avatar && !!errors.avatar}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.avatar}
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

export default Profile;
