import React, { memo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button, Card, Typography } from "antd";
import {
  ArrowRightOutlined,
  RocketOutlined,
  PlayCircleOutlined
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

const HeroSection = memo(() => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.section
      ref={ref}
      initial="initial"
      animate={inView ? "animate" : "initial"}
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
                icon={<PlayCircleOutlined />}
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
                  animate={inView ? { scale: 1 } : { scale: 0 }}
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
                  src="/images/training-dashboard-analytics.png"
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
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
