import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';

const AppNavbar: React.FC = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <Navbar bg="light" variant="light" expand="md" className="mb-4 border-bottom">
            <Container>
                <Navbar.Brand as={Link} to="/">Notes</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
                        <Nav.Link as={Link} to="/tags">Tags</Nav.Link>
                    </Nav>
                    <Nav>
                        {user ? (
                            <>
                                <Nav.Link as={Link} to="/profile">{user.username}</Nav.Link>
                                <Button variant="outline-secondary" size="sm" onClick={logout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
