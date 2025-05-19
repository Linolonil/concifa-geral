"use client"

import Layout from "@/components/layout/Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Smile, Star } from "lucide-react"
import Link from "next/link"

export default function Sobre() {
  return (
    <Layout>
      <div className="relative min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-10 md:py-14">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#2279ea]">Sobre o CONCIFA</h1>
              <p className="text-base md:text-lg text-gray-200 mb-4">
                Conheça a história, missão e valores do Congresso Científico da FAMETRO
              </p>
            </div>
          </div>
        </section>

        <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* História */}
            <section className="flex-1">
              <span className="inline-block bg-[#2279ea1a] text-[#2279ea] font-semibold px-3 py-1 rounded text-xs mb-2">
                Nossa História
              </span>
              <h2 className="text-xl font-bold mt-2 mb-2 text-[#2279ea]">Compromisso com a Ciência e a Sociedade</h2>
              <p className="mb-2 text-gray-700 text-sm md:text-base">
                O Congresso Científico da FAMETRO – CONCIFA 2025 nasce do compromisso institucional com a ciência, a educação e o impacto social. Com o tema "A Universidade Fora dos Muros: Conectando Saberes e Transformando Realidades", o evento promove a integração entre universidade e sociedade, incentivando a produção científica, a inovação e a transformação social.
              </p>
              <p className="mb-2 text-gray-700 text-sm md:text-base">
                Ao longo dos anos, o CONCIFA se consolidou como um espaço de troca de experiências, divulgação de pesquisas e fortalecimento do papel social da universidade.
              </p>
              <p className="text-gray-700 text-sm md:text-base">
                Em 2025, o evento reforça sua missão de conectar saberes e transformar realidades, reunindo estudantes, pesquisadores e profissionais de diversas áreas.
              </p>
            </section>
            {/* Card de Cadastro */}
            <Card className="bg-[#5f29dd] text-white w-full md:w-[340px] h-full flex flex-col justify-between shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="text-white text-lg">Participe do CONCIFA 2025</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm">
                  Venha construir conhecimento e ampliar sua rede acadêmica e profissional.
                </p>
                <div className="flex gap-2">
                  <Button asChild className="bg-white text-[#5f29dd] hover:bg-gray-100 w-1/2 font-bold rounded-full text-sm">
                    <Link href="/inscricao">Inscreva-se</Link>
                  </Button>
                  <Button asChild variant="outline" className="bg-white text-[#5f29dd] hover:bg-gray-100 w-1/2 font-bold rounded-full text-sm">
                    <Link href="#footer">Contatos</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Missão, Visão, Valores */}
          <h2 className="text-center text-xl font-bold mt-12 mb-6 text-[#2279ea]">Missão, Visão e Valores</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {/* Missão */}
            <Card className="flex-1 flex flex-col items-center justify-center text-center shadow-md bg-white rounded-xl">
              <CardHeader className="flex flex-col items-center justify-center">
                <Star className="bg-[#2279ea1a] rounded-full p-2 mb-2" size={28} color="#2279ea" />
                <CardTitle className="text-[#2279ea] text-base">Missão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm">
                  Promover a produção científica, a inovação e a integração entre universidade e sociedade, contribuindo para o desenvolvimento social e acadêmico.
                </p>
              </CardContent>
            </Card>
            {/* Visão */}
            <Card className="flex-1 flex flex-col items-center text-center shadow-md bg-white rounded-xl">
              <CardHeader className="flex flex-col items-center justify-center">
                <Smile className="bg-[#ff40401a] rounded-full p-2 mb-2" size={28} color="#ff4040" />
                <CardTitle className="text-[#2279ea] text-base">Visão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm">
                  Ser referência nacional em eventos científicos multidisciplinares, conectando saberes e transformando realidades.
                </p>
              </CardContent>
            </Card>
            {/* Valores */}
            <Card className="flex-1 flex flex-col items-center text-center shadow-md bg-white rounded-xl">
              <CardHeader className="flex flex-col items-center justify-center">
                <CheckCircle className="bg-[#1594191a] rounded-full p-2 mb-2" size={28} color="#159419" />
                <CardTitle className="text-[#2279ea] text-base">Valores</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-left text-gray-700 text-sm">
                  <li>Excelência acadêmica</li>
                  <li>Inovação</li>
                  <li>Ética e responsabilidade social</li>
                  <li>Interdisciplinaridade</li>
                  <li>Inclusão e diversidade</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </Layout>
  )
}