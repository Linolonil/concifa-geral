"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutEvent() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl font-bold mb-6 text-blue-900">Sobre o CONCIFA</h2>
            <p className="text-gray-700 mb-4">
              O Congresso Científico da FAMETRO é um evento científico que reúne
              profissionais, pesquisadores e estudantes interessados nas áreas de ciências forenses e campos
              relacionados.
            </p>
            <p className="text-gray-700 mb-4">
              Em sua IX edição, o CONCIFA abordará o tema "As Interfaces das Inteligências: Tecnologias, Inovações e
              Habilidades Comportamentais", explorando as interseções entre inteligência artificial, ciências forenses e
              comportamento humano.
            </p>
            <p className="text-gray-700 mb-6">
              O evento contará com palestras, workshops, mesas redondas e apresentações de trabalhos científicos,
              proporcionando um ambiente rico para troca de conhecimentos e networking entre os participantes.
            </p>
            <Link href="/sobre">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button>Saiba Mais</Button>
              </motion.div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src="/images/conference-image.jpg"
                    alt="CONCIFA Evento"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent flex items-end">
                    <div className="p-6">
                      <p className="text-white text-lg font-medium">IX Edição - 2025</p>
                      <h3 className="text-white text-2xl font-bold">Ciências Forenses e Inteligência Artificial</h3>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
