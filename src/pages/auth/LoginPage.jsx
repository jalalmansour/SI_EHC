import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Form,
  Input,
  Checkbox,
  Typography,
  Space,
  Divider,
  message,
  Spin
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  GoogleOutlined,
  LinkedinOutlined,
  ArrowLeftOutlined,
  LoginOutlined,
  SafetyCertificateOutlined
} from "@ant-design/icons";
import { loginSchema } from "../../lib/schemas";

const { Title, Text, Paragraph } = Typography;

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const LoginPage = memo(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  const watchedValues = watch();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      message.success("Connexion réussie ! Redirection en cours...");

      // Redirect based on user role
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      message.error("Erreur de connexion. Veuillez vérifier vos identifiants.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    message.info(`Connexion avec ${provider} en cours de développement`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-teal-200/30 rounded-full blur-3xl"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-indigo-200/30 rounded-full blur-3xl"
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Column - Branding */}
        <motion.div
          variants={slideInLeft}
          initial="initial"
          animate="animate"
          className="hidden lg:block text-center lg:text-left"
        >
          <div className="mb-8">
            <img
              src="/images/logo.png"
              alt="INGÉNIA Logo"
              className="w-24 h-auto mx-auto lg:mx-0 mb-4"
            />
            <Text className="text-gray-600 font-medium">Ingénierie de Formation</Text>
          </div>

          <Title level={1} className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Bienvenue sur{" "}
            <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              INGÉNIA
            </span>
          </Title>

          <Paragraph className="text-lg text-gray-700 mb-8 leading-relaxed">
            Connectez-vous à votre espace personnel et accédez à toutes les fonctionnalités
            de notre plateforme d'ingénierie de formation nouvelle génération.
          </Paragraph>

          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <SafetyCertificateOutlined className="text-green-500 text-xl mr-3" />
              <span>Plateforme sécurisée et conforme RGPD</span>
            </div>
            <div className="flex items-center text-gray-700">
              <UserOutlined className="text-blue-500 text-xl mr-3" />
              <span>Interface moderne et intuitive</span>
            </div>
            <div className="flex items-center text-gray-700">
              <LoginOutlined className="text-purple-500 text-xl mr-3" />
              <span>Accès 24/7 depuis n'importe où</span>
            </div>
          </div>

          <motion.div
            className="mt-12"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <img
              src="/images/dashboard-reference.png"
              alt="Interface INGÉNIA"
              className="w-full max-w-md mx-auto lg:mx-0 rounded-2xl shadow-2xl"
            />
          </motion.div>
        </motion.div>

        {/* Right Column - Login Form */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="w-full max-w-md mx-auto"
        >
          <Card
            className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 overflow-hidden"
            bodyStyle={{ padding: '48px 32px' }}
          >
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <img
                src="/images/logo.png"
                alt="INGÉNIA Logo"
                className="w-20 h-auto mx-auto mb-2"
              />
              <Text className="text-gray-600 font-medium">Ingénierie de Formation</Text>
            </div>

            <div className="text-center mb-8">
              <Title level={2} className="text-2xl font-bold text-gray-900 mb-2">
                Connexion
              </Title>
              <Text className="text-gray-600">
                Accédez à votre espace personnel INGÉNIA
              </Text>
            </div>

            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
              <Form.Item
                label="Adresse email"
                validateStatus={errors.email ? "error" : ""}
                help={errors.email?.message}
              >
                <Input
                  {...register("email")}
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="votre@email.com"
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                label="Mot de passe"
                validateStatus={errors.password ? "error" : ""}
                help={errors.password?.message}
              >
                <Input.Password
                  {...register("password")}
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Votre mot de passe"
                  size="large"
                  className="rounded-lg"
                  iconRender={(visible) => visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                />
              </Form.Item>

              <div className="flex items-center justify-between mb-6">
                <Form.Item name="rememberMe" valuePropName="checked" className="mb-0">
                  <Checkbox {...register("rememberMe")}>
                    Se souvenir de moi
                  </Checkbox>
                </Form.Item>
                <Link
                  to="/auth/forgot-password"
                  className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={isLoading || isSubmitting}
                  className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 border-0 shadow-lg rounded-lg h-12 text-base font-semibold"
                  icon={<LoginOutlined />}
                >
                  Se connecter
                </Button>
              </Form.Item>
            </Form>

            <Divider className="my-6">
              <Text className="text-gray-500 text-sm">ou continuer avec</Text>
            </Divider>

            <Space direction="vertical" className="w-full" size="middle">
              <Button
                size="large"
                block
                icon={<GoogleOutlined />}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg h-12 font-medium"
                onClick={() => handleSocialLogin("Google")}
              >
                Continuer avec Google
              </Button>
              <Button
                size="large"
                block
                icon={<LinkedinOutlined />}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg h-12 font-medium"
                onClick={() => handleSocialLogin("LinkedIn")}
              >
                Continuer avec LinkedIn
              </Button>
            </Space>

            <div className="text-center mt-8 pt-6 border-t border-gray-200">
              <Text className="text-gray-600">
                Pas encore de compte ?{" "}
                <Link
                  to="/auth/register"
                  className="text-teal-600 hover:text-teal-700 font-semibold"
                >
                  Créer un compte
                </Link>
              </Text>
            </div>

            <div className="text-center mt-4">
              <Link
                to="/"
                className="inline-flex items-center text-gray-500 hover:text-gray-700 text-sm"
              >
                <ArrowLeftOutlined className="mr-1" />
                Retour à l'accueil
              </Link>
            </div>
          </Card>

          {/* Trust indicators */}
          <div className="text-center mt-6 text-sm text-gray-500">
            <Text>🔒 Connexion sécurisée SSL • 🛡️ Conformité RGPD • ⚡ Support 24/7</Text>
          </div>
        </motion.div>
      </div>
    </div>
  );
});

LoginPage.displayName = 'LoginPage';

export default LoginPage;
