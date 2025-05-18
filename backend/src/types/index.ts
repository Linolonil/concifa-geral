export type TipoUsuario = 'ALUNO' | 'COORDENADOR';
export type StatusProjeto = 'PENDENTE' | 'APROVADO' | 'REJEITADO';

export interface UsuarioPayload {
  id: string;
  nome: string;
  email: string;
  tipo: 'ALUNO' | 'COORDENADOR';
}

export interface LoginDTO {
  email: string;
  senha: string;
}

export interface RegistroDTO {
  nome: string;
  email: string;
  senha: string;
  tipo: TipoUsuario;
}

export interface ProjetoDTO {
  titulo: string;
  descricao: string;
}

export interface ProjetoUpdateDTO {
  status: StatusProjeto;
} 