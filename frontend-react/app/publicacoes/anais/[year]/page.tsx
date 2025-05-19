"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Layout from "@/components/layout/Layout"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Search, Filter, ExternalLink, BookOpen } from "lucide-react"

// Tipos para os anais
interface Trabalho {
  id: string
  titulo: string
  autores: string
  tipo: string
  area: string
  paginas: string
  resumo: string
  palavrasChave: string[]
}

interface Anais {
  id: string
  ano: string
  edicao: string
  titulo: string
  issn: string
  dataPublicacao: string
  numTrabalhos: number
  capa: string
  trabalhos: Trabalho[]
}

export default function AnaisDetalhes() {
  const params = useParams()
  const year = params.year as string
  const [anais, setAnais] = useState<Anais | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [termoBusca, setTermoBusca] = useState("")
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [filtroArea, setFiltroArea] = useState("todas")

  // Simulação de carregamento de dados dos anais
  useEffect(() => {
    // Aqui seria feita uma chamada à API para buscar os dados dos anais
    // Simulando com dados estáticos
    setTimeout(() => {
      if (year === "2024") {
        setAnais({
          id: "anais-2024",
          ano: "2024",
          edicao: "VIII",
          titulo: "Anais do VIII Congresso Científico da FAMETRO",
          issn: "2966-425X",
          dataPublicacao: "2024-10-30",
          numTrabalhos: 156,
          capa: "/images/anais-2024.jpg",
          trabalhos: [
            {
              id: "t1",
              titulo: "Aplicação de Inteligência Artificial na Análise de Padrões de Manchas de Sangue",
              autores: "Silva, A.B.; Oliveira, C.D.; Santos, E.F.",
              tipo: "Artigo Completo",
              area: "Inteligência Artificial aplicada às Ciências Forenses",
              paginas: "45-58",
              resumo:
                "Este estudo apresenta uma nova abordagem para análise de padrões de manchas de sangue utilizando algoritmos de inteligência artificial, demonstrando maior precisão na determinação de ângulos de impacto e origem das manchas.",
              palavrasChave: ["Inteligência Artificial", "Manchas de Sangue", "Análise Forense", "Algoritmos"],
            },
            {
              id: "t2",
              titulo: "Métodos Avançados de Extração de DNA em Amostras Degradadas: Um Estudo Comparativo",
              autores: "Pereira, M.L.; Costa, R.S.; Almeida, T.V.",
              tipo: "Resumo Expandido",
              area: "Genética Forense e Biologia Molecular",
              paginas: "59-65",
              resumo:
                "Comparação de cinco métodos de extração de DNA em amostras forenses altamente degradadas, avaliando eficiência, qualidade do DNA obtido e aplicabilidade em casos reais.",
              palavrasChave: ["DNA Degradado", "Extração de DNA", "Genética Forense", "Amostras Biológicas"],
            },
            {
              id: "t3",
              titulo: "Análise Forense de Dispositivos IoT: Desafios e Soluções",
              autores: "Mendes, C.A.; Ferreira, L.M.; Rodrigues, P.S.",
              tipo: "Artigo Completo",
              area: "Computação Forense e Crimes Cibernéticos",
              paginas: "78-92",
              resumo:
                "Investigação dos desafios enfrentados na análise forense de dispositivos da Internet das Coisas (IoT) e proposição de um framework metodológico para coleta e análise de evidências digitais nesses dispositivos.",
              palavrasChave: ["IoT", "Computação Forense", "Evidências Digitais", "Crimes Cibernéticos"],
            },
            {
              id: "t4",
              titulo: "Entomologia Forense em Ambientes Aquáticos: Estudo de Caso no Rio Tietê",
              autores: "Lima, J.P.; Souza, A.C.; Martins, B.R.",
              tipo: "Pôster",
              area: "Entomologia Forense",
              paginas: "123-125",
              resumo:
                "Estudo sobre a sucessão entomológica em cadáveres submersos no Rio Tietê, identificando espécies indicadoras e estabelecendo parâmetros para estimativa do intervalo pós-morte em ambientes aquáticos poluídos.",
              palavrasChave: ["Entomologia Forense", "Ambientes Aquáticos", "Intervalo Pós-morte", "Insetos Aquáticos"],
            },
          ],
        })
      } else if (year === "2023") {
        setAnais({
          id: "anais-2023",
          ano: "2023",
          edicao: "VII",
          titulo: "Anais do VII Congresso Científico da FAMETRO",
          issn: "2966-425X",
          dataPublicacao: "2023-10-30",
          numTrabalhos: 142,
          capa: "/images/anais-2023.jpg",
          trabalhos: [
            {
              id: "t5",
              titulo: "Desenvolvimento de Reagentes Eco-friendly para Revelação de Impressões Digitais",
              autores: "Ribeiro, P.A.; Santos, M.C.; Oliveira, J.R.",
              tipo: "Artigo Completo",
              area: "Química Forense",
              paginas: "32-45",
              resumo:
                "Este trabalho apresenta o desenvolvimento de reagentes biodegradáveis para revelação de impressões digitais latentes, com eficácia comparável aos reagentes tradicionais e menor impacto ambiental.",
              palavrasChave: ["Impressões Digitais", "Reagentes Biodegradáveis", "Química Forense", "Sustentabilidade"],
            },
            {
              id: "t6",
              titulo: "Análise Comparativa de Métodos de Identificação Facial em Vídeos de Baixa Resolução",
              autores: "Alves, R.T.; Pereira, S.M.; Gomes, F.L.",
              tipo: "Resumo Expandido",
              area: "Computação Forense e Crimes Cibernéticos",
              paginas: "67-72",
              resumo:
                "Comparação de algoritmos de reconhecimento facial aplicados a vídeos de baixa resolução, avaliando precisão, taxa de falsos positivos e aplicabilidade em investigações criminais.",
              palavrasChave: ["Reconhecimento Facial", "Vídeos de Baixa Resolução", "Computação Forense", "Algoritmos"],
            },
          ],
        })
      } else {
        // Anais não encontrados
        setAnais(null)
      }
      setIsLoading(false)
    }, 1000)
  }, [year])

  // Filtrar trabalhos com base nos critérios de busca
  const trabalhosFiltrados = anais?.trabalhos.filter((trabalho) => {
    // Filtrar por termo de busca
    if (termoBusca) {
      const termoLower = termoBusca.toLowerCase()
      const tituloMatch = trabalho.titulo.toLowerCase().includes(termoLower)
      const autoresMatch = trabalho.autores.toLowerCase().includes(termoLower)
      const resumoMatch = trabalho.resumo.toLowerCase().includes(termoLower)
      const palavrasChaveMatch = trabalho.palavrasChave.some((palavra) => palavra.toLowerCase().includes(termoLower))

      if (!(tituloMatch || autoresMatch || resumoMatch || palavrasChaveMatch)) {
        return false
      }
    }

    // Filtrar por tipo
    if (filtroTipo !== "todos" && trabalho.tipo !== filtroTipo) {
      return false
    }

    // Filtrar por área
    if (filtroArea !== "todas" && trabalho.area !== filtroArea) {
      return false
    }

    return true
  })

  // Obter áreas únicas para o filtro
  const areasUnicas = anais?.trabalhos ? Array.from(new Set(anais.trabalhos.map((trabalho) => trabalho.area))) : []

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    )
  }

  if (!anais) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Anais não encontrados</h1>
            <p className="text-gray-600 mb-8">
              Os anais do CONCIFA que você está procurando não foram encontrados ou ainda não estão disponíveis.
            </p>
            <Link href="/publicacoes">
              <Button>Ver Todas as Publicações</Button>
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <Image
                    src={anais.capa || "/placeholder.svg"}
                    alt={anais.titulo}
                    width={250}
                    height={350}
                    className="rounded-lg shadow-xl mx-auto"
                  />
                </motion.div>
              </div>
              <div className="md:w-2/3 text-center md:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h1 className="text-3xl font-bold mb-2">{anais.titulo}</h1>
                  <p className="text-xl text-gray-200 mb-4">
                    {anais.edicao} Edição • {anais.numTrabalhos} trabalhos
                  </p>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center md:justify-start mb-6">
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-blue-300" />
                      <span>ISSN: {anais.issn}</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-blue-300" />
                      <span>
                        Publicado em{" "}
                        {new Date(anais.dataPublicacao).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <Button variant="default">
                      <Download className="h-4 w-4 mr-2" />
                      Download Completo
                    </Button>
                    <Button variant="outline" className="bg-white/10">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Citar Publicação
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
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Sobre esta Publicação</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Os Anais do {anais.edicao} Congresso Científico da FAMETRO (CONCIFA {anais.ano})
                  reúnem os trabalhos científicos apresentados durante o evento, realizado em{" "}
                  {anais.ano === "2024" ? "Rio de Janeiro" : "Belo Horizonte"} de{" "}
                  {anais.ano === "2024" ? "16 a 19" : "18 a 21"} de setembro de {anais.ano}.
                </p>
                <p className="text-gray-700 mb-4">
                  Esta publicação contém {anais.numTrabalhos} trabalhos, incluindo artigos completos, resumos expandidos
                  e pôsteres, abrangendo diversas áreas das ciências forenses e campos relacionados, com foco no tema
                  central do evento:{" "}
                  {anais.ano === "2024"
                    ? "Ciências Forenses na Era Digital: Desafios e Oportunidades"
                    : "Inovação e Sustentabilidade nas Ciências Forenses"}
                  .
                </p>
                <p className="text-gray-700">
                  Todos os trabalhos passaram por processo de revisão por pares, garantindo a qualidade e relevância do
                  conteúdo publicado.
                </p>
              </CardContent>
            </Card>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Trabalhos Publicados</h2>

              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Buscar por título, autor, palavras-chave..."
                      className="pl-10"
                      value={termoBusca}
                      onChange={(e) => setTermoBusca(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-gray-500" />
                    <select
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={filtroTipo}
                      onChange={(e) => setFiltroTipo(e.target.value)}
                    >
                      <option value="todos">Todos os tipos</option>
                      <option value="Artigo Completo">Artigos Completos</option>
                      <option value="Resumo Expandido">Resumos Expandidos</option>
                      <option value="Pôster">Pôsteres</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-gray-500" />
                    <select
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={filtroArea}
                      onChange={(e) => setFiltroArea(e.target.value)}
                    >
                      <option value="todas">Todas as áreas</option>
                      {areasUnicas.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {trabalhosFiltrados && trabalhosFiltrados.length > 0 ? (
                  trabalhosFiltrados.map((trabalho) => (
                    <motion.div
                      key={trabalho.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-2 text-blue-900">{trabalho.titulo}</h3>
                          <p className="text-gray-700 mb-3">
                            <span className="font-medium">Autores:</span> {trabalho.autores}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge variant="outline">{trabalho.tipo}</Badge>
                            <Badge variant="outline">{trabalho.area}</Badge>
                            <Badge variant="outline">Páginas: {trabalho.paginas}</Badge>
                          </div>
                          <p className="text-gray-700 mb-3">{trabalho.resumo}</p>
                          <div className="mb-4">
                            <span className="text-sm font-medium text-gray-500">Palavras-chave: </span>
                            <span className="text-sm text-gray-700">{trabalho.palavrasChave.join(", ")}</span>
                          </div>
                          <div className="flex justify-end">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-1" />
                              Ler Trabalho Completo
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhum trabalho encontrado</h3>
                    <p className="text-gray-500">
                      Não foram encontrados trabalhos com os critérios de busca selecionados.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-500 mb-4">Para citar esta publicação, utilize o seguinte formato:</p>
              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 mb-6">
                <p>
                  CONCIFA - Congresso Científico da FAMETRO. <strong>{anais.titulo}</strong>.{" "}
                  {anais.ano === "2024" ? "Rio de Janeiro" : "Belo Horizonte"}: CONCIFA, {anais.ano}. ISSN: {anais.issn}
                  .
                </p>
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download da Referência Bibliográfica
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
