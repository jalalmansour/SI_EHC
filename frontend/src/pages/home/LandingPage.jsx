"use client";

import React, { useState, memo, lazy, Suspense, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
//import logo from "../assets/images/logo.png"; // ✅ chemin relatif depuis Sidenav.jsx

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
  Spin,
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
  ThunderboltOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  ArrowUpOutlined,
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
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const LoadingSpinner = () => (
  <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
    <Spin size="large" />
  </div>
);

const LandingPage = memo(() => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Refs pour les sections
  const featuresSectionRef = useRef(null);
  const usersSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);

  // InView hooks
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ 
    threshold: 0.3, 
    onChange: (inView) => inView && setActiveSection("features")
  });
  const [usersRef, usersInView] = useInView({ 
    threshold: 0.3, 
    onChange: (inView) => inView && setActiveSection("users")
  });
  const [aboutRef, aboutInView] = useInView({ 
    threshold: 0.3, 
    onChange: (inView) => inView && setActiveSection("about")
  });
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    
    // Observer pour détecter la section active
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);
    
    // Observer les sections
    const featuresElement = document.getElementById('features');
    const usersElement = document.getElementById('users');
    const aboutElement = document.getElementById('about');
    
    if (featuresElement) observer.observe(featuresElement);
    if (usersElement) observer.observe(usersElement);
    if (aboutElement) observer.observe(aboutElement);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (featuresElement) observer.unobserve(featuresElement);
      if (usersElement) observer.unobserve(usersElement);
      if (aboutElement) observer.unobserve(aboutElement);
    };
  }, []);

  const handleMobileMenuToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const handleScrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Handle scroll to section
  const handleScroll = (sectionRef, sectionId) => {
    setActiveSection(sectionId);
    sectionRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    });
  };

  const handleMobileNavClick = (sectionRef, sectionId) => {
    setIsMobileMenuOpen(false);
    setActiveSection(sectionId);
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900">
     
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
                alt="EHC Logo"
                loading="lazy"
              />
              <span className="text-sm font-medium text-gray-600 mt-1">
                Formation Hub
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <motion.button
              className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200 relative cursor-pointer focus:outline-none"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => handleScroll(featuresSectionRef, "features")}
            >
              Fonctionnalités
              <motion.div
                className={`absolute -bottom-1 left-0 h-0.5 bg-teal-600 transition-all duration-300 ${
                  activeSection === "features" ? "w-full" : "w-0"
                }`}
                initial={{ width: 0 }}
                animate={{ width: activeSection === "features" ? "100%" : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200 relative cursor-pointer focus:outline-none"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => handleScroll(usersSectionRef, "users")}
            >
              Utilisateurs
              <motion.div
                className={`absolute -bottom-1 left-0 h-0.5 bg-teal-600 transition-all duration-300 ${
                  activeSection === "users" ? "w-full" : "w-0"
                }`}
                initial={{ width: 0 }}
                animate={{ width: activeSection === "users" ? "100%" : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200 relative cursor-pointer focus:outline-none"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => handleScroll(aboutSectionRef, "about")}
            >
              À propos
              <motion.div
                className={`absolute -bottom-1 left-0 h-0.5 bg-teal-600 transition-all duration-300 ${
                  activeSection === "about" ? "w-full" : "w-0"
                }`}
                initial={{ width: 0 }}
                animate={{ width: activeSection === "about" ? "100%" : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            {/* Auth & Devis Buttons */}
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/login">
                <Button
                  type="text"
                  className="border-teal-600 text-teal-600 hover:bg-teal-50 focus:outline-none"
                >
                  Connexion
                </Button>
              </Link>
              <Link to="/demande-devis">
                <Button
                  type="primary"
                  className="bg-teal-600 hover:bg-teal-700 border-teal-600 focus:outline-none"
                >
                  Demande de devis
                </Button>
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            type="text"
            icon={isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
            className="md:hidden focus:outline-none"
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
                <motion.button
                  className={`block py-2 w-full text-left font-medium focus:outline-none ${
                    activeSection === "features" 
                      ? "text-teal-600 border-l-4 border-teal-600 pl-3" 
                      : "text-gray-700 hover:text-teal-600 pl-4"
                  } transition-all duration-300`}
                  whileHover={{ x: 10 }}
                  onClick={() => handleMobileNavClick(featuresSectionRef, "features")}
                >
                  Fonctionnalités
                </motion.button>
                
                <motion.button
                  className={`block py-2 w-full text-left font-medium focus:outline-none ${
                    activeSection === "users" 
                      ? "text-teal-600 border-l-4 border-teal-600 pl-3" 
                      : "text-gray-700 hover:text-teal-600 pl-4"
                  } transition-all duration-300`}
                  whileHover={{ x: 10 }}
                  onClick={() => handleMobileNavClick(usersSectionRef, "users")}
                >
                  Utilisateurs
                </motion.button>
                
                <motion.button
                  className={`block py-2 w-full text-left font-medium focus:outline-none ${
                    activeSection === "about" 
                      ? "text-teal-600 border-l-4 border-teal-600 pl-3" 
                      : "text-gray-700 hover:text-teal-600 pl-4"
                  } transition-all duration-300`}
                  whileHover={{ x: 10 }}
                  onClick={() => handleMobileNavClick(aboutSectionRef, "about")}
                >
                  À propos
                </motion.button>

                {/* Mobile Auth & Devis Buttons */}
                <div className="pt-4 border-t border-gray-200 space-y-3">
                <Link to="/login">
                <Button
                  type="text"
                  className="border-teal-600 text-teal-600 hover:bg-teal-50 focus:outline-none"
                >
                  Connexion
                </Button>
              </Link>
              <Link to="/demande-devis">
                <Button
                  type="primary"
                  className="bg-teal-600 hover:bg-teal-700 border-teal-600 focus:outline-none"
                >
                  Demande de devis
                </Button>
              </Link>
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
          <motion.div variants={fadeInUp} className="lg:w-1/2 text-center lg:text-left z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center bg-gradient-to-r from-teal-100 to-blue-100 text-teal-700 rounded-full px-6 py-2 text-sm font-semibold mb-6 shadow-sm"
            >
              <RocketOutlined className="mr-2" />
              Plateforme nouvelle génération
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
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
              EHC Formation Hub révolutionne la gestion de la formation en entreprise avec une
              approche complète : planifier, former et évaluer en toute simplicité.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Link to="/demande-devis">
                <Button
                  type="primary"
                  size="large"
                  className="bg-gradient-to-r from-teal-600 to-blue-600 border-0 hover:from-teal-700 hover:to-blue-700 text-white font-semibold px-8 py-4 h-auto text-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none"
                >
                  Commencer maintenant
                  <ArrowRightOutlined className="ml-2" />
                </Button>
              </Link>
              <Link to="/demande-devis">
                <Button
                  size="large"
                  className="border-2 border-teal-600 text-teal-600 hover:bg-teal-50 font-semibold px-8 py-4 h-auto text-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none"
                >
                  Demande de devis
                </Button>
              </Link>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-8 text-center"
            >
              {[
                { value: "500+", label: "Formations", color: "text-teal-600" },
                { value: "10K+", label: "Participants", color: "text-blue-600" },
                { value: "98%", label: "Satisfaction", color: "text-indigo-600" },
              ].map((stat, index) => (
                <motion.div key={stat.label} variants={fadeInUp} className="group">
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

          <motion.div variants={fadeInUp} className="lg:w-1/2 relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              <Card
                className="w-full max-w-md h-80 md:h-96 shadow-2xl border-0 overflow-hidden"
                styles={{ body: { padding: 0, height: "100%" } }}
              >
                <div className="relative h-full  flex items-center justify-center">
                     <img
    src="/images/training-dashboard-analytics.png"
    alt="Interface moderne EHC Formation Hub"
    className="w-full h-full object-cover brightness-110"
    loading="lazy"
  />
                  <div className="absolute inset-0  rounded-lg" />
                </div>
              </Card>

              {/* Floating status card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-8 -left-12 z-10"
              >
                <Card className="rounded-md w-48 shadow-xl border-0 bg-white/95 backdrop-blur-sm"
  bodyStyle={{ padding: 4 }}>
                  <div className="flex items-center space-x-3 p-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <div>
                      <p className="font-bold text-black-900">127 formations actives</p>
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
              {
                icon: <BookOutlined />,
                value: 150,
                suffix: "+",
                title: "Formations Disponibles",
                color: "text-blue-600",
              },
              {
                icon: <TeamOutlined />,
                value: 2500,
                suffix: "+",
                title: "Participants Formés",
                color: "text-green-600",
              },
              {
                icon: <TrophyOutlined />,
                value: 45,
                suffix: "+",
                title: "Formateurs Experts",
                color: "text-yellow-600",
              },
              {
                icon: <StarFilled />,
                value: 98,
                suffix: "%",
                title: "Taux de Satisfaction",
                color: "text-purple-600",
              },
            ].map((stat, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <motion.div variants={fadeInUp}>
                  <Card
                    className="text-center shadow-lg border-0 hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    bodyStyle={{ padding: "32px 16px" }}
                  >
                    <motion.div
                      className={`text-4xl mb-4 ${stat.color}`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {stat.icon}
                    </motion.div>
                    <Statistic
                      title={
                        <span className="text-gray-600 font-medium">{stat.title}</span>
                      }
                      value={stat.value}
                      suffix={stat.suffix}
                      valueStyle={{
                        color: stat.color.replace("text-", "#"),
                        fontSize: "32px",
                        fontWeight: "bold",
                      }}
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
        id="features"
        ref={featuresSectionRef}
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
      <motion.section 
        id="users"
        ref={usersSectionRef}
        className="px-4 py-16 md:py-24 md:px-8 lg:px-12 bg-white"
      >
        <Suspense fallback={<LoadingSpinner />}>
          <ActorsSection />
        </Suspense>
      </motion.section>

      {/* Mission Section */}
      <motion.section 
        id="about"
        ref={aboutSectionRef}
        className="px-4 py-16 md:py-24 md:px-8 lg:px-12 bg-gradient-to-br from-blue-50 to-indigo-50"
      >
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

      {/* Modern Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -bottom-20 -left-20 w-40 h-40 bg-teal-500/10 rounded-full blur-2xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-20">
          <Row gutter={[32, 48]}>
            {/* Logo & Description */}
            <Col xs={24} lg={8}>
              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="cursor-pointer"
                  onClick={handleScrollToTop}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 inline-flex items-center space-x-3 hover:bg-white/20 transition-all duration-300">
                    <div className="bg-white rounded-full p-3 shadow-lg">
                      <img
                        className="w-12 h-12 object-contain"
                        src="/images/logo.png"
                        alt="EHC Logo"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Formation Hub</h3>
                      <p className="text-teal-400 text-sm">EHC Platform</p>
                    </div>
                  </div>
                </motion.div>

                <p className="text-gray-400 leading-relaxed">
                  La plateforme de référence pour l'ingénierie de formation en entreprise.
                  Planifiez, formez et évaluez avec excellence.
                </p>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {[
                    { icon: <FacebookOutlined />, color: "hover:text-blue-400" },
                    { icon: <TwitterOutlined />, color: "hover:text-sky-400" },
                    { icon: <LinkedinOutlined />, color: "hover:text-blue-500" },
                    { icon: <InstagramOutlined />, color: "hover:text-pink-400" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className={`text-gray-400 ${social.color} transition-colors duration-300`}
                      whileHover={{ scale: 1.2, y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="text-2xl">{social.icon}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </Col>

            {/* Links Sections */}
            <Col xs={24} lg={16}>
              <Row gutter={[32, 32]}>
                {[
                  {
                    title: "Produit",
                    links: ["Fonctionnalités", "Utilisateurs", "Tarifs", "Intégrations"],
                  },
                  {
                    title: "Entreprise",
                    links: ["À propos", "Blog", "Carrières", "Partenaires"],
                  },
                  {
                    title: "Support",
                    links: ["Centre d'aide", "Documentation", "Contact", "Statut"],
                  },
                ].map((section, index) => (
                  <Col xs={12} md={8} key={index}>
                    <motion.h3
                      className="text-lg font-semibold text-white mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {section.title}
                    </motion.h3>
                    <ul className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <motion.li
                          key={link}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + linkIndex * 0.05 }}
                        >
                          <a
                            href="#"
                            className="text-gray-400 hover:text-teal-400 transition-all duration-200 hover:pl-2 inline-block"
                          >
                            {link}
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

          {/* Bottom Bar */}
          <motion.div
            className="border-t border-gray-800/50 mt-12 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-500 text-sm">
                © 2024 EHC Formation Hub. Tous droits réservés.
              </p>
              <div className="flex space-x-6">
                {["Mentions légales", "Confidentialité", "Cookies", "CGU"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-gray-500 hover:text-teal-400 transition-colors duration-200 text-sm"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
            </motion.div>
        </div>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {isScrolled && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleScrollToTop}
              className="fixed bottom-8 right-8 bg-gradient-to-r from-teal-600 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-teal-500/25 transition-all duration-300 hover:scale-110 z-50 focus:outline-none"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUpOutlined className="text-xl" />
            </motion.button>
          )}
        </AnimatePresence>
      </footer>
    </div>
  );
});

LandingPage.displayName = "LandingPage";

export default LandingPage;