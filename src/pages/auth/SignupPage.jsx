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
  Select,
  Steps,
  Space,
  Divider,
  message,
  Progress
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  BankOutlined,
  SafetyCertificateOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  GoogleOutlined,
  LinkedinOutlined
} from "@ant-design/icons";
import { registerSchema } from "../../lib/schemas";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Step } = Steps;

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const SignupPage = memo(() => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    trigger,
    setValue
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      company: "",
      position: "",
      termsAccepted: false,
      marketingConsent: false
    }
  });

  const watchedValues = watch();

  const positions = [
    "Directeur/Directrice Général(e)",
    "Directeur/Directrice RH",
    "Responsable Formation",
    "Responsable RH",
    "Manager",
    "Chef de Projet",
    "Formateur/Formatrice",
    "Consultant(e)",
    "Employé(e)",
    "Étudiant(e)",
    "Autre"
  ];

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "#d9d9d9" };

    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;

    if (strength <= 40) return { strength, label: "Faible", color: "#ff4d4f" };
    if (strength <= 60) return { strength, label: "Moyen", color: "#faad14" };
    if (strength <= 80) return { strength, label: "Bon", color: "#52c41a" };
    return { strength, label: "Excellent", color: "#52c41a" };
  };

  const passwordStrength = getPasswordStrength(watchedValues.password);

  const validateStep = async (step) => {
    const fieldsToValidate = {
      0: ['firstName', 'lastName', 'email'],
      1: ['password', 'confirmPassword'],
      2: ['company', 'position', 'phone'],
      3: ['termsAccepted']
    };

    return await trigger(fieldsToValidate[step]);
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      message.success("Compte créé avec succès ! Vérifiez votre email pour activer votre compte.");

      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (error) {
      message.error("Erreur lors de la création du compte. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    message.info(`Inscription avec ${provider} en cours de développement`);
  };

  const stepContent = [
    // Step 1: Personal Information
    <div key="step1" className="space-y-6">
      <div>
        <Title level={4} className="text-xl font-semibold text-gray-900 mb-2">
          Informations personnelles
        </Title>
        <Text className="text-gray-600">
          Commençons par vos informations de base
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="Prénom"
          validateStatus={errors.firstName ? "error" : ""}
          help={errors.firstName?.message}
        >
          <Input
            {...register("firstName")}
            placeholder="Votre prénom"
            size="large"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          label="Nom"
          validateStatus={errors.lastName ? "error" : ""}
          help={errors.lastName?.message}
        >
          <Input
            {...register("lastName")}
            placeholder="Votre nom"
            size="large"
            className="rounded-lg"
          />
        </Form.Item>
      </div>

      <Form.Item
        label="Adresse email professionnelle"
        validateStatus={errors.email ? "error" : ""}
        help={errors.email?.message}
      >
        <Input
          {...register("email")}
          prefix={<MailOutlined className="text-gray-400" />}
          placeholder="votre@entreprise.com"
          size="large"
          className="rounded-lg"
        />
      </Form.Item>
    </div>,

    // Step 2: Security
    <div key="step2" className="space-y-6">
      <div>
        <Title level={4} className="text-xl font-semibold text-gray-900 mb-2">
          Sécurité du compte
        </Title>
        <Text className="text-gray-600">
          Choisissez un mot de passe sécurisé pour protéger votre compte
        </Text>
      </div>

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
        {watchedValues.password && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <Text className="text-sm text-gray-600">Force du mot de passe:</Text>
              <Text className="text-sm font-medium" style={{ color: passwordStrength.color }}>
                {passwordStrength.label}
              </Text>
            </div>
            <Progress
              percent={passwordStrength.strength}
              strokeColor={passwordStrength.color}
              showInfo={false}
              size="small"
            />
          </div>
        )}
      </Form.Item>

      <Form.Item
        label="Confirmer le mot de passe"
        validateStatus={errors.confirmPassword ? "error" : ""}
        help={errors.confirmPassword?.message}
      >
        <Input.Password
          {...register("confirmPassword")}
          prefix={<LockOutlined className="text-gray-400" />}
          placeholder="Confirmez votre mot de passe"
          size="large"
          className="rounded-lg"
          iconRender={(visible) => visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        />
      </Form.Item>
    </div>,

    // Step 3: Professional Information
    <div key="step3" className="space-y-6">
      <div>
        <Title level={4} className="text-xl font-semibold text-gray-900 mb-2">
          Informations professionnelles
        </Title>
        <Text className="text-gray-600">
          Aidez-nous à personnaliser votre expérience
        </Text>
      </div>

      <Form.Item
        label="Entreprise"
        validateStatus={errors.company ? "error" : ""}
        help={errors.company?.message}
      >
        <Input
          {...register("company")}
          prefix={<BankOutlined className="text-gray-400" />}
          placeholder="Nom de votre entreprise"
          size="large"
          className="rounded-lg"
        />
      </Form.Item>

      <Form.Item
        label="Poste"
        validateStatus={errors.position ? "error" : ""}
        help={errors.position?.message}
      >
        <Select
          {...register("position")}
          placeholder="Sélectionnez votre poste"
          size="large"
          className="w-full"
          onChange={(value) => setValue("position", value)}
        >
          {positions.map(position => (
            <Option key={position} value={position}>{position}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Téléphone (optionnel)"
        validateStatus={errors.phone ? "error" : ""}
        help={errors.phone?.message}
      >
        <Input
          {...register("phone")}
          prefix={<PhoneOutlined className="text-gray-400" />}
          placeholder="+33 1 23 45 67 89"
          size="large"
          className="rounded-lg"
        />
      </Form.Item>
    </div>,

    // Step 4: Terms and Conditions
    <div key="step4" className="space-y-6">
      <div>
        <Title level={4} className="text-xl font-semibold text-gray-900 mb-2">
          Finalisation
        </Title>
        <Text className="text-gray-600">
          Dernière étape avant de créer votre compte
        </Text>
      </div>

      <div className="space-y-4">
        <Form.Item
          validateStatus={errors.termsAccepted ? "error" : ""}
          help={errors.termsAccepted?.message}
        >
          <Checkbox
            {...register("termsAccepted")}
            className="text-sm"
          >
            J'accepte les{" "}
            <Link to="/terms" className="text-teal-600 hover:text-teal-700">
              conditions d'utilisation
            </Link>{" "}
            et la{" "}
            <Link to="/privacy" className="text-teal-600 hover:text-teal-700">
              politique de confidentialité
            </Link>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Checkbox
            {...register("marketingConsent")}
            className="text-sm"
          >
            J'accepte de recevoir des communications marketing et des mises à jour produit
          </Checkbox>
        </Form.Item>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <SafetyCertificateOutlined className="text-blue-600 text-xl mt-1" />
          <div>
            <Text strong className="text-blue-900">Sécurité et confidentialité</Text>
            <Paragraph className="text-blue-800 text-sm mb-0 mt-1">
              Vos données sont protégées par un chiffrement de niveau bancaire et nous respectons
              strictement le RGPD. Aucune donnée ne sera partagée sans votre consentement.
            </Paragraph>
          </div>
        </div>
      </Card>
    </div>
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-200/30 to-blue-200/30 rounded-full blur-3xl"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl"
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Column - Benefits */}
        <motion.div
          variants={slideInRight}
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
            Rejoignez{" "}
            <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              INGÉNIA
            </span>
          </Title>

          <Paragraph className="text-lg text-gray-700 mb-8 leading-relaxed">
            Créez votre compte et découvrez une nouvelle façon de gérer la formation
            en entreprise avec notre plateforme intelligente.
          </Paragraph>

          <div className="space-y-4 mb-8">
            <div className="flex items-center text-gray-700">
              <CheckCircleOutlined className="text-green-500 text-xl mr-3" />
              <span>Accès immédiat à toutes les fonctionnalités</span>
            </div>
            <div className="flex items-center text-gray-700">
              <CheckCircleOutlined className="text-green-500 text-xl mr-3" />
              <span>Interface personnalisée selon votre rôle</span>
            </div>
            <div className="flex items-center text-gray-700">
              <CheckCircleOutlined className="text-green-500 text-xl mr-3" />
              <span>Support dédié et formation incluse</span>
            </div>
            <div className="flex items-center text-gray-700">
              <CheckCircleOutlined className="text-green-500 text-xl mr-3" />
              <span>Conformité RGPD et sécurité maximale</span>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-teal-50 to-blue-50 border-0 shadow-lg">
            <div className="text-center">
              <Title level={4} className="text-gray-900 mb-2">Essai gratuit 30 jours</Title>
              <Text className="text-gray-600">
                Aucune carte bancaire requise • Accès complet • Support inclus
              </Text>
            </div>
          </Card>
        </motion.div>

        {/* Right Column - Signup Form */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="w-full max-w-lg mx-auto"
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
                Créer un compte
              </Title>
              <Text className="text-gray-600">
                Rejoignez INGÉNIA en quelques minutes
              </Text>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <Steps current={currentStep} size="small" className="mb-4">
                <Step title="Profil" />
                <Step title="Sécurité" />
                <Step title="Professionnel" />
                <Step title="Finalisation" />
              </Steps>
            </div>

            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
              {stepContent[currentStep]}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <Button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  icon={<ArrowLeftOutlined />}
                  className="border-gray-300 text-gray-700"
                >
                  Précédent
                </Button>

                {currentStep < 3 ? (
                  <Button
                    onClick={nextStep}
                    type="primary"
                    icon={<ArrowRightOutlined />}
                    className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 border-0"
                  >
                    Suivant
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading || isSubmitting}
                    icon={<CheckCircleOutlined />}
                    className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 border-0 shadow-lg"
                  >
                    Créer mon compte
                  </Button>
                )}
              </div>
            </Form>

            {currentStep === 0 && (
              <>
                <Divider className="my-6">
                  <Text className="text-gray-500 text-sm">ou continuer avec</Text>
                </Divider>

                <Space direction="vertical" className="w-full" size="middle">
                  <Button
                    size="large"
                    block
                    icon={<GoogleOutlined />}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg h-12 font-medium"
                    onClick={() => handleSocialSignup("Google")}
                  >
                    Continuer avec Google
                  </Button>
                  <Button
                    size="large"
                    block
                    icon={<LinkedinOutlined />}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg h-12 font-medium"
                    onClick={() => handleSocialSignup("LinkedIn")}
                  >
                    Continuer avec LinkedIn
                  </Button>
                </Space>
              </>
            )}

            <div className="text-center mt-8 pt-6 border-t border-gray-200">
              <Text className="text-gray-600">
                Déjà un compte ?{" "}
                <Link
                  to="/auth/login"
                  className="text-teal-600 hover:text-teal-700 font-semibold"
                >
                  Se connecter
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
            <Text>🔒 Inscription sécurisée SSL • 🛡️ Conformité RGPD • ⚡ Support dédié</Text>
          </div>
        </motion.div>
      </div>
    </div>
  );
});

SignupPage.displayName = 'SignupPage';

export default SignupPage;
