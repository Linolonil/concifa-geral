export type TipoUsuario = 'ALUNO' | 'COORDENADOR';
export type StatusProjeto = 'PENDENTE' | 'APROVADO' | 'REJEITADO';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo: TipoUsuario;
  createdAt: string;
  updatedAt: string;
}

export interface Projeto {
  id: string;
  titulo: string;
  descricao: string;
  pdfPath: string;
  status: StatusProjeto;
  usuarioId: string;
  usuario?: Usuario;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}

export interface AuthResponse {
  usuario: Usuario;
}

export interface ProjetoCreateInput {
  titulo: string;
  descricao: string;
  pdf: File;
}

export interface ProjetoUpdateStatusInput {
  status: StatusProjeto;
}

export interface ProjetoListFilters {
  status?: StatusProjeto;
  page?: number;
  limit?: number;
}

export interface ProjetoListResponse {
  projetos: Projeto[];
  total: number;
  page: number;
  totalPages: number;
} 