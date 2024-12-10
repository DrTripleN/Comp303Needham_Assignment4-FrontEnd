import React from 'react';
import {Navbar, Nav, Container, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navigation({ loggedInUser , onLogout }) {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Blood Donation</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        {/* Conditionally render nav links based on login state */}
                        {!loggedInUser  ? (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                <Nav.Link as={Link} to="/donorList">Donor List</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/donorList">Donor List</Nav.Link>
                                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                <Nav.Link as={Link} to="/schedule-donation">Schedule Donation</Nav.Link>
                                <Nav.Link as={Link} to="/schedule-history">Donation History</Nav.Link>
                            </>
                        )}
                    </Nav>
                    {}
                    {loggedInUser  && (
                        <Navbar.Text>
                            Signed in as: {loggedInUser .firstName} {loggedInUser .lastName}
                            <Button variant="danger" onClick={onLogout} style={{ marginLeft: "10px" }}>Logout</Button>
                        </Navbar.Text>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;