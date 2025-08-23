import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, Row, Col, Typography, Button, Space } from "antd";
import {
  CheckCircleOutlined,
  ArrowRightOutlined,
  RocketOutlined
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const slideInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const MissionSection = memo(() => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const whyChooseUs = [
    "Interface intuitive et moderne",
    "Intégration avec vos outils existants",
    "Support technique réactif 24/7",
    "Conformité RGPD garantie",
    "Mises à jour régulières incluses",
    "Formation des utilisateurs offerte"
  ];

  const pillars = [
    {
      letter: "P",
      title: "Planifier",
      description: "Analyse des besoins, conception des parcours et optimisation des ressources",
      gradient: "from-green-400 to-teal-500",
      bgGradient: "from-green-50 to-teal-50"
    },
    {
      letter: "F",
      title: "Former",
      description: "Déploiement des formations avec suivi en temps réel et adaptation continue",
      gradient: "from-blue-400 to-indigo-500",
      bgGradient: "from-blue-50 to-indigo-50"
    },
    {
      letter: "E",
      title: "Évaluer",
      description: "Mesure de l'efficacité et de l'impact sur la performance organisationnelle",
      gradient: "from-purple-400 to-violet-500",
      bgGradient: "from-purple-50 to-violet-50"
    }
  ];

  const stats = [
    { value: "15+", label: "Années d'expertise" },
    { value: "200+", label: "Entreprises clientes" }
  ];
  const navigate = useNavigate();

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      className="max-w-7xl mx-auto"
    >
      <Row gutter={[48, 48]} align="middle">
        {/* Left Column */}
        <Col xs={24} lg={12}>
          <motion.div variants={slideInLeft} className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center bg-gradient-to-r from-teal-100 to-blue-100 text-teal-700 rounded-full px-6 py-2 text-sm font-semibold mb-6"
            >
              <RocketOutlined className="mr-2" />
              Notre Mission
            </motion.div>

            <Title
              level={2}
              className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
            >
              L'excellence en ingénierie de formation
            </Title>

            <Paragraph className="text-lg text-gray-700 mb-8 leading-relaxed">
              INGÉNIA est née de la conviction que la formation est le levier
              principal de la performance organisationnelle. Notre plateforme
              accompagne les entreprises dans leur transformation en optimisant
              chaque étape du processus de formation.
            </Paragraph>

            <motion.div variants={fadeInUp}>
              <Card
                className="p-6 mb-6 bg-gradient-to-br from-green-50 to-teal-50 border-0 shadow-lg"
                bodyStyle={{ padding: '32px 24px' }}
              >
                <Title level={4} className="text-2xl font-semibold mb-6 text-gray-900">
                  Pourquoi choisir INGÉNIA ?
                </Title>
                <Space direction="vertical" size="middle" className="w-full">
                  {whyChooseUs.map((item, index) => (
                    <motion.div
                      key={item}
                      className="flex items-center text-gray-700"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <CheckCircleOutlined className="text-green-500 text-lg mr-4 flex-shrink-0" />
                      <span className="text-base font-medium">{item}</span>
                    </motion.div>
                  ))}
                </Space>
              </Card>
              
              {/* Bouton placé en bas de la carte (à l'extérieur) */}
              <motion.div
                variants={fadeInUp}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="primary"
                  size="large"
                  icon={<ArrowRightOutlined />}
                  className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 border-0 shadow-lg px-8 py-6 h-auto text-base font-semibold w-full"
                  onClick={() => navigate("/demande-devis")}
                >
                  Découvrir EHC Formation
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </Col>

        {/* Right Column */}
        <Col xs={24} lg={12}>
          <motion.div variants={slideInRight} className="flex flex-col items-center lg:items-start">
            <Title level={3} className="text-2xl font-semibold mb-12 text-center lg:text-left text-gray-900">
              Nos 3 piliers fondamentaux :
            </Title>

            <div className="space-y-8 w-full">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.letter}
                  className="flex items-center gap-6 group"
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${pillar.gradient} text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {pillar.letter}
                  </motion.div>
                  <div className="flex-1">
                    <Title level={5} className="text-xl font-semibold mb-2 text-gray-900">
                      {pillar.title}
                    </Title>
                    <Paragraph className="text-gray-600 mb-0 leading-relaxed">
                      {pillar.description}
                    </Paragraph>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 mt-12 w-full"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="flex-1 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Title level={3} className="text-4xl font-bold text-teal-600 mb-2">
                    {stat.value}
                  </Title>
                  <Paragraph className="text-gray-600 mb-0 font-medium">
                    {stat.label}
                  </Paragraph>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Col>
      </Row>
    </motion.div>
  );
});

MissionSection.displayName = 'MissionSection';

export default MissionSection;