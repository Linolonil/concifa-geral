import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sobre */}
          <div>
            <h3 className="text-xl font-bold mb-4">Sobre o CONCIFA</h3>
            <p className="text-gray-300 mb-4">
              O Congresso Nacional de Ciências Forenses e Afins (CONCIFA) é um evento científico que reúne
              profissionais, pesquisadores e estudantes interessados nas áreas de ciências forenses e campos
              relacionados.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="https://facebook.com" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="https://instagram.com" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="https://twitter.com" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="https://linkedin.com" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/programacao" className="text-gray-300 hover:text-white transition-colors">
                  Programação
                </Link>
              </li>
              <li>
                <Link href="/submissao" className="text-gray-300 hover:text-white transition-colors">
                  Submissão
                </Link>
              </li>
              <li>
                <Link href="/publicacoes" className="text-gray-300 hover:text-white transition-colors">
                  Publicações
                </Link>
              </li>
              <li>
                <Link href="/edicoes" className="text-gray-300 hover:text-white transition-colors">
                  Edições
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  Universidade Federal de Ciências Forenses
                  <br />
                  Av. Principal, 1000 - São Paulo, SP
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">(11) 3456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">contato@concifa.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} CONCIFA - Congresso Nacional de Ciências Forenses e Afins. Todos os
              direitos reservados.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/politica-de-privacidade"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link href="/termos-de-uso" className="text-sm text-gray-400 hover:text-white transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
