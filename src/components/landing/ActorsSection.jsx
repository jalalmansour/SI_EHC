import React, { memo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, Row, Col, Typography, Space } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  BankOutlined,
  CheckCircleOutlined
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

const ActorsSection = memo(() => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const actors = [
    {
      icon: <UserOutlined />,
      title: "Employés",
      description: "Accès aux formations, suivi des progressions, évaluations",
      features: [
        "Catalogue personnalisé",
        "Planning individuel",
        "Évaluations",
        "Certificats"
      ],
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50"
    },
    {
      icon: <TeamOutlined />,
      title: "Managers",
      description: "Gestion des équipes, validation des demandes, reporting",
      features: [
        "Validation formations",
        "Suivi équipes",
        "Budgets",
        "Rapports RH"
      ],
      gradient: "from-green-500 to-teal-600",
      bgGradient: "from-green-50 to-teal-50"
    },
    {
      icon: <BookOutlined />,
      title: "Formateurs",
      description: "Animation des sessions, évaluations, gestion du contenu",
      features: [
        "Planning sessions",
        "Évaluations participants",
        "Ressources",
        "Feedback"
      ],
      gradient: "from-purple-500 to-violet-600",
      bgGradient: "from-purple-50 to-violet-50"
    },
    {
      icon: <BankOutlined />,
      title: "Responsables",
      description: "Pilotage stratégique, analyses, optimisation des parcours",
      features: [
        "Tableaux de bord",
        "Analytics avancés",
        "ROI formation",
        "Stratégie"
      ],
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-50 to-red-50"
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
          Conçu pour tous les acteurs de la formation
        </Title>
        <Paragraph className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Chaque profil dispose d'un espace personnalisé avec les
          fonctionnalités adaptées à ses besoins spécifiques.
        </Paragraph>
      </motion.div>

      <Row gutter={[32, 32]}>
        {actors.map((actor, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <Card
                className={`h-full bg-gradient-to-br ${actor.bgGradient} border-0 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
                bodyStyle={{
                  padding: '32px 24px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                  <div className={`w-full h-full bg-gradient-to-br ${actor.gradient} rounded-full transform translate-x-6 -translate-y-6`} />
                </div>

                <div className="relative z-10">
                  <motion.div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${actor.gradient} text-white rounded-2xl mb-6 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-2xl">
                      {actor.icon}
                    </div>
                  </motion.div>

                  <Title
                    level={4}
                    className="text-xl font-semibold mb-4 text-gray-900"
                  >
                    {actor.title}
                  </Title>

                  <Paragraph className="text-gray-600 mb-6 leading-relaxed">
                    {actor.description}
                  </Paragraph>

                  <div className="mt-auto">
                    <Space direction="vertical" size="small" className="w-full">
                      {actor.features.map((feature, featureIndex) => (
                        <motion.div
                          key={feature}
                          className="flex items-center text-gray-700"
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ delay: 0.2 + index * 0.1 + featureIndex * 0.05 }}
                        >
                          <CheckCircleOutlined className="text-green-500 text-sm mr-3 flex-shrink-0" />
                          <span className="text-sm font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </Space>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${actor.gradient} opacity-0 transition-opacity duration-300`}
                  whileHover={{ opacity: 0.05 }}
                />
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </motion.div>
  );
});

ActorsSection.displayName = 'ActorsSection';

export default ActorsSection;
