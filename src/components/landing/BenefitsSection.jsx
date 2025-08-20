import React, { memo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, Row, Col, Typography } from "antd";
import {
  ClockCircleOutlined,
  LockOutlined,
  RiseOutlined
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

const BenefitsSection = memo(() => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const benefits = [
    {
      icon: <ClockCircleOutlined />,
      percentage: "75%",
      title: "Gain de temps",
      description: "Réduction du temps administratif grâce à l'automatisation des processus",
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      accentColor: "text-blue-600"
    },
    {
      icon: <LockOutlined />,
      percentage: "100%",
      title: "Sécurité renforcée",
      description: "Conformité RGPD et sécurisation complète de vos données sensibles",
      gradient: "from-green-500 to-teal-600",
      bgGradient: "from-green-50 to-teal-50",
      accentColor: "text-green-600"
    },
    {
      icon: <RiseOutlined />,
      percentage: "+40%",
      title: "ROI formation",
      description: "Amélioration mesurable du retour sur investissement formation",
      gradient: "from-purple-500 to-violet-600",
      bgGradient: "from-purple-50 to-violet-50",
      accentColor: "text-purple-600"
    }
  ];

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      variants={staggerContainer}
      className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12"
    >
      <motion.div variants={fadeInUp} className="text-center mb-16">
        <Title
          level={2}
          className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
        >
          Les bénéfices concrets d'INGÉNIA
        </Title>
        <Paragraph className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Transformez votre approche de la formation et obtenez des résultats
          mesurables dès les premiers mois d'utilisation.
        </Paragraph>
      </motion.div>

      <Row gutter={[32, 32]} justify="center">
        {benefits.map((benefit, index) => (
          <Col xs={24} md={8} key={index}>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <Card
                className={`h-full bg-gradient-to-br ${benefit.bgGradient} border-0 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
                styles={{
                  body: {
                    padding: '48px 32px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    position: 'relative'
                  }
                }}
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <div className={`w-full h-full bg-gradient-to-br ${benefit.gradient} rounded-full transform translate-x-8 -translate-y-8`} />
                </div>

                <div className="relative z-10 flex flex-col items-center h-full">
                  {/* Icon */}
                  <motion.div
                    className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${benefit.gradient} text-white rounded-3xl mb-8 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl">
                      {benefit.icon}
                    </div>
                  </motion.div>

                  {/* Percentage */}
                  <motion.div
                    className={`text-5xl font-bold ${benefit.accentColor} mb-4`}
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : { scale: 0 }}
                    transition={{
                      delay: 0.3 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 10
                    }}
                  >
                    {benefit.percentage}
                  </motion.div>

                  {/* Title */}
                  <Title
                    level={4}
                    className="text-xl font-semibold mb-4 text-gray-900"
                  >
                    {benefit.title}
                  </Title>

                  {/* Description */}
                  <Paragraph className="text-gray-600 leading-relaxed flex-1 mb-0">
                    {benefit.description}
                  </Paragraph>

                  {/* Progress indicator */}
                  <motion.div
                    className={`w-16 h-1 bg-gradient-to-r ${benefit.gradient} rounded-full mt-6`}
                    initial={{ width: 0 }}
                    animate={inView ? { width: 64 } : { width: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                  />
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute bottom-4 right-4 w-4 h-4 bg-white/20 rounded-full"
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                />
                <motion.div
                  className="absolute top-8 left-8 w-3 h-3 bg-white/30 rounded-full"
                  animate={{
                    y: [0, -8, 0],
                    x: [0, 5, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                />
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </motion.div>
  );
});

BenefitsSection.displayName = 'BenefitsSection';

export default BenefitsSection;
