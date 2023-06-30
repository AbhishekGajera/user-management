import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { deleteUser } from '../APIs'
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();

  const getMessage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.status;
  };

  const onClickDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account ?")) {
      try {
        await deleteUser();
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        navigate("/signup");
        toast.success("Your account is deleted!!");
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to delete account"
        );
      }
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2>Welcome to the Dashboard</h2>
              <p>Your current status is {getMessage()} </p>
            </Card.Body>
            <Col md={12} className="d-flex justify-content-center pb-3">
              <Button onClick={onClickDeleteAccount} variant="danger">
                Delete Account
              </Button>
            </Col>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
