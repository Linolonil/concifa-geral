import type { Metadata } from "next"
import ClientLayout from "@/components/layout/ClientLayout"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

const navItems = [
  { name: "Início", href: "/" },
  { name: "Programação", href: "/programacao" },
  { name: "Inscrições", href: "/inscricoes" },
  { name: "Sobre", href: "/sobre" },
]

export const metadata: Metadata = {
  title: "CONCIFA - Congresso de Ciências Forenses",
  description: "Congresso de Ciências Forenses",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={cn(inter.className)}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
