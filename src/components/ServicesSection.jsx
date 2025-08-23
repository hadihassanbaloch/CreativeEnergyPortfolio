import React from "react"
import { motion } from "framer-motion"
import { services } from "../data/mock"
import {
  Palette,
  Code,
  Target,
  Brain,
  TrendingUp,
  ShoppingCart,
  ArrowRight,
  Check,
} from "lucide-react"

const serviceIcons = { Palette, Code, Target, Brain, TrendingUp, ShoppingCart }

export default function ServicesSection() {
  return (
    <section className="split-section" id="services">
      {/* LEFT — Stats + pitch */}
      <div className="split-half bg-white text-black px-20">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="display-huge mb-4">What we do</h2>
            <p className="font-regular text-black/80 mb-8 mx-4">
              End-to-end transformation that turns ambitious ideas into market-leading products.
              Strategy, design, engineering, and AI — delivered as one team.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-5 mb-10">
              <div className="card bg-white/80 p-5 lift-base hover:lift-on">
                <p className="body-small text-black/60">Core services</p>
                <p className="heading-2 text-black">{services.length}</p>
              </div>
              <div className="card bg-white/80 p-2 lift-base hover:lift-on">
                <p className="body-small text-black/60">Avg. time to MVP</p>
                <p className="heading-2 text-black">6–10 wks</p>
              </div>
            </div>

            {/* What you get */}
            <div className="bg-white p-5 border border-black/10 rounded-2xl">
              <p className="heading-3 mb-3">What you get</p>
              <ul className="space-y-2">
                {[
                  "Strategy & roadmaps tied to KPIs",
                  "Product design system & tokens",
                  "Modern web stack + CI/CD",
                  "AI features with eval & guardrails",
                ].map((line) => (
                  <li className="flex items-center gap-2 body-small" key={line}>
                    <Check size={16} />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <button
                className="btn-primary mt-5"
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.querySelector("#contact")
                  if (!el) return
                  const y = el.getBoundingClientRect().top + window.scrollY - 72
                  window.scrollTo({ top: y, behavior: "smooth" })
                }}
              >
                Get a tailored plan <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* RIGHT — Services grid with brand-shadow hover */}
      <div className="split-half bg-black">
        <div className="w-full max-w-4xl">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {services.map((service, index) => {
              const Icon = serviceIcons[service.icon] ?? Target
              const hasHighlights =
                Array.isArray(service.highlights) && service.highlights.length > 0
              const hasDeliverables =
                Array.isArray(service.deliverables) && service.deliverables.length > 0

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.01 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: " 4px 12px 30px rgba(255,91,77,0.9)", // brand color shadow only
                  }}
                  className="group card p-6 bg-white border border-black/10 cursor-pointer transition-all duration-300"
                >
                  {/* header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="icon-badge text-brand">
                      <Icon size={24}  />
                    </div>
                  </div>

                  <h3 className="heading-3 mb-2 text-gray-900 group-hover:text-brand-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="body-small text-gray-600 mb-4">
                    {service.description}
                  </p>

                  {/* KPI area */}
                  <div className="rounded-lg border border-black/10 bg-gray-50 p-3 mb-4">
                    <p className="body-small text-black/60 mb-1">Impact</p>
                    <p className="body-medium text-black font-semibold">
                      {service.kpi}
                    </p>
                  </div>

                  {/* Highlights */}
                  {hasHighlights && (
                    <div className="mb-3">
                      <p className="body-small text-black/60 mb-2">Highlights</p>
                      <ul className="space-y-1">
                        {service.highlights.slice(0, 3).map((h) => (
                          <li
                            key={h}
                            className="flex items-center gap-2 body-small text-black"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Deliverables */}
                  {hasDeliverables && (
                    <div className="mt-2">
                      <p className="body-small text-black/60 mb-2">Deliverables</p>
                      <div className="flex flex-wrap gap-2">
                        {service.deliverables.slice(0, 4).map((d) => (
                          <span key={d} className="pill">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="mt-5 flex items-center gap-2 text-black/70 group-hover:text-brand transition-colors">
                    <span className="body-small">Show me a plan</span>
                    <ArrowRight size={16} />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
