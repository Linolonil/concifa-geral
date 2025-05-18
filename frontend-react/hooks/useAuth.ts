import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api/api';
import { Usuario, LoginResponse } from '@/lib/types';

interface UseAuthReturn {
  usuario: Usuario | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  registrar: (nome: string, email: string, senha: string, tipo: 'ALUNO' | 'COORDENADOR') => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUsuario = localStorage.getItem('usuario');

    if (storedToken && storedUsuario) {
      setToken(storedToken);
      setUsuario(JSON.parse(storedUsuario));
    }

    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, senha: string) => {
    try {
      const response = await authApi.login(email, senha);
      const { token, usuario } = response;

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      setToken(token);
      setUsuario(usuario);

      router.push(usuario.tipo === 'ALUNO' ? '/aluno/dashboard' : '/coordenador/dashboard');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setToken(null);
    setUsuario(null);
    router.push('/login');
  }, [router]);

  const registrar = useCallback(async (nome: string, email: string, senha: string, tipo: 'ALUNO' | 'COORDENADOR') => {
    try {
      await authApi.registrar(nome, email, senha, tipo);
      await login(email, senha);
    } catch (error) {
      console.error('Erro ao registrar:', error);
      throw error;
    }
  }, [login]);

  return {
    usuario,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    logout,
    registrar,
  };
} 