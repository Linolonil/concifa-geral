import { useState, useCallback } from 'react';
import { projetoApi } from '@/lib/api/api';
import { Projeto, ProjetoCreateInput, ProjetoListFilters, ProjetoUpdateStatusInput } from '@/lib/types';

interface UseProjetosReturn {
  projetos: Projeto[];
  projetoAtual: Projeto | null;
  isLoading: boolean;
  error: string | null;
  totalProjetos: number;
  criarProjeto: (data: ProjetoCreateInput, arquivo: File) => Promise<void>;
  listarProjetos: (filtros?: ProjetoListFilters) => Promise<void>;
  buscarProjeto: (id: string) => Promise<void>;
  excluirProjeto: (id: string) => Promise<void>;
  atualizarStatusProjeto: (id: string, data: ProjetoUpdateStatusInput) => Promise<void>;
  downloadArquivo: (id: string) => Promise<void>;
}

export function useProjetos(): UseProjetosReturn {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [projetoAtual, setProjetoAtual] = useState<Projeto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalProjetos, setTotalProjetos] = useState(0);

  const criarProjeto = useCallback(async (data: ProjetoCreateInput, arquivo: File) => {
    try {
      setIsLoading(true);
      setError(null);
      const novoProjeto = await projetoApi.criarProjeto(data, arquivo);
      setProjetos(prev => [...prev, novoProjeto]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar projeto');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const listarProjetos = useCallback(async (filtros?: ProjetoListFilters) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await projetoApi.listarProjetos(filtros);
      setProjetos(response.projetos);
      setTotalProjetos(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao listar projetos');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const buscarProjeto = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const projeto = await projetoApi.buscarProjeto(id);
      setProjetoAtual(projeto);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar projeto');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const excluirProjeto = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await projetoApi.excluirProjeto(id);
      setProjetos(prev => prev.filter(p => p.id !== id));
      if (projetoAtual?.id === id) {
        setProjetoAtual(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir projeto');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [projetoAtual]);

  const atualizarStatusProjeto = useCallback(async (id: string, data: ProjetoUpdateStatusInput) => {
    try {
      setIsLoading(true);
      setError(null);
      const projetoAtualizado = await projetoApi.atualizarStatusProjeto(id, data);
      setProjetos(prev => prev.map(p => p.id === id ? projetoAtualizado : p));
      if (projetoAtual?.id === id) {
        setProjetoAtual(projetoAtualizado);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar status do projeto');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [projetoAtual]);

  const downloadArquivo = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await projetoApi.downloadArquivo(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao baixar arquivo');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    projetos,
    projetoAtual,
    isLoading,
    error,
    totalProjetos,
    criarProjeto,
    listarProjetos,
    buscarProjeto,
    excluirProjeto,
    atualizarStatusProjeto,
    downloadArquivo,
  };
} 