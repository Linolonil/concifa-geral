"use client"

import Layout from "@/components/layout/Layout"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, MapPin, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function Programacao() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Programação</h1>
            <p className="text-xl text-gray-200">Confira a programação completa do CONCIFA 2025</p>
          </div>
        </div>
      </section>

      {/* Programação por Dia */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="dia1" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="dia1">Dia 1 (15/09)</TabsTrigger>
                <TabsTrigger value="dia2">Dia 2 (16/09)</TabsTrigger>
                <TabsTrigger value="dia3">Dia 3 (17/09)</TabsTrigger>
                <TabsTrigger value="dia4">Dia 4 (18/09)</TabsTrigger>
              </TabsList>

              <TabsContent value="dia1" className="space-y-8">
                <div className="bg-blue-50 p-4 rounded-lg mb-8">
                  <h2 className="text-xl font-bold text-blue-900 mb-2">Segunda-feira, 15 de Setembro de 2025</h2>
                  <p className="text-gray-700">Tema do dia: Abertura e Panorama das Ciências Forenses</p>
                </div>

                {[
                  {
                    time: "08:00 - 09:00",
                    title: "Credenciamento e Entrega de Materiais",
                    type: "Recepção",
                    location: "Hall de Entrada",
                  },
                  {
                    time: "09:00 - 10:30",
                    title: "Cerimônia de Abertura",
                    type: "Institucional",
                    location: "Auditório Principal",
                    speaker: "Comissão Organizadora e Convidados",
                  },
                  {
                    time: "10:30 - 11:00",
                    title: "Coffee Break",
                    type: "Intervalo",
                    location: "Área de Convivência",
                  },
                  {
                    time: "11:00 - 12:30",
                    title: "Palestra Magna: O Futuro das Ciências Forenses na Era da Inteligência Artificial",
                    type: "Palestra",
                    location: "Auditório Principal",
                    speaker: "Dr. Carlos Mendes (Instituto de Tecnologia)",
                  },
                  {
                    time: "12:30 - 14:00",
                    title: "Almoço",
                    type: "Intervalo",
                    location: "Restaurantes Próximos",
                  },
                  {
                    time: "14:00 - 15:30",
                    title: "Mesa Redonda: Desafios Contemporâneos das Ciências Forenses",
                    type: "Mesa Redonda",
                    location: "Auditório Principal",
                    speaker: "Diversos Especialistas",
                  },
                  {
                    time: "15:30 - 16:00",
                    title: "Coffee Break",
                    type: "Intervalo",
                    location: "Área de Convivência",
                  },
                  {
                    time: "16:00 - 18:00",
                    title: "Sessões Paralelas de Apresentação de Trabalhos",
                    type: "Apresentações",
                    location: "Salas 1, 2 e 3",
                  },
                  {
                    time: "19:00 - 21:00",
                    title: "Coquetel de Boas-vindas",
                    type: "Social",
                    location: "Terraço",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Card>
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="bg-blue-100 p-4 md:w-1/4 flex flex-col justify-center items-center text-center">
                            <Clock className="h-5 w-5 text-blue-700 mb-2" />
                            <span className="text-blue-900 font-medium">{item.time}</span>
                          </div>
                          <div className="p-4 md:w-3/4">
                            <div className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded mb-2">
                              {item.type}
                            </div>
                            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                            <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 gap-y-1 gap-x-4">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                                {item.location}
                              </div>
                              {item.speaker && (
                                <div className="flex items-center">
                                  <User className="h-4 w-4 mr-1 text-gray-400" />
                                  {item.speaker}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="dia2" className="space-y-8">
                <div className="bg-blue-50 p-4 rounded-lg mb-8">
                  <h2 className="text-xl font-bold text-blue-900 mb-2">Terça-feira, 16 de Setembro de 2025</h2>
                  <p className="text-gray-700">Tema do dia: Tecnologias Forenses Avançadas</p>
                </div>

                {/* Conteúdo similar ao dia 1, com atividades diferentes */}
                {[
                  {
                    time: "08:30 - 10:00",
                    title: "Palestra: Avanços em Análise de DNA para Identificação Humana",
                    type: "Palestra",
                    location: "Auditório Principal",
                    speaker: "Dra. Ana Silva (Universidade Federal de São Paulo)",
                  },
                  {
                    time: "10:00 - 10:30",
                    title: "Coffee Break",
                    type: "Intervalo",
                    location: "Área de Convivência",
                  },
                  {
                    time: "10:30 - 12:00",
                    title: "Workshop: Técnicas Avançadas de Análise de Impressões Digitais",
                    type: "Workshop",
                    location: "Laboratório 1",
                    speaker: "Prof. Dr. Marcos Oliveira (Instituto de Criminalística)",
                  },
                  {
                    time: "12:00 - 13:30",
                    title: "Almoço",
                    type: "Intervalo",
                    location: "Restaurantes Próximos",
                  },
                  {
                    time: "13:30 - 15:00",
                    title: "Simpósio: Inteligência Artificial na Análise de Evidências",
                    type: "Simpósio",
                    location: "Auditório Principal",
                    speaker: "Diversos Especialistas",
                  },
                  {
                    time: "15:00 - 15:30",
                    title: "Coffee Break",
                    type: "Intervalo",
                    location: "Área de Convivência",
                  },
                  {
                    time: "15:30 - 17:30",
                    title: "Sessões Paralelas de Apresentação de Trabalhos",
                    type: "Apresentações",
                    location: "Salas 1, 2 e 3",
                  },
                  {
                    time: "17:30 - 19:00",
                    title: "Painel: Desafios Éticos das Novas Tecnologias Forenses",
                    type: "Painel",
                    location: "Auditório Principal",
                    speaker: "Comitê de Ética em Pesquisa",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Card>
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="bg-blue-100 p-4 md:w-1/4 flex flex-col justify-center items-center text-center">
                            <Clock className="h-5 w-5 text-blue-700 mb-2" />
                            <span className="text-blue-900 font-medium">{item.time}</span>
                          </div>
                          <div className="p-4 md:w-3/4">
                            <div className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded mb-2">
                              {item.type}
                            </div>
                            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                            <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 gap-y-1 gap-x-4">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                                {item.location}
                              </div>
                              {item.speaker && (
                                <div className="flex items-center">
                                  <User className="h-4 w-4 mr-1 text-gray-400" />
                                  {item.speaker}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="dia3">
                <div className="bg-blue-50 p-4 rounded-lg mb-8">
                  <h2 className="text-xl font-bold text-blue-900 mb-2">Quarta-feira, 17 de Setembro de 2025</h2>
                  <p className="text-gray-700">Tema do dia: Inovações e Habilidades Comportamentais</p>
                </div>

                <p className="text-gray-600 text-center py-8">Programação detalhada em breve...</p>
              </TabsContent>

              <TabsContent value="dia4">
                <div className="bg-blue-50 p-4 rounded-lg mb-8">
                  <h2 className="text-xl font-bold text-blue-900 mb-2">Quinta-feira, 18 de Setembro de 2025</h2>
                  <p className="text-gray-700">Tema do dia: Encerramento e Perspectivas Futuras</p>
                </div>

                <p className="text-gray-600 text-center py-8">Programação detalhada em breve...</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Informações Adicionais */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-blue-900 text-center">Informações Adicionais</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold mb-4 text-blue-900">Minicursos</h3>
                <p className="text-gray-700 mb-4">
                  Os minicursos serão realizados nos dias 15 e 16 de setembro, no período da tarde, em salas
                  específicas. É necessário inscrição prévia, pois as vagas são limitadas.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Análise de Vestígios em Locais de Crime</li>
                  <li>Técnicas Avançadas de Entrevista Forense</li>
                  <li>Documentoscopia e Grafoscopia Digital</li>
                  <li>Balística Forense: Teoria e Prática</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold mb-4 text-blue-900">Apresentação de Trabalhos</h3>
                <p className="text-gray-700 mb-4">
                  As apresentações de trabalhos serão realizadas em sessões paralelas, organizadas por áreas temáticas.
                  Cada apresentador terá 15 minutos para exposição e 5 minutos para perguntas.
                </p>
                <p className="text-gray-700">
                  Os pôsteres ficarão expostos durante todo o evento na área designada, com sessão de apresentação
                  específica no dia 17 de setembro.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md mt-8"
            >
              <h3 className="text-xl font-bold mb-4 text-blue-900">Eventos Sociais</h3>
              <p className="text-gray-700 mb-4">
                Além das atividades científicas, o CONCIFA 2025 oferecerá momentos de confraternização e networking
                entre os participantes:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Coquetel de Boas-vindas (15/09, 19h)</li>
                <li>Jantar de Confraternização (17/09, 20h) - Evento pago à parte</li>
                <li>Visita Técnica ao Instituto de Criminalística (18/09, 14h) - Vagas limitadas</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
