"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { speakers } from "@/data/speakers"

interface SpeakerPageProps {
  params: {
    slug: string
  }
}

export default function SpeakerPage({ params }: SpeakerPageProps) {
  const router = useRouter()
  const speaker = speakers.find(s => s.slug === params.slug)

  if (!speaker) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold text-red-600">Palestrante não encontrado</h1>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => router.push("/palestrantes")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Palestrantes
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          className="mb-8"
          onClick={() => router.push("/palestrantes")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para todos os Palestrantes
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
    

          {/* Conteúdo principal */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-[400px] w-full">
                <Image
                  src={speaker.image || "/placeholder.svg"}
                  alt={speaker.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="p-8">
                <h1 className="text-3xl font-bold text-blue-900 mb-2">{speaker.name}</h1>
                <p className="text-xl text-gray-700 mb-4">{speaker.role}</p>
                {speaker.institution && (
                  <p className="text-lg text-gray-600 mb-6">{speaker.institution}</p>
                )}
                <div className="prose prose-lg max-w-none">
                  <p className="whitespace-pre-line text-gray-700">{speaker.description}</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
} 