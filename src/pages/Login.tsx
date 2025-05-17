import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {
    Container,
    Form,
    Button,
    Card,
} from 'react-bootstrap';

const Login: React.FC = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(username, password);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card className="p-4 shadow-sm" style={{ minWidth: '300px', backgroundColor: '#f8f9fa' }}>
                <h3 className="mb-3 text-center text-secondary">Login</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername" className="mb-3">
                        <Form.Label className="text-muted">Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Enter username"
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mb-4">
                        <Form.Label className="text-muted">Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                    </Form.Group>

                    <Button variant="dark" type="submit" className="w-100">
                        Login
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default Login;
