import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import UserList from "./pages/UserList";
import Navigation from "./pages/Navigation";

import PrivateRoute from "./utils/PrivateRoute";
import "./App.css";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <Router>
      <Navigation />
      <Container className="mt-4">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/signup" element={<Registration />} />
          <Route path="/signin" element={<Login />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <PrivateRoute>
                <ChangePassword />
              </PrivateRoute>
            }
          />
          <Route path="/user-list" element={<UserList />} />
        </Routes>
      </Container>
      <ToastContainer />
    </Router>
  );
}

export default App;
