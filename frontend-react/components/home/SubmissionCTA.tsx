"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FileText, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SubmissionCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:w-2/3"
          >
            <h2 className="text-3xl font-bold mb-4">Submissão de Trabalhos</h2>
            <p className="text-gray-200 mb-6 max-w-2xl">
              Compartilhe suas pesquisas e experiências no campo das ciências forenses e áreas relacionadas. Submeta seu
              trabalho para apresentação no CONCIFA 2025 e contribua para o avanço do conhecimento científico.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-start">
                <FileText className="h-6 w-6 mr-3 text-blue-300 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Modalidades</h3>
                  <p className="text-gray-200 text-sm">Artigos completos, resumos expandidos e pôsteres</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-6 w-6 mr-3 text-blue-300 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Prazo Final</h3>
                  <p className="text-gray-200 text-sm">15 de Julho de 2025</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-1/3 flex justify-center"
          >
            <Link href="/submissao">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-gray-100 hover:text-blue-900 font-bold text-lg"
                >
                  Submeta seu Trabalho
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
