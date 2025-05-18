"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Layout from "@/components/layout/Layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Upload, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

// Tipos para os projetos
type StatusProjeto = "pendente" | "aprovado" | "rejeitado"

interface Projeto {
  id: string
  titulo: string
  tipo: string
  dataSubmissao: string
  status: StatusProjeto
  feedback?: string
}

export default function DashboardAluno() {
  const router = useRouter()
  const [userName, setUserName] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  // Dados simulados de projetos
  const [projetos, setProjetos] = useState<Projeto[]>([
    {
      id: "proj-001",
      titulo: "Análise de Padrões de Manchas de Sangue com IA",
      tipo: "Artigo Completo",
      dataSubmissao: "10/05/2025",
      status: "aprovado",
      feedback: "Excelente trabalho! Aprovado para apresentação oral.",
    },
    {
      id: "proj-002",
      titulo: "Métodos de Extração de DNA em Amostras Degradadas",
      tipo: "Resumo Expandido",
      dataSubmissao: "15/05/2025",
      status: "pendente",
    },
    {
      id: "proj-003",
      titulo: "Análise Forense de Dispositivos IoT",
      tipo: "Pôster",
      dataSubmissao: "20/05/2025",
      status: "rejeitado",
      feedback: "O trabalho precisa de maior fundamentação teórica e metodologia mais detalhada.",
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
        if (user.tipo !== "aluno") {
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
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Dashboard do Aluno</h1>
            <p className="text-xl text-gray-200">
              Bem-vindo(a), {userName}! Gerencie suas submissões para o CONCIFA 2025.
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="projetos" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="projetos">Meus Projetos</TabsTrigger>
                <TabsTrigger value="submeter">Submeter Projeto</TabsTrigger>
                <TabsTrigger value="perfil">Meu Perfil</TabsTrigger>
              </TabsList>

              {/* Aba de Projetos */}
              <TabsContent value="projetos">
                <Card>
                  <CardHeader>
                    <CardTitle>Meus Projetos Submetidos</CardTitle>
                    <CardDescription>
                      Acompanhe o status de todos os seus projetos submetidos ao CONCIFA 2025
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {projetos.length > 0 ? (
                      <div className="space-y-6">
                        {projetos.map((projeto, index) => (
                          <motion.div
                            key={projeto.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <Card>
                              <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                  <div>
                                    <h3 className="text-lg font-semibold">{projeto.titulo}</h3>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      <Badge variant="outline">{projeto.tipo}</Badge>
                                      <Badge variant="outline">Submetido em: {projeto.dataSubmissao}</Badge>
                                      <Badge className={getStatusColor(projeto.status)} variant="secondary">
                                        <span className="flex items-center gap-1">
                                          {getStatusIcon(projeto.status)}
                                          {projeto.status.charAt(0).toUpperCase() + projeto.status.slice(1)}
                                        </span>
                                      </Badge>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                      <FileText className="h-4 w-4 mr-1" />
                                      Visualizar
                                    </Button>
                                    {projeto.status === "rejeitado" && (
                                      <Button variant="outline" size="sm">
                                        <Upload className="h-4 w-4 mr-1" />
                                        Reenviar
                                      </Button>
                                    )}
                                  </div>
                                </div>

                                {projeto.feedback && (
                                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                                    <p className="text-sm font-medium mb-1">Feedback do Avaliador:</p>
                                    <p className="text-sm text-gray-700">{projeto.feedback}</p>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhum projeto submetido</h3>
                        <p className="text-gray-500 mb-4">
                          Você ainda não submeteu nenhum projeto para o CONCIFA 2025.
                        </p>
                        <Button>
                          <Upload className="h-4 w-4 mr-2" />
                          Submeter Projeto
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba de Submissão */}
              <TabsContent value="submeter">
                <Card>
                  <CardHeader>
                    <CardTitle>Submeter Novo Projeto</CardTitle>
                    <CardDescription>
                      Preencha o formulário abaixo para submeter um novo projeto ao CONCIFA 2025
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <AlertCircle className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">Informações Importantes</h3>
                            <div className="mt-2 text-sm text-blue-700">
                              <ul className="list-disc pl-5 space-y-1">
                                <li>O prazo final para submissão é 15 de Julho de 2025</li>
                                <li>Certifique-se de seguir as diretrizes de formatação</li>
                                <li>Arquivos devem ser enviados em formato PDF</li>
                                <li>Tamanho máximo do arquivo: 10MB</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Título do Trabalho</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Digite o título completo do seu trabalho"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Trabalho</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Selecione o tipo de trabalho</option>
                            <option value="artigo">Artigo Completo</option>
                            <option value="resumo">Resumo Expandido</option>
                            <option value="poster">Pôster</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Área Temática</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">Selecione a área temática</option>
                          <option value="medicina_legal">Medicina Legal e Perícia Médica</option>
                          <option value="criminalistica">Criminalística e Ciências Forenses</option>
                          <option value="balistica">Balística Forense</option>
                          <option value="documentoscopia">Documentoscopia e Grafoscopia</option>
                          <option value="genetica">Genética Forense e Biologia Molecular</option>
                          <option value="toxicologia">Toxicologia Forense</option>
                          <option value="computacao">Computação Forense e Crimes Cibernéticos</option>
                          <option value="psicologia">Psicologia e Psiquiatria Forense</option>
                          <option value="antropologia">Antropologia Forense</option>
                          <option value="odontologia">Odontologia Legal</option>
                          <option value="quimica">Química Forense</option>
                          <option value="entomologia">Entomologia Forense</option>
                          <option value="ia">Inteligência Artificial aplicada às Ciências Forenses</option>
                          <option value="inovacoes">Inovações Tecnológicas em Ciências Forenses</option>
                          <option value="etica">Aspectos Éticos e Legais das Ciências Forenses</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Resumo</label>
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={4}
                          placeholder="Digite um resumo do seu trabalho (máximo 500 palavras)"
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Palavras-chave</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Separe as palavras-chave por vírgula (3 a 5 palavras)"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Autores</label>
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={2}
                          placeholder="Nome completo dos autores e suas respectivas instituições"
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Arquivo do Trabalho (PDF)
                        </label>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                            <div className="flex flex-col items-center justify-center pt-7">
                              <Upload className="w-10 h-10 text-gray-400" />
                              <p className="pt-1 text-sm text-gray-600">
                                Clique para selecionar ou arraste o arquivo aqui
                              </p>
                              <p className="text-xs text-gray-500">PDF (Máx. 10MB)</p>
                            </div>
                            <input type="file" className="hidden" accept=".pdf" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-4">
                    <Button variant="outline">Salvar Rascunho</Button>
                    <Button>Submeter Trabalho</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Aba de Perfil */}
              <TabsContent value="perfil">
                <Card>
                  <CardHeader>
                    <CardTitle>Meu Perfil</CardTitle>
                    <CardDescription>Visualize e edite suas informações pessoais</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">Nome Completo</h3>
                          <p className="text-base">João Silva</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                          <p className="text-base">aluno@exemplo.com</p>
                        </div>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">Instituição</h3>
                          <p className="text-base">Universidade Federal de São Paulo</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">Cargo/Função</h3>
                          <p className="text-base">Estudante de Graduação</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">Telefone</h3>
                          <p className="text-base">(11) 98765-4321</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">Tipo de Inscrição</h3>
                          <p className="text-base">Estudante de Graduação</p>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">Alterar Senha</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Senha Atual</label>
                            <input
                              type="password"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Digite sua senha atual"
                            />
                          </div>
                          <div></div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nova Senha</label>
                            <input
                              type="password"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Digite sua nova senha"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Nova Senha</label>
                            <input
                              type="password"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Confirme sua nova senha"
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button variant="outline" size="sm">
                            Alterar Senha
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => {
                        localStorage.removeItem("concifa_user")
                        router.push("/login")
                      }}
                    >
                      Sair
                    </Button>
                    <Button>Salvar Alterações</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </Layout>
  )
}
