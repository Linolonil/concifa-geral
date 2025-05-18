import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UsuarioPayload } from '../types/index.js';

declare global {
  namespace Express {
    interface Request {
      usuario?: UsuarioPayload;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UsuarioPayload;
    req.usuario = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ erro: 'Token inválido' });
  }
};

export const autorizarCoordenador = (req: Request, res: Response, next: NextFunction) => {
  if (req.usuario?.tipo !== 'COORDENADOR') {
    return res.status(403).json({ erro: 'Acesso negado. Apenas coordenadores podem acessar este recurso.' });
  }
  return next();
};

export const autorizarAluno = (req: Request, res: Response, next: NextFunction) => {
  if (req.usuario?.tipo !== 'ALUNO') {
    return res.status(403).json({ erro: 'Acesso negado. Apenas alunos podem acessar este recurso.' });
  }
  return next();
}; 