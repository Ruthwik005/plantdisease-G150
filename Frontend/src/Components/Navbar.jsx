import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function MyNavbar({ handleSignUpShow }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  // This effect checks the localStorage for the user's info and sets it accordingly
  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    setLoggedInUser(user); // Set user info from localStorage if available
  }, []);

  const handleLogout = () => {
    // Clear token and user information from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');

    // Set loggedInUser state to null and navigate back to home page
    setLoggedInUser(null);
    navigate('/');
    window.location.reload(); // Optional: reload to ensure proper UI state
  };

  return (
    <Navbar bg="white" expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand href="#">Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNavAltMarkup" />
        <Navbar.Collapse id="navbarNavAltMarkup">
          <Nav className="ms-auto">
            <Nav.Link href="#sectionHome" className="active">Home</Nav.Link>
            <Nav.Link href="#sectionKeyFeatures">Key Features</Nav.Link>
            <Nav.Link href="#sectionUploadAndDiagnosis">Upload and Diagnostic</Nav.Link>
            <Nav.Link href="#">Follow Us</Nav.Link>

            {/* Conditional rendering: Show Sign Up or User Profile */}
            {loggedInUser ? (
              <NavDropdown title={loggedInUser} id="usernameDropdown">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={handleLogout} className="text-danger">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              // If not logged in, show Sign Up link
              <Link to="/signup" className="nav-link">Sign Up</Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
