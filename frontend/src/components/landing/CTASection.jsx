import React, { memo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, Button, Typography, Space } from "antd";
import {
  ArrowRightOutlined,
  StarFilled,
  RocketOutlined,
  PlayCircleOutlined
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const CTASection = memo(() => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 relative"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-full blur-3xl"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl"
          animate={{ rotate: -360, scale: [1, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.div variants={scaleIn}>
        <Card
          className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 overflow-hidden relative"
          bodyStyle={{
            padding: '64px 48px',
            textAlign: 'center',
            position: 'relative'
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-teal-50/50" />

          <div className="relative z-10">
            {/* Floating elements */}
            <motion.div
              className="absolute top-8 left-8 w-3 h-3 bg-blue-400 rounded-full opacity-60"
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}
            />
            <motion.div
              className="absolute top-12 right-12 w-2 h-2 bg-teal-400 rounded-full opacity-60"
              animate={{
                y: [0, -8, 0],
                x: [0, 5, 0],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: 0.5
              }}
            />
            <motion.div
              className="absolute bottom-8 left-12 w-4 h-4 bg-purple-400 rounded-full opacity-40"
              animate={{
                y: [0, -12, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: 1
              }}
            />

            {/* Main content */}
            <motion.div variants={fadeInUp}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center bg-gradient-to-r from-blue-100 to-teal-100 text-blue-700 rounded-full px-6 py-2 text-sm font-semibold mb-8"
              >
                <RocketOutlined className="mr-2" />
                Transformez votre formation dès aujourd'hui
              </motion.div>

              <Title
                level={2}
                className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-teal-700 bg-clip-text text-transparent"
              >
                Prêt à révolutionner votre formation ?
              </Title>

              <Paragraph className="text-lg text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
                Rejoignez les centaines d'entreprises qui font confiance à INGÉNIA
                pour optimiser leur stratégie de formation et développer les
                compétences de leurs équipes.
              </Paragraph>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-6 justify-center mb-8"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="primary"
                    size="large"
                    icon={<ArrowRightOutlined />}
                    className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 border-0 shadow-xl px-10 py-6 h-auto text-base font-semibold"
                  >
                    Commencer gratuitement
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="large"
                    icon={<PlayCircleOutlined />}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-teal-300 px-10 py-6 h-auto text-base font-semibold bg-white shadow-lg"
                  >
                    Voir la démo
                  </Button>
                </motion.div>
              </motion.div>

              {/* Social proof */}
              <motion.div
                variants={fadeInUp}
                className="flex items-center justify-center text-gray-600"
              >
                <div className="flex items-center">
                  {/* Star rating */}
                  <div className="flex mr-3">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                      >
                        <StarFilled className="text-yellow-400 text-lg" />
                      </motion.div>
                    ))}
                  </div>
                  <span className="font-medium">4.9/5 - Plus de 1000 avis clients</span>
                </div>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap justify-center items-center gap-8 mt-12 opacity-70"
              >
                <div className="text-sm text-gray-500 font-medium">
                  ✓ Conformité RGPD
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  ✓ Support 24/7
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  ✓ Essai gratuit 30 jours
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  ✓ Sans engagement
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Decorative gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 opacity-10 rounded-lg" />
          <div className="absolute inset-1 bg-white rounded-lg" />
        </Card>
      </motion.div>
    </motion.div>
  );
});

CTASection.displayName = 'CTASection';

export default CTASection;
