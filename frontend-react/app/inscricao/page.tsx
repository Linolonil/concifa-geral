"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Layout from "@/components/layout/Layout"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

// Definição do esquema de validação
const inscricaoSchema = z
  .object({
    nome: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
    sobrenome: z.string().min(2, { message: "Sobrenome deve ter pelo menos 2 caracteres" }),
    email: z.string().email({ message: "Email inválido" }),
    instituicao: z.string().min(3, { message: "Instituição deve ter pelo menos 3 caracteres" }),
    cargo: z.string().min(2, { message: "Cargo deve ter pelo menos 2 caracteres" }),
    telefone: z.string().min(10, { message: "Telefone deve ter pelo menos 10 dígitos" }),
    tipoInscricao: z.string({ required_error: "Selecione o tipo de inscrição" }),
    senha: z
      .string()
      .min(8, { message: "Senha deve ter pelo menos 8 caracteres" })
      .regex(/[A-Z]/, { message: "Senha deve conter pelo menos uma letra maiúscula" })
      .regex(/[0-9]/, { message: "Senha deve conter pelo menos um número" }),
    confirmarSenha: z.string(),
    termos: z.boolean().refine((val) => val === true, { message: "Você deve aceitar os termos" }),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  })

type InscricaoFormValues = z.infer<typeof inscricaoSchema>

export default function Inscricao() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // Valores padrão do formulário
  const defaultValues: Partial<InscricaoFormValues> = {
    nome: "",
    sobrenome: "",
    email: "",
    instituicao: "",
    cargo: "",
    telefone: "",
    tipoInscricao: "",
    senha: "",
    confirmarSenha: "",
    termos: false,
  }

  // Configuração do formulário com React Hook Form e Zod
  const form = useForm<InscricaoFormValues>({
    resolver: zodResolver(inscricaoSchema),
    defaultValues,
  })

  // Função para lidar com o envio do formulário
  async function onSubmit(data: InscricaoFormValues) {
    setIsSubmitting(true)

    try {
      // Simulação de envio para API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mostrar toast de sucesso
      toast({
        title: "Inscrição realizada com sucesso!",
        description: "Você receberá um email com instruções para confirmar sua conta.",
      })

      // Redirecionar para página de login
      router.push("/login?registered=true")
    } catch (error) {
      toast({
        title: "Erro ao realizar inscrição",
        description: "Ocorreu um erro ao processar sua inscrição. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Inscreva-se no CONCIFA 2025</h1>
            <p className="text-xl text-gray-200">Participe do maior congresso de ciências forenses e afins do Brasil</p>
          </div>
        </div>
      </section>

      {/* Formulário de Inscrição */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Formulário de Inscrição</CardTitle>
                  <CardDescription>
                    Preencha os campos abaixo para se inscrever no CONCIFA 2025. Todos os campos são obrigatórios.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="nome"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome</FormLabel>
                              <FormControl>
                                <Input placeholder="Digite seu nome" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="sobrenome"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sobrenome</FormLabel>
                              <FormControl>
                                <Input placeholder="Digite seu sobrenome" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="seu.email@exemplo.com" {...field} />
                            </FormControl>
                            <FormDescription>
                              Usaremos este email para enviar informações sobre o evento e sua inscrição.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="instituicao"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Instituição</FormLabel>
                              <FormControl>
                                <Input placeholder="Nome da instituição" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="cargo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cargo/Função</FormLabel>
                              <FormControl>
                                <Input placeholder="Ex: Estudante, Professor, Pesquisador" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="telefone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Telefone</FormLabel>
                              <FormControl>
                                <Input placeholder="(00) 00000-0000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="tipoInscricao"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tipo de Inscrição</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione o tipo de inscrição" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="estudante_graduacao">Estudante de Graduação</SelectItem>
                                  <SelectItem value="estudante_pos">Estudante de Pós-Graduação</SelectItem>
                                  <SelectItem value="professor">Professor/Pesquisador</SelectItem>
                                  <SelectItem value="profissional">Profissional</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="senha"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Senha</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="********" {...field} />
                              </FormControl>
                              <FormDescription>
                                Mínimo 8 caracteres, com pelo menos uma letra maiúscula e um número.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="confirmarSenha"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirmar Senha</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="********" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="termos"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Aceito os termos de uso e política de privacidade</FormLabel>
                              <FormDescription>
                                Ao se inscrever, você concorda com os{" "}
                                <Link href="/termos-de-uso" className="text-blue-600 hover:underline">
                                  termos de uso
                                </Link>{" "}
                                e{" "}
                                <Link href="/politica-de-privacidade" className="text-blue-600 hover:underline">
                                  política de privacidade
                                </Link>{" "}
                                do CONCIFA.
                              </FormDescription>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processando...
                          </>
                        ) : (
                          "Finalizar Inscrição"
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="text-sm text-gray-500 text-center w-full">
                    Já possui uma conta?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline">
                      Faça login
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

  
    </Layout>
  )
}
