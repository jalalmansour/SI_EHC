"use client"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Card, Typography, Button, Row, Col, Statistic, Timeline, Space, Avatar, Progress } from "antd"
import {
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
  TrophyOutlined,
  RightOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  StarOutlined,
} from "@ant-design/icons"

const { Title, Text, Paragraph } = Typography

const DashboardWelcome = () => {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const quickStats = [
    {
      title: "Formations disponibles",
      value: 156,
      icon: <BookOutlined className="text-blue-600" />,
      color: "#1890ff",
      suffix: "",
    },
    {
      title: "Formations suivies",
      value: 3,
      icon: <TrophyOutlined className="text-green-600" />,
      color: "#52c41a",
      suffix: "",
    },
    {
      title: "Prochaines sessions",
      value: 2,
      icon: <CalendarOutlined className="text-orange-600" />,
      color: "#fa8c16",
      suffix: "",
    },
    {
      title: "Heures de formation",
      value: 24,
      icon: <ClockCircleOutlined className="text-purple-600" />,
      color: "#722ed1",
      suffix: "h",
    },
  ]

  const quickActions = [
    {
      title: "Explorer le catalogue",
      description: "Découvrez toutes nos formations disponibles",
      icon: <BookOutlined />,
      action: () => navigate("/catalog"),
      color: "#1890ff",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Mon planning",
      description: "Consultez vos formations planifiées",
      icon: <CalendarOutlined />,
      action: () => navigate("/calendar"),
      color: "#52c41a",
      gradient: "from-green-500 to-green-600",
    },
    {
      title: "Tableau de bord",
      description: "Accédez à votre espace complet",
      icon: <UserOutlined />,
      action: () => navigate("/dashboard"),
      color: "#722ed1",
      gradient: "from-purple-500 to-purple-600",
    },
  ]

  const recentActivities = [
    {
      title: "Inscription confirmée",
      description: 'Formation "Leadership et Management"',
      time: "Il y a 2 heures",
      icon: <CheckCircleOutlined className="text-green-500" />,
      type: "success",
    },
    {
      title: "Nouveau catalogue disponible",
      description: "Formations digitales 2024",
      time: "Hier",
      icon: <BookOutlined className="text-blue-500" />,
      type: "info",
    },
    {
      title: "Rappel de session",
      description: "Formation prévue demain à 14h",
      time: "Il y a 1 jour",
      icon: <CalendarOutlined className="text-orange-500" />,
      type: "warning",
    },
    {
      title: "Certificat obtenu",
      description: 'Formation "Communication Efficace"',
      time: "Il y a 3 jours",
      icon: <TrophyOutlined className="text-yellow-500" />,
      type: "success",
    },
  ]

  const nextSteps = [
    {
      title: "Complétez votre profil",
      description: "Ajoutez une photo et vos préférences",
      progress: 60,
      color: "#1890ff",
    },
    {
      title: "Explorez le catalogue",
      description: "Découvrez les formations disponibles",
      progress: 0,
      color: "#52c41a",
    },
    {
      title: "Planifiez votre première formation",
      description: "Choisissez et inscrivez-vous",
      progress: 0,
      color: "#fa8c16",
    },
    {
      title: "Rejoignez la communauté",
      description: "Connectez-vous avec d'autres apprenants",
      progress: 0,
      color: "#722ed1",
    },
  ]

  const getUserTypeInfo = (userType) => {
    const types = {
      admin: { icon: "👑", color: "#722ed1", label: "Administrateur" },
      manager: { icon: "👨‍💼", color: "#1890ff", label: "Manager" },
      trainer: { icon: "👨‍🏫", color: "#52c41a", label: "Formateur" },
      hr: { icon: "👥", color: "#fa8c16", label: "RH" },
      employee: { icon: "👨‍💻", color: "#13c2c2", label: "Employé" },
      consultant: { icon: "🎯", color: "#eb2f96", label: "Consultant" },
    }
    return types[userType] || types.employee
  }

  const userInfo = getUserTypeInfo(user?.userType)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de bienvenue */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Row align="middle" gutter={24}>
            <Col>
              <div className="relative">
                <Avatar
                  size={100}
                  icon={<UserOutlined />}
                  className="bg-white bg-opacity-20 border-4 border-white border-opacity-30"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-xl">
                  {userInfo.icon}
                </div>
              </div>
            </Col>
            <Col flex="auto">
              <Space direction="vertical" size="small">
                <Title level={1} className="text-white mb-0">
                  Bienvenue, {user?.firstName || "Utilisateur"} ! 🎉
                </Title>
                <Paragraph className="text-blue-100 text-xl mb-2">
                  Votre compte INGÉNIA a été créé avec succès. Vous êtes maintenant prêt à découvrir notre plateforme de
                  formation innovante et à développer vos compétences.
                </Paragraph>
                <Space className="text-blue-200">
                  <Text className="text-blue-200">
                    <strong>Profil :</strong> {userInfo.label}
                  </Text>
                  <Text className="text-blue-200">•</Text>
                  <Text className="text-blue-200">
                    <strong>Entreprise :</strong> {user?.company || "Non renseignée"}
                  </Text>
                  <Text className="text-blue-200">•</Text>
                  <Text className="text-blue-200">
                    <strong>Membre depuis :</strong> Aujourd'hui
                  </Text>
                </Space>
              </Space>
            </Col>
            <Col>
              <Button
                type="primary"
                size="large"
                onClick={() => navigate("/dashboard")}
                className="bg-white text-indigo-600 hover:bg-gray-100 border-0 font-semibold px-8 h-12"
              >
                Accéder au tableau de bord
              </Button>
            </Col>
          </Row>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques rapides */}
        <Row gutter={[24, 24]} className="mb-8">
          {quickStats.map((stat, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 rounded-xl">
                <div className="mb-4 text-4xl">{stat.icon}</div>
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  suffix={stat.suffix}
                  valueStyle={{ color: stat.color, fontSize: "2rem", fontWeight: "bold" }}
                />
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 24]}>
          {/* Actions rapides */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <Space>
                  <RightOutlined className="text-indigo-600" />
                  <span>Actions rapides</span>
                </Space>
              }
              className="h-full shadow-lg border-0 rounded-xl"
            >
              <Space direction="vertical" className="w-full" size="large">
                {quickActions.map((action, index) => (
                  <Card
                    key={index}
                    size="small"
                    className="cursor-pointer hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-indigo-300 rounded-lg"
                    onClick={action.action}
                  >
                    <Row align="middle" gutter={16}>
                      <Col>
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${action.gradient} rounded-xl flex items-center justify-center text-white text-xl`}
                        >
                          {action.icon}
                        </div>
                      </Col>
                      <Col flex="auto">
                        <Title level={5} className="mb-1">
                          {action.title}
                        </Title>
                        <Text className="text-gray-600">{action.description}</Text>
                      </Col>
                      <Col>
                        <RightOutlined className="text-gray-400" />
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Space>
            </Card>
          </Col>

          {/* Activités récentes */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <Space>
                  <ClockCircleOutlined className="text-indigo-600" />
                  <span>Activités récentes</span>
                </Space>
              }
              className="h-full shadow-lg border-0 rounded-xl"
            >
              <Timeline>
                {recentActivities.map((activity, index) => (
                  <Timeline.Item key={index} dot={activity.icon}>
                    <div>
                      <Title level={5} className="mb-1">
                        {activity.title}
                      </Title>
                      <Text className="text-gray-600 block mb-1">{activity.description}</Text>
                      <Text className="text-gray-400 text-sm">{activity.time}</Text>
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card>
          </Col>
        </Row>

        {/* Prochaines étapes */}
        <Card
          title={
            <Space>
              <StarOutlined className="text-indigo-600" />
              <span>Prochaines étapes recommandées</span>
            </Space>
          }
          className="mt-8 shadow-lg border-0 rounded-xl"
        >
          <Row gutter={[24, 24]}>
            {nextSteps.map((step, index) => (
              <Col xs={24} sm={12} key={index}>
                <Card
                  size="small"
                  className="h-full border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                      style={{ backgroundColor: step.color }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <Title level={5} className="mb-2">
                        {step.title}
                      </Title>
                      <Text className="text-gray-600 block mb-3">{step.description}</Text>
                      <Progress percent={step.progress} strokeColor={step.color} size="small" showInfo={false} />
                      <Text className="text-xs text-gray-500 mt-1">{step.progress}% complété</Text>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>

        {/* Call to action final */}
        <Card className="mt-8 bg-gradient-to-r from-indigo-500 to-blue-600 border-0 rounded-xl text-white">
          <Row align="middle" justify="space-between">
            <Col>
              <Title level={3} className="text-white mb-2">
                Prêt à commencer votre parcours de formation ?
              </Title>
              <Text className="text-blue-100 text-lg">
                Explorez notre catalogue de formations et trouvez celle qui correspond à vos objectifs.
              </Text>
            </Col>
            <Col>
              <Space>
                <Button
                  size="large"
                  onClick={() => navigate("/catalog")}
                  className="bg-white text-indigo-600 hover:bg-gray-100 border-0 font-semibold px-6"
                >
                  Explorer le catalogue
                </Button>
                <Button
                  size="large"
                  onClick={() => navigate("/dashboard")}
                  className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-semibold px-6"
                >
                  Tableau de bord
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  )
}

export default DashboardWelcome
