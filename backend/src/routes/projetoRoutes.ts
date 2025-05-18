import { Router } from 'express';
import { ProjetoController } from '../controllers/projetoController.js';
import { authMiddleware, autorizarCoordenador, autorizarAluno } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';
import { validarProjeto, validarAtualizacaoStatus } from '../utils/validators.js';

const router = Router();
const projetoController = new ProjetoController();

// Rotas do Aluno
const alunoRouter = Router();
alunoRouter.use(authMiddleware, autorizarAluno);
alunoRouter.post('/', upload.single('pdf'), validarProjeto, projetoController.criar);
alunoRouter.get('/', projetoController.listar);
alunoRouter.get('/:id', projetoController.buscar);
alunoRouter.delete('/:id', projetoController.excluir);

// Rotas do Coordenador
const coordenadorRouter = Router();
coordenadorRouter.use(authMiddleware, autorizarCoordenador);
coordenadorRouter.get('/', projetoController.listar);
coordenadorRouter.get('/:id', projetoController.buscar);
coordenadorRouter.patch('/:id/status', validarAtualizacaoStatus, projetoController.atualizarStatus);

// Rotas de Arquivos (compartilhadas)
const arquivoRouter = Router();
arquivoRouter.use(authMiddleware);
arquivoRouter.get('/:id/download', projetoController.downloadArquivo);

// Registra as rotas
router.use('/aluno/projetos', alunoRouter);
router.use('/coordenador/projetos', coordenadorRouter);
router.use('/arquivos', arquivoRouter);

export const projetoRoutes = router; 