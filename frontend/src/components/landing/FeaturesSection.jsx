import React, { memo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, Row, Col, Typography } from "antd";
import {
  BookOutlined,
  CalendarOutlined,
  BarChartOutlined,
  TeamOutlined,
  RiseOutlined,
  SafetyCertificateOutlined
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

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

const FeaturesSection = memo(() => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const features = [
    {
      icon: <BookOutlined />,
      title: "Catalogue de Formation",
      description: "Gestion centralisée de votre catalogue avec recherche avancée et recommandations personnalisées.",
      bgColor: "from-blue-50 to-indigo-50",
      iconColor: "text-blue-600",
      accentColor: "bg-blue-100"
    },
    {
      icon: <CalendarOutlined />,
      title: "Planification Intelligente",
      description: "Optimisation automatique des plannings avec gestion des conflits et notifications en temps réel.",
      bgColor: "from-green-50 to-teal-50",
      iconColor: "text-teal-600",
      accentColor: "bg-teal-100"
    },
    {
      icon: <BarChartOutlined />,
      title: "Évaluations Complètes",
      description: "Évaluations à chaud et à froid avec analyses statistiques et rapports détaillés.",
      bgColor: "from-purple-50 to-violet-50",
      iconColor: "text-purple-600",
      accentColor: "bg-purple-100"
    },
    {
      icon: <TeamOutlined />,
      title: "Gestion Multi-acteurs",
      description: "Rôles et permissions adaptés à chaque profil : employés, managers, formateurs, RH.",
      bgColor: "from-orange-50 to-red-50",
      iconColor: "text-orange-600",
      accentColor: "bg-orange-100"
    },
    {
      icon: <RiseOutlined />,
      title: "Suivi des Compétences",
      description: "Cartographie des compétences et suivi des progressions individuelles et collectives.",
      bgColor: "from-indigo-50 to-blue-50",
      iconColor: "text-indigo-600",
      accentColor: "bg-indigo-100"
    },
    {
      icon: <SafetyCertificateOutlined />,
      title: "Conformité & Sécurité",
      description: "Respect des normes RGPD avec traçabilité complète et sécurisation des données.",
      bgColor: "from-red-50 to-pink-50",
      iconColor: "text-red-600",
      accentColor: "bg-red-100"
    }
  ];

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      variants={staggerContainer}
      className="max-w-7xl mx-auto"
    >
      <motion.div variants={fadeInUp} className="text-center mb-16">
        <Title
          level={2}
          className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
        >
          Une plateforme complète pour tous vos besoins
        </Title>
        <Paragraph className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          De l'analyse des besoins à l'évaluation des résultats, INGÉNIA
          couvre l'intégralité du cycle de formation avec des outils innovants
          et intuitifs.
        </Paragraph>
      </motion.div>

      <Row gutter={[32, 32]}>
        {features.map((feature, index) => (
          <Col xs={24} md={12} lg={8} key={index}>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <Card
                className={`h-full bg-gradient-to-br ${feature.bgColor} border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
                styles={{
                  body: {
                    padding: '32px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    height: '100%'
                  }
                }}
              >
                <motion.div
                  className={`${feature.accentColor} p-4 rounded-2xl mb-6 shadow-sm`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`text-3xl ${feature.iconColor}`}>
                    {feature.icon}
                  </div>
                </motion.div>

                <Title
                  level={4}
                  className="text-xl font-semibold mb-4 text-gray-900"
                >
                  {feature.title}
                </Title>

                <Paragraph className="text-gray-600 leading-relaxed flex-1">
                  {feature.description}
                </Paragraph>

                <motion.div
                  className={`w-12 h-1 ${feature.accentColor} rounded-full mt-4`}
                  initial={{ width: 0 }}
                  animate={inView ? { width: 48 } : { width: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                />
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </motion.div>
  );
});

FeaturesSection.displayName = 'FeaturesSection';

export default FeaturesSection;
