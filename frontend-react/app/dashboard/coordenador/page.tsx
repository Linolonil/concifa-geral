"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import Layout from "@/components/layout/Layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  BarChart3,
  Calendar,
  BookOpen,
  History,
  Eye,
  ImageIcon,
  Download,
  User,
  FileSpreadsheet,
  Users,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Tipos para os projetos
type StatusProjeto = "pendente" | "aprovado" | "rejeitado"

interface Projeto {
  id: string
  titulo: string
  tipo: string
  area: string
  autor: string
  instituicao: string
  dataSubmissao: string
  status: StatusProjeto
  feedback?: string
}

export default function DashboardCoordenador() {
  const router = useRouter()
  const [userName, setUserName] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [projetoSelecionado, setProjetoSelecionado] = useState<Projeto | null>(null)
  const [dialogAberto, setDialogAberto] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [statusSelecionado, setStatusSelecionado] = useState<StatusProjeto>("pendente")
  const [filtroStatus, setFiltroStatus] = useState<string>("todos")
  const [termoBusca, setTermoBusca] = useState("")

  // Dados simulados de projetos
  const [projetos, setProjetos] = useState<Projeto[]>([
    {
      id: "proj-001",
      titulo: "Análise de Padrões de Manchas de Sangue com IA",
      tipo: "Artigo Completo",
      area: "Inteligência Artificial aplicada às Ciências Forenses",
      autor: "João Silva",
      instituicao: "Universidade Federal de São Paulo",
      dataSubmissao: "10/05/2025",
      status: "pendente",
    },
    {
      id: "proj-002",
      titulo: "Métodos de Extração de DNA em Amostras Degradadas",
      tipo: "Resumo Expandido",
      area: "Genética Forense e Biologia Molecular",
      autor: "Maria Oliveira",
      instituicao: "Universidade de São Paulo",
      dataSubmissao: "15/05/2025",
      status: "aprovado",
      feedback: "Trabalho bem estruturado e com metodologia adequada.",
    },
    {
      id: "proj-003",
      titulo: "Análise Forense de Dispositivos IoT",
      tipo: "Pôster",
      area: "Computação Forense e Crimes Cibernéticos",
      autor: "Pedro Santos",
      instituicao: "Instituto Federal de Tecnologia",
      dataSubmissao: "20/05/2025",
      status: "rejeitado",
      feedback: "O trabalho precisa de maior fundamentação teórica e metodologia mais detalhada.",
    },
    {
      id: "proj-004",
      titulo: "Entomologia Forense em Ambientes Aquáticos",
      tipo: "Artigo Completo",
      area: "Entomologia Forense",
      autor: "Ana Costa",
      instituicao: "Universidade Federal do Rio de Janeiro",
      dataSubmissao: "22/05/2025",
      status: "pendente",
    },
    {
      id: "proj-005",
      titulo: "Técnicas Avançadas de Identificação de Impressões Digitais",
      tipo: "Artigo Completo",
      area: "Criminalística e Ciências Forenses",
      autor: "Carlos Mendes",
      instituicao: "Instituto de Criminalística",
      dataSubmissao: "25/05/2025",
      status: "pendente",
    },
  ])

  // Verificar autenticação ao carregar a página
  useEffect(() => {
    // Simulação de verificação de autenticação
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem("concifa_user")
        if (!userData) {
          router.push("/login")
          return
        }

        const user = JSON.parse(userData)
        if (user.tipo !== "coordenador") {
          router.push("/login")
          return
        }

        setUserName(user.nome)
      } catch (error) {
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  // Função para filtrar projetos
  const projetosFiltrados = projetos.filter((projeto) => {
    // Filtrar por status
    if (filtroStatus !== "todos" && projeto.status !== filtroStatus) {
      return false
    }

    // Filtrar por termo de busca
    if (termoBusca) {
      const termoLower = termoBusca.toLowerCase()
      return (
        projeto.titulo.toLowerCase().includes(termoLower) ||
        projeto.autor.toLowerCase().includes(termoLower) ||
        projeto.area.toLowerCase().includes(termoLower) ||
        projeto.instituicao.toLowerCase().includes(termoLower)
      )
    }

    return true
  })

  // Função para obter a cor do badge baseado no status
  const getStatusColor = (status: StatusProjeto) => {
    switch (status) {
      case "aprovado":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "rejeitado":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    }
  }

  // Função para obter o ícone do status
  const getStatusIcon = (status: StatusProjeto) => {
    switch (status) {
      case "aprovado":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "rejeitado":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />
    }
  }

  // Função para abrir o diálogo de avaliação
  const abrirDialogoAvaliacao = (projeto: Projeto) => {
    setProjetoSelecionado(projeto)
    setFeedback(projeto.feedback || "")
    setStatusSelecionado(projeto.status)
    setDialogAberto(true)
  }

  // Função para salvar a avaliação
  const salvarAvaliacao = () => {
    if (!projetoSelecionado) return

    // Atualizar o projeto na lista
    const novosProjetos = projetos.map((p) => {
      if (p.id === projetoSelecionado.id) {
        return {
          ...p,
          status: statusSelecionado,
          feedback: feedback,
        }
      }
      return p
    })

    setProjetos(novosProjetos)
    setDialogAberto(false)

    toast({
      title: "Avaliação salva com sucesso!",
      description: `O projeto "${projetoSelecionado.titulo}" foi ${statusSelecionado === "aprovado" ? "aprovado" : statusSelecionado === "rejeitado" ? "rejeitado" : "marcado como pendente"}.`,
    })
  }

  // Estatísticas dos projetos
  const estatisticas = {
    total: projetos.length,
    pendentes: projetos.filter((p) => p.status === "pendente").length,
    aprovados: projetos.filter((p) => p.status === "aprovado").length,
    rejeitados: projetos.filter((p) => p.status === "rejeitado").length,
    artigosCompletos: projetos.filter((p) => p.tipo === "Artigo Completo").length,
    resumosExpandidos: projetos.filter((p) => p.tipo === "Resumo Expandido").length,
    posters: projetos.filter((p) => p.tipo === "Pôster").length,
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Dashboard do Coordenador</h1>
            <p className="text-xl text-gray-200">
              Bem-vindo(a), {userName}! Gerencie as submissões e o conteúdo do CONCIFA 2025.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="avaliacoes" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 mb-8">
                <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
                <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
                <TabsTrigger value="programacao">Programação</TabsTrigger>
                <TabsTrigger value="publicacoes">Publicações</TabsTrigger>
                <TabsTrigger value="palestrantes">Palestrantes</TabsTrigger>
                <TabsTrigger value="edicoes">Edições</TabsTrigger>
                <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
              </TabsList>

              {/* Aba de Avaliações */}
              <TabsContent value="avaliacoes">
                <Card>
                  <CardHeader>
                    <CardTitle>Avaliação de Projetos Submetidos</CardTitle>
                    <CardDescription>Analise e avalie os projetos submetidos ao CONCIFA 2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            placeholder="Buscar por título, autor, instituição..."
                            className="pl-10"
                            value={termoBusca}
                            onChange={(e) => setTermoBusca(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Filter className="h-5 w-5 text-gray-500" />
                        <select
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={filtroStatus}
                          onChange={(e) => setFiltroStatus(e.target.value)}
                        >
                          <option value="todos">Todos os status</option>
                          <option value="pendente">Pendentes</option>
                          <option value="aprovado">Aprovados</option>
                          <option value="rejeitado">Rejeitados</option>
                        </select>
                      </div>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Exportar Lista
                      </Button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50 border-b">
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Título</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Autor</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Tipo</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Data</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projetosFiltrados.length > 0 ? (
                            projetosFiltrados.map((projeto, index) => (
                              <motion.tr
                                key={projeto.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="border-b hover:bg-gray-50"
                              >
                                <td className="px-4 py-3 text-sm">
                                  <div className="font-medium">{projeto.titulo}</div>
                                  <div className="text-xs text-gray-500">{projeto.area}</div>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  <div>{projeto.autor}</div>
                                  <div className="text-xs text-gray-500">{projeto.instituicao}</div>
                                </td>
                                <td className="px-4 py-3 text-sm">{projeto.tipo}</td>
                                <td className="px-4 py-3 text-sm">{projeto.dataSubmissao}</td>
                                <td className="px-4 py-3 text-sm">
                                  <Badge className={getStatusColor(projeto.status)} variant="secondary">
                                    <span className="flex items-center gap-1">
                                      {getStatusIcon(projeto.status)}
                                      {projeto.status.charAt(0).toUpperCase() + projeto.status.slice(1)}
                                    </span>
                                  </Badge>
                                </td>
                                <td className="px-4 py-3 text-sm text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button variant="outline" size="sm">
                                      <FileText className="h-4 w-4" />
                                    </Button>
                                    <Button variant="default" size="sm" onClick={() => abrirDialogoAvaliacao(projeto)}>
                                      Avaliar
                                    </Button>
                                  </div>
                                </td>
                              </motion.tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                Nenhum projeto encontrado com os filtros selecionados.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba de Estatísticas */}
              <TabsContent value="estatisticas">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Resumo de Submissões
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-3">Status das Submissões</h3>
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Total</span>
                                <span className="text-sm font-medium">{estatisticas.total}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "100%" }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Pendentes</span>
                                <span className="text-sm font-medium">{estatisticas.pendentes}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-yellow-500 h-2.5 rounded-full"
                                  style={{ width: `${(estatisticas.pendentes / estatisticas.total) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Aprovados</span>
                                <span className="text-sm font-medium">{estatisticas.aprovados}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-green-500 h-2.5 rounded-full"
                                  style={{ width: `${(estatisticas.aprovados / estatisticas.total) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Rejeitados</span>
                                <span className="text-sm font-medium">{estatisticas.rejeitados}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-red-500 h-2.5 rounded-full"
                                  style={{ width: `${(estatisticas.rejeitados / estatisticas.total) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-3">Tipos de Trabalho</h3>
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Artigos Completos</span>
                                <span className="text-sm font-medium">{estatisticas.artigosCompletos}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-blue-600 h-2.5 rounded-full"
                                  style={{ width: `${(estatisticas.artigosCompletos / estatisticas.total) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Resumos Expandidos</span>
                                <span className="text-sm font-medium">{estatisticas.resumosExpandidos}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-purple-500 h-2.5 rounded-full"
                                  style={{ width: `${(estatisticas.resumosExpandidos / estatisticas.total) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Pôsteres</span>
                                <span className="text-sm font-medium">{estatisticas.posters}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-orange-500 h-2.5 rounded-full"
                                  style={{ width: `${(estatisticas.posters / estatisticas.total) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileSpreadsheet className="h-5 w-5" />
                        Relatórios
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-gray-500">
                          Gere relatórios detalhados sobre as submissões do CONCIFA 2025.
                        </p>

                        <div className="space-y-3">
                          <Button variant="outline" className="w-full justify-start">
                            <Download className="h-4 w-4 mr-2" />
                            Relatório Completo de Submissões
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Download className="h-4 w-4 mr-2" />
                            Relatório de Trabalhos Aprovados
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Download className="h-4 w-4 mr-2" />
                            Relatório por Área Temática
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Download className="h-4 w-4 mr-2" />
                            Relatório por Instituição
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Download className="h-4 w-4 mr-2" />
                            Estatísticas Gerais
                          </Button>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-sm font-medium mb-2">Relatório Personalizado</h3>
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="data-inicio">Data de Início</Label>
                              <Input type="date" id="data-inicio" />
                            </div>
                            <div>
                              <Label htmlFor="data-fim">Data de Fim</Label>
                              <Input type="date" id="data-fim" />
                            </div>
                            <div>
                              <Label htmlFor="tipo-relatorio">Tipo de Relatório</Label>
                              <select
                                id="tipo-relatorio"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="completo">Relatório Completo</option>
                                <option value="resumido">Relatório Resumido</option>
                                <option value="estatistico">Relatório Estatístico</option>
                              </select>
                            </div>
                            <Button className="w-full">Gerar Relatório</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Aba de Palestrantes */}
              <TabsContent value="palestrantes">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Gerenciar Palestrantes
                    </CardTitle>
                    <CardDescription>
                      Adicione e gerencie os palestrantes do CONCIFA 2025 e edições anteriores
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Palestrantes Cadastrados</h3>
                          <p className="text-gray-600">
                            Gerencie os palestrantes que participarão do evento, incluindo suas informações e biografias.
                          </p>
                        </div>
                        <div>
                          <Button onClick={() => router.push("/dashboard/coordenador/palestrantes")}>
                            Gerenciar Palestrantes
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          {
                            nome: "Dra. Ana Silva",
                            cargo: "Especialista em Ciências Forenses",
                            instituicao: "Universidade Federal de São Paulo",
                            foto: "/images/speaker-1.jpg",
                          },
                          {
                            nome: "Dr. Carlos Mendes",
                            cargo: "Pesquisador em IA Forense",
                            instituicao: "Instituto de Tecnologia",
                            foto: "/images/speaker-2.jpg",
                          },
                          {
                            nome: "Profa. Juliana Costa",
                            cargo: "Perita Criminal",
                            instituicao: "Polícia Federal",
                            foto: "/images/speaker-3.jpg",
                          },
                          {
                            nome: "Dr. Roberto Almeida",
                            cargo: "Especialista em Comportamento Criminal",
                            instituicao: "Universidade de Brasília",
                            foto: "/images/speaker-4.jpg",
                          },
                        ].map((palestrante, index) => (
                          <Card key={index} className="overflow-hidden">
                            <div className="relative h-40">
                              <Image
                                src={palestrante.foto || "/placeholder.svg"}
                                alt={palestrante.nome}
                                fill
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <CardContent className="p-4">
                              <h4 className="font-bold text-blue-900 mb-1">{palestrante.nome}</h4>
                              <p className="text-sm text-gray-700 mb-1">{palestrante.cargo}</p>
                              <p className="text-xs text-gray-500">{palestrante.instituicao}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba de Programação */}
              <TabsContent value="programacao">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Gerenciar Programação
                    </CardTitle>
                    <CardDescription>
                      Adicione, edite e organize a programação do evento que será exibida no site
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium mb-4">Dias do Evento</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                              <div>
                                <span className="font-medium">Dia 1</span> - 15/09/2025
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  Editar
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                              <div>
                                <span className="font-medium">Dia 2</span> - 16/09/2025
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  Editar
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                              <div>
                                <span className="font-medium">Dia 3</span> - 17/09/2025
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  Editar
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                              <div>
                                <span className="font-medium">Dia 4</span> - 18/09/2025
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  Editar
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button>
                              <Calendar className="h-4 w-4 mr-2" />
                              Adicionar Novo Dia
                            </Button>
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg font-medium mb-4">Atividades do Dia 1</h3>
                          <div className="space-y-3">
                            <div className="border rounded-md p-3">
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">08:00 - 09:00</span>
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="sm">
                                    Editar
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-red-500">
                                    Remover
                                  </Button>
                                </div>
                              </div>
                              <p className="font-medium">Credenciamento e Entrega de Materiais</p>
                              <p className="text-sm text-gray-500">Hall de Entrada</p>
                            </div>

                            <div className="border rounded-md p-3">
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">09:00 - 10:30</span>
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="sm">
                                    Editar
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-red-500">
                                    Remover
                                  </Button>
                                </div>
                              </div>
                              <p className="font-medium">Cerimônia de Abertura</p>
                              <p className="text-sm text-gray-500">Auditório Principal</p>
                              <p className="text-sm text-gray-500">Comissão Organizadora e Convidados</p>
                            </div>

                            <div className="border rounded-md p-3">
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">10:30 - 11:00</span>
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="sm">
                                    Editar
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-red-500">
                                    Remover
                                  </Button>
                                </div>
                              </div>
                              <p className="font-medium">Coffee Break</p>
                              <p className="text-sm text-gray-500">Área de Convivência</p>
                            </div>

                            <Button variant="outline" className="w-full">
                              Adicionar Nova Atividade
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">Adicionar Nova Atividade</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="dia-atividade">Dia do Evento</Label>
                            <select
                              id="dia-atividade"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Selecione o dia</option>
                              <option value="1">Dia 1 - 15/09/2025</option>
                              <option value="2">Dia 2 - 16/09/2025</option>
                              <option value="3">Dia 3 - 17/09/2025</option>
                              <option value="4">Dia 4 - 18/09/2025</option>
                            </select>
                          </div>
                          <div>
                            <Label htmlFor="tipo-atividade">Tipo de Atividade</Label>
                            <select
                              id="tipo-atividade"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Selecione o tipo</option>
                              <option value="palestra">Palestra</option>
                              <option value="workshop">Workshop</option>
                              <option value="mesa-redonda">Mesa Redonda</option>
                              <option value="apresentacao">Apresentação de Trabalhos</option>
                              <option value="intervalo">Intervalo</option>
                              <option value="social">Evento Social</option>
                            </select>
                          </div>
                          <div>
                            <Label htmlFor="hora-inicio">Hora de Início</Label>
                            <Input type="time" id="hora-inicio" />
                          </div>
                          <div>
                            <Label htmlFor="hora-fim">Hora de Término</Label>
                            <Input type="time" id="hora-fim" />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="titulo-atividade">Título da Atividade</Label>
                            <Input type="text" id="titulo-atividade" placeholder="Ex: Palestra Magna" />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="local-atividade">Local</Label>
                            <Input type="text" id="local-atividade" placeholder="Ex: Auditório Principal" />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="palestrante-atividade">Palestrante/Responsável (opcional)</Label>
                            <Input
                              type="text"
                              id="palestrante-atividade"
                              placeholder="Ex: Dr. Carlos Mendes (Instituto de Tecnologia)"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="descricao-atividade">Descrição (opcional)</Label>
                            <Textarea id="descricao-atividade" placeholder="Breve descrição da atividade..." rows={3} />
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button>Adicionar Atividade</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba de Publicações */}
              <TabsContent value="publicacoes">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Gerenciar Publicações
                    </CardTitle>
                    <CardDescription>
                      Adicione e gerencie publicações como anais do congresso e artigos em destaque
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Anais do Congresso</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-blue-600" />
                              <div>
                                <p className="font-medium">Anais CONCIFA 2024</p>
                                <p className="text-sm text-gray-500">156 trabalhos - Publicado em 30/10/2024</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Editar
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-500">
                                Remover
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-blue-600" />
                              <div>
                                <p className="font-medium">Anais CONCIFA 2023</p>
                                <p className="text-sm text-gray-500">142 trabalhos - Publicado em 30/10/2023</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Editar
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-500">
                                Remover
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button>
                            <FileText className="h-4 w-4 mr-2" />
                            Adicionar Novos Anais
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">Artigos em Destaque</h3>
                        <div className="space-y-3">
                          <div className="border rounded-md p-3">
                            <div className="flex justify-between mb-2">
                              <span className="font-medium">
                                Aplicação de Inteligência Artificial na Análise de Padrões de Manchas de Sangue
                              </span>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  Editar
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-500">
                                  Remover
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm">Silva, A.B.; Oliveira, C.D.; Santos, E.F.</p>
                            <p className="text-sm text-gray-500">
                              Revista Brasileira de Ciências Forenses, v.7, n.2, p.45-58, 2024
                            </p>
                          </div>

                          <div className="border rounded-md p-3">
                            <div className="flex justify-between mb-2">
                              <span className="font-medium">
                                Métodos Avançados de Extração de DNA em Amostras Degradadas: Um Estudo Comparativo
                              </span>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  Editar
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-500">
                                  Remover
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm">Pereira, M.L.; Costa, R.S.; Almeida, T.V.</p>
                            <p className="text-sm text-gray-500">
                              Revista Brasileira de Ciências Forenses, v.7, n.1, p.12-27, 2024
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button>Adicionar Novo Artigo em Destaque</Button>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">Adicionar Nova Publicação</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <Label htmlFor="tipo-publicacao">Tipo de Publicação</Label>
                            <select
                              id="tipo-publicacao"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Selecione o tipo</option>
                              <option value="anais">Anais do Congresso</option>
                              <option value="artigo">Artigo em Destaque</option>
                              <option value="revista">Edição de Revista</option>
                            </select>
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="titulo-publicacao">Título</Label>
                            <Input type="text" id="titulo-publicacao" placeholder="Título da publicação" />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="autores-publicacao">Autores (para artigos)</Label>
                            <Input
                              type="text"
                              id="autores-publicacao"
                              placeholder="Ex: Silva, A.B.; Oliveira, C.D.; Santos, E.F."
                            />
                          </div>
                          <div>
                            <Label htmlFor="data-publicacao">Data de Publicação</Label>
                            <Input type="date" id="data-publicacao" />
                          </div>
                          <div>
                            <Label htmlFor="num-trabalhos">Número de Trabalhos (para anais)</Label>
                            <Input type="number" id="num-trabalhos" placeholder="Ex: 156" />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="referencia-publicacao">Referência Bibliográfica (para artigos)</Label>
                            <Input
                              type="text"
                              id="referencia-publicacao"
                              placeholder="Ex: Revista Brasileira de Ciências Forenses, v.7, n.2, p.45-58, 2024"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="resumo-publicacao">Resumo/Abstract (para artigos)</Label>
                            <Textarea id="resumo-publicacao" placeholder="Resumo do artigo..." rows={3} />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="arquivo-publicacao">Arquivo PDF</Label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                              <div className="space-y-1 text-center">
                                {/* Conteúdo do upload de arquivo */}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="imagem-capa">Imagem de Capa (para anais e revistas)</Label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                              <div className="space-y-1 text-center">
                                {/* Conteúdo do upload de imagem */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button>Adicionar Publicação</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba de Edições */}
              <TabsContent value="edicoes">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <History className="h-5 w-5" />
                      Gerenciar Edições do CONCIFA
                    </CardTitle>
                    <CardDescription>
                      Adicione e gerencie informações sobre as edições do congresso que serão exibidas no site
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Edições Cadastradas</h3>
                        <div className="space-y-3">
                          <div className="border rounded-md overflow-hidden">
                            <div className="p-4 bg-gray-50 flex justify-between items-center">
                              <div>
                                <p className="font-medium">IX CONCIFA (2025)</p>
                                <p className="text-sm text-gray-500">São Paulo, SP - 15 a 18 de Setembro de 2025</p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  Editar
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-500">
                                  Remover
                                </Button>
                              </div>
                            </div>
                            <div className="p-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500">Tema</h4>
                                  <p>As Interfaces das Inteligências: Tecnologias, Inovações e Habilidades Comportamentais</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500">Local</h4>
                                  <p>Centro de Convenções - São Paulo, SP</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500">Participantes Esperados</h4>
                                  <p>1.500</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500">Status</h4>
                                  <Badge>Próxima Edição</Badge>
                                </div>
                              </div>
                              <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-500 mb-2">Destaques</h4>
                                <ul className="list-disc pl-5 space-y-1 text-sm">
                                  <li>Foco em inteligência artificial aplicada às ciências forenses</li>
                                  <li>Palestrantes internacionais de 10 países</li>
                                  <li>Workshops práticos sobre novas tecnologias</li>
                                  <li>Competição de inovação em ciências forenses</li>
                                </ul>
                              </div>
                              <div className="mt-4 flex flex-wrap gap-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-1" />
                                  Ver no Site
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Users className="h-4 w-4 mr-1" />
                                  Gerenciar Palestrantes
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  Gerenciar Programação
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="border rounded-md overflow-hidden">
                            <div className="p-4 bg-gray-50 flex justify-between items-center">
                              <div>
                                <p className="font-medium">VIII CONCIFA (2024)</p>
                                <p className="text-sm text-gray-500">Rio de Janeiro, RJ - 16 a 19 de Setembro de 2024</p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  Editar
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-500">
                                  Remover
                                </Button>
                              </div>
                            </div>
                            <div className="p-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500">Tema</h4>
                                  <p>Ciências Forenses na Era Digital: Desafios e Oportunidades</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500">Local</h4>
                                  <p>Centro de Convenções - Rio de Janeiro, RJ</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500">Participantes</h4>
                                  <p>1.200</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500">Status</h4>
                                  <Badge variant="outline">Concluído</Badge>
                                </div>
                              </div>
                              <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-500 mb-2">Destaques</h4>
                                <ul className="list-disc pl-5 space-y-1 text-sm">
                                  <li>Foco em crimes cibernéticos e evidências digitais</li>
                                  <li>Workshops sobre análise forense de dispositivos móveis</li>
                                  <li>Palestrantes internacionais de 8 países</li>
                                  <li>Mais de 150 trabalhos científicos apresentados</li>
                                </ul>
                              </div>
                              <div className="mt-4 flex flex-wrap gap-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-1" />
                                  Ver no Site
                                </Button>
                                <Button variant="outline" size="sm">
                                  <FileText className="h-4 w-4 mr-1" />
                                  Gerenciar Anais
                                </Button>
                                <Button variant="outline" size="sm">
                                  <ImageIcon className="h-4 w-4 mr-1" />
                                  Galeria de Fotos
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button>
                            <Calendar className="h-4 w-4 mr-2" />
                            Adicionar Nova Edição
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">Anais do Congresso</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-blue-600" />
                              <div>
                                <p className="font-medium">Anais CONCIFA 2024</p>
                                <p className="text-sm text-gray-500">156 trabalhos - Publicado em 30/10/2024</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                Visualizar
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-blue-600" />
                              <div>
                                <p className="font-medium">Anais CONCIFA 2023</p>
                                <p className="text-sm text-gray-500">142 trabalhos - Publicado em 30/10/2023</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                Visualizar
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-blue-600" />
                              <div>
                                <p className="font-medium">Anais CONCIFA 2022</p>
                                <p className="text-sm text-gray-500">128 trabalhos - Publicado em 30/10/2022</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                Visualizar
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button>
                            <FileText className="h-4 w-4 mr-2" />
                            Adicionar Novos Anais
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">Adicionar Nova Edição</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="numero-edicao">Número da Edição</Label>
                            <Input type="text" id="numero-edicao" placeholder="Ex: X" />
                          </div>
                          <div>
                            <Label htmlFor="ano-edicao">Ano</Label>
                            <Input type="text" id="ano-edicao" placeholder="Ex: 2026" />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="tema-edicao">Tema</Label>
                            <Input
                              type="text"
                              id="tema-edicao"
                              placeholder="Ex: Ciências Forenses e Sustentabilidade"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="subtema-edicao">Subtema/Descrição (opcional)</Label>
                            <Input
                              type="text"
                              id="subtema-edicao"
                              placeholder="Ex: Novas abordagens para um futuro sustentável"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cidade-edicao">Cidade</Label>
                            <Input type="text" id="cidade-edicao" placeholder="Ex: Brasília" />
                          </div>
                          <div>
                            <Label htmlFor="estado-edicao">Estado</Label>
                            <Input type="text" id="estado-edicao" placeholder="Ex: DF" />
                          </div>
                          <div>
                            <Label htmlFor="data-inicio">Data de Início</Label>
                            <Input type="date" id="data-inicio" />
                          </div>
                          <div>
                            <Label htmlFor="data-fim">Data de Término</Label>
                            <Input type="date" id="data-fim" />
                          </div>
                          <div>
                            <Label htmlFor="participantes-edicao">Número de Participantes</Label>
                            <Input type="number" id="participantes-edicao" placeholder="Ex: 1500" />
                          </div>
                          <div>
                            <Label htmlFor="local-edicao">Local do Evento</Label>
                            <Input type="text" id="local-edicao" placeholder="Ex: Centro de Convenções" />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="destaques-edicao">Destaques</Label>
                            <Textarea
                              id="destaques-edicao"
                              placeholder="Liste os principais destaques desta edição, um por linha..."
                              rows={4}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="logo-edicao">Logo da Edição</Label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                              <div className="space-y-1 text-center">
                                {/* Conteúdo do upload de logo */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </Layout>
  )
}