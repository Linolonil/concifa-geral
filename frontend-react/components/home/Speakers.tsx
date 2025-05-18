"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/ui/carousel"
import { speakers } from "@/data/speakers"

export default function Speakers() {
  const router = useRouter()

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-blue-900">Palestrantes Confirmados</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Conheça alguns dos especialistas que compartilharão seus conhecimentos e experiências durante o CONCIFA
            2025.
          </p>
        </motion.div>

        <div className="relative px-12">
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
                slidesToScroll: 1,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {speakers.map((speaker, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="h-full"
                    >
                      <Card className="overflow-hidden  h-full group cursor-pointer" onClick={() => router.push(`/palestrantes/${speaker.slug}`)}>
                        <div className="relative h-96 overflow-hidden">
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
                          <h3 className="text-xl font-bold mb-1 text-blue-900 line-clamp-2">{speaker.name}</h3>
                          <p className="text-gray-700 mb-1 line-clamp-2">{speaker.role}</p>
                          <p className="text-gray-500 text-sm mb-4 line-clamp-2">{speaker.institution}</p>
                          <Button 
                            variant="outline" 
                            className="w-full"
                          >
                            Saber mais
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
              <CarouselDots className="md:hidden" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  )
}
