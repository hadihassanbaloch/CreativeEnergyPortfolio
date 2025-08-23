import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Send,
  Calendar,
  FileText,
  MessageSquare,
  CheckCircle,
  Upload,
  X,
} from "lucide-react"
import { API_BASE } from "../lib/config";

const nextStepOptions = [
  { value: "call", label: "Schedule a call", icon: Calendar },
  { value: "workshop", label: "Strategy workshop", icon: MessageSquare },
  { value: "rfp", label: "Full RFP process", icon: FileText },
]

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    challenge: "",
    nextStep: "call",
    file: null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((p) => ({ ...p, [name]: value }))
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) setFormData((p) => ({ ...p, file }))
  }

  const removeFile = () => setFormData((p) => ({ ...p, file: null }))

  // helper to build FormData for API
  const buildFormData = (data) => {
    const fd = new FormData()
    fd.append("name", data.name)
    fd.append("email", data.email)
    fd.append("company", data.company || "")
    fd.append("challenge", data.challenge)
    fd.append("nextStep", data.nextStep)
    if (data.file) fd.append("file", data.file)
    return fd
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const body = buildFormData(formData)

      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        body,
      });

      const json = await res.json().catch(() => ({}))
      if (!res.ok || !json.ok) throw new Error(json.error || "Send failed")

      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          email: "",
          company: "",
          challenge: "",
          nextStep: "call",
          file: null,
        })
      }, 3000)
    } catch (err) {
      console.error(err)
      alert("There was a problem sending your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="split-section" id="contact">
      {/* Left — info (white) */}
      <div className="split-half white bg-black px-20">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="display-medium mb-6 text-white">Start your transformation</h2>
            <p className="font-regular text-white/70 mb-8">
              Ready to turn your vision into reality? Let's discuss how we can help you achieve
              breakthrough results.
            </p>

            <div className="space-y-6 mb-8 mt-20">
              {[
                { step: "1", title: "Quick Brief", body: "Tell us about your challenge in 3 fields" },
                { step: "2", title: "Choose Next Step", body: "Call, workshop, or full RFP — your choice" },
                { step: "3", title: "Get Started", body: "Response within 24 hours guaranteed" },
              ].map((row) => (
                <div className="flex items-start gap-4" key={row.step}>
                  <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white font-bold">{row.step}</span>
                  </div>
                  <div>
                    <h4 className="heading-3 mb-2 text-white">{row.title}</h4>
                    <p className="body-medium text-white/70">{row.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl md:mt-20 bg-[var(--color-brand)] border border-brand-primary">
              <h4 className="heading-3 text-black mb-2">24-Hour Response Guarantee</h4>
              <p className="body-medium text-black/80">
                We'll review your brief and get back to you with next steps within one business day.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right — form (black) */}
      <div className="split-half black bg-white px-20">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* name + email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-regular text-black mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your full name"
                      className="w-full p-4 bg-black/5 border border-black/15 text-black placeholder-black/40 focus:border-[var(--color-brand)] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-regular text-black mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="you@company.com"
                      className="w-full p-4 bg-black/5 border border-black/15 text-black placeholder-black/40 focus:border-[var(--color-brand)] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* company */}
                <div>
                  <label className="block font-regular text-black mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your company name"
                    className="w-full p-4 bg-black/5 border border-black/15 text-black placeholder-black/40 focus:border-[var(--color-brand)] focus:outline-none transition-colors"
                  />
                </div>

                {/* challenge */}
                <div>
                  <label className="block font-regular text-black mb-2">Challenge Description *</label>
                  <textarea
                    name="challenge"
                    value={formData.challenge}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Describe your challenge, goals, and timeline..."
                    className="w-full p-4 bg-black/5 border border-black/15 text-black placeholder-black/40 focus:border-[var(--color-brand)] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* file upload */}
                <div>
                  <label className="block font-regular text-black mb-2">Attach File (Optional)</label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.doc,.docx,.txt"
                    />
                    <label
                      htmlFor="file-upload"
                      className="w-full p-4 bg-black/5 border border-black/15 border-dashed text-black/60 hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors cursor-pointer flex items-center justify-center gap-3"
                    >
                      <Upload size={20} />
                      <span>Upload brief, requirements, or relevant documents</span>
                    </label>

                    {formData.file && (
                      <div className="mt-2 flex items-center justify-between p-3 rounded-lg bg-[var(--color-brand)] border border-brand-primary">
                        <span className="font-regular text-black">{formData.file.name}</span>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="text-black/80 hover:text-black transition-colors"
                          aria-label="Remove file"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* next step options */}
                <div>
                  <label className="block font-regualar text-black mb-2">Preferred Next Step</label>
                  <div className="grid grid-cols-1 gap-3">
                    {nextStepOptions.map((opt) => {
                      const Icon = opt.icon
                      const active = formData.nextStep === opt.value
                      return (
                        <motion.label
                          key={opt.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={[
                            "flex items-center gap-4 p-4 border-2 cursor-pointer transition-all duration-300",
                            active
                              ? "border-[var(--color-brand)] bg-[color:rgb(255_91_77_/_.10)]"
                              : "border-black/15 bg-black/5 hover:border-[var(--color-brand)]",
                          ].join(" ")}
                        >
                          <input
                            type="radio"
                            name="nextStep"
                            value={opt.value}
                            checked={active}
                            onChange={handleInputChange}
                            className="hidden"
                          />
                          <Icon size={20} className={active ? "text-[var(--color-brand)]" : "text-black/60"} />
                          <span className={`body-medium ${active ? "text-[var(--color-brand)]" : "text-black"}`}>
                            {opt.label}
                          </span>
                        </motion.label>
                      )
                    })}
                  </div>
                </div>

                {/* submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-60"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        <Send size={16} />
                      </motion.div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Send Brief
                      <Send size={16} />
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <CheckCircle className="text-[var(--color-brand)] mx-auto mb-6" size={64} />
                <h3 className="heading-2 text-[var(--color-brand)] mb-4">Sent Succesfully!</h3>
                <p className="body-large text-black/80 mb-6">
                  Thank you for your submission. We'll review your brief and get back to you within 24 hours.
                </p>
                <p className="body-medium text-black/60">
                  Check your email for a confirmation and next steps.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
