"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const sponsors = [
  { name: "Universidade Federal do Amazonas", logo: "/sponsor/ufam.webp" },
  { name: "Instituto de Pesquisa Eldorado", logo: "/sponsor/eldorado.png" },
  { name: "EMBRAPII", logo: "/sponsor/embrapii.webp" },
  { name: "Faculdade Metropolitana", logo: "/sponsor/fametro.png" },
  { name: "Empresa de Tecnologia ", logo: "/sponsor/sidia.png" },
  { name: "Fundação de Apoio", logo: "/sponsor/coca-cola.jpg" },
]

export default function Sponsors() {
  const duplicatedSponsors = [...sponsors, ...sponsors] // para efeito contínuo

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-blue-900">Patrocinadores e Apoiadores</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Agradecemos às instituições e empresas que tornam possível a realização do CONCIFA 2025.
          </p>
        </motion.div>

        {/* carrossel horizontal infinito */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-12 animate-slide"
            style={{ whiteSpace: "nowrap" }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear"
            }}
          >
            {duplicatedSponsors.map((sponsor, index) => (
              <div
                key={index}
                className="flex items-center justify-center min-w-[160px] h-24 px-4"
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={120}
                  height={80}
                  className="max-h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
