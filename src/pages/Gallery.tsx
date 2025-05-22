import React, { useEffect, useState } from 'react';
import { GalleryApi } from '../api/ApiService';
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';

const Gallery: React.FC = () => {
    const [photos, setPhotos] = useState<any[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [showRenameModal, setShowRenameModal] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
    const [newFileName, setNewFileName] = useState('');
    const [selectedPhotoForView, setSelectedPhotoForView] = useState<string | null>(null);

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        const res = await GalleryApi.getAll();
        setPhotos(res.data);
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;
        await GalleryApi.upload(file);
        setFile(null);
        fetchPhotos();
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this photo?')) return;
        await GalleryApi.deletePhoto(id);
        fetchPhotos();
    };

    const openRenameModal = (photo: any) => {
        setSelectedPhoto(photo);
        setNewFileName(photo.fileName);
        setShowRenameModal(true);
    };

    const handleRename = async () => {
        if (!selectedPhoto) return;
        await GalleryApi.renamePhoto(selectedPhoto.id, newFileName);
        setShowRenameModal(false);
        fetchPhotos();
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-3">Галерея</h2>
            <Form onSubmit={handleUpload} className="mb-4">
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Выбрать фото</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFile(e.target.files?.[0] || null)
                        }
                    />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Загрузить
                </Button>
            </Form>

            <Row xs={1} sm={2} md={3} lg={4}>
                {photos.map((photo) => (
                    <Col key={photo.id} className="mb-4">
                        <Card>
                            <img
                                src={`https://localhost:5001${photo.url}`}
                                alt={photo.fileName}
                                style={{ cursor: 'pointer', width: '100%', height: 'auto' }}
                                onClick={() => setSelectedPhotoForView(`https://localhost:5001${photo.url}`)}
                            />
                            <Card.Body>
                                <Card.Text>{photo.fileName}</Card.Text>
                                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(photo.id)}>
                                    Удалить
                                </Button>{' '}
                                <Button variant="outline-primary" size="sm" onClick={() => openRenameModal(photo)}>
                                    Изменить
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Модалка для переименования */}
            <Modal show={showRenameModal} onHide={() => setShowRenameModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Переименовать фото</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Новое название</Form.Label>
                        <Form.Control
                            type="text"
                            value={newFileName}
                            onChange={(e) => setNewFileName(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowRenameModal(false)}>
                        Отменить
                    </Button>
                    <Button variant="primary" onClick={handleRename}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={selectedPhotoForView !== null}
                onHide={() => setSelectedPhotoForView(null)}
                centered
                size="lg"
                keyboard={true}
            >
                <Modal.Body
                    style={{ padding: 0, backgroundColor: 'black' }}
                    onClick={() => setSelectedPhotoForView(null)} // клик по подложке закрывает
                >
                    {selectedPhotoForView && (
                        <img
                            src={selectedPhotoForView}
                            alt="Enlarged"
                            style={{ display: 'block', margin: 'auto', maxHeight: '80vh', cursor: 'pointer' }}
                            onClick={(e) => e.stopPropagation()} // чтобы клик по фото не закрыл модалку
                        />
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Gallery;
