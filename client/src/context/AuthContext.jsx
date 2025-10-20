import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../lib/axios.js';

const AuthCtx = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await api.get('/auth/me');
        setUser(data.user);
      } catch {}
      setLoading(false);
    };
    init();
  }, []);

  const login = async (identifier, password) => {
    const { data } = await api.post('/auth/login', { identifier, password });
    setUser(data.user);
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    setUser(data.user);
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthCtx.Provider>
  );
};

export const useAuth = () => useContext(AuthCtx);

