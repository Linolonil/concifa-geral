"use client"

import Layout from "@/components/layout/Layout"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Sobre() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Sobre o CONCIFA</h1>
            <p className="text-xl text-gray-200">
              Conheça a história, missão e valores do Congresso Nacional de Ciências Forenses e Afins
            </p>
          </div>
        </div>
      </section>

      {/* História e Missão */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-blue-900">História e Missão</h2>
              <p className="text-gray-700 mb-4">
                O Congresso Nacional de Ciências Forenses e Afins (CONCIFA) foi fundado em 2017 com o objetivo de
                promover o intercâmbio científico e profissional entre especialistas, pesquisadores e estudantes das
                diversas áreas das ciências forenses e campos relacionados.
              </p>
              <p className="text-gray-700 mb-4">
                Ao longo dos anos, o CONCIFA consolidou-se como um dos principais eventos científicos do Brasil na área
                forense, reunindo anualmente centenas de participantes de todo o país e do exterior.
              </p>
              <p className="text-gray-700">
                Nossa missão é fomentar o desenvolvimento científico e tecnológico das ciências forenses, promovendo a
                disseminação do conhecimento, a formação de redes de colaboração e o aprimoramento das práticas
                profissionais no campo forense.
              </p>
            </div>
            <div className="lg:w-1/2">
              <Image
                src="/images/concifa1.jpg"
                alt="CONCIFA História"
                width={600}
                height={400}
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Valores e Objetivos */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Valores e Objetivos</h2>
            <p className="text-gray-600">
              Os princípios que norteiam nossas ações e os objetivos que buscamos alcançar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Excelência Científica",
                description: "Promover a qualidade e o rigor científico em todas as atividades do congresso.",
              },
              {
                title: "Interdisciplinaridade",
                description:
                  "Fomentar o diálogo entre diferentes áreas do conhecimento relacionadas às ciências forenses.",
              },
              {
                title: "Inovação",
                description:
                  "Estimular o desenvolvimento de novas tecnologias e metodologias aplicadas à área forense.",
              },
              {
                title: "Ética",
                description: "Valorizar a conduta ética na pesquisa e na prática profissional forense.",
              },
              {
                title: "Inclusão",
                description:
                  "Promover a participação de profissionais e estudantes de diferentes regiões e instituições.",
              },
              {
                title: "Impacto Social",
                description:
                  "Contribuir para o aprimoramento da justiça e da segurança pública por meio do conhecimento científico.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold mb-3 text-blue-900">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comissão Organizadora */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Comissão Organizadora</h2>
            <p className="text-gray-600">Conheça os profissionais responsáveis pela organização do CONCIFA 2025</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Prof. Dr. Ricardo Santos",
                role: "Presidente",
                institution: "Universidade Federal de São Paulo",
                image: "/images/organizer-1.jpg",
              },
              {
                name: "Profa. Dra. Márcia Oliveira",
                role: "Vice-Presidente",
                institution: "Instituto de Pesquisas Forenses",
                image: "/images/organizer-2.jpg",
              },
              {
                name: "Dr. Fernando Costa",
                role: "Coordenador Científico",
                institution: "Polícia Federal",
                image: "/images/organizer-3.jpg",
              },
              {
                name: "Dra. Patrícia Lima",
                role: "Secretária Geral",
                institution: "Universidade de Brasília",
                image: "/images/organizer-4.jpg",
              },
              {
                name: "Prof. Dr. Gustavo Mendes",
                role: "Tesoureiro",
                institution: "Universidade Estadual de Campinas",
                image: "/images/organizer-5.jpg",
              },
              {
                name: "Profa. Dra. Camila Rocha",
                role: "Coordenadora de Comunicação",
                institution: "Universidade Federal do Rio de Janeiro",
                image: "/images/organizer-6.jpg",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <div className="relative h-72">
                  <Image src={"/placeholder-user.png"} alt={member.name} fill className="object-cover object-center" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-blue-900">{member.name}</h3>
                  <p className="text-gray-700 mb-1">{member.role}</p>
                  <p className="text-gray-500 text-sm">{member.institution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Edições Anteriores */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Edições Anteriores</h2>
            <p className="text-gray-600">Relembre os temas e destaques das edições passadas do CONCIFA</p>
          </div>

          <div className="space-y-8">
            {[
              {
                year: "2024",
                edition: "VIII",
                theme: "Ciências Forenses na Era Digital: Desafios e Oportunidades",
                location: "Rio de Janeiro, RJ",
                participants: "1.200 participantes",
                highlights: "Foco em crimes cibernéticos e evidências digitais",
              },
              {
                year: "2023",
                edition: "VII",
                theme: "Inovação e Sustentabilidade nas Ciências Forenses",
                location: "Belo Horizonte, MG",
                participants: "1.100 participantes",
                highlights: "Abordagens eco-friendly para análises forenses",
              },
              {
                year: "2022",
                edition: "VI",
                theme: "Ciências Forenses e Saúde Pública: Interfaces e Colaborações",
                location: "Brasília, DF",
                participants: "950 participantes",
                highlights: "Parceria com profissionais da área de saúde",
              },
              {
                year: "2021",
                edition: "V",
                theme: "Ciências Forenses em Tempos de Pandemia",
                location: "Evento Online",
                participants: "1.500 participantes",
                highlights: "Primeiro evento totalmente virtual",
              },
            ].map((edition, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="md:w-1/4 mb-4 md:mb-0">
                    <div className="bg-blue-100 text-blue-900 rounded-lg p-4 text-center md:mr-6">
                      <div className="text-2xl font-bold">{edition.year}</div>
                      <div className="text-lg">{edition.edition} Edição</div>
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-xl font-bold mb-2 text-blue-900">{edition.theme}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-semibold">Local:</span> {edition.location}
                      </div>
                      <div>
                        <span className="font-semibold">Participantes:</span> {edition.participants}
                      </div>
                      <div>
                        <span className="font-semibold">Destaque:</span> {edition.highlights}
                      </div>
                    </div>
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