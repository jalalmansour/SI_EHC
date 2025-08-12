"use client"
import { motion } from "framer-motion"
import Header from "../components/Header"
import HeroSection from "../components/HeroSection"
import FeaturesSection from "../components/FeaturesSection"
import ActorsSection from "../components/ActorsSection"
import MissionSection from "../components/MissionSection"
import BenefitsSection from "../components/BenefitsSection"
import TestimonialCarousel from "../components/TestimonialCarousel"
import CtaSection from "../components/CtaSection"
import Footer from "../components/Footer"

const LandingPage = () => {
  return (
    <motion.div
      className="landing-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ActorsSection />
        <MissionSection />
        <BenefitsSection />
        <TestimonialCarousel />
        <CtaSection />
      </main>
      <Footer />
    </motion.div>
  )
}

export default LandingPage
