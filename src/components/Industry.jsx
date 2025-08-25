import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { industries as INDUSTRIES } from "../data/mock"
import { TrendingUp, DollarSign, Users, Zap, Shield, GraduationCap } from "lucide-react"
import BigC from "../assets/symbols/hero-icon.png"

const industryIcons = {
  finance: DollarSign,
  healthcare: Shield,
  retail: Users,
  manufacturing: Zap,
  government: Shield,
  education: GraduationCap,
}

export default function Industry({ selectedIndustry, setSelectedIndustry }) {
  // Safe list
  const list = Array.isArray(INDUSTRIES) ? INDUSTRIES : []
  if (!list.length) return null

  // Hybrid controlled/uncontrolled selection
  const [internalId, setInternalId] = useState(
    list.find((i) => i.id === selectedIndustry)?.id || list[0].id
  )
  const effectiveId = selectedIndustry ?? internalId

  const selectedData = useMemo(
    () => list.find((i) => i.id === effectiveId) || list[0],
    [list, effectiveId]
  )

  const handleSelect = (id) => {
    if (setSelectedIndustry) setSelectedIndustry(id)
    setInternalId(id)
  }

  return (
    <section className="split-section" id="industries">
      {/* Left Half — Industry Selector (White) */}
      <div className="split-half white">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="display-medium mb-4">Which industry are you?</h2>
            <p className="body-medium text-gray-600 mb-12">
              Select your industry to see personalized solutions and case studies.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {list.map((industry) => {
                const Icon = industryIcons[industry.id] ?? Users
                const isSelected = effectiveId === industry.id

                return (
                  <motion.button
                    key={industry.id}
                    onClick={() => handleSelect(industry.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={[
                      "p-6 border-2 transition-all duration-300 cursor-pointer",
                      "lift-base hover:lift-on",
                      isSelected
                        ? "border-brand-primary brand-radial bg-white"
                        : "border-gray-300 hover:border-brand-primary hover:brand-radial bg-white",
                    ].join(" ")}
                  >
                    <Icon
                      size={28}
                      className={`mb-4 ${isSelected ? "text-brand-primary" : "text-gray-600"}`}
                    />
                    <h3
                      className={`heading-3 mb-2 ${
                        isSelected ? "text-brand-primary" : "text-gray-900"
                      }`}
                    >
                      {industry.name}
                    </h3>
                    <p className="body-small text-gray-600">{industry.description}</p>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Half — Selected Industry Details (White with gray containers) */}
      <div className="split-half white relative overflow-hidden px-20">
        <div className="w-full max-w-2xl">
          <motion.div
            key={effectiveId}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Industry Visualization */}
            
              <div className="flex items-center justify-center mb-8">
                <div className="text-center">
                  {/* Smaller icon inside a light gray pill */}
                  
                  <h3 className="display-huge mb-2 text-black">{selectedData.name}</h3>
                  <p className="body-medium text-brand">{selectedData.description}</p>
                </div>
              </div>

            {/* Key Metric — gray container with black text */}
            <motion.div
              className="bg-brand border border-gray-200 p-6 mb-8 lift-base hover:lift-on"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="text-white" size={20} />
                <span className="body-medium text-white/90">Case Study Result</span>
              </div>
              <p className="heading-2 text-white">{selectedData.caseMetric}</p>
            </motion.div>

            {/* Services for Industry — gray items, black text */}
            <div>
              <h4 className="heading-3 my-10 text-black">Key Solutions</h4>
              <div className="space-y-10">
                {selectedData.services.map((service, index) => (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.06 * index }}
                    className="flex items-center gap-3 p-3 bg-gray-100 border border-gray-200 hover:border-brand-primary transition-colors lift-base hover:lift-on"
                  >
                    <div className="w-2 h-2 bg-[var(--color-brand)] rounded-full" />
                    <span className="body-medium text-black">{service}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
