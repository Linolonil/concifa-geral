"use client"

import Layout from "@/components/layout/Layout"
import { motion } from "framer-motion"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Calendar, CheckCircle, AlertCircle, HelpCircle } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Submissao() {
  return (
    <Layout>
      <div className="relative min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-10 md:py-14">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#2279ea]">Submissão de Trabalhos</h1>
              <p className="text-base md:text-lg text-gray-200 mb-4">Compartilhe sua pesquisa no CONCIFA 2025</p>
            </div>
          </div>
        </section>

        {/* Informações Gerais */}
        <section className="py-10 md:py-14">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="mb-8">
                  <CardHeader>
                    <h2 className="text-xl font-bold text-blue-900">Informações Gerais</h2>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="flex flex-col items-center text-center p-3 bg-blue-50 rounded-lg">
                        <Calendar className="h-8 w-8 text-blue-600 mb-2" />
                        <h3 className="font-semibold mb-1 text-sm">Prazo Final</h3>
                        <p className="text-gray-700 text-xs">15 de Julho de 2025</p>
                      </div>
                      <div className="flex flex-col items-center text-center p-3 bg-blue-50 rounded-lg">
                        <FileText className="h-8 w-8 text-blue-600 mb-2" />
                        <h3 className="font-semibold mb-1 text-sm">Modalidades</h3>
                        <p className="text-gray-700 text-xs">Artigos, Resumos e Pôsteres</p>
                      </div>
                      <div className="flex flex-col items-center text-center p-3 bg-blue-50 rounded-lg">
                        <CheckCircle className="h-8 w-8 text-blue-600 mb-2" />
                        <h3 className="font-semibold mb-1 text-sm">Resultado</h3>
                        <p className="text-gray-700 text-xs">15 de Agosto de 2025</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">
                      O Congresso Científico da FAMETRO – CONCIFA 2025 convida pesquisadores, profissionais e estudantes a submeterem trabalhos científicos relacionados ao tema "A Universidade Fora dos Muros: Conectando Saberes e Transformando Realidades".
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                      Todos os trabalhos aprovados serão publicados nos Anais do Congresso (ISSN registrado) e os melhores serão convidados para publicação em edição especial da Revista Científica da FAMETRO.
                    </p>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-yellow-800 text-xs">
                      <div className="flex">
                        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                        <p>
                          <strong>Importante:</strong> Para submeter um trabalho, pelo menos um dos autores deve estar inscrito no evento até a data de divulgação dos resultados.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <Tabs defaultValue="modalidades" className="w-full">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="modalidades">Modalidades</TabsTrigger>
                  <TabsTrigger value="diretrizes">Diretrizes</TabsTrigger>
                  <TabsTrigger value="submeter">Como Submeter</TabsTrigger>
                </TabsList>

                <TabsContent value="modalidades" className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <h3 className="text-xl font-bold mb-4 text-blue-900">Modalidades de Submissão</h3>

                    <div className="space-y-6">
                      <div className="border-b pb-4">
                        <h4 className="text-lg font-bold mb-2">Artigo Completo</h4>
                        <p className="text-gray-700 mb-2">
                          Trabalhos científicos originais, com resultados completos de pesquisa.
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          <li>Extensão: 8 a 12 páginas</li>
                          <li>Apresentação: Oral (20 minutos)</li>
                          <li>Idiomas aceitos: Português, Inglês ou Espanhol</li>
                        </ul>
                      </div>

                      <div className="border-b pb-4">
                        <h4 className="text-lg font-bold mb-2">Resumo Expandido</h4>
                        <p className="text-gray-700 mb-2">
                          Trabalhos em andamento ou resultados preliminares de pesquisa.
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          <li>Extensão: 3 a 5 páginas</li>
                          <li>Apresentação: Oral (15 minutos)</li>
                          <li>Idiomas aceitos: Português, Inglês ou Espanhol</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold mb-2">Pôster</h4>
                        <p className="text-gray-700 mb-2">
                          Relatos de experiência, estudos de caso ou pesquisas em fase inicial.
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          <li>Extensão: 2 páginas (resumo)</li>
                          <li>Apresentação: Pôster (90x120cm)</li>
                          <li>Idiomas aceitos: Português, Inglês ou Espanhol</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="diretrizes" className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <h3 className="text-xl font-bold mb-4 text-blue-900">Diretrizes para Autores</h3>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-bold mb-2">Formatação</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          <li>Formato do arquivo: PDF</li>
                          <li>Tamanho da página: A4</li>
                          <li>Margens: 2,5 cm em todos os lados</li>
                          <li>Fonte: Times New Roman, tamanho 12</li>
                          <li>Espaçamento entre linhas: 1,5</li>
                          <li>Alinhamento: Justificado</li>
                          <li>Citações e referências: Normas ABNT ou APA</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold mb-2">Estrutura do Trabalho</h4>
                        <p className="text-gray-700 mb-2">Os trabalhos devem conter os seguintes elementos:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          <li>Título (em português e inglês)</li>
                          <li>Autores e afiliações</li>
                          <li>Resumo e palavras-chave (em português e inglês)</li>
                          <li>Introdução</li>
                          <li>Metodologia</li>
                          <li>Resultados e Discussão</li>
                          <li>Conclusões</li>
                          <li>Agradecimentos (opcional)</li>
                          <li>Referências</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold mb-2">Áreas Temáticas</h4>
                        <p className="text-gray-700 mb-2">
                          Os trabalhos devem estar relacionados a uma das seguintes áreas:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          <li>Saúde e Bem-Estar</li>
                          <li>Engenharias e Tecnologias</li>
                          <li>Ciências Humanas e Sociais</li>
                          <li>Educação e Práticas Pedagógicas</li>
                          <li>Gestão, Negócios e Inovação</li>
                          <li>Meio Ambiente e Sustentabilidade</li>
                          <li>Direito e Cidadania</li>
                          <li>Comunicação e Cultura</li>
                          <li>Ciências Biológicas e da Vida</li>
                          <li>Ciências Exatas e da Terra</li>
                          <li>Interdisciplinaridade</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Link href="/templates/template-trabalho-concifa-2025.docx">
                        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                          <FileText className="h-5 w-5 mr-2" />
                          Baixar Template
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="submeter" className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <h3 className="text-xl font-bold mb-4 text-blue-900">Como Submeter seu Trabalho</h3>

                    <div className="space-y-6">
                      <p className="text-gray-700">
                        A submissão de trabalhos é realizada exclusivamente pelo sistema online do CONCIFA. Siga os passos
                        abaixo para submeter seu trabalho:
                      </p>

                      <ol className="list-decimal list-inside text-gray-700 space-y-4">
                        <li className="pl-2">
                          <span className="font-bold">Acesse o sistema:</span> Faça login no sistema de submissão com seu
                          usuário e senha. Caso não possua cadastro, será necessário <Link href="/cadastro" className="text-blue-600 hover:underline">criar uma conta.</Link>
                        </li>
                        <li className="pl-2">
                          <span className="font-bold">Selecione a modalidade:</span> Escolha entre Artigo Completo, Resumo
                          Expandido ou Pôster.
                        </li>
                        <li className="pl-2">
                          <span className="font-bold">Preencha o formulário:</span> Informe o título, autores, área
                          temática e demais informações solicitadas.
                        </li>
                        <li className="pl-2">
                          <span className="font-bold">Faça upload do arquivo:</span> Envie o arquivo em formato PDF,
                          seguindo as diretrizes de formatação.
                        </li>
                        <li className="pl-2">
                          <span className="font-bold">Confirme a submissão:</span> Revise todas as informações e confirme
                          o envio do trabalho.
                        </li>
                      </ol>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex">
                          <HelpCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0" />
                          <div>
                            <h4 className="font-bold mb-1">Dúvidas Frequentes</h4>
                            <p className="text-gray-700 mb-2">
                              Em caso de dúvidas sobre o processo de submissão, consulte nossa página de perguntas
                              frequentes ou entre em contato com a comissão científica.
                            </p>
                            <Link href="/faq" className="text-blue-600 hover:underline">
                              Ver Perguntas Frequentes
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                      <Link href="/login">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                        >
                          Faça Login
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Cronograma */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold mb-4 text-blue-900">Cronograma</h2>
                <p className="text-gray-600">
                  Fique atento aos prazos importantes para submissão e apresentação de trabalhos
                </p>
              </motion.div>

              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>

                {[
                  {
                    date: "15 de Maio de 2025",
                    title: "Abertura das Submissões",
                    description: "Início do período para envio de trabalhos em todas as modalidades.",
                  },
                  {
                    date: "15 de Julho de 2025",
                    title: "Encerramento das Submissões",
                    description: "Prazo final para envio de trabalhos em todas as modalidades.",
                  },
                  {
                    date: "15 de Agosto de 2025",
                    title: "Divulgação dos Resultados",
                    description: "Comunicação dos trabalhos aprovados e instruções para apresentação.",
                  },
                  {
                    date: "31 de Agosto de 2025",
                    title: "Envio da Versão Final",
                    description: "Prazo para envio da versão final dos trabalhos aprovados com correções.",
                  },
                  {
                    date: "15 a 18 de Setembro de 2025",
                    title: "Apresentação dos Trabalhos",
                    description: "Apresentações orais e de pôsteres durante o evento.",
                  },
                  {
                    date: "30 de Outubro de 2025",
                    title: "Publicação dos Anais",
                    description: "Disponibilização dos Anais do Congresso com todos os trabalhos apresentados.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative mb-8 ${index % 2 === 0 ? "pr-12 md:pr-0 md:mr-auto md:ml-0 md:text-right md:pl-8" : "pl-12 md:pl-0 md:ml-auto md:mr-0 md:text-left md:pr-8"} md:w-5/12`}
                  >
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <div className="absolute top-5 left-0 md:left-auto md:right-0 w-10 h-10 rounded-full bg-blue-600 border-4 border-white shadow flex items-center justify-center text-white font-bold z-10">
                        {index + 1}
                      </div>
                      <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded text-sm inline-block mb-2">
                        {item.date}
                      </div>
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
