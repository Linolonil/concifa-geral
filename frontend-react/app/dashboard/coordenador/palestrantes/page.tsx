"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Layout from "@/components/layout/Layout"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, Edit, Trash2, ArrowLeft, User, Briefcase, Building } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

// Tipos para palestrantes
interface Palestrante {
  id: string
  nome: string
  cargo: string
  instituicao: string
  bio: string
  foto: string
  email?: string
  telefone?: string
  redesSociais?: {
    linkedin?: string
    twitter?: string
    website?: string
  }
  areasInteresse?: string[]
  edicoes?: string[]
}

export default function GerenciarPalestrantes() {
  const router = useRouter()
  const [userName, setUserName] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [palestrantes, setPalestrantes] = useState<Palestrante[]>([])
  const [termoBusca, setTermoBusca] = useState("")
  const [dialogAberto, setDialogAberto] = useState(false)
  const [modoEdicao, setModoEdicao] = useState(false)
  const [palestranteSelecionado, setPalestranteSelecionado] = useState<Palestrante | null>(null)
  const [dialogConfirmacaoAberto, setDialogConfirmacaoAberto] = useState(false)
  const [palestranteParaExcluir, setPalestranteParaExcluir] = useState<string | null>(null)

  // Formulário
  const [formData, setFormData] = useState({
    nome: "",
    cargo: "",
    instituicao: "",
    bio: "",
    email: "",
    telefone: "",
    linkedin: "",
    twitter: "",
    website: "",
    areasInteresse: "",
    foto: "",
  })

  // Verificar autenticação ao carregar a página
  useEffect(() => {
    // Simulação de verificação de autenticação
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem("concifa_user")
        if (!userData) {
          router.push("/login")
          return
        }

        const user = JSON.parse(userData)
        if (user.tipo !== "coordenador") {
          router.push("/login")
          return
        }

        setUserName(user.nome)
      } catch (error) {
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()

    // Carregar dados simulados de palestrantes
    setPalestrantes([
      {
        id: "p1",
        nome: "Dra. Ana Silva",
        cargo: "Especialista em Ciências Forenses",
        instituicao: "Universidade Federal de São Paulo",
        bio: "Doutora em Ciências Forenses com mais de 15 anos de experiência em análise de vestígios biológicos. Coordenadora do Laboratório de Análises Forenses da UNIFESP e autora de diversos artigos científicos na área.",
        foto: "/images/speaker-1.jpg",
        email: "ana.silva@exemplo.com",
        telefone: "(11) 98765-4321",
        redesSociais: {
          linkedin: "https://linkedin.com/in/anasilva",
          twitter: "https://twitter.com/anasilva",
          website: "https://anasilva.com.br",
        },
        areasInteresse: ["Análise de DNA", "Vestígios Biológicos", "Genética Forense"],
        edicoes: ["2023", "2024", "2025"],
      },
      {
        id: "p2",
        nome: "Dr. Carlos Mendes",
        cargo: "Pesquisador em IA Forense",
        instituicao: "Instituto de Tecnologia",
        bio: "Especialista em aplicação de inteligência artificial na análise de evidências digitais. Doutor em Ciência da Computação com foco em Machine Learning aplicado à Computação Forense.",
        foto: "/images/speaker-2.jpg",
        email: "carlos.mendes@exemplo.com",
        telefone: "(21) 97654-3210",
        redesSociais: {
          linkedin: "https://linkedin.com/in/carlosmendes",
        },
        areasInteresse: ["Inteligência Artificial", "Computação Forense", "Evidências Digitais"],
        edicoes: ["2024", "2025"],
      },
      {
        id: "p3",
        nome: "Profa. Juliana Costa",
        cargo: "Perita Criminal",
        instituicao: "Polícia Federal",
        bio: "Perita criminal com foco em análise de dispositivos móveis e recuperação de dados. Professora convidada em cursos de especialização em Perícia Criminal.",
        foto: "/images/speaker-3.jpg",
        email: "juliana.costa@exemplo.com",
        telefone: "(31) 96543-2109",
        areasInteresse: ["Perícia em Dispositivos Móveis", "Recuperação de Dados", "Crimes Cibernéticos"],
        edicoes: ["2022", "2023", "2024", "2025"],
      },
      {
        id: "p4",
        nome: "Dr. Roberto Almeida",
        cargo: "Especialista em Comportamento Criminal",
        instituicao: "Universidade de Brasília",
        bio: "Psicólogo forense especializado em análise comportamental e perfil criminal. Consultor em casos de crimes seriais e autor de livros sobre psicologia criminal.",
        foto: "/images/speaker-4.jpg",
        email: "roberto.almeida@exemplo.com",
        redesSociais: {
          website: "https://robertoalmeida.com.br",
        },
        areasInteresse: ["Psicologia Forense", "Perfil Criminal", "Comportamento Humano"],
        edicoes: ["2023", "2025"],
      },
    ])
  }, [router])

  // Filtrar palestrantes com base no termo de busca
  const palestrantesFiltrados = palestrantes.filter((palestrante) => {
    if (!termoBusca) return true

    const termo = termoBusca.toLowerCase()
    return (
      palestrante.nome.toLowerCase().includes(termo) ||
      palestrante.cargo.toLowerCase().includes(termo) ||
      palestrante.instituicao.toLowerCase().includes(termo) ||
      palestrante.bio.toLowerCase().includes(termo) ||
      (palestrante.areasInteresse && palestrante.areasInteresse.some((area) => area.toLowerCase().includes(termo)))
    )
  })

  // Abrir diálogo para adicionar novo palestrante
  const abrirDialogoAdicionar = () => {
    setFormData({
      nome: "",
      cargo: "",
      instituicao: "",
      bio: "",
      email: "",
      telefone: "",
      linkedin: "",
      twitter: "",
      website: "",
      areasInteresse: "",
      foto: "/images/speaker-1.jpg", // Foto padrão
    })
    setModoEdicao(false)
    setPalestranteSelecionado(null)
    setDialogAberto(true)
  }

  // Abrir diálogo para editar palestrante existente
  const abrirDialogoEditar = (palestrante: Palestrante) => {
    setFormData({
      nome: palestrante.nome,
      cargo: palestrante.cargo,
      instituicao: palestrante.instituicao,
      bio: palestrante.bio,
      email: palestrante.email || "",
      telefone: palestrante.telefone || "",
      linkedin: palestrante.redesSociais?.linkedin || "",
      twitter: palestrante.redesSociais?.twitter || "",
      website: palestrante.redesSociais?.website || "",
      areasInteresse: palestrante.areasInteresse ? palestrante.areasInteresse.join(", ") : "",
      foto: palestrante.foto,
    })
    setModoEdicao(true)
    setPalestranteSelecionado(palestrante)
    setDialogAberto(true)
  }

  // Abrir diálogo de confirmação para excluir palestrante
  const confirmarExclusao = (id: string) => {
    setPalestranteParaExcluir(id)
    setDialogConfirmacaoAberto(true)
  }

  // Excluir palestrante
  const excluirPalestrante = () => {
    if (palestranteParaExcluir) {
      setPalestrantes(palestrantes.filter((p) => p.id !== palestranteParaExcluir))
      setDialogConfirmacaoAberto(false)
      setPalestranteParaExcluir(null)
      toast({
        title: "Palestrante excluído com sucesso!",
        description: "O palestrante foi removido da lista.",
      })
    }
  }

  // Atualizar campo do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Salvar palestrante (adicionar ou editar)
  const salvarPalestrante = () => {
    // Validar campos obrigatórios
    if (!formData.nome || !formData.cargo || !formData.instituicao || !formData.bio) {
      toast({
        title: "Erro ao salvar",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    // Converter áreas de interesse para array
    const areasInteresse = formData.areasInteresse ? formData.areasInteresse.split(",").map((area) => area.trim()) : []

    // Criar objeto de redes sociais
    const redesSociais: { linkedin?: string; twitter?: string; website?: string } = {}
    if (formData.linkedin) redesSociais.linkedin = formData.linkedin
    if (formData.twitter) redesSociais.twitter = formData.twitter
    if (formData.website) redesSociais.website = formData.website

    if (modoEdicao && palestranteSelecionado) {
      // Editar palestrante existente
      const novoPalestrante: Palestrante = {
        ...palestranteSelecionado,
        nome: formData.nome,
        cargo: formData.cargo,
        instituicao: formData.instituicao,
        bio: formData.bio,
        foto: formData.foto,
        email: formData.email || undefined,
        telefone: formData.telefone || undefined,
        redesSociais: Object.keys(redesSociais).length > 0 ? redesSociais : undefined,
        areasInteresse: areasInteresse.length > 0 ? areasInteresse : undefined,
      }

      setPalestrantes(palestrantes.map((p) => (p.id === palestranteSelecionado.id ? novoPalestrante : p)))
      toast({
        title: "Palestrante atualizado com sucesso!",
        description: "As informações do palestrante foram atualizadas.",
      })
    } else {
      // Adicionar novo palestrante
      const novoPalestrante: Palestrante = {
        id: `p${palestrantes.length + 1}`,
        nome: formData.nome,
        cargo: formData.cargo,
        instituicao: formData.instituicao,
        bio: formData.bio,
        foto: formData.foto,
        email: formData.email || undefined,
        telefone: formData.telefone || undefined,
        redesSociais: Object.keys(redesSociais).length > 0 ? redesSociais : undefined,
        areasInteresse: areasInteresse.length > 0 ? areasInteresse : undefined,
        edicoes: ["2025"], // Por padrão, adicionar à edição atual
      }

      setPalestrantes([...palestrantes, novoPalestrante])
      toast({
        title: "Palestrante adicionado com sucesso!",
        description: "O novo palestrante foi adicionado à lista.",
      })
    }

    setDialogAberto(false)
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <button onClick={() => router.push("/dashboard/coordenador")} className="text-white hover:text-blue-200">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-3xl font-bold">Gerenciar Palestrantes</h1>
            </div>
            <p className="text-xl text-gray-200">
              Adicione, edite e gerencie os palestrantes do CONCIFA 2025 e edições anteriores.
            </p>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Palestrantes Cadastrados</CardTitle>
                    <CardDescription>Total de {palestrantes.length} palestrantes no sistema</CardDescription>
                  </div>
                  <Button onClick={abrirDialogoAdicionar}>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Palestrante
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Buscar por nome, cargo, instituição..."
                      className="pl-10"
                      value={termoBusca}
                      onChange={(e) => setTermoBusca(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  {palestrantesFiltrados.length > 0 ? (
                    palestrantesFiltrados.map((palestrante) => (
                      <motion.div
                        key={palestrante.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card>
                          <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row">
                              <div className="md:w-1/4 relative h-48 md:h-auto">
                                <Image
                                  src={palestrante.foto || "/placeholder.svg"}
                                  alt={palestrante.nome}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="p-6 md:w-3/4">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                  <div>
                                    <h3 className="text-xl font-bold text-blue-900">{palestrante.nome}</h3>
                                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-gray-600 mt-1">
                                      <div className="flex items-center">
                                        <Briefcase className="h-4 w-4 mr-1 text-gray-400" />
                                        {palestrante.cargo}
                                      </div>
                                      <div className="flex items-center">
                                        <Building className="h-4 w-4 mr-1 text-gray-400" />
                                        {palestrante.instituicao}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => abrirDialogoEditar(palestrante)}>
                                      <Edit className="h-4 w-4 mr-1" />
                                      Editar
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-red-500 hover:text-red-700"
                                      onClick={() => confirmarExclusao(palestrante.id)}
                                    >
                                      <Trash2 className="h-4 w-4 mr-1" />
                                      Excluir
                                    </Button>
                                  </div>
                                </div>

                                <p className="text-gray-700 mb-4 line-clamp-3">{palestrante.bio}</p>

                                <div className="flex flex-wrap gap-2 mb-3">
                                  {palestrante.edicoes?.map((edicao) => (
                                    <span
                                      key={edicao}
                                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                    >
                                      CONCIFA {edicao}
                                    </span>
                                  ))}
                                </div>

                                {palestrante.areasInteresse && (
                                  <div className="text-sm text-gray-500">
                                    <span className="font-medium">Áreas de interesse: </span>
                                    {palestrante.areasInteresse.join(", ")}
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhum palestrante encontrado</h3>
                      <p className="text-gray-500">
                        Não foram encontrados palestrantes com os critérios de busca selecionados.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Diálogo para adicionar/editar palestrante */}
      <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{modoEdicao ? "Editar Palestrante" : "Adicionar Novo Palestrante"}</DialogTitle>
            <DialogDescription>
              {modoEdicao
                ? "Edite as informações do palestrante conforme necessário."
                : "Preencha os dados para adicionar um novo palestrante ao sistema."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="md:col-span-2 flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="relative h-48 w-full rounded-md overflow-hidden">
                  <Image
                    src={formData.foto || "/placeholder.svg"}
                    alt="Foto do palestrante"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-2">
                  <Label htmlFor="foto">URL da Foto</Label>
                  <Input
                    id="foto"
                    name="foto"
                    value={formData.foto}
                    onChange={handleInputChange}
                    placeholder="URL da imagem"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recomendado: 400x400px, formato quadrado</p>
                </div>
              </div>
              <div className="md:w-2/3 space-y-4">
                <div>
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Ex: Dra. Ana Silva"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cargo">Cargo/Função *</Label>
                  <Input
                    id="cargo"
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleInputChange}
                    placeholder="Ex: Especialista em Ciências Forenses"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="instituicao">Instituição *</Label>
                  <Input
                    id="instituicao"
                    name="instituicao"
                    value={formData.instituicao}
                    onChange={handleInputChange}
                    placeholder="Ex: Universidade Federal de São Paulo"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="bio">Biografia *</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Breve biografia do palestrante..."
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="email@exemplo.com"
              />
            </div>

            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="areasInteresse">Áreas de Interesse</Label>
              <Input
                id="areasInteresse"
                name="areasInteresse"
                value={formData.areasInteresse}
                onChange={handleInputChange}
                placeholder="Separe as áreas por vírgula (ex: Análise de DNA, Vestígios Biológicos)"
              />
            </div>

            <div className="md:col-span-2">
              <h3 className="text-sm font-medium mb-2">Redes Sociais</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    placeholder="URL do perfil"
                  />
                </div>
                <div>
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    placeholder="URL do perfil"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="URL do site pessoal"
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogAberto(false)}>
              Cancelar
            </Button>
            <Button onClick={salvarPalestrante}>{modoEdicao ? "Salvar Alterações" : "Adicionar Palestrante"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmação para excluir palestrante */}
      <Dialog open={dialogConfirmacaoAberto} onOpenChange={setDialogConfirmacaoAberto}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este palestrante? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogConfirmacaoAberto(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={excluirPalestrante}>
              Sim, Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}
