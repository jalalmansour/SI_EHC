import React, { useState, memo, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Button,
  Card,
  Typography,
  Space,
  Row,
  Col,
  Statistic,
  Tag,
  Avatar,
  Spin
} from "antd";
import {
  BookOutlined,
  CalendarOutlined,
  TeamOutlined,
  BarChartOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  RocketOutlined,
  ClockCircleOutlined,
  LockOutlined,
  StarFilled,
  MenuOutlined,
  CloseOutlined,
  UserOutlined,
  BankOutlined,
  TrophyOutlined,
  ThunderboltOutlined
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

// Lazy loaded components for performance
const HeroSection = lazy(() => import("../../components/landing/HeroSection"));
const FeaturesSection = lazy(() => import("../../components/landing/FeaturesSection"));
const ActorsSection = lazy(() => import("../../components/landing/ActorsSection"));
const MissionSection = lazy(() => import("../../components/landing/MissionSection"));
const BenefitsSection = lazy(() => import("../../components/landing/BenefitsSection"));
const CTASection = lazy(() => import("../../components/landing/CTASection"));

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
    <Spin size="large" />
  </div>
);

const HomePage = memo(() => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900">
      {/* Modern Header with Glass Effect */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-white/20 shadow-sm"
      >
        <div className="flex items-center justify-between px-4 py-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
          <motion.div
            className="flex items-center space-x-3 relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex flex-col">
              <img
                className="w-20 h-auto object-contain"
                src="/images/logo.png"
                alt="INGÉNIA Logo"
                loading="lazy"
              />
              <span className="text-sm font-medium text-gray-600 mt-1">
                Ingénierie de Formation
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {["Fonctionnalités", "Utilisateurs", "À propos"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200 relative"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {item}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-teal-50 hover:border-teal-300 bg-transparent"
                onClick={() => navigate('/login')}
              >
                Se connecter
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="primary"
                className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 border-0 shadow-lg"
                icon={<RocketOutlined />}
                onClick={() => navigate('/signup')}
              >
                Demande devis
              </Button>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            type="text"
            icon={isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
            className="md:hidden"
            onClick={handleMobileMenuToggle}
          />
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200"
            >
              <div className="px-4 py-6 space-y-4">
                {["Fonctionnalités", "Utilisateurs", "À propos"].map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="block text-gray-700 hover:text-teal-600 font-medium py-2"
                    whileHover={{ x: 10 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-teal-50"
                  >
                    Se connecter
                  </Button>
                  <Button
                    type="primary"
                    className="w-full bg-gradient-to-r from-teal-600 to-blue-600"
                  >
                    Créer un compte
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial="initial"
        animate={heroInView ? "animate" : "initial"}
        variants={staggerContainer}
        className="relative bg-gradient-to-br from-indigo-50 via-blue-50 to-teal-50 px-4 py-16 md:py-24 lg:py-32 md:px-8 lg:px-12 overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-teal-200/30 rounded-full blur-3xl"
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl"
            animate={{ rotate: -360, scale: [1, 1.2, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            variants={fadeInUp}
            className="lg:w-1/2 text-center lg:text-left z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center bg-gradient-to-r from-teal-100 to-blue-100 text-teal-700 rounded-full px-6 py-2 text-sm font-semibold mb-6 shadow-sm"
            >
              <RocketOutlined className="mr-2" />
              Plateforme nouvelle génération
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
            >
              L'ingénierie de{" "}
              <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                formation
              </span>{" "}
              réinventée
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-700 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              INGÉNIA révolutionne la gestion de la formation en entreprise avec
              une approche complète : planifier, former et évaluer en toute
              simplicité.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="primary"
                  size="large"
                  icon={<ArrowRightOutlined />}
                  className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 border-0 shadow-lg px-8 py-6 h-auto text-base font-semibold"
                >
                  Créer mon compte
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="large"
                  className="border-gray-300 text-gray-700 hover:bg-white hover:border-teal-300 px-8 py-6 h-auto text-base backdrop-blur-sm bg-white/80"
                >
                  Démo gratuite
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-8 text-center"
            >
              {[
                { value: "500+", label: "Formations", color: "text-teal-600" },
                { value: "10K+", label: "Participants", color: "text-blue-600" },
                { value: "98%", label: "Satisfaction", color: "text-indigo-600" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  className="group"
                >
                  <motion.p
                    className={`text-4xl font-bold ${stat.color} mb-1`}
                    initial={{ scale: 0 }}
                    animate={heroInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="lg:w-1/2 relative flex justify-center lg:justify-end"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              <Card
                className="w-full max-w-md h-80 md:h-96 shadow-2xl border-0 overflow-hidden"
                styles={{ body: { padding: 0, height: '100%' } }}
              >
                <div className="relative h-full bg-gradient-to-br from-white to-gray-50 flex items-center justify-center">
                  <img
                    src="/images/dashboard-reference.png"
                    alt="Interface moderne INGÉNIA"
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                </div>
              </Card>

              {/* Floating status card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-4 -left-4 z-10"
              >
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <div className="flex items-center space-x-3 p-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <div>
                      <p className="font-semibold text-sm text-gray-900">127 formations actives</p>
                      <p className="text-xs text-gray-500">En temps réel</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section
        ref={statsRef}
        initial="initial"
        animate={statsInView ? "animate" : "initial"}
        variants={staggerContainer}
        className="py-16 bg-white/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <Row gutter={[32, 32]}>
            {[
              { icon: <BookOutlined />, value: 150, suffix: "+", title: "Formations Disponibles", color: "text-blue-600" },
              { icon: <TeamOutlined />, value: 2500, suffix: "+", title: "Participants Formés", color: "text-green-600" },
              { icon: <TrophyOutlined />, value: 45, suffix: "+", title: "Formateurs Experts", color: "text-yellow-600" },
              { icon: <StarFilled />, value: 98, suffix: "%", title: "Taux de Satisfaction", color: "text-purple-600" }
            ].map((stat, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <motion.div variants={fadeInUp}>
                  <Card
                    className="text-center shadow-lg border-0 hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    bodyStyle={{ padding: '32px 16px' }}
                  >
                    <motion.div
                      className={`text-4xl mb-4 ${stat.color}`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {stat.icon}
                    </motion.div>
                    <Statistic
                      title={<span className="text-gray-600 font-medium">{stat.title}</span>}
                      value={stat.value}
                      suffix={stat.suffix}
                      valueStyle={{ color: stat.color.replace('text-', '#'), fontSize: '32px', fontWeight: 'bold' }}
                    />
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        initial="initial"
        animate={featuresInView ? "animate" : "initial"}
        variants={staggerContainer}
        className="px-4 py-16 md:py-24 md:px-8 lg:px-12 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <Suspense fallback={<LoadingSpinner />}>
          <FeaturesSection />
        </Suspense>
      </motion.section>

      {/* Actors Section */}
      <motion.section className="px-4 py-16 md:py-24 md:px-8 lg:px-12 bg-white">
        <Suspense fallback={<LoadingSpinner />}>
          <ActorsSection />
        </Suspense>
      </motion.section>

      {/* Mission Section */}
      <motion.section className="px-4 py-16 md:py-24 md:px-8 lg:px-12 bg-gradient-to-br from-blue-50 to-indigo-50">
        <Suspense fallback={<LoadingSpinner />}>
          <MissionSection />
        </Suspense>
      </motion.section>

      {/* Benefits Section */}
      <motion.section className="py-16 md:py-24 bg-gradient-to-br from-teal-50 to-blue-50">
        <Suspense fallback={<LoadingSpinner />}>
          <BenefitsSection />
        </Suspense>
      </motion.section>

      {/* CTA Section */}
      <motion.section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
        <Suspense fallback={<LoadingSpinner />}>
          <CTASection />
        </Suspense>
      </motion.section>

      {/* Footer */}
      <footer className="px-4 py-12 md:py-16 lg:py-20 md:px-8 lg:px-12 bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto">
          <Row gutter={[32, 32]} className="mb-12">
            <Col xs={24} md={6}>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <img className="w-20 mb-2" src="/images/logo.png" alt="Logo" />
                  <span className="text-sm font-medium text-gray-300">
                    Ingénierie de Formation
                  </span>
                </div>
                <p className="text-gray-400 text-sm">
                  La plateforme de référence pour l'ingénierie de formation en
                  entreprise. Planifiez, formez et évaluez avec excellence.
                </p>
              </div>
            </Col>

            {[
              {
                title: "Produit",
                links: ["Fonctionnalités", "Utilisateurs", "Tarifs", "Intégrations"]
              },
              {
                title: "Entreprise",
                links: ["À propos", "Blog", "Carrières", "Partenaires"]
              },
              {
                title: "Support",
                links: ["Centre d'aide", "Documentation", "Contact", "Statut"]
              }
            ].map((section, index) => (
              <Col xs={24} md={6} key={index}>
                <h3 className="text-lg font-semibold text-white mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-teal-400 transition-colors duration-200 text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </Col>
            ))}
          </Row>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>© 2024 INGÉNIA. Tous droits réservés.</p>
            <div className="flex justify-center space-x-4 mt-2">
              {["Mentions légales", "Confidentialité", "Cookies", "CGU"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:text-teal-400 transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
});

HomePage.displayName = 'HomePage';

export default HomePage;
