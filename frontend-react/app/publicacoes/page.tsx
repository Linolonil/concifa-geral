"use client"

import Layout from "@/components/layout/Layout"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { FileText, Download, ExternalLink, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Publicacoes() {
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

      {/* Anais do Congresso */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Anais do Congresso</h2>
            <p className="text-gray-600">
              Acesse os trabalhos completos apresentados nas edições anteriores do CONCIFA
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { year: "2024", edition: "VIII", papers: 156, image: "/images/anais-2024.jpg" },
              { year: "2023", edition: "VII", papers: 142, image: "/images/anais-2023.jpg" },
              { year: "2022", edition: "VI", papers: 128, image: "/images/anais-2022.jpg" },
              { year: "2021", edition: "V", papers: 115, image: "/images/anais-2021.jpg" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={`Anais ${item.year}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-xl font-bold">Anais {item.year}</h3>
                      <p>
                        {item.edition} Edição • {item.papers} trabalhos
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex justify-between">
                  <Link href={`/publicacoes/anais-${item.year}`}>
                    <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                      <Search className="h-4 w-4 mr-1" />
                      Visualizar
                    </button>
                  </Link>
                  <Link href={`/downloads/anais-concifa-${item.year}.pdf`}>
                    <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/publicacoes/anais">
              <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                Ver Todos os Anais
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Revista Científica */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <h2 className="text-3xl font-bold mb-6 text-blue-900">Revista Brasileira de Ciências Forenses</h2>
                <p className="text-gray-700 mb-4">
                  A Revista Brasileira de Ciências Forenses (RBCF) é uma publicação científica semestral vinculada ao
                  CONCIFA, que publica artigos originais, revisões e comunicações breves nas diversas áreas das ciências
                  forenses.
                </p>
                <p className="text-gray-700 mb-4">
                  Com classificação Qualis B2 e indexada em importantes bases de dados nacionais e internacionais, a
                  RBCF é um importante veículo para divulgação da produção científica na área forense.
                </p>
                <p className="text-gray-700 mb-6">
                  Os melhores trabalhos apresentados no CONCIFA são convidados para publicação em edições especiais da
                  revista.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="https://revista.concifa.com.br">
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Acessar Revista
                    </button>
                  </Link>
                  <Link href="/publicacoes/diretrizes-autores">
                    <button className="flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                      <FileText className="h-4 w-4 mr-2" />
                      Diretrizes para Autores
                    </button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { volume: "Vol. 8, N. 1", date: "Jan-Jun 2025", image: "/images/revista-2025-1.jpg" },
                    { volume: "Vol. 7, N. 2", date: "Jul-Dez 2024", image: "/images/revista-2024-2.jpg" },
                    { volume: "Vol. 7, N. 1", date: "Jan-Jun 2024", image: "/images/revista-2024-1.jpg" },
                    { volume: "Vol. 6, N. 2", date: "Jul-Dez 2023", image: "/images/revista-2023-2.jpg" },
                  ].map((item, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden shadow-md group">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.volume}
                        width={200}
                        height={280}
                        className="w-full h-auto"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                        <div className="p-3 text-white w-full">
                          <p className="font-bold">{item.volume}</p>
                          <p className="text-sm">{item.date}</p>
                          <Link href={`/publicacoes/revista/${item.volume.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}>
                            <button className="mt-2 w-full text-center text-xs bg-white text-blue-900 py-1 rounded">
                              Ver Artigos
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Artigos em Destaque */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Artigos em Destaque</h2>
            <p className="text-gray-600">Conheça alguns dos trabalhos mais relevantes publicados recentemente</p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                title: "Aplicação de Inteligência Artificial na Análise de Padrões de Manchas de Sangue",
                authors: "Silva, A.B.; Oliveira, C.D.; Santos, E.F.",
                journal: "Revista Brasileira de Ciências Forenses, v.7, n.2, p.45-58, 2024",
                abstract:
                  "Este estudo apresenta uma nova abordagem para análise de padrões de manchas de sangue utilizando algoritmos de inteligência artificial, demonstrando maior precisão na determinação de ângulos de impacto e origem das manchas.",
              },
              {
                title: "Métodos Avançados de Extração de DNA em Amostras Degradadas: Um Estudo Comparativo",
                authors: "Pereira, M.L.; Costa, R.S.; Almeida, T.V.",
                journal: "Revista Brasileira de Ciências Forenses, v.7, n.1, p.12-27, 2024",
                abstract:
                  "Comparação de cinco métodos de extração de DNA em amostras forenses altamente degradadas, avaliando eficiência, qualidade do DNA obtido e aplicabilidade em casos reais.",
              },
              {
                title: "Análise Forense de Dispositivos IoT: Desafios e Soluções",
                authors: "Mendes, C.A.; Ferreira, L.M.; Rodrigues, P.S.",
                journal: "Anais do VIII CONCIFA, p.78-92, 2024",
                abstract:
                  "Investigação dos desafios enfrentados na análise forense de dispositivos da Internet das Coisas (IoT) e proposição de um framework metodológico para coleta e análise de evidências digitais nesses dispositivos.",
              },
              {
                title: "Entomologia Forense em Ambientes Aquáticos: Estudo de Caso no Rio Tietê",
                authors: "Lima, J.P.; Souza, A.C.; Martins, B.R.",
                journal: "Anais do VIII CONCIFA, p.123-135, 2024",
                abstract:
                  "Estudo sobre a sucessão entomológica em cadáveres submersos no Rio Tietê, identificando espécies indicadoras e estabelecendo parâmetros para estimativa do intervalo pós-morte em ambientes aquáticos poluídos.",
              },
            ].map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <h3 className="text-xl font-bold text-blue-900">{article.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-1">
                      <span className="font-medium">Autores:</span> {article.authors}
                    </p>
                    <p className="text-gray-600 text-sm mb-3">
                      <span className="font-medium">Publicação:</span> {article.journal}
                    </p>
                    <p className="text-gray-700">{article.abstract}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href="#">
                      <Button variant="ghost" className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        Ler Artigo Completo
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
