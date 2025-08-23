import React, { useState } from "react"
import { Menu, X } from "lucide-react"
import Logo from "../assets/symbols/logo.png"

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Process",  href: "#process"  },
  { label: "Cases",    href: "#cases"    },
  { label: "Team",     href: "#team"     },
  { label: "Contact",  href: "#contact"  },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top: y, behavior: "smooth" })
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black/10 py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="inline-flex items-center gap-2">
          <img src={Logo} alt="Creative Energy logo" className="h-12 w-auto" />
          <span className="font-semibold">CreativeEnergy</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.href)}
              className="nav-link-dark hover:nav-link-brand-hover"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={(e) => { e.preventDefault(); scrollTo("#contact") }}
            className="btn-primary ml-4"
          >
            Start Transformation
          </button>
        </nav>

        {/* Mobile toggle (black to match white header) */}
        <button
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/15 text-black"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu (white to match header) */}
      {open && (
        <div className="md:hidden border-t border-black/10 bg-white">
          <nav className="px-4 py-3 flex flex-col gap-1">
            {NAV.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className="w-full rounded-md px-3 py-2 text-left nav-link-dark hover:nav-link-brand-hover hover:bg-black/[.03]"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={(e) => { e.preventDefault(); scrollTo("#contact") }}
              className="btn-primary mt-2"
            >
              Start Transformation
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
