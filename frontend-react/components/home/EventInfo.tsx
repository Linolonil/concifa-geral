"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Users, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function EventInfo() {
  const items = [
    {
      icon: <Calendar className="h-10 w-10 text-blue-600" />,
      title: "Data",
      description: "15 a 18 de Setembro de 2025",
    },
    {
      icon: <MapPin className="h-10 w-10 text-blue-600" />,
      title: "Local",
      description: "Centro de Convenções - São Paulo, SP",
    },
    {
      icon: <Users className="h-10 w-10 text-blue-600" />,
      title: "Participantes",
      description: "Mais de 1.500 profissionais e estudantes",
    },
    {
      icon: <Award className="h-10 w-10 text-blue-600" />,
      title: "Certificação",
      description: "Certificado de 40 horas de atividades",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
