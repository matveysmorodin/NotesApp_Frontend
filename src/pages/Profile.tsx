import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { NotesApi } from '../api/ApiService';
import { Card, Container, Spinner } from 'react-bootstrap';

const Profile: React.FC = () => {
    const { user } = useContext(AuthContext);
    const [noteCount, setNoteCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchNotes = async () => {
            const res = await NotesApi.getAll();
            const userNotes = res.data.filter((n: any) => n.userId === user?.id);
            setNoteCount(userNotes.length);
        };
        if (user) fetchNotes();
    }, [user]);

    if (!user) return null;

    return (
        <Container className="mt-4">
            <Card className="shadow-sm bg-light p-4">
                <h2 className="text-secondary mb-3">Профиль</h2>
                <p><strong>Имя профиля: </strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </Card>
        </Container>
    );
};

export default Profile;
