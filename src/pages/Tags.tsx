import React, { useState, useEffect } from 'react';
import { TagApi } from '../api/ApiService';
import { Container, Form, Button, ListGroup, Card } from 'react-bootstrap';

const Tags: React.FC = () => {
    const [tags, setTags] = useState<any[]>([]);
    const [name, setName] = useState('');

    useEffect(() => {
        TagApi.getAll().then(r => setTags(r.data));
    }, []);

    const add = async () => {
        if (name.trim() === '') return; // не добавлять пустое
        await TagApi.create({ name });
        setName('');
        setTags((await TagApi.getAll()).data);
    };

    const del = async (id: number) => {
        await TagApi.delete(id);
        setTags(t => t.filter(x => x.id !== id));
    };

    return (
        <Container className="p-4">
            <Card className="p-3 shadow-sm" style={{ backgroundColor: '#f8f9fa', maxWidth: 600, margin: 'auto' }}>
                <h1 className="mb-4 text-secondary">Теги</h1>
                <Form
                    onSubmit={e => {
                        e.preventDefault();
                        add();
                    }}
                    className="d-flex mb-3"
                >
                    <Form.Control
                        placeholder="Введите имя тега"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Button variant="dark" type="submit" className="ms-2">
                        Добавить
                    </Button>
                </Form>

                <ListGroup variant="flush">
                    {tags.map(t => (
                        <ListGroup.Item
                            key={t.id}
                            className="d-flex justify-content-between align-items-center"
                            style={{ backgroundColor: '#e9ecef' }}
                        >
                            <span>{t.name}</span>
                            <Button variant="outline-danger" size="sm" onClick={() => del(t.id)}>
                                Удалить
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
        </Container>
    );
};

export default Tags;
