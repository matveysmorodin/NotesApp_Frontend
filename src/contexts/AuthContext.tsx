import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthApi } from '../api/ApiService';

type User = { id: number; username: string; email: string };
interface AuthContextProps {
    user: User | null;
    login(u: string, p: string): Promise<void>;
    register(u: string, e: string, p: string): Promise<void>;
    logout(): void;
}
export const AuthContext = createContext<AuthContextProps>({} as any);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        AuthApi.current()
            .then(res => setUser(res.data))
            .catch(() => setUser(null));
    }, []);
    const login = async (username: string, password: string) => {
        const { data } = await AuthApi.login({ username, password });
        localStorage.setItem('token', data.token);
        const me = await AuthApi.current();
        setUser(me.data);
        navigate('/');
    };
    const register = async (username: string, email: string, password: string) => {
        const { data } = await AuthApi.register({ username, email, password });
        localStorage.setItem('token', data.token);
        const me = await AuthApi.current();
        setUser(me.data);
        navigate('/');
    };
    const logout = () => { localStorage.removeItem('token'); setUser(null); navigate('/login'); };
    return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
};