import React, { Suspense, useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import Spline from "@splinetool/react-spline"

export default function Hero() {
  const heroRef = useRef(null)
  const [pointerOn, setPointerOn] = useState(false)

  const setMouseVars = (e) => {
    if (!heroRef.current) return
    heroRef.current.style.setProperty("--mouse-x", `${e.clientX}px`)
    heroRef.current.style.setProperty("--mouse-y", `${e.clientY}px`)
  }

  const smoothScroll = (id) => {
    const el = document.querySelector(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top: y, behavior: "smooth" })
  }

  return (
    <section
      ref={heroRef}
      className="group split-section relative"
      onMouseEnter={() => setPointerOn(true)}
      onMouseLeave={() => setPointerOn(false)}
      onMouseMove={setMouseVars}
    >
      {/* Pointer-follow brand glow across entire hero (Tailwind utilities) */}
      <div className={`pointer-glow ${pointerOn ? "pointer-glow-on" : ""}`} />

      {/* LEFT — Content (black) */}
      <div className="split-half black">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-6 px-10">
              <Sparkles className="text-brand-primary" size={24} />
              <span className="body-medium text-white">Transformations, engineered</span>
            </div>

            <h1 className="display-huge mb-6 text-white px-10">
              Design. <span className="text-white">Build.</span>{" "}
              Advise. <span className="text-white">Integrate AI.</span>{" "}
              Scale commerce.
            </h1>

            <p className="body-large mb-12 text-gray-300 max-w-xl px-10">
              We transform ambitious ideas into market-leading digital products.
              From concept to scale, we engineer solutions that matter.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <motion.button
                className="btn-primary magnetic-button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => { e.preventDefault(); smoothScroll("#contact") }}
              >
                Start Transformation
                <ArrowRight size={20} />
              </motion.button>

              <motion.button
                className="btn-secondary magnetic-button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => { e.preventDefault(); smoothScroll("#cases") }}
              >
                See Industry Demos
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* RIGHT — Spline (white) */}
      <div className="split-half black relative overflow-hidden min-h-[70vh] lg:min-h-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <Suspense
            fallback={
              <div className="flex items-center justify-center w-full h-full">
                <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin-fast" />
              </div>
            }
          >
            <div className="relative h-full w-full">
              {/* Spline canvas */}
              <div className="absolute inset-0 z-0 gpu-boost">
                <Spline
                  scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode"
                  className="h-full w-full"
                />
              </div>

              {/* Pink hover glow around canvas */}
              <div className="spline-glow group-hover:spline-glow-on" />
            </div>
          </Suspense>
        </div>

        {/* Particles (Tailwind animation utility) */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => {
            const colors = ["#FF5B4D", "#00C4FF", "#7C3AED", "#10B981", "#F59E0B"]
            const color = colors[i % colors.length]
            const dur = 1.6 + Math.random() * 1.6
            const delay = Math.random() * 1.4
            const left = `${Math.random() * 100}%`
            const top = `${Math.random() * 100}%`
            return (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full opacity-60 animate-float-pulse"
                style={{
                  left, top, backgroundColor: color,
                  "--dur": `${dur}s`,
                  animationDelay: `${delay}s`,
                }}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
