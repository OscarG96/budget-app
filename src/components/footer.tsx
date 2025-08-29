import { Facebook, Instagram, Twitter } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center py-6 mt-auto">
    <p>© 2025 BudgetMaster. All rights reserved.</p>
    <nav className="mt-2 space-x-4">
      <Link href="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
      <Link href="/contact" className="hover:text-gray-400">Contact</Link>
    </nav>
  </footer>
  )
}