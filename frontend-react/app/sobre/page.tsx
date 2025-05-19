"use client"

import Layout from "@/components/layout/Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Smile, Star } from "lucide-react"
import Link from "next/link"

export default function Sobre() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Sobre o CONCIFA</h1>
            <p className="text-xl text-gray-200">
              Conheça a história, missão e valores do Congresso Científico da FAMETRO
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* História */}
          <section className="flex-1">
            <span className="inline-block bg-[#2279ea82] text-black font-bold  px-3 py-1 rounded text-sm  mb-2">
              Nossa História
            </span>
            <h2 className="text-2xl font-bold mt-2 mb-4 text-[#2279ea]">Uma Década de Inovação e Conhecimento</h2>
            <p className="mb-3 text-gray-700">
              O Congresso de Ciência e Inovação em Interfaces e Inteligência Artificial (CONCIFA) teve sua primeira edição em 2017, com o objetivo de criar um espaço para discussão e compartilhamento de conhecimentos sobre as interfaces entre tecnologia, inovação e comportamento humano.
            </p>
            <p className="mb-3 text-gray-700">
              Ao longo dos anos, o CONCIFA se consolidou como um dos principais eventos acadêmicos na área de inteligência artificial e suas interfaces no Brasil, reunindo pesquisadores, profissionais e estudantes de diversas instituições nacionais e internacionais.
            </p>
            <p className="text-gray-700">
              Em sua nona edição, o CONCIFA traz o tema "As Interfaces das Inteligências: Tecnologias, Inovações e Habilidades Comportamentais", buscando explorar as múltiplas dimensões da interação entre humanos e sistemas inteligentes, bem como os impactos dessas tecnologias na sociedade contemporânea.
            </p>
          </section>
          {/* Card de Cadastro */}
          <Card className="bg-[#5f29dd] text-white w-full md:w-[400px] h-full flex flex-col justify-between shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Faça parte do IX Concifa</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">
                Junte-se a nós para discutir e moldar o futuro das interfaces entre inteligência artificial e comportamento humano.
              </p>
              <div className="flex gap-2">
                <Button asChild className="bg-white text-[#5f29dd] hover:bg-gray-100 w-1/2 font-bold rounded-full">
                  <Link href="#">Inscreva-se</Link>
                </Button>
                <Button asChild variant="outline" className="bg-white text-[#5f29dd] hover:bg-gray-100 w-1/2 font-bold rounded-full">
                  <Link href="#">Entre em contato</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Missão, Visão, Valores */}
        <h2 className="text-center text-2xl font-bold mt-16 mb-8 text-[#2279ea]">Missão, Visão e Valores</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {/* Missão */}
          <Card className="flex-1 flex flex-col items-center justify-center  text-center shadow-lg bg-white">
            <CardHeader className="flex flex-col items-center justify-center">
              <Star className="bg-[#2279ea82] rounded-full p-2 mb-2" size={32} color="#2279ea" />
              <CardTitle className="text-[#2279ea]">Missão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Promover o avanço científico e tecnológico nas áreas de inteligência artificial e interfaces homem-máquina, fomentando o diálogo interdisciplinar e a disseminação de conhecimentos que contribuam para o desenvolvimento de soluções inovadoras e éticas.
              </p>
            </CardContent>
          </Card>
          {/* Visão */}
          <Card className="flex-1 flex flex-col items-center text-center shadow-lg bg-white">
            <CardHeader className="flex flex-col items-center justify-center">
              <Smile className="bg-[#ff404033] rounded-full p-2 mb-2" size={32} color="#ff4040" />
              <CardTitle className="text-[#2279ea]">Visão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Ser reconhecido como o principal evento acadêmico brasileiro na área de inteligência artificial e suas interfaces, contribuindo para a formação de profissionais e pesquisadores capacitados para enfrentar os desafios tecnológicos e sociais do século XXI.
              </p>
            </CardContent>
          </Card>
          {/* Valores */}
          <Card className="flex-1 flex flex-col items-center text-center shadow-lg bg-white">
            <CardHeader className="flex flex-col items-center justify-center">
              <CheckCircle className="bg-[#15941959] rounded-full p-2 mb-2" size={32} color="#159419" />
              <CardTitle className="text-[#2279ea]">Valores</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-left text-gray-700">
                <li>Excelência acadêmica e científica</li>
                <li>Inovação e criatividade</li>
                <li>Ética e responsabilidade social</li>
                <li>Interdisciplinaridade</li>
                <li>Inclusão e diversidade</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </Layout>
  )
}