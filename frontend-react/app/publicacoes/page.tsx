"use client"

import Layout from "@/components/layout/Layout"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { FileText, Download, ExternalLink, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

    
  const mockData = [
    {
      title: 'Interfaces Conversacionais Baseadas em IA: Um Estudo de Caso',
      authors: 'Silva, J.; Oliveira, M.; Santos, A.',
      description:
        'Este trabalho apresenta uma análise detalhada sobre interfaces conversacionais baseadas em inteligência artificial, destacando os principais desafios e oportunidades nesta área.',
      year: 2024,
      type: 'Artigo Completo',
    },
    {
      title: 'Ética e Viés em Sistemas de Recomendação',
      authors: 'Silva, J.; Oliveira, M.; Santos, A.',
      description:
        'Este trabalho apresenta uma análise detalhada sobre questões éticas e viés em sistemas de recomendação, destacando os principais desafios e oportunidades.',
      year: 2023,
      type: 'Artigo Completo',
    },
    {
      title: 'Análise de Dados Forenses em Dispositivos Móveis',
      authors: 'Costa, F.; Lima, P.',
      description:
        'Discussão sobre técnicas modernas de análise forense em smartphones e tablets.',
      year: 2023,
      type: 'Artigo Incompleto',
    },
    {
      title: 'Reconhecimento Facial e Privacidade',
      authors: 'Mendes, G.; Rocha, C.',
      description:
        'Estudo sobre o impacto do reconhecimento facial na privacidade dos cidadãos.',
      year: 2022,
      type: 'Artigo Completo',
    },
    {
      title: 'Blockchain para Cadeia de Custódia Digital',
      authors: 'Santos, A.; Oliveira, M.',
      description:
        'Como o blockchain pode garantir a integridade de evidências digitais.',
      year: 2022,
      type: 'Artigo Incompleto',
    },
    {
      title: 'Machine Learning em Perícias Criminais',
      authors: 'Silva, J.; Costa, F.',
      description:
        'Aplicações de aprendizado de máquina em investigações criminais.',
      year: 2024,
      type: 'Artigo Completo',
    },
    {
      title: 'Deepfake: Desafios para a Justiça',
      authors: 'Lima, P.; Mendes, G.',
      description:
        'Análise dos riscos e métodos de detecção de deepfakes em processos judiciais.',
      year: 2023,
      type: 'Artigo Incompleto',
    },
  ];

const anosDisponiveis = [2024, 2023, 2022]
const tiposDisponiveis = ['Artigo Completo', 'Artigo Incompleto']

export default function Publicacoes() {
  const [paginaAtual, setPaginaAtual] = useState(1)
  const itensPorPagina = 5
  const [anosSelecionados, setAnosSelecionados] = useState<number[]>([])
  const [tiposSelecionados, setTiposSelecionados] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  // Filtro funcional
  const filtrar = (item: typeof mockData[0]) => {
    const anoOk = anosSelecionados.length === 0 || anosSelecionados.includes(item.year)
    const tipoOk = tiposSelecionados.length === 0 || tiposSelecionados.includes(item.type)
    const termo = searchTerm.trim().toLowerCase()
    const buscaOk =
      termo.length === 0 ||
      item.title.toLowerCase().includes(termo) ||
      item.authors.toLowerCase().includes(termo) ||
      item.description.toLowerCase().includes(termo)
    return anoOk && tipoOk && buscaOk
  }
  const dadosFiltrados = mockData.filter(filtrar)
  const totalPaginas = Math.ceil(dadosFiltrados.length / itensPorPagina)
  const inicio = (paginaAtual - 1) * itensPorPagina
  const fim = inicio + itensPorPagina
  const itensPagina = dadosFiltrados.slice(inicio, fim)

  // Handlers filtros
  const handleAno = (ano: number) => {
    setPaginaAtual(1)
    setAnosSelecionados((prev) =>
      prev.includes(ano) ? prev.filter((a) => a !== ano) : [...prev, ano]
    )
  }
  const handleTipo = (tipo: string) => {
    setPaginaAtual(1)
    setTiposSelecionados((prev) =>
      prev.includes(tipo) ? prev.filter((t) => t !== tipo) : [...prev, tipo]
    )
  }
  const handlePagina = (novaPagina: number) => {
    if (novaPagina < 1 || novaPagina > totalPaginas) return
    setPaginaAtual(novaPagina)
  }
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaginaAtual(1)
    setSearchTerm(e.target.value)
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Publicações</h1>
            <p className="text-xl text-gray-200">Acesse os anais e publicações científicas do CONCIFA</p>
          </div>
        </div>
      </section>
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-[#2279ea]">Pesquisar Publicações</h2>
      <div className="rounded-[2rem] shadow-md p-6 mb-8 bg-white">
        <Input
          placeholder="Buscar por título, autor ou palavra-chave"
          className="text-base focus:border-[#2279ea] focus:ring-2 focus:ring-[#2279ea]/30"
          value={searchTerm}
          onChange={handleSearch}
          aria-label="Buscar publicações"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
        {/* Filtros */}
        <aside>
          <h3 className="text-lg font-semibold mb-2 text-[#2279ea]">Filtros</h3>
          <div className="space-y-1">
            {anosDisponiveis.map((ano) => (
              <label key={ano} className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  id={`ano-${ano}`}
                  checked={anosSelecionados.includes(ano)}
                  onCheckedChange={() => handleAno(ano)}
                  className="border-[#2279ea] data-[state=checked]:bg-[#2279ea] data-[state=checked]:border-[#2279ea]"
                />
                <span className="text-gray-700">{ano}</span>
              </label>
            ))}
          </div>

          <h4 className="text-md font-semibold mt-4 mb-2 text-[#2279ea]">Tipo de Publicação</h4>
          <div className="space-y-1">
            {tiposDisponiveis.map((tipo) => (
              <label key={tipo} className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  id={`tipo-${tipo}`}
                  checked={tiposSelecionados.includes(tipo)}
                  onCheckedChange={() => handleTipo(tipo)}
                  className="border-[#2279ea] data-[state=checked]:bg-[#2279ea] data-[state=checked]:border-[#2279ea]"
                />
                <span className="text-gray-700">{tipo}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Resultados */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-[#2279ea]">Resultados</h3>
            <Select>
              <SelectTrigger className="w-[180px] border-[#2279ea] text-[#2279ea]">
                <SelectValue placeholder="Mais recente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recentes">Mais recente</SelectItem>
                <SelectItem value="antigos">Mais antigo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {itensPagina.length === 0 && (
              <div className="text-center text-gray-500 py-8">Nenhuma publicação encontrada.</div>
            )}
            {itensPagina.map((item, i) => (
              <Card key={i} className="bg-white shadow-md">
                <CardContent className="p-4">
                  <h4 className="text-lg font-bold mb-1 text-[#2279ea]">{item.title}</h4>
                  <p className="text-sm mb-1 text-gray-700">
                    <span className="font-semibold">Autores:</span> {item.authors}
                  </p>
                  <p className="text-sm mb-2 text-gray-700">{item.description}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="bg-green-100 text-green-800 border border-green-300 hover:bg-green-200">
                      Ver online
                    </Button>
                    <Button variant="outline" className="bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200">
                      PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Paginação */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button
              variant="outline"
              className="rounded-full px-3 border-[#2279ea] text-[#2279ea] hover:bg-[#2279ea]/10"
              onClick={() => handlePagina(paginaAtual - 1)}
              disabled={paginaAtual === 1}
              aria-label="Página anterior"
              tabIndex={0}
            >
              Anterior
            </Button>
            {Array.from({ length: totalPaginas }, (_, idx) => (
              <Button
                key={idx + 1}
                variant={paginaAtual === idx + 1 ? "default" : "outline"}
                className={`rounded-full px-3 ${paginaAtual === idx + 1 ? 'bg-[#2279ea] text-white font-bold' : 'border-[#2279ea] text-[#2279ea] hover:bg-[#2279ea]/10'}`}
                onClick={() => handlePagina(idx + 1)}
                aria-label={`Página ${idx + 1}`}
                tabIndex={0}
              >
                {idx + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              className="rounded-full px-3 border-[#2279ea] text-[#2279ea] hover:bg-[#2279ea]/10"
              onClick={() => handlePagina(paginaAtual + 1)}
              disabled={paginaAtual === totalPaginas || totalPaginas === 0}
              aria-label="Próxima página"
              tabIndex={0}
            >
              Próxima
            </Button>
          </div>
        </section>
      </div>
    </div>
    </Layout>
  )
}
