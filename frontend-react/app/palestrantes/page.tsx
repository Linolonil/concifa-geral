"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { speakers } from "@/data/speakers"

export default function SpeakersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" mx-auto ">

        <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16 ">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Palestrantes</h1>
              <p className="text-xl text-gray-200">Conheça todos os especialistas que compartilharão seus conhecimentos e experiências durante o CONCIFA 2025.</p>
            </div>
          </div>
        </section>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-10 py-10">
          {speakers.map((speaker, index) => (
            <motion.div
              key={speaker.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full group">
                <div className="relative h-96">
                  <Image
                    src={speaker.image || "/placeholder.svg"}
                    alt={speaker.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-1 text-blue-900 line-clamp-2">{speaker.name}</h2>
                  <p className="text-gray-700 mb-1 line-clamp-2">{speaker.role}</p>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{speaker.institution}</p>
                  <Button
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <Link href={`/palestrantes/${speaker.slug}`}>
                      Ver perfil completo
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 