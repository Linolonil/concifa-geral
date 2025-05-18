import { Request, Response } from 'express';
import { ProjetoService } from '../services/projetoService.js';
import fs from 'fs/promises';
import { StatusProjeto } from '@prisma/client';

const projetoService = new ProjetoService();

export class ProjetoController {
  async criar(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ erro: 'Arquivo PDF é obrigatório' });
      }

      // @ts-ignore - req.usuario é adicionado pelo middleware de autenticação
      const usuarioId = req.usuario.id;
      // @ts-ignore - req.usuario é adicionado pelo middleware de autenticação
      if (req.usuario.tipo !== 'ALUNO') {
        return res.status(403).json({ erro: 'Apenas alunos podem submeter projetos' });
      }

      const projeto = await projetoService.criarProjeto(
        {
          titulo: req.body.titulo,
          descricao: req.body.descricao,
          pdfPath: req.file.filename
        },
        usuarioId
      );

      return res.status(201).json(projeto);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ erro: error.message });
      }
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  }

  async listar(req: Request, res: Response) {
    try {
      // @ts-ignore - req.usuario é adicionado pelo middleware de autenticação
      const { tipo, id: usuarioId } = req.usuario;
      const { status, page, limit } = req.query;

      const filtros = {
        ...(status && { status: status as StatusProjeto }),
        ...(tipo === 'ALUNO' && { usuarioId }),
        ...(page && { page: parseInt(page as string) }),
        ...(limit && { limit: parseInt(limit as string) })
      };

      const resultado = await projetoService.listarProjetos(filtros);
      return res.json(resultado);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ erro: error.message });
      }
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  }

  async buscar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // @ts-ignore - req.usuario é adicionado pelo middleware de autenticação
      const { tipo, id: usuarioId } = req.usuario;

      const projeto = await projetoService.buscarProjeto(
        id,
        usuarioId,
        tipo
      );

      return res.json(projeto);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Projeto não encontrado') {
          return res.status(404).json({ erro: error.message });
        }
        if (error.message === 'Acesso negado') {
          return res.status(403).json({ erro: error.message });
        }
        return res.status(400).json({ erro: error.message });
      }
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  }

  async atualizarStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      // @ts-ignore - req.usuario é adicionado pelo middleware de autenticação
      if (req.usuario.tipo !== 'COORDENADOR') {
        return res.status(403).json({ erro: 'Apenas coordenadores podem atualizar o status' });
      }

      const projeto = await projetoService.atualizarStatus(
        id,
        status
      );

      return res.json(projeto);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Projeto não encontrado') {
          return res.status(404).json({ erro: error.message });
        }
        return res.status(400).json({ erro: error.message });
      }
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  }

  async excluir(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // @ts-ignore - req.usuario é adicionado pelo middleware de autenticação
      const { id: usuarioId } = req.usuario;

      await projetoService.excluirProjeto(id, usuarioId);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Projeto não encontrado') {
          return res.status(404).json({ erro: error.message });
        }
        if (error.message === 'Acesso negado') {
          return res.status(403).json({ erro: error.message });
        }
        return res.status(400).json({ erro: error.message });
      }
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  }

  async downloadArquivo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // @ts-ignore - req.usuario é adicionado pelo middleware de autenticação
      const { tipo, id: usuarioId } = req.usuario;

      const { filePath, originalName } = await projetoService.getArquivoPath(
        id,
        usuarioId,
        tipo
      );

      // Verifica se o arquivo existe
      try {
        await fs.access(filePath);
      } catch {
        return res.status(404).json({ erro: 'Arquivo não encontrado' });
      }

      // Configura os headers para download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${originalName}"`);

      // Envia o arquivo
      return res.sendFile(filePath);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Arquivo não encontrado') {
          return res.status(404).json({ erro: error.message });
        }
        if (error.message === 'Acesso negado' || error.message === 'Arquivo não disponível para download') {
          return res.status(403).json({ erro: error.message });
        }
        return res.status(400).json({ erro: error.message });
      }
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  }
} 