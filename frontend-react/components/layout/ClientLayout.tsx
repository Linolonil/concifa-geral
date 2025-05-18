"use client"

import "@/app/globals.css"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/AuthContext"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={cn(inter.className, "min-h-screen bg-gray-50")}>
      <AuthProvider>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </AuthProvider>
    </div>
  )
} 