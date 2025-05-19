"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { UserMenu } from "@/components/UserMenu"

type NavItem = {
  name: string
  path: string
  children?: NavItem[]
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems: NavItem[] = [
  { name: "INICIO", path: "/" },
    { name: "SOBRE", path: "/sobre" },
    {
      name: "EVENTO",
      path: "/evento",
      children: [
        { name: "PROGRAMAÇÃO", path: "/programacao" },
        { name: "PALESTRANTES", path: "/palestrantes" },
      ],
    },
    { name: "SUBMISSÃO", path: "/submissao" },
    { name: "PUBLICAÇÕES", path: "/publicacoes" },
    { name: "EDIÇÕES", path: "/edicoes" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) =>
    path === "/" ? pathname === path : pathname.startsWith(path)

  const renderNavItem = (item: NavItem) => {
    if (item.children) {
      return (
        <DropdownMenu key={item.path}>
          <DropdownMenuTrigger
            className={cn(
              "px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1",
              (item.children.some(child => isActive(child.path)))
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            )}
          >
            {item.name}
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {item.children.map((child) => (
              <DropdownMenuItem key={child.path} asChild>
                <Link href={child.path}>{child.name}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    return (
      <Link key={item.path} href={item.path}>
        <div
          className={cn(
            "px-3 py-2 rounded-md text-sm font-medium transition-colors",
            isActive(item.path)
              ? "bg-blue-50 text-blue-600"
              : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
          )}
        >
          {item.name}
        </div>
      </Link>
    )
  }

  
  return (
    <>
    <div></div>
      {/* Top bar */}
      <div className="bg-blue-600 text-white py-1 px-4 text-xs md:text-sm sticky top-0 z-50">
        <div className="container mx-auto flex justify-between z-50">
          <div>16 maio 2025 (08:35 am)</div>
          <div>ISSN: 2966-425X</div>
        </div>
      </div>

      {/* Header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 bg-white",
          scrolled ? "shadow-md py-2" : "py-3"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between flex-wrap gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center relative z-10">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Image
                src="/images/CONCIFA-1.png"
                alt="CONCIFA"
                width={150}
                height={50}
                className="h-10 w-auto object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map(renderNavItem)}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex gap-2">
            <UserMenu />
          </div>

          {/* Mobile Navigation */}
          <div className="flex lg:hidden items-center gap-2">
            <UserMenu />

            {/* Menu Mobile */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="z-10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[350px] pt-12">
                <div className="py-4 space-y-4">
                  {navItems.map((item) => {
                    if (item.children) {
                      return (
                        <div key={item.path} className="space-y-2">
                          <div className="px-4 py-2 text-sm font-medium text-gray-500">
                            {item.name}
                          </div>
                          {item.children.map((child) => (
                            <Link
                              key={child.path}
                              href={child.path}
                              onClick={() => setIsOpen(false)}
                            >
                              <div
                                className={cn(
                                  "block px-8 py-2 text-sm font-medium",
                                  isActive(child.path)
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                                )}
                              >
                                {child.name}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )
                    }

                    return (
                      <Link key={item.path} href={item.path} onClick={() => setIsOpen(false)}>
                        <div
                          className={cn(
                            "block px-4 py-3 rounded-md text-sm font-medium",
                            isActive(item.path)
                              ? "bg-blue-50 text-blue-600"
                              : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                          )}
                        >
                          {item.name}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  )
}

