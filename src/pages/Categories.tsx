import React, { useState, useEffect } from 'react';
import { CategoryApi } from '../api/ApiService';
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    ListGroup,
    Badge,
    Card
} from 'react-bootstrap';

const Categories: React.FC = () => {
    const [cats, setCats] = useState<any[]>([]);
    const [name, setName] = useState('');
    const [color, setColor] = useState('#000000');

    useEffect(() => {
        CategoryApi.getAll().then(r => setCats(r.data));
    }, []);

    const add = async () => {
        await CategoryApi.create({ name, color });
        setName('');
        setColor('#000000');
        setCats((await CategoryApi.getAll()).data);
    };

    const del = async (id: number) => {
        await CategoryApi.delete(id);
        setCats(c => c.filter(x => x.id !== id));
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4 text-secondary">Categories</h2>

            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <Row className="g-2 align-items-center">
                        <Col md={5}>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Category name"
                            />
                        </Col>
                        <Col md={2}>
                            <Form.Control
                                type="color"
                                value={color}
                                onChange={e => setColor(e.target.value)}
                            />
                        </Col>
                        <Col md={3}>
                            <Button onClick={add} variant="primary">
                                Add
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <ListGroup>
                {cats.map(c => (
                    <ListGroup.Item
                        key={c.id}
                        className="d-flex justify-content-between align-items-center"
                    >
                        <div className="d-flex align-items-center gap-3">
                            <span
                                style={{
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '50%',
                                    backgroundColor: c.color,
                                    border: '1px solid #ccc',
                                    display: 'inline-block',
                                }}
                                title={c.color}
                            />
                            <span className="text-muted">{c.name}</span>
                        </div>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => del(c.id)}
                        >
                            Delete
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default Categories;
