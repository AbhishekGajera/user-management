import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const isLoggedIn = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  const onClickLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('signup')
  }

  return (
    <Navbar expand="lg" variant="dark" bg="primary" sticky="top" className="justify-content-center">
      <Link to="/">
        <Navbar.Brand>App Name</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="navbar" />
      <Navbar.Collapse id="navbar">
        <Nav className="ml-auto">
          <Link to="/profile">
            <div className='nav-link'>Profile</div>
          </Link>
          <Link to="/change-password">
            <div className='nav-link'>Change-Password</div>
          </Link>
          {!isLoggedIn && <Link to="/signup">
            <div className='nav-link'>SignUp</div>
          </Link>}
          {isLoggedIn && <button onClick={onClickLogout} className='nav-btn' to="/signin">
            <div className='nav-link'>Logout</div>
          </button>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
