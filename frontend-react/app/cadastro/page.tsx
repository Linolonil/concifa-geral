"use client"

import Layout from "@/components/layout/Layout"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Cadastro() {
  const [isFametro, setIsFametro] = useState(false)
  const [aceitaTermos, setAceitaTermos] = useState(false)
  const [aceitaNotificacoes, setAceitaNotificacoes] = useState(false)

  return (
    <Layout>
      <div className="relative min-h-screen w-full flex flex-col">
        {/* Background com overlay para contraste */}
        <div className="fixed inset-0 -z-10">
          <Image
            src="/inscricao-assets/gemini-generated-image-v-4-evugv-4-evugv-4-ev0.png"
            alt="Background"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80" />
        </div>

        {/* Main */}
        <main className="flex flex-col items-center justify-center flex-1 w-full py-8 relative">
          {/* Imagens decorativas */}
          <Image src="/inscricao-assets/imagen100.png" alt="Imagem Lateral 3" width={47} height={200} className="hidden md:block absolute right-40 top-2 z-0" />
          <Image src="/inscricao-assets/image1.png" alt="Imagem Lateral 1" width={150} height={200} className="hidden md:block absolute left-6 top-32 z-0" />
          <Image src="/inscricao-assets/image2.png" alt="Imagem Lateral 2" width={115} height={200} className="hidden md:block absolute left-56 top-64 z-0" />
          <Image src="/inscricao-assets/image0.png" alt="Pessoa no Computador" width={180} height={230} className="hidden md:block absolute right-2 bottom-4 z-0" />

          <div className="bg-white/95 rounded-2xl p-8 shadow-lg w-full max-w-md text-center z-10 relative border border-[#2279ea]/10">
            <h1 className="text-2xl font-bold mb-2 text-[#2279ea]">Cadastrar-se</h1>
            <p className="mb-6 text-gray-700">Olá, por favor insira os seus dados para criar a sua conta</p>
            <form className="space-y-4">
              {/* Nome Completo | CPF */}
              <div className="flex gap-2 mb-2">
                <Input placeholder="Nome Completo" className="flex-1" aria-label="Nome Completo" />
                <Input placeholder="CPF" className="flex-1" aria-label="CPF" />
              </div>
              {/* Email | Confirme seu Email */}
              <div className="flex gap-2 mb-2">
                <Input placeholder="Email" className="flex-1" aria-label="Email" type="email" />
                <Input placeholder="Confirme seu Email" className="flex-1" aria-label="Confirme seu Email" type="email" />
              </div>
              {/* Senha | Confirme a senha */}
              <div className="flex gap-2 mb-2">
                <Input placeholder="Senha" className="flex-1" aria-label="Senha" type="password" />
                <Input placeholder="Confirme a senha" className="flex-1" aria-label="Confirme a senha" type="password" />
              </div>
              {/* Telefone | Curso */}
              <div className="flex gap-2 mb-2">
                <Input placeholder="Telefone" className="flex-1" aria-label="Telefone" />
                <Input placeholder="Curso" className="flex-1" aria-label="Curso" />
              </div>
              {/* Faculdade | Unidade Fametro (Opcional) */}
              <div className="flex gap-2 mb-2">
                <Input placeholder="Faculdade" className="flex-1" aria-label="Faculdade" />
                <Input placeholder="Unidade Fametro (Opcional)" className="flex-1" aria-label="Unidade Fametro (Opcional)" />
              </div>
              {/* Checkboxes */}
              <div className="text-left mb-4 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox checked={isFametro} onCheckedChange={setIsFametro} id="fametro" className="border-[#2279ea] data-[state=checked]:bg-[#2279ea] data-[state=checked]:border-[#2279ea]" />
                  <span>Declaro que sou estudante Fametro <span className="text-gray-400">(Opcional)</span></span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox checked={aceitaTermos} onCheckedChange={setAceitaTermos} id="termos" className="border-[#2279ea] data-[state=checked]:bg-[#2279ea] data-[state=checked]:border-[#2279ea]" />
                  <span>Aceita todos os termos</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox checked={aceitaNotificacoes} onCheckedChange={setAceitaNotificacoes} id="notificacoes" className="border-[#2279ea] data-[state=checked]:bg-[#2279ea] data-[state=checked]:border-[#2279ea]" />
                  <span>Aceita receber notificações por email</span>
                </label>
              </div>
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-md text-lg shadow-sm">Próximo</Button>
              <div className="flex flex-col items-center gap-2 mt-4">
                <Link href="/" className="text-[#2279ea] hover:underline text-sm font-medium" tabIndex={0} aria-label="Voltar ao site do Concifa">Voltar ao site do Concifa</Link>
                <Link href="/login" className="text-[#2279ea] hover:underline text-sm font-medium" tabIndex={0} aria-label="Fazer login">Já possui conta? Faça login</Link>
              </div>
              <div className="flex justify-center">
                <Image src="/inscricao-assets/logo-600-10.png" alt="Logo Fametro" width={120} height={30} className="mt-4" />
              </div>
            </form>
          </div>
        </main>
      </div>
    </Layout>
  )
} 