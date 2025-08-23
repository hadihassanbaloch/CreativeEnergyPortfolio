import Header from "./components/Header"
import Hero from "./components/Hero"
import Industry from "./components/Industry"
import Process from "./components/Process"
import AIPlayground from "./components/AIPlayground"
import ServicesSection from "./components/ServicesSection"
import ContactSection from "./components/ContactSection"
import Footer from "./components/Footer"
import PricingSection from "./components/PricingSection"
import TeamSection from "./components/TeamSection"

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Industry />
      <ServicesSection />
      <Process />
      <AIPlayground /> 
      <PricingSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

