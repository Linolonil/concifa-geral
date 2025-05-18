import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { LoginDTO, RegistroDTO, UsuarioPayload } from '../types/index.js';

const prisma = new PrismaClient();

export class AuthService {
  async registrar(dados: RegistroDTO) {
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email: dados.email }
    });

    if (usuarioExistente) {
      throw new Error('Email já cadastrado');
    }

    const senhaHash = await bcrypt.hash(dados.senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        ...dados,
        senha: senhaHash
      }
    });

    const { senha, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  }

  async login(dados: LoginDTO) {
    const usuario = await prisma.usuario.findUnique({
      where: { email: dados.email }
    });

    if (!usuario) {
      throw new Error('Credenciais inválidas');
    }

    const senhaValida = await bcrypt.compare(dados.senha, usuario.senha);

    if (!senhaValida) {
      throw new Error('Credenciais inválidas');
    }

    const payload: UsuarioPayload = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      tipo: usuario.tipo
    };

    const options: SignOptions = {
      expiresIn: '7d'
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      options
    );
    

    return { token, usuario: { ...usuario, senha: undefined } };
  }
} 