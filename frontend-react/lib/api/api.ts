import axios from 'axios';
import { LoginResponse, AuthResponse, ProjetoCreateInput, ProjetoUpdateStatusInput, ProjetoListFilters, ProjetoListResponse, Projeto } from '../types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (email: string, senha: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', { email, senha });
    return response.data;
  },

  registrar: async (nome: string, email: string, senha: string, tipo: 'ALUNO' | 'COORDENADOR'): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/registrar', { nome, email, senha, tipo });
    return response.data;
  },
};

export const projetoApi = {
  // Rotas do Aluno
  criarProjeto: async (data: ProjetoCreateInput): Promise<Projeto> => {
    const formData = new FormData();
    formData.append('titulo', data.titulo);
    formData.append('descricao', data.descricao);
    formData.append('pdf', data.pdf);

    const response = await api.post<Projeto>('/projetos/aluno/projetos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  listarProjetos: async (filtros?: ProjetoListFilters): Promise<ProjetoListResponse> => {
    const response = await api.get<ProjetoListResponse>('/projetos/aluno/projetos', { params: filtros });
    return response.data;
  },

  buscarProjeto: async (id: string): Promise<Projeto> => {
    const response = await api.get<Projeto>(`/projetos/aluno/projetos/${id}`);
    return response.data;
  },

  excluirProjeto: async (id: string): Promise<void> => {
    await api.delete(`/projetos/aluno/projetos/${id}`);
  },

  // Rotas do Coordenador
  listarProjetosCoordenador: async (filtros?: ProjetoListFilters): Promise<ProjetoListResponse> => {
    const response = await api.get<ProjetoListResponse>('/projetos/coordenador/projetos', { params: filtros });
    return response.data;
  },

  buscarProjetoCoordenador: async (id: string): Promise<Projeto> => {
    const response = await api.get<Projeto>(`/projetos/coordenador/projetos/${id}`);
    return response.data;
  },

  atualizarStatusProjeto: async (id: string, data: ProjetoUpdateStatusInput): Promise<Projeto> => {
    const response = await api.patch<Projeto>(`/projetos/coordenador/projetos/${id}/status`, data);
    return response.data;
  },

  // Rotas de Arquivos
  downloadArquivo: async (id: string): Promise<Blob> => {
    const response = await api.get(`/projetos/arquivos/${id}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },
}; 