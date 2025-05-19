"use client"

import { useState, Suspense } from "react"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Layout from "@/components/layout/Layout"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import { Loader2, AlertCircle, CheckCircle, Facebook, Linkedin, Mail, Chrome } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/AuthContext"
import Image from "next/image"

// Definição do esquema de validação
const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  senha: z.string().min(1, { message: "Senha é obrigatória" }),
})

type LoginFormValues = z.infer<typeof loginSchema>

function LoginContent() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const registered = searchParams.get("registered")
  const { login } = useAuth()

  // Valores padrão do formulário
  const defaultValues: Partial<LoginFormValues> = {
    email: "",
    senha: "",
  }

  // Configuração do formulário com React Hook Form e Zod
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  })

  // Função para lidar com o envio do formulário
  async function onSubmit(data: LoginFormValues) {
    setIsSubmitting(true)

    try {
      // Simulação de autenticação
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Dados de teste para simular diferentes tipos de usuário
      const testUsers = {
        "aluno@exemplo.com": { tipo: "aluno", nome: "João Silva" },
        "coordenador@exemplo.com": { tipo: "coordenador", nome: "Maria Oliveira" },
      }

      const user = testUsers[data.email as keyof typeof testUsers]

      if (user) {
        // Usar o contexto de autenticação para fazer login
        login(user)

        // Redirecionar para o dashboard apropriado
        if (user.tipo === "aluno") {
          router.push("/dashboard/aluno")
        } else {
          router.push("/dashboard/coordenador")
        }

        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo(a), ${user.nome}!`,
        })
      } else {
        toast({
          title: "Credenciais inválidas",
          description: "Email ou senha incorretos. Tente novamente.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erro ao realizar login",
        description: "Ocorreu um erro ao processar seu login. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Função para lidar com login social
  async function handleSocialLogin(provider: "facebook" | "linkedin" | "google") {
    setIsSubmitting(true)
    try {
      // Simulação de login social
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      toast({
        title: "Login social em desenvolvimento",
        description: `O login com ${provider} está sendo implementado. Por favor, use o login por email por enquanto.`,
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Erro ao realizar login social",
        description: "Ocorreu um erro ao tentar fazer login com a rede social. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout>
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-white overflow-hidden py-10">

      <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/inscricao-assets/gemini-generated-image-v-4-evugv-4-evugv-4-ev0.png"
            alt="Background"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white/80 pointer-events-none overflow-hidden" />
        </div>

        {/* Imagens decorativas */}
        <Image src="/inscricao-assets/imagen100.png" alt="Imagem Lateral 3" width={47} height={200} className="hidden md:block absolute right-40 top-2 z-20" />
          <Image src="/inscricao-assets/image1.png" alt="Imagem Lateral 1" width={150} height={200} className="hidden md:block absolute left-6 top-32 z-20" />
          <Image src="/inscricao-assets/image2.png" alt="Imagem Lateral 2" width={115} height={200} className="hidden md:block absolute left-56 top-64 z-20" />
          <Image src="/inscricao-assets/image0.png" alt="Pessoa no Computador" width={180} height={230} className="hidden md:block absolute right-2 bottom-4 z-0" />
        {/* Card centralizado */}
        <div className="bg-white/95 rounded-2xl p-8 shadow-lg w-full max-w-md text-center z-10 relative border border-[#2279ea]/10">
          <h2 className="text-2xl font-bold mb-2 text-[#2279ea]">Acesso ao Sistema</h2>
          <p className="mb-6 text-gray-700 text-base">Entre com suas credenciais</p>

          {registered && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Alert className="bg-green-50 border-green-200 mb-4">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Inscrição realizada com sucesso!</AlertTitle>
                <AlertDescription className="text-green-700">
                  Sua conta foi criada. Agora você pode fazer login com suas credenciais.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-left">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu.email@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="senha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-end mb-2">
                <Link href="/recuperar-senha" className="text-[#2279ea] hover:underline text-sm font-medium">
                  Esqueceu sua senha?
                </Link>
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-md text-lg shadow-sm" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Autenticando...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Entrar
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou entre com</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 hover:bg-gray-50 border-gray-200"
                onClick={() => handleSocialLogin("google")}
                disabled={isSubmitting}
              >
                <Chrome className="h-5 w-5 text-[#DB4437]" />
                <span>Entrar com Google</span>
              </Button>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 hover:bg-gray-50 border-gray-200"
                onClick={() => handleSocialLogin("facebook")}
                disabled={isSubmitting}
              >
                <Facebook className="h-5 w-5 text-[#1877F2]" />
                <span>Entrar com Facebook</span>
              </Button>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 hover:bg-gray-50 border-gray-200"
                onClick={() => handleSocialLogin("linkedin")}
                disabled={isSubmitting}
              >
                <Linkedin className="h-5 w-5 text-[#0A66C2]" />
                <span>Entrar com LinkedIn</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Link para inscrição */}
        <div className="flex flex-col items-center gap-2 mt-4">
          <p className="text-sm text-gray-600">
            Ainda não possui uma conta?{' '}
            <Link href="/inscricao" className="text-[#2279ea] hover:underline font-medium" tabIndex={0} aria-label="Inscreva-se">
              Inscreva-se
            </Link>
          </p>
        </div>

        {/* Alerta de usuários de teste */}
        <div className="mt-4 w-full max-w-md">
          <Alert className="bg-gray-50">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Usuários de teste</AlertTitle>
            <AlertDescription>
              <p className="text-sm">Para fins de demonstração:</p>
              <ul className="text-sm mt-1 space-y-1">
                <li>Aluno: aluno@exemplo.com / senha123</li>
                <li>Coordenador: coordenador@exemplo.com / senha123</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </Layout>
  )
}

export default function Login() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
