import multer from 'multer';
import path from 'path';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';

// Função para garantir que o diretório existe
const ensureDirectoryExists = async (dir: string) => {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
};

// Função para criar o diretório do usuário se não existir
const createUserDirectory = async (userId: string) => {
  const baseDir = process.env.UPLOAD_DIR || 'uploads';
  const uploadsDir = path.join(baseDir, 'usuarios');
  const userDir = path.join(uploadsDir, userId);

  // Garante que os diretórios existam
  await ensureDirectoryExists(uploadsDir);
  await ensureDirectoryExists(userDir);

  return userDir;
};

// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: async (req: Request, file, cb) => {
    try {
      // @ts-ignore - req.usuario é adicionado pelo middleware de autenticação
      const userId = req.usuario?.id;
      if (!userId) {
        return cb(new Error('Usuário não autenticado'), '');
      }

      const userDir = await createUserDirectory(userId);
      cb(null, userDir);
    } catch (error) {
      cb(error as Error, '');
    }
  },
  filename: (req: Request, file, cb) => {
    // Gera um nome único para o arquivo usando timestamp + UUID
    const timestamp = Date.now();
    const uniqueId = uuidv4();
    const originalName = path.parse(file.originalname).name;
    const extension = path.extname(file.originalname);
    
    // Formato: timestamp_uuid_nome-original.extensao
    const filename = `${timestamp}_${uniqueId}_${originalName}${extension}`;
    cb(null, filename);
  }
});

// Filtro para aceitar apenas PDFs
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Apenas arquivos PDF são permitidos'));
  }
};

// Configuração do multer
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880') // 5MB default
  }
});

// Função auxiliar para gerar o caminho completo do arquivo
export const getFilePath = (userId: string, filename: string): string => {
  return path.join(process.env.UPLOAD_DIR || 'uploads', 'usuarios', userId, filename);
};

// Função auxiliar para extrair o nome original do arquivo
export const getOriginalFilename = (filename: string): string => {
  const parts = filename.split('_');
  if (parts.length >= 3) {
    // Remove timestamp e UUID e retorna o nome original
    return parts.slice(2).join('_');
  }
  return filename;
}; 