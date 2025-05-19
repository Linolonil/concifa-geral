import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRoutes } from './routes/authRoutes.js';
import { projetoRoutes } from './routes/projetoRoutes.js';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Teste de conexão com o banco
prisma.$connect()
  .then(() => console.log('Conectado ao banco de dados'))
  .catch((error) => {
    console.error('Erro ao conectar ao banco:', error);
    process.exit(1);
  });

// Routes
app.use('/auth', authRoutes);
app.use('/projetos', projetoRoutes);
app.use('/pdf', projetoRoutes);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 