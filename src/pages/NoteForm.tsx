import React, { useState, useEffect } from 'react';
import { NotesApi, CategoryApi, TagApi } from '../api/ApiService';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Container,
    Form,
    Button,
    Card,
    Spinner,
    Row,
    Col,
    Badge
} from 'react-bootstrap';

const NoteForm: React.FC = () => {
    const { id } = useParams();
    const editMode = Boolean(id);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isDone, setIsDone] = useState(false);
    const [categoryId, setCategoryId] = useState<number | undefined>();
    const [categories, setCategories] = useState<any[]>([]);
    const [tags, setTags] = useState<any[]>([]);
    const [tagIds, setTagIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const [catRes, tagRes] = await Promise.all([CategoryApi.getAll(), TagApi.getAll()]);
            setCategories(catRes.data);
            setTags(tagRes.data);
        };
        loadData();
    }, []);

    useEffect(() => {
        if (editMode) {
            NotesApi.get(Number(id)).then(r => {
                const n = r.data;
                setTitle(n.title);
                setContent(n.content);
                setIsDone(n.isDone);
                setCategoryId(n.categoryId);
                setTagIds(n.tagIds || []);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [id, editMode]);

    const submit = async () => {
        const dto = { title, content, isDone, categoryId, tagIds };
        const action = editMode ? NotesApi.update(Number(id), dto) : NotesApi.create(dto);
        await action;
        navigate('/');
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                <Spinner animation="border" variant="secondary" />
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Card className="shadow-sm bg-light">
                <Card.Body>
                    <Card.Title className="mb-4 text-secondary">
                        {editMode ? 'Edit Note' : 'New Note'}
                    </Card.Title>
                    <Form onSubmit={e => { e.preventDefault(); submit(); }}>
                        <Form.Group className="mb-3">
                            <Form.Label>Заголовок</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите заголовок"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Текст</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Введите текст"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Выполнено"
                                checked={isDone}
                                onChange={e => setIsDone(e.target.checked)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Категории</Form.Label>
                            <Form.Select
                                value={categoryId ?? ''}
                                onChange={e => {
                                    const val = e.target.value;
                                    setCategoryId(val ? Number(val) : undefined);
                                }}
                            >
                                <option value="">-- Выбрать категории --</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Теги</Form.Label>
                            <div>
                                {tags.map(t => (
                                    <Form.Check
                                        key={t.id}
                                        inline
                                        type="checkbox"
                                        id={`tag-${t.id}`}
                                        label={<Badge bg="secondary" className="me-2">{t.name}</Badge>}
                                        checked={tagIds.includes(t.id)}
                                        onChange={() => {
                                            setTagIds(prev =>
                                                prev.includes(t.id)
                                                    ? prev.filter(x => x !== t.id)
                                                    : [...prev, t.id]
                                            );
                                        }}
                                    />
                                ))}
                            </div>
                        </Form.Group>

                        <Row>
                            <Col xs="auto">
                                <Button type="submit" variant="dark">
                                    Сохранить
                                </Button>
                            </Col>
                            <Col xs="auto">
                                <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                                    Отмена
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default NoteForm;
