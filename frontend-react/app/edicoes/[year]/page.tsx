"use client"

import { Input } from "@/components/ui/input"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Layout from "@/components/layout/Layout"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, FileText, Download, ExternalLink, Clock, Eye, Search, Filter } from "lucide-react"

// Tipos para as edições
interface Palestrante {
  id: string
  nome: string
  cargo: string
  instituicao: string
  foto: string
  bio?: string
}

interface Atividade {
  id: string
  titulo: string
  tipo: string
  horario: string
  local: string
  palestrante?: string
  descricao?: string
}

interface Trabalho {
  id: string
  titulo: string
  autores: string
  tipo: string
  area: string
  resumo: string
}

interface Edicao {
  id: string
  numero: string
  ano: string
  tema: string
  subtema?: string
  cidade: string
  estado: string
  dataInicio: string
  dataFim: string
  local: string
  participantes: number
  destaques: string[]
  logo: string
  imagem: string
  palestrantes: Palestrante[]
  programacao: {
    dia: string
    data: string
    atividades: Atividade[]
  }[]
  trabalhos: Trabalho[]
}

export default function EdicaoDetalhes() {
  const params = useParams()
  const year = params.year as string
  const [edicao, setEdicao] = useState<Edicao | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simulação de carregamento de dados da edição
  useEffect(() => {
    // Aqui seria feita uma chamada à API para buscar os dados da edição
    // Simulando com dados estáticos
    setTimeout(() => {
      if (year === "2024") {
        setEdicao({
          id: "2024",
          numero: "VIII",
          ano: "2024",
          tema: "Ciências Forenses na Era Digital: Desafios e Oportunidades",
          cidade: "Rio de Janeiro",
          estado: "RJ",
          dataInicio: "2024-09-16",
          dataFim: "2024-09-19",
          local: "Centro de Convenções",
          participantes: 1200,
          destaques: [
            "Foco em crimes cibernéticos e evidências digitais",
            "Workshops sobre análise forense de dispositivos móveis",
            "Palestrantes internacionais de 8 países",
            "Mais de 150 trabalhos científicos apresentados",
          ],
          logo: "/images/concifa-2024-logo.png",
          imagem: "/images/concifa-2024.jpg",
          palestrantes: [
            {
              id: "p1",
              nome: "Dra. Ana Silva",
              cargo: "Especialista em Ciências Forenses",
              instituicao: "Universidade Federal de São Paulo",
              foto: "/images/speaker-1.jpg",
              bio: "Doutora em Ciências Forenses com mais de 15 anos de experiência em análise de vestígios biológicos.",
            },
            {
              id: "p2",
              nome: "Dr. Carlos Mendes",
              cargo: "Pesquisador em IA Forense",
              instituicao: "Instituto de Tecnologia",
              foto: "/images/speaker-2.jpg",
              bio: "Especialista em aplicação de inteligência artificial na análise de evidências digitais.",
            },
            {
              id: "p3",
              nome: "Profa. Juliana Costa",
              cargo: "Perita Criminal",
              instituicao: "Polícia Federal",
              foto: "/images/speaker-3.jpg",
              bio: "Perita criminal com foco em análise de dispositivos móveis e recuperação de dados.",
            },
            {
              id: "p4",
              nome: "Dr. Roberto Almeida",
              cargo: "Especialista em Comportamento Criminal",
              instituicao: "Universidade de Brasília",
              foto: "/images/speaker-4.jpg",
              bio: "Psicólogo forense especializado em análise comportamental e perfil criminal.",
            },
          ],
          programacao: [
            {
              dia: "Dia 1",
              data: "16/09/2024",
              atividades: [
                {
                  id: "a1",
                  titulo: "Credenciamento e Entrega de Materiais",
                  tipo: "Recepção",
                  horario: "08:00 - 09:00",
                  local: "Hall de Entrada",
                },
                {
                  id: "a2",
                  titulo: "Cerimônia de Abertura",
                  tipo: "Institucional",
                  horario: "09:00 - 10:30",
                  local: "Auditório Principal",
                  palestrante: "Comissão Organizadora e Convidados",
                },
                {
                  id: "a3",
                  titulo: "Coffee Break",
                  tipo: "Intervalo",
                  horario: "10:30 - 11:00",
                  local: "Área de Convivência",
                },
                {
                  id: "a4",
                  titulo: "Palestra Magna: O Futuro das Ciências Forenses na Era Digital",
                  tipo: "Palestra",
                  horario: "11:00 - 12:30",
                  local: "Auditório Principal",
                  palestrante: "Dr. Carlos Mendes (Instituto de Tecnologia)",
                },
              ],
            },
            {
              dia: "Dia 2",
              data: "17/09/2024",
              atividades: [
                {
                  id: "a5",
                  titulo: "Workshop: Análise Forense de Dispositivos Móveis",
                  tipo: "Workshop",
                  horario: "09:00 - 12:00",
                  local: "Sala 1",
                  palestrante: "Profa. Juliana Costa (Polícia Federal)",
                },
                {
                  id: "a6",
                  titulo: "Mesa Redonda: Desafios Éticos da IA em Investigações",
                  tipo: "Mesa Redonda",
                  horario: "14:00 - 16:00",
                  local: "Auditório Principal",
                  palestrante: "Diversos Especialistas",
                },
              ],
            },
          ],
          trabalhos: [
            {
              id: "t1",
              titulo: "Aplicação de Inteligência Artificial na Análise de Padrões de Manchas de Sangue",
              autores: "Silva, A.B.; Oliveira, C.D.; Santos, E.F.",
              tipo: "Artigo Completo",
              area: "Inteligência Artificial aplicada às Ciências Forenses",
              resumo:
                "Este estudo apresenta uma nova abordagem para análise de padrões de manchas de sangue utilizando algoritmos de inteligência artificial, demonstrando maior precisão na determinação de ângulos de impacto e origem das manchas.",
            },
            {
              id: "t2",
              titulo: "Métodos Avançados de Extração de DNA em Amostras Degradadas: Um Estudo Comparativo",
              autores: "Pereira, M.L.; Costa, R.S.; Almeida, T.V.",
              tipo: "Resumo Expandido",
              area: "Genética Forense e Biologia Molecular",
              resumo:
                "Comparação de cinco métodos de extração de DNA em amostras forenses altamente degradadas, avaliando eficiência, qualidade do DNA obtido e aplicabilidade em casos reais.",
            },
          ],
        })
      } else if (year === "2023") {
        setEdicao({
          id: "2023",
          numero: "VII",
          ano: "2023",
          tema: "Inovação e Sustentabilidade nas Ciências Forenses",
          cidade: "Belo Horizonte",
          estado: "MG",
          dataInicio: "2023-09-18",
          dataFim: "2023-09-21",
          local: "Centro de Convenções",
          participantes: 1100,
          destaques: [
            "Abordagens eco-friendly para análises forenses",
            "Simpósio sobre redução do impacto ambiental em laboratórios forenses",
            "Lançamento do Prêmio de Inovação em Ciências Forenses",
            "Parceria com universidades de 5 países",
          ],
          logo: "/images/concifa-2023-logo.png",
          imagem: "/images/concifa-2023.jpg",
          palestrantes: [
            {
              id: "p5",
              nome: "Dr. Paulo Ribeiro",
              cargo: "Especialista em Química Forense",
              instituicao: "Universidade Federal de Minas Gerais",
              foto: "/images/speaker-1.jpg",
              bio: "Pesquisador com foco em métodos sustentáveis para análises químicas forenses.",
            },
            {
              id: "p6",
              nome: "Dra. Mariana Santos",
              cargo: "Perita Ambiental",
              instituicao: "Instituto de Pesquisas Ambientais",
              foto: "/images/speaker-2.jpg",
              bio: "Especialista em perícia ambiental e análise de impactos de crimes contra o meio ambiente.",
            },
          ],
          programacao: [
            {
              dia: "Dia 1",
              data: "18/09/2023",
              atividades: [
                {
                  id: "a7",
                  titulo: "Abertura: Ciências Forenses e Sustentabilidade",
                  tipo: "Institucional",
                  horario: "09:00 - 10:30",
                  local: "Auditório Principal",
                  palestrante: "Comissão Organizadora",
                },
              ],
            },
          ],
          trabalhos: [
            {
              id: "t3",
              titulo: "Desenvolvimento de Reagentes Eco-friendly para Revelação de Impressões Digitais",
              autores: "Ribeiro, P.A.; Santos, M.C.; Oliveira, J.R.",
              tipo: "Artigo Completo",
              area: "Química Forense",
              resumo:
                "Este trabalho apresenta o desenvolvimento de reagentes biodegradáveis para revelação de impressões digitais latentes, com eficácia comparável aos reagentes tradicionais e menor impacto ambiental.",
            },
          ],
        })
      } else {
        // Edição não encontrada
        setEdicao(null)
      }
      setIsLoading(false)
    }, 1000)
  }, [year])

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    )
  }

  if (!edicao) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Edição não encontrada</h1>
            <p className="text-gray-600 mb-8">
              A edição do CONCIFA que você está procurando não foi encontrada ou ainda não está disponível.
            </p>
            <Link href="/edicoes">
              <Button>Ver Todas as Edições</Button>
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(30, 58, 138, 0.9), rgba(124, 58, 237, 0.9)), url(${edicao.imagem})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={edicao.logo || "/placeholder.svg?height=200&width=200"}
                    alt={`CONCIFA ${edicao.ano}`}
                    width={200}
                    height={200}
                    className="mx-auto"
                  />
                </motion.div>
              </div>
              <div className="md:w-2/3 text-center md:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h1 className="text-4xl font-bold mb-2">
                    {edicao.numero} CONCIFA ({edicao.ano})
                  </h1>
                  <h2 className="text-2xl font-light mb-6">{edicao.tema}</h2>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center md:justify-start mb-6">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-blue-300" />
                      <span>
                        {new Date(edicao.dataInicio).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}{" "}
                        a{" "}
                        {new Date(edicao.dataFim).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-blue-300" />
                      <span>
                        {edicao.cidade}, {edicao.estado}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-blue-300" />
                      <span>{edicao.participantes} participantes</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <Button variant="default">
                      <FileText className="h-4 w-4 mr-2" />
                      Anais do Congresso
                    </Button>
                    <Button variant="outline" className="bg-white/10">
                      <Download className="h-4 w-4 mr-2" />
                      Certificados
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="sobre" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="sobre">Sobre</TabsTrigger>
                <TabsTrigger value="palestrantes">Palestrantes</TabsTrigger>
                <TabsTrigger value="programacao">Programação</TabsTrigger>
                <TabsTrigger value="trabalhos">Trabalhos</TabsTrigger>
              </TabsList>

              {/* Aba Sobre */}
              <TabsContent value="sobre">
                <Card>
                  <CardHeader>
                    <CardTitle>Sobre a {edicao.numero} Edição</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Tema</h3>
                        <p className="text-gray-700">{edicao.tema}</p>
                        {edicao.subtema && <p className="text-gray-700 mt-2">{edicao.subtema}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">Local</h3>
                          <p className="text-gray-900">
                            {edicao.local}
                            <br />
                            {edicao.cidade}, {edicao.estado}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">Data</h3>
                          <p className="text-gray-900">
                            {new Date(edicao.dataInicio).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                            })}{" "}
                            a{" "}
                            {new Date(edicao.dataFim).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">Participantes</h3>
                          <p className="text-gray-900">{edicao.participantes}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-3">Destaques</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {edicao.destaques.map((destaque, index) => (
                            <li key={index} className="text-gray-700">
                              {destaque}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-3">Anais do Congresso</h3>
                        <div className="flex items-center gap-4">
                          <Image
                            src="/images/anais-2024.jpg"
                            alt={`Anais CONCIFA ${edicao.ano}`}
                            width={100}
                            height={140}
                            className="rounded-md shadow-md"
                          />
                          <div>
                            <h4 className="font-medium">Anais CONCIFA {edicao.ano}</h4>
                            <p className="text-sm text-gray-500 mb-3">
                              Publicado em 30/10/{edicao.ano} • ISSN: 2966-425X
                            </p>
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
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-3">Galeria de Fotos</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="relative h-32 rounded-md overflow-hidden">
                              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                                <Image
                                  src={`/images/concifa-${edicao.ano}.jpg`}
                                  alt={`Foto ${i} CONCIFA ${edicao.ano}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 text-center">
                          <Button variant="outline">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Ver Galeria Completa
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba Palestrantes */}
              <TabsContent value="palestrantes">
                <Card>
                  <CardHeader>
                    <CardTitle>Palestrantes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {edicao.palestrantes.map((palestrante) => (
                        <motion.div
                          key={palestrante.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          viewport={{ once: true }}
                        >
                          <Card className="overflow-hidden h-full">
                            <div className="relative h-64">
                              <Image
                                src={palestrante.foto || "/placeholder.svg"}
                                alt={palestrante.nome}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <CardContent className="p-6">
                              <h3 className="text-xl font-bold mb-1 text-blue-900">{palestrante.nome}</h3>
                              <p className="text-gray-700 mb-1">{palestrante.cargo}</p>
                              <p className="text-gray-500 text-sm mb-3">{palestrante.instituicao}</p>
                              {palestrante.bio && <p className="text-sm text-gray-600">{palestrante.bio}</p>}
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba Programação */}
              <TabsContent value="programacao">
                <Card>
                  <CardHeader>
                    <CardTitle>Programação</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {edicao.programacao.map((dia, index) => (
                        <div key={index}>
                          <div className="bg-blue-50 p-4 rounded-lg mb-6">
                            <h2 className="text-xl font-bold text-blue-900 mb-1">{dia.dia}</h2>
                            <p className="text-gray-700">{dia.data}</p>
                          </div>

                          <div className="space-y-4">
                            {dia.atividades.map((atividade) => (
                              <motion.div
                                key={atividade.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                viewport={{ once: true }}
                              >
                                <Card>
                                  <CardContent className="p-0">
                                    <div className="flex flex-col md:flex-row">
                                      <div className="bg-blue-100 p-4 md:w-1/4 flex flex-col justify-center items-center text-center">
                                        <Clock className="h-5 w-5 text-blue-700 mb-2" />
                                        <span className="text-blue-900 font-medium">{atividade.horario}</span>
                                      </div>
                                      <div className="p-4 md:w-3/4">
                                        <div className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded mb-2">
                                          {atividade.tipo}
                                        </div>
                                        <h3 className="text-lg font-bold mb-2">{atividade.titulo}</h3>
                                        <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 gap-y-1 gap-x-4">
                                          <div className="flex items-center">
                                            <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                                            {atividade.local}
                                          </div>
                                          {atividade.palestrante && (
                                            <div className="flex items-center">
                                              <Users className="h-4 w-4 mr-1 text-gray-400" />
                                              {atividade.palestrante}
                                            </div>
                                          )}
                                        </div>
                                        {atividade.descricao && (
                                          <p className="mt-2 text-sm text-gray-600">{atividade.descricao}</p>
                                        )}
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba Trabalhos */}
              <TabsContent value="trabalhos">
                <Card>
                  <CardHeader>
                    <CardTitle>Trabalhos Apresentados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input placeholder="Buscar por título, autor, área..." className="pl-10" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Filter className="h-5 w-5 text-gray-500" />
                          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="todos">Todos os tipos</option>
                            <option value="artigo">Artigos Completos</option>
                            <option value="resumo">Resumos Expandidos</option>
                            <option value="poster">Pôsteres</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {edicao.trabalhos.map((trabalho) => (
                          <motion.div
                            key={trabalho.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                          >
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-xl">{trabalho.titulo}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="flex flex-wrap gap-2 mb-3">
                                  <Badge variant="outline">{trabalho.tipo}</Badge>
                                  <Badge variant="outline">{trabalho.area}</Badge>
                                </div>
                                <p className="text-gray-700 mb-1">
                                  <span className="font-medium">Autores:</span> {trabalho.autores}
                                </p>
                                <p className="text-gray-700 mt-3">{trabalho.resumo}</p>
                                <div className="mt-4 flex justify-end">
                                  <Button variant="outline" size="sm">
                                    <FileText className="h-4 w-4 mr-1" />
                                    Ver Trabalho Completo
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>

                      <div className="flex justify-center mt-8">
                        <Button>
                          <FileText className="h-4 w-4 mr-2" />
                          Ver Todos os Trabalhos nos Anais
                        </Button>
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
