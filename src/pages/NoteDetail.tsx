import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { NotesApi } from '../api/ApiService';
import {
    Container,
    Card,
    Button,
    Form,
    Spinner,
    Row,
    Col,
} from 'react-bootstrap';

const NoteDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [note, setNote] = useState<any>(null);
    const [isDone, setIsDone] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNote() {
            try {
                const res = await NotesApi.get(Number(id));
                setNote(res.data);
                setIsDone(res.data.isDone);
            } finally {
                setLoading(false);
            }
        }
        fetchNote();
    }, [id]);

    const toggleDone = async () => {
        const updatedDto = {
            id: note.id,
            title: note.title,
            content: note.content,
            isDone: !isDone,
            categoryId: note.categoryId,
            tagIds: note.tagIds || []
        };
        await NotesApi.update(note.id, updatedDto);
        setIsDone(!isDone);
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                <Spinner animation="border" variant="secondary" />
            </Container>
        );
    }

    if (!note) return null;

    return (
        <Container className="mt-4">
            <Card className="shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
                <Card.Body>
                    <Card.Title className="mb-3 text-secondary">{note.title}</Card.Title>
                    <Card.Text className="text-muted">{note.content}</Card.Text>

                    <Form.Check
                        type="checkbox"
                        label={isDone ? 'Выполнено' : 'Не выполнено'}
                        checked={isDone}
                        onChange={toggleDone}
                        className="mb-4"
                    />

                    <Row>
                        <Col xs="auto">
                            <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                                Назад
                            </Button>
                        </Col>
                        <Col xs="auto">
                            <Link to={`/notes/${note.id}/edit`}>
                                <Button variant="dark">Редактировать</Button>
                            </Link>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default NoteDetail;
