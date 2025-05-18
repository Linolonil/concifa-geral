import { Request, Response } from 'express';
import { AuthService } from '../services/authService.js';

const authService = new AuthService();

export class AuthController {
  async registrar(req: Request, res: Response) {
    try {
      const usuario = await authService.registrar(req.body);
      return res.status(201).json(usuario);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ erro: error.message });
      }
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const resultado = await authService.login(req.body);
      return res.json(resultado);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({ erro: error.message });
      }
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  }
} 