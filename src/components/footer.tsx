import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold">Your Company Name</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Providing excellent services since 2023
            </p>
          </div>
          <div className="flex space-x-4">
            <button aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </button>
            <button aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </button>
            <button aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}