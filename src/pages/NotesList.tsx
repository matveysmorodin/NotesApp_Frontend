import React, { useState, useEffect } from 'react';
import { NotesApi, CategoryApi, TagApi } from '../api/ApiService';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Badge, Card, InputGroup } from 'react-bootstrap';

interface Category { id: number; name: string; color: string; }
interface Tag { id: number; name: string; }

const NotesList: React.FC = () => {
    const [notes, setNotes] = useState<any[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [search, setSearch] = useState<string>('');
    const [showCompleted, setShowCompleted] = useState<boolean>(true);
    const [showPending, setShowPending] = useState<boolean>(true);

    useEffect(() => {
        CategoryApi.getAll().then(r => setCategories(r.data));
        TagApi.getAll().then(r => setTags(r.data));
    }, []);

    useEffect(() => {
        async function fetchNotes() {
            const params: any = {};
            if (search) params.search = search;
            if (!showCompleted && showPending) params.isDone = false;
            if (!showPending && showCompleted) params.isDone = true;
            const response = await NotesApi.getAll(params);
            setNotes(response.data);
        }
        fetchNotes();
    }, [search, showCompleted, showPending]);

    const getCategory = (id?: number) => categories.find(c => c.id === id);
    const getTag = (id: number) => tags.find(t => t.id === id);

    return (
        <Container className="py-4" style={{ maxWidth: '900px' }}>
            <h1 className="mb-4 text-secondary">Notes</h1>

            <Row className="mb-3 align-items-center">
                <Col md={8} sm={12} className="mb-2">
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Search notes..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            style={{ backgroundColor: '#f1f3f5', borderColor: '#ced4da', color: '#495057' }}
                        />
                        <Button variant="outline-secondary" onClick={() => setSearch('')}>
                            Clear
                        </Button>
                    </InputGroup>
                </Col>
                <Col md={4} sm={12} className="d-flex justify-content-md-end gap-3">
                    <Form.Check
                        type="checkbox"
                        id="showCompleted"
                        label="Show Completed"
                        checked={showCompleted}
                        onChange={() => setShowCompleted(prev => !prev)}
                        className="text-secondary"
                    />
                    <Form.Check
                        type="checkbox"
                        id="showPending"
                        label="Show Pending"
                        checked={showPending}
                        onChange={() => setShowPending(prev => !prev)}
                        className="text-secondary"
                    />
                </Col>
            </Row>

            <div className="mb-4 text-end">
                <Link to="/notes/new" className="btn btn-outline-secondary">
                    New Note
                </Link>
            </div>

            {notes.length === 0 ? (
                <p className="text-muted">No notes found.</p>
            ) : (
                <Row xs={1} md={2} className="g-3">
                    {notes.map(n => {
                        const category = getCategory(n.categoryId);
                        return (
                            <Col key={n.id}>
                                <Card
                                    bg="light"
                                    text="dark"
                                    className="h-100 shadow-sm"
                                    style={{ borderColor: category?.color || '#dee2e6' }}
                                >
                                    <Card.Body>
                                        <Card.Title className="d-flex justify-content-between align-items-center">
                                            <Link to={`/notes/${n.id}`} style={{ color: '#343a40', textDecoration: 'none' }}>
                                                {n.title}
                                            </Link>
                                            <span
                                                style={{
                                                    color: n.isDone ? '#28a745' : '#dc3545',
                                                    fontSize: '1.2rem',
                                                    fontWeight: 'bold'
                                                }}
                                                title={n.isDone ? 'Completed' : 'Pending'}
                                            >
                                                {n.isDone ? '✔' : '✘'}
                                            </span>
                                        </Card.Title>
                                        <Card.Text className="text-secondary" style={{ whiteSpace: 'pre-wrap' }}>
                                            {n.content}
                                        </Card.Text>

                                        {category && (
                                            <Badge
                                                bg="secondary"
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    color: '#ffffff',  // серый цвет текста
                                                    border: `1px solid ${category.color}`
                                                }}
                                                className="me-2"
                                            >
                                                {category.name}
                                            </Badge>
                                        )}

                                        {n.tagIds && n.tagIds.length > 0 && (
                                            <>
                                                {n.tagIds.map((tid: number) => {
                                                    const tag = getTag(tid);
                                                    return tag ? (
                                                        <Badge
                                                            key={tid}
                                                            bg="secondary"
                                                            className="me-1"
                                                            style={{ opacity: 0.7 }}
                                                        >
                                                            {tag.name}
                                                        </Badge>
                                                    ) : null;
                                                })}
                                            </>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            )}
        </Container>
    );
};

export default NotesList;
