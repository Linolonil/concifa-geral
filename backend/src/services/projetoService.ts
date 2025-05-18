import { PrismaClient, StatusProjeto } from '@prisma/client';
import { getFilePath, getOriginalFilename } from '../middlewares/upload.js';
import fs from 'fs/promises';

const prisma = new PrismaClient();

export class ProjetoService {
  async criarProjeto(dados: { titulo: string; descricao: string; pdfPath: string }, usuarioId: string) {
    const projeto = await prisma.projeto.create({
      data: {
        ...dados,
        usuarioId,
        status: 'PENDENTE'
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        }
      }
    });

    return projeto;
  }

  async listarProjetos(filtros: { status?: StatusProjeto; usuarioId?: string; page?: number; limit?: number }) {
    const { status, usuarioId, page = 1, limit = 10 } = filtros;
    const skip = (page - 1) * limit;

    const where = {
      ...(status && { status }),
      ...(usuarioId && { usuarioId })
    };

    const [projetos, total] = await Promise.all([
      prisma.projeto.findMany({
        where,
        skip,
        take: limit,
        include: {
          usuario: {
            select: {
              id: true,
              nome: true,
              email: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.projeto.count({ where })
    ]);

    return {
      projetos,
      total,
      pagina: page,
      totalPaginas: Math.ceil(total / limit)
    };
  }

  async buscarProjeto(id: string, usuarioId: string, tipo: string) {
    const projeto = await prisma.projeto.findUnique({
      where: { id },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        }
      }
    });

    if (!projeto) {
      throw new Error('Projeto não encontrado');
    }

    // Verifica permissões
    if (tipo === 'ALUNO' && projeto.usuarioId !== usuarioId) {
      throw new Error('Acesso negado');
    }

    return projeto;
  }

  async atualizarStatus(id: string, status: 'APROVADO' | 'REJEITADO') {
    const projeto = await prisma.projeto.update({
      where: { id },
      data: { status }
    });

    return projeto;
  }

  async excluirProjeto(id: string, usuarioId: string) {
    const projeto = await prisma.projeto.findUnique({
      where: { id }
    });

    if (!projeto) {
      throw new Error('Projeto não encontrado');
    }

    if (projeto.usuarioId !== usuarioId) {
      throw new Error('Acesso negado');
    }

    // Exclui o arquivo físico
    try {
      const filePath = getFilePath(projeto.usuarioId, projeto.pdfPath);
      await fs.unlink(filePath);
    } catch (error) {
      console.error('Erro ao excluir arquivo:', error);
    }

    // Exclui o registro do banco
    await prisma.projeto.delete({
      where: { id }
    });
  }

  async getArquivoPath(id: string, usuarioId: string, tipo: string) {
    const projeto = await prisma.projeto.findUnique({
      where: { id },
      select: {
        id: true,
        pdfPath: true,
        usuarioId: true,
        status: true
      }
    });

    if (!projeto) {
      throw new Error('Arquivo não encontrado');
    }

    // Verifica permissões
    if (tipo === 'ALUNO' && projeto.usuarioId !== usuarioId) {
      throw new Error('Acesso negado');
    }

    if (tipo === 'COORDENADOR' && projeto.status === 'REJEITADO') {
      throw new Error('Arquivo não disponível para download');
    }

    const filePath = getFilePath(projeto.usuarioId, projeto.pdfPath);
    const originalName = getOriginalFilename(projeto.pdfPath);

    return {
      filePath,
      originalName
    };
  }
} 