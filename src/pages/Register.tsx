import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {
    Container,
    Form,
    Button,
    Card,
} from 'react-bootstrap';

const Register: React.FC = () => {
    const { register } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        register(username, email, password);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card className="p-4 shadow-sm" style={{ minWidth: '300px', backgroundColor: '#f8f9fa' }}>
                <h3 className="mb-3 text-center text-secondary">Регистрация</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername" className="mb-3">
                        <Form.Label className="text-muted">Логин</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Введите логин"
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label className="text-muted">Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Введите email"
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mb-4">
                        <Form.Label className="text-muted">Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Введите пароль"
                        />
                    </Form.Group>

                    <Button variant="dark" type="submit" className="w-100">
                        Зарегестрироваться
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default Register;
