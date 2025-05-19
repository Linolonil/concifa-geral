"use client"

import Layout from "@/components/layout/Layout"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Users, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Edicoes() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Edições Anteriores</h1>
            <p className="text-xl text-gray-200">Conheça a história e os destaques das edições passadas do CONCIFA</p>
          </div>
        </div>
      </section>

      {/* Edição Atual */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="lg:w-1/3">
                    <Image
                      src="/images/concifa-2025-logo.png"
                      alt="CONCIFA 2025"
                      width={300}
                      height={300}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="lg:w-2/3">
                    <Badge className="mb-4">Edição Atual</Badge>
                    <h2 className="text-3xl font-bold mb-4 text-blue-900">IX CONCIFA (2025)</h2>
                    <h3 className="text-xl font-medium mb-4 text-purple-800">
                      As Interfaces das Inteligências: Tecnologias, Inovações e Habilidades Comportamentais
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">15 a 18 de Setembro de 2025</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">São Paulo, SP</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">Expectativa: 1.500 participantes</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6">
                      A IX edição do CONCIFA abordará as interseções entre inteligência artificial, ciências forenses e
                      comportamento humano, explorando como essas interfaces estão transformando a investigação criminal
                      e a análise forense.
                    </p>

                    <Link href="/">
                      <Button>Saiba Mais</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Edições Anteriores */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Histórico de Edições</h2>
            <p className="text-gray-600">Relembre os temas, locais e destaques das edições anteriores do CONCIFA</p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-12">
            {[
              {
                year: "2024",
                edition: "VIII",
                theme: "Ciências Forenses na Era Digital: Desafios e Oportunidades",
                location: "Rio de Janeiro, RJ",
                date: "16 a 19 de Setembro de 2024",
                participants: "1.200 participantes",
                highlights: [
                  "Foco em crimes cibernéticos e evidências digitais",
                  "Workshops sobre análise forense de dispositivos móveis",
                  "Palestrantes internacionais de 8 países",
                  "Mais de 150 trabalhos científicos apresentados",
                ],
                image: "/images/concifa-2024.jpg",
              },
              {
                year: "2023",
                edition: "VII",
                theme: "Inovação e Sustentabilidade nas Ciências Forenses",
                location: "Belo Horizonte, MG",
                date: "18 a 21 de Setembro de 2023",
                participants: "1.100 participantes",
                highlights: [
                  "Abordagens eco-friendly para análises forenses",
                  "Simpósio sobre redução do impacto ambiental em laboratórios forenses",
                  "Lançamento do Prêmio de Inovação em Ciências Forenses",
                  "Parceria com universidades de 5 países",
                ],
                image: "/images/concifa-2023.jpg",
              },
              {
                year: "2022",
                edition: "VI",
                theme: "Ciências Forenses e Saúde Pública: Interfaces e Colaborações",
                location: "Brasília, DF",
                date: "19 a 22 de Setembro de 2022",
                participants: "950 participantes",
                highlights: [
                  "Parceria com profissionais da área de saúde",
                  "Discussões sobre o papel das ciências forenses durante a pandemia",
                  "Mesa redonda sobre medicina legal e saúde pública",
                  "Visitas técnicas ao Instituto Nacional de Criminalística",
                ],
                image: "/images/concifa-2022.jpg",
              },
              {
                year: "2021",
                edition: "V",
                theme: "Ciências Forenses em Tempos de Pandemia",
                location: "Evento Online",
                date: "20 a 23 de Setembro de 2021",
                participants: "1.500 participantes",
                highlights: [
                  "Primeiro evento totalmente virtual",
                  "Participantes de 12 países",
                  "Palestras sobre adaptação dos procedimentos forenses durante a pandemia",
                  "Workshops online sobre novas tecnologias forenses",
                ],
                image: "/images/concifa-2021.jpg",
              },
            ].map((edition, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/3 relative">
                    <Image
                      src={edition.image || "/placeholder.svg"}
                      alt={`CONCIFA ${edition.year}`}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 bg-blue-900/80 text-white py-2 px-4">
                      <div className="text-2xl font-bold">{edition.edition} Edição</div>
                      <div>{edition.year}</div>
                    </div>
                  </div>
                  <div className="lg:w-2/3 p-6">
                    <h3 className="text-2xl font-bold mb-2 text-blue-900">{edition.theme}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{edition.date}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{edition.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{edition.participants}</span>
                      </div>
                    </div>

                    <h4 className="font-bold mb-2">Destaques:</h4>
                    <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
                      {edition.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-3">
                      <Link href={`/edicoes/${edition.year.toLowerCase()}`}>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                          Ver Detalhes
                        </button>
                      </Link>
                      <Link href={`/publicacoes/anais-${edition.year}`}>
                        <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                          Acessar Anais
                        </button>
                      </Link>
                      <Link href={`https://galeria.concifa.com.br/${edition.year.toLowerCase()}`}>
                        <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Galeria de Fotos
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Linha do Tempo */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Linha do Tempo CONCIFA</h2>
            <p className="text-gray-600">
              A evolução do Congresso Científico da FAMETRO ao longo dos anos
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>

            {[
              {
                year: "2017",
                title: "I CONCIFA - Fundação",
                description:
                  "Primeira edição realizada em São Paulo com 300 participantes, focada em estabelecer as bases para um congresso nacional de ciências forenses.",
                location: "São Paulo, SP",
              },
              {
                year: "2018",
                title: "II CONCIFA - Consolidação",
                description:
                  "Segunda edição com 450 participantes, ampliando o escopo para incluir mais áreas das ciências forenses.",
                location: "Campinas, SP",
              },
              {
                year: "2019",
                title: "III CONCIFA - Expansão",
                description: "Terceira edição com 600 participantes e primeiros palestrantes internacionais.",
                location: "Porto Alegre, RS",
              },
              {
                year: "2020",
                title: "IV CONCIFA - Adaptação",
                description:
                  "Quarta edição realizada em formato híbrido devido à pandemia, com 800 participantes online e presenciais.",
                location: "Formato Híbrido - Curitiba, PR",
              },
              {
                year: "2021",
                title: "V CONCIFA - Virtualização",
                description: "Quinta edição totalmente virtual, alcançando 1.500 participantes de diversos países.",
                location: "Evento Online",
              },
              {
                year: "2022",
                title: "VI CONCIFA - Retomada",
                description: "Sexta edição com retorno ao formato presencial, com 950 participantes.",
                location: "Brasília, DF",
              },
              {
                year: "2023",
                title: "VII CONCIFA - Inovação",
                description: "Sétima edição com foco em sustentabilidade e inovação, reunindo 1.100 participantes.",
                location: "Belo Horizonte, MG",
              },
              {
                year: "2024",
                title: "VIII CONCIFA - Era Digital",
                description: "Oitava edição focada nos desafios digitais, com 1.200 participantes.",
                location: "Rio de Janeiro, RJ",
              },
              {
                year: "2025",
                title: "IX CONCIFA - Inteligências",
                description: "Nona edição abordando as interfaces entre diferentes formas de inteligência.",
                location: "São Paulo, SP",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative mb-12 ${index % 2 === 0 ? "pr-12 md:pr-0 md:mr-auto md:ml-0 md:text-right md:pl-8" : "pl-12 md:pl-0 md:ml-auto md:mr-0 md:text-left md:pr-8"} md:w-5/12`}
              >
                <div className="bg-white p-4 rounded-lg shadow-md">
                  
                  <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded text-sm inline-block mb-2">
                    {item.year}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <div className="flex items-center text-sm text-gray-500 justify-end md:justify-start">
                    <MapPin className="h-4 w-4 mr-1" />
                    {item.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
