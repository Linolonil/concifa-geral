import { body } from 'express-validator';
import { z } from 'zod';

export const validarRegistro = [
  body('nome').trim().notEmpty().withMessage('Nome é obrigatório'),
  body('email').isEmail().withMessage('Email inválido'),
  body('senha').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
  body('tipo').isIn(['ALUNO', 'COORDENADOR']).withMessage('Tipo de usuário inválido')
];

export const validarLogin = [
  body('email').isEmail().withMessage('Email inválido'),
  body('senha').notEmpty().withMessage('Senha é obrigatória')
];

export const validarProjeto = [
  body('titulo').trim().notEmpty().withMessage('Título é obrigatório'),
  body('descricao').trim().notEmpty().withMessage('Descrição é obrigatória')
];

export const validarAtualizacaoStatus = [
  body('status').isIn(['APROVADO', 'REJEITADO']).withMessage('Status inválido')
];

// Schemas Zod para validação de tipos
export const registroSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  tipo: z.enum(['ALUNO', 'COORDENADOR'])
});

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  senha: z.string().min(1, 'Senha é obrigatória')
});

export const projetoSchema = z.object({
  titulo: z.string().min(1, 'Título é obrigatório'),
  descricao: z.string().min(1, 'Descrição é obrigatória')
});

export const atualizacaoStatusSchema = z.object({
  status: z.enum(['APROVADO', 'REJEITADO'])
}); 