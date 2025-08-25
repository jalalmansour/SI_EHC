import { memo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {Form, Input, Button, Card, Typography, Checkbox, Divider, Row, Col, Tag, App} from 'antd';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, RocketOutlined, StarOutlined, SafetyCertificateOutlined, BulbOutlined } from '@ant-design/icons';

// --- Logic Imports ---
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated, selectAuthLoading } from '../../redux/slices/authSlice.js';
import { login } from "../../redux/thunks/authThunks.js";
import { loginSchema } from "../../lib/validation/authSchema.js"; // Adjust path if necessary
import {handleApiError} from "../../utils/errorHandler.js";
import AuthLayout from "../../components/auth/AuthLayout.jsx";
import {getDashboardPathForRole} from "../../utils/routeUtils.js"; // Adjust path if necessary

const { Title, Paragraph, Text } = Typography;

// --- Animation Variants (can be moved to a separate file if desired) ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.02, y: -5, transition: { duration: 0.3, ease: "easeOut" } }
};

const floatingVariants = {
    animate: { y: [0, -10, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } }
};

function Login() {
    // --- Logic Hooks ---
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loading = useSelector(selectAuthLoading);
    const { message: messageApi } = App.useApp();


    const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
    const [formRef, formInView] = useInView({ threshold: 0.1, triggerOnce: true });

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        }
    });

    // --- Submission Handler ---
    const onSubmit = async (data) => {
        try {
            const res = await dispatch(login(data)).unwrap();
            messageApi.success('Login successful!');

            console.log(res.data);
            // redirect based on role
            const destination = getDashboardPathForRole(res.data?.role?.name);
            navigate(destination, { replace: true });
        } catch (err) {
            console.log(err);
            const errorMessage = handleApiError(err, setError);
            if (errorMessage) {
                messageApi.error(errorMessage);
            }
        }
    };

    const features = [
        { icon: <SafetyCertificateOutlined />, title: "Sécurité Avancée", description: "Authentification multi-facteurs et chiffrement de bout en bout", color: "#10b981" },
        { icon: <BulbOutlined />, title: "Performance Optimale", description: "Interface ultra-rapide avec chargement intelligent", color: "#f59e0b" },
        { icon: <StarOutlined />, title: "UX Premium", description: "Design intuitif et micro-interactions fluides", color: "#8b5cf6" }
    ];

    return (
        <AuthLayout>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem' }}>
                {/* Hero Section */}
                <motion.div
                    ref={heroRef}
                    initial="hidden"
                    animate={heroInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="text-center mb-12"
                >
                    <motion.div variants={itemVariants} className="mb-6">
                        <motion.div
                            className="inline-flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full px-6 py-3 text-sm font-semibold mb-6 border border-blue-200"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <RocketOutlined className="mr-2" />
                            Bienvenue sur EHC Formation
                        </motion.div>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Title level={1} className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
                            Reconnectez-vous
                        </Title>
                        <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Accédez à votre espace de formation personnalisé et continuez votre apprentissage
                        </Paragraph>
                    </motion.div>
                </motion.div>

                <Row gutter={[32, 32]} justify="center" align="middle">
                    {/* Login Form Column */}
                    <Col xs={24} md={12} lg={10}>
                        <motion.div
                            ref={formRef}
                            initial="hidden"
                            animate={formInView ? "visible" : "hidden"}
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <Card
                                className="shadow-2xl border-0 overflow-hidden"
                                style={{ borderRadius: 24, background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', border: '1px solid rgba(59, 130, 246, 0.1)' }}
                            >
                                <div className="relative overflow-hidden mb-8">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-50" />
                                    <div className="relative z-10 p-6 text-center">
                                        <motion.div
                                            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                                            variants={floatingVariants}
                                            animate="animate"
                                        >
                                            <UserOutlined className="text-2xl text-white" />
                                        </motion.div>
                                        <Title level={2} className="mb-2">Connexion</Title>
                                        <Paragraph className="text-gray-600">Connectez-vous à votre compte EHC Formation</Paragraph>
                                    </div>
                                </div>
                                <div className="px-6 pb-6">
                                    <Form layout="vertical" onFinish={handleSubmit(onSubmit)} size="large">
                                        <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
                                            <Controller
                                                name="email"
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        prefix={<UserOutlined />}
                                                        placeholder="votre@email.com"
                                                        className="rounded-lg"
                                                    />
                                                )}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Mot de passe" validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
                                            <Controller
                                                name="password"
                                                control={control}
                                                render={({ field }) => (
                                                    <Input.Password
                                                        {...field}
                                                        prefix={<LockOutlined />}
                                                        placeholder="Votre mot de passe"
                                                        className="rounded-lg"
                                                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                                    />
                                                )}
                                            />
                                        </Form.Item>
                                        <Form.Item>
                                            <div className="flex justify-between items-center">
                                                <Controller
                                                    name="rememberMe"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Checkbox {...field} checked={field.value} className="text-gray-600">Se souvenir de moi</Checkbox>
                                                    )}
                                                />
                                                <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700">Mot de passe oublié ?</Link>
                                            </div>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                size="large"
                                                loading={loading}
                                                block
                                                className="h-12 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 border-0 shadow-lg"
                                            >
                                                Se connecter
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                    <Divider className="text-gray-400">ou</Divider>
                                    <div className="text-center">
                                        <Paragraph className="text-gray-600 mb-0">
                                            Pas encore de compte ?{' '}
                                            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">Créer un compte</Link>
                                        </Paragraph>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </Col>
                    {/* Features Section */}
                    <Col xs={24} md={12} lg={10}>
                        <motion.div
                            initial="hidden"
                            animate={formInView ? "visible" : "hidden"}
                            variants={containerVariants}
                            className="space-y-6"
                        >
                            {features.map((feature, index) => (
                                <motion.div key={feature.title} variants={itemVariants} whileHover={{ x: 5, scale: 1.02 }} transition={{ delay: index * 0.1 }}>
                                    <Card
                                        className="shadow-lg border-0 hover:shadow-xl transition-all duration-300"
                                        style={{ borderRadius: 16 }}
                                    >
                                        <div className="flex items-start space-x-3"><div className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: feature.color }}>{feature.icon}</div><div><Text strong className="text-gray-900">{feature.title}</Text><Paragraph className="text-gray-600 text-sm mb-0">{feature.description}</Paragraph></div></div>
                                    </Card>
                                </motion.div>
                            ))}
                            <motion.div variants={itemVariants} className="mt-8">
                                <Card
                                    className="shadow-lg border-0 text-center"
                                    style={{ borderRadius: 16, background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: 'white' }}
                                >
                                    <Title level={4} style={{ color: 'white', margin: 0 }}>Plateforme EHC</Title>
                                    <div className="grid grid-cols-3 gap-4 mt-4"><div><div className="text-xl font-bold text-blue-400">500+</div><div className="text-xs text-gray-300">Formations</div></div><div><div className="text-xl font-bold text-green-400">10K+</div><div className="text-xs text-gray-300">Utilisateurs</div></div><div><div className="text-xl font-bold text-purple-400">98%</div><div className="text-xs text-gray-300">Satisfaction</div></div></div>
                                    <Tag color="blue" className="mt-3 text-xs">Design 2025</Tag>
                                </Card>
                            </motion.div>
                        </motion.div>
                    </Col>
                </Row>
            </div>
        </AuthLayout>
    )
}

export default memo(Login);