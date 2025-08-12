"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Card,
  Button,
  Space,
  Typography,
  Progress,
  List,
  Avatar,
  Badge,
  FloatButton,
  Drawer,
  Alert,
  Statistic,
} from "antd"
import {
  HomeOutlined,
  BookOutlined,
  CalendarOutlined,
  UserOutlined,
  BellOutlined,
  SearchOutlined,
  SettingOutlined,
  LogoutOutlined,
  DownloadOutlined,
  WifiOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons"

const { Title, Text, Paragraph } = Typography

interface MobileAppProps {
  user?: {
    id: number
    name: string
    email: string
    avatar?: string
    role: string
  }
}

interface Formation {
  id: number
  title: string
  progress: number
  status: "completed" | "in-progress" | "not-started"
  duration: number
  category: string
  nextSession?: string
}

interface Notification {
  id: number
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  timestamp: string
  read: boolean
}

const MobileApp: React.FC<MobileAppProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<string>("home")
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine)
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [formations, setFormations] = useState<Formation[]>([])
  const [isInstallPromptVisible, setIsInstallPromptVisible] = useState<boolean>(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  // Données de démonstration
  const demoFormations: Formation[] = [
    {
      id: 1,
      title: "Formation Leadership",
      progress: 75,
      status: "in-progress",
      duration: 16,
      category: "Management",
      nextSession: "2024-01-25T14:00:00Z",
    },
    {
      id: 2,
      title: "Communication Efficace",
      progress: 100,
      status: "completed",
      duration: 8,
      category: "Soft Skills",
    },
    {
      id: 3,
      title: "Gestion de Projet Agile",
      progress: 0,
      status: "not-started",
      duration: 24,
      category: "Méthodologie",
    },
  ]

  const demoNotifications: Notification[] = [
    {
      id: 1,
      title: "Nouvelle formation disponible",
      message: 'La formation "Innovation et Créativité" est maintenant disponible',
      type: "info",
      timestamp: "2024-01-20T10:30:00Z",
      read: false,
    },
    {
      id: 2,
      title: "Session programmée",
      message: "Votre session de Formation Leadership commence dans 2 heures",
      type: "warning",
      timestamp: "2024-01-20T12:00:00Z",
      read: false,
    },
    {
      id: 3,
      title: "Certificat disponible",
      message: "Votre certificat de Communication Efficace est prêt",
      type: "success",
      timestamp: "2024-01-19T16:45:00Z",
      read: true,
    },
  ]

  useEffect(() => {
    setFormations(demoFormations)
    setNotifications(demoNotifications)

    // Écouter les changements de connexion
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Écouter l'événement d'installation PWA
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallPromptVisible(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === "accepted") {
        console.log("PWA installée avec succès")
      }

      setDeferredPrompt(null)
      setIsInstallPromptVisible(false)
    }
  }

  const getStatusIcon = (status: Formation["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircleOutlined style={{ color: "#52c41a" }} />
      case "in-progress":
        return <PlayCircleOutlined style={{ color: "#1890ff" }} />
      case "not-started":
        return <ClockCircleOutlined style={{ color: "#d9d9d9" }} />
      default:
        return <ClockCircleOutlined />
    }
  }

  const renderHomeTab = () => (
    <div style={{ padding: "16px" }}>
      {/* Statut de connexion */}
      {!isOnline && (
        <Alert
          message="Mode hors ligne"
          description="Certaines fonctionnalités peuvent être limitées"
          type="warning"
          icon={<WifiOutlined />}
          style={{ marginBottom: "16px" }}
          showIcon
        />
      )}

      {/* Prompt d'installation PWA */}
      {isInstallPromptVisible && (
        <Alert
          message="Installer l'application"
          description="Installez INGÉNIA sur votre appareil pour une meilleure expérience"
          type="info"
          action={
            <Button size="small" type="primary" onClick={handleInstallApp}>
              <DownloadOutlined /> Installer
            </Button>
          }
          style={{ marginBottom: "16px" }}
          closable
          onClose={() => setIsInstallPromptVisible(false)}
        />
      )}

      {/* Salutation utilisateur */}
      <Card style={{ marginBottom: "16px" }}>
        <Space align="center">
          <Avatar size={64} src={user?.avatar} icon={<UserOutlined />} />
          <div>
            <Title level={4} style={{ margin: 0 }}>
              Bonjour {user?.name || "Utilisateur"} 👋
            </Title>
            <Text type="secondary">
              Vous avez {formations.filter((f) => f.status === "in-progress").length} formations en cours
            </Text>
          </div>
        </Space>
      </Card>

      {/* Statistiques rapides */}
      <Card style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Statistic
            title="Terminées"
            value={formations.filter((f) => f.status === "completed").length}
            valueStyle={{ color: "#52c41a", fontSize: "20px" }}
          />
          <Statistic
            title="En cours"
            value={formations.filter((f) => f.status === "in-progress").length}
            valueStyle={{ color: "#1890ff", fontSize: "20px" }}
          />
          <Statistic
            title="À venir"
            value={formations.filter((f) => f.status === "not-started").length}
            valueStyle={{ color: "#faad14", fontSize: "20px" }}
          />
        </div>
      </Card>

      {/* Formations en cours */}
      <Card title="Mes formations en cours" style={{ marginBottom: "16px" }}>
        <List
          dataSource={formations.filter((f) => f.status === "in-progress")}
          renderItem={(formation) => (
            <List.Item key={formation.id}>
              <List.Item.Meta
                avatar={getStatusIcon(formation.status)}
                title={formation.title}
                description={
                  <div>
                    <Progress percent={formation.progress} size="small" />
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      {formation.category} • {formation.duration}h
                    </Text>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>

      {/* Prochaines sessions */}
      <Card title="Prochaines sessions">
        <List
          dataSource={formations.filter((f) => f.nextSession)}
          renderItem={(formation) => (
            <List.Item key={formation.id}>
              <List.Item.Meta
                avatar={<CalendarOutlined style={{ color: "#1890ff" }} />}
                title={formation.title}
                description={
                  <Text type="secondary">
                    {new Date(formation.nextSession!).toLocaleDateString("fr-FR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  )

  const renderFormationsTab = () => (
    <div style={{ padding: "16px" }}>
      <Card title="Toutes mes formations">
        <List
          dataSource={formations}
          renderItem={(formation) => (
            <List.Item
              key={formation.id}
              actions={[
                <Button type={formation.status === "not-started" ? "primary" : "default"} size="small">
                  {formation.status === "completed"
                    ? "Revoir"
                    : formation.status === "in-progress"
                      ? "Continuer"
                      : "Commencer"}
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={getStatusIcon(formation.status)}
                title={formation.title}
                description={
                  <div>
                    <div style={{ marginBottom: "8px" }}>
                      <Progress
                        percent={formation.progress}
                        size="small"
                        status={formation.status === "completed" ? "success" : "active"}
                      />
                    </div>
                    <Space>
                      <Text type="secondary">{formation.category}</Text>
                      <Text type="secondary">•</Text>
                      <Text type="secondary">{formation.duration}h</Text>
                    </Space>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  )

  const renderCalendarTab = () => (
    <div style={{ padding: "16px" }}>
      <Card title="Mon planning">
        <Paragraph>Fonctionnalité de calendrier en cours de développement...</Paragraph>
        <Button type="primary" block>
          Voir le calendrier complet
        </Button>
      </Card>
    </div>
  )

  const renderProfileTab = () => (
    <div style={{ padding: "16px" }}>
      <Card>
        <Space direction="vertical" style={{ width: "100%" }} align="center">
          <Avatar size={80} src={user?.avatar} icon={<UserOutlined />} />
          <Title level={4}>{user?.name || "Utilisateur"}</Title>
          <Text type="secondary">{user?.email}</Text>
          <Text type="secondary">Rôle: {user?.role || "Employé"}</Text>
        </Space>
      </Card>

      <Card title="Paramètres" style={{ marginTop: "16px" }}>
        <List>
          <List.Item>
            <List.Item.Meta
              avatar={<BellOutlined />}
              title="Notifications"
              description="Gérer les notifications push"
            />
          </List.Item>
          <List.Item>
            <List.Item.Meta avatar={<SettingOutlined />} title="Préférences" description="Langue, thème, etc." />
          </List.Item>
          <List.Item>
            <List.Item.Meta avatar={<SyncOutlined />} title="Synchronisation" description="Synchroniser les données" />
          </List.Item>
        </List>
      </Card>

      <Button type="primary" danger block style={{ marginTop: "16px" }} icon={<LogoutOutlined />}>
        Se déconnecter
      </Button>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return renderHomeTab()
      case "formations":
        return renderFormationsTab()
      case "calendar":
        return renderCalendarTab()
      case "profile":
        return renderProfileTab()
      default:
        return renderHomeTab()
    }
  }

  const menuItems = [
    { key: "home", icon: <HomeOutlined />, label: "Accueil" },
    { key: "formations", icon: <BookOutlined />, label: "Formations" },
    { key: "calendar", icon: <CalendarOutlined />, label: "Planning" },
    { key: "profile", icon: <UserOutlined />, label: "Profil" },
  ]

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* En-tête mobile */}
      <div
        style={{
          backgroundColor: "#6C5CE7",
          color: "white",
          padding: "12px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Title level={4} style={{ color: "white", margin: 0 }}>
          INGÉNIA
        </Title>
        <Space>
          <Badge count={notifications.filter((n) => !n.read).length}>
            <Button
              type="text"
              icon={<BellOutlined />}
              style={{ color: "white" }}
              onClick={() => setDrawerVisible(true)}
            />
          </Badge>
          <Button type="text" icon={<SearchOutlined />} style={{ color: "white" }} />
        </Space>
      </div>

      {/* Contenu principal */}
      <div style={{ flex: 1, overflow: "auto" }}>{renderContent()}</div>

      {/* Navigation inférieure */}
      <div
        style={{
          backgroundColor: "white",
          borderTop: "1px solid #f0f0f0",
          padding: "8px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {menuItems.map((item) => (
            <Button
              key={item.key}
              type="text"
              icon={item.icon}
              onClick={() => setActiveTab(item.key)}
              style={{
                display: "flex",
                flexDirection: "column",
                height: "auto",
                padding: "8px 12px",
                color: activeTab === item.key ? "#6C5CE7" : "#666",
                fontSize: "12px",
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Drawer pour les notifications */}
      <Drawer
        title="Notifications"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width="100%"
      >
        <List
          dataSource={notifications}
          renderItem={(notification) => (
            <List.Item
              key={notification.id}
              style={{
                backgroundColor: notification.read ? "transparent" : "#f0f2ff",
                padding: "12px",
                marginBottom: "8px",
                borderRadius: "8px",
              }}
            >
              <List.Item.Meta
                title={notification.title}
                description={
                  <div>
                    <Paragraph style={{ margin: "4px 0" }}>{notification.message}</Paragraph>
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      {new Date(notification.timestamp).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Drawer>

      {/* Bouton flottant pour actions rapides */}
      <FloatButton.Group trigger="click" type="primary" style={{ right: 24, bottom: 80 }} icon={<SettingOutlined />}>
        <FloatButton icon={<SyncOutlined />} tooltip="Synchroniser" />
        <FloatButton icon={<SearchOutlined />} tooltip="Rechercher" />
        <FloatButton icon={<BellOutlined />} tooltip="Notifications" />
      </FloatButton.Group>
    </div>
  )
}

export default MobileApp
