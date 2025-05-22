import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NotesList from './pages/NotesList';
import NoteForm from './pages/NoteForm';
import NoteDetail from './pages/NoteDetail';
import Categories from './pages/Categories';
import Tags from './pages/Tags';
import History from './pages/History';
import Gallery from './pages/Gallery';


const App: React.FC = () => (
    <AuthProvider>
        <div
            style={{
                minHeight: '100vh',
                backgroundColor: '#d1d1d1',  // мягкий серо-голубой фон, можно менять
                backgroundImage: 'url("/background-pattern.svg")', // если хочешь узор или картинку
                backgroundRepeat: 'repeat',
                backgroundSize: 'contain',
                fontFamily: 'Roboto, sans-serif' // если хочешь задать шрифт глобально
            }}
        >
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={
                    <ProtectedRoute>
                        <NotesList />
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
                <Route path="/notes/new" element={
                    <ProtectedRoute>
                        <NoteForm />
                    </ProtectedRoute>
                } />
                <Route path="/notes/:id" element={
                    <ProtectedRoute>
                        <NoteDetail />
                    </ProtectedRoute>
                } />
                <Route path="/notes/:id/edit" element={
                    <ProtectedRoute>
                        <NoteForm />
                    </ProtectedRoute>
                } />
                <Route path="/categories" element={
                    <ProtectedRoute>
                        <Categories />
                    </ProtectedRoute>
                } />
                <Route path="/tags" element={
                    <ProtectedRoute>
                        <Tags />
                    </ProtectedRoute>
                } />
                <Route path="/history/:noteId" element={
                    <ProtectedRoute>
                        <History />
                    </ProtectedRoute>
                } />
                <Route path="/gallery" element={
                    <ProtectedRoute>
                        <Gallery />
                    </ProtectedRoute>
                } />

            </Routes>
        </div>
    </AuthProvider>
);

export default App;
