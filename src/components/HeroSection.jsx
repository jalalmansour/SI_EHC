"use client"
import { Button } from "antd"
import { ArrowRightOutlined, PlayCircleOutlined } from "@ant-design/icons"
import { motion } from "framer-motion"

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <section className="hero-section">
      <div className="hero-background">
        <motion.div
          className="hero-shape hero-shape-1"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        />
        <motion.div
          className="hero-shape hero-shape-2"
          animate={{
            rotate: -360,
            scale: [1, 0.9, 1],
          }}
          transition={{
            rotate: { duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        />
      </div>

      <motion.div className="hero-content" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <h1 className="hero-title">
            Transformez votre
            <span className="hero-title-gradient"> Formation</span>
            <br />
            avec INGÉNIA
          </h1>
        </motion.div>

        <motion.p className="hero-subtitle" variants={itemVariants}>
          La plateforme intelligente qui révolutionne la gestion de la formation professionnelle. Optimisez vos budgets,
          suivez vos compétences et maximisez l'impact de vos formations.
        </motion.p>

        <motion.div className="hero-buttons" variants={itemVariants}>
          <Button
            type="primary"
            size="large"
            className="hero-button hero-button-primary"
            icon={<ArrowRightOutlined />}
            href="/signup"
          >
            Commencer gratuitement
          </Button>
          <Button size="large" className="hero-button hero-button-secondary" icon={<PlayCircleOutlined />}>
            Voir la démo
          </Button>
        </motion.div>

        <motion.div className="hero-stats" variants={itemVariants}>
          <div className="hero-stat">
            <div className="hero-stat-number">500+</div>
            <div className="hero-stat-label">Entreprises</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">50k+</div>
            <div className="hero-stat-label">Utilisateurs</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">98%</div>
            <div className="hero-stat-label">Satisfaction</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
