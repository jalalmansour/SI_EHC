"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  Card,
  Tabs,
  Form,
  Input,
  Button,
  Switch,
  Select,
  Divider,
  message,
  Modal,
  Alert,
  List,
  Tag,
  Typography,
} from "antd"
import {
  LockOutlined,
  BellOutlined,
  GlobalOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
  ShieldOutlined,
  MobileOutlined,
} from "@ant-design/icons"
import { updateUserProfile } from "../redux/slices/authSlice"

const { TabPane } = Tabs
const { Option } = Select
const { Password } = Input
const { Text, Title } = Typography

const SettingsPage = () => {
  const dispatch = useDispatch()
  const { user, loading } = useSelector((state) => state.auth)
  const [passwordForm] = Form.useForm()
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)

  // Mock security data
  const securityInfo = {
    lastPasswordChange: "2024-01-01",
    twoFactorEnabled: false,
    activeSessions: 3,
    recentLogins: [
      { location: "Paris, France", device: "Chrome on Windows", time: "2024-01-15 09:30" },
      { location: "Lyon, France", device: "Safari on iPhone", time: "2024-01-14 18:45" },
      { location: "Paris, France", device: "Firefox on Windows", time: "2024-01-13 14:20" },
    ],
  }

  const handlePasswordChange = async (values) => {
    try {
      // await dispatch(changePassword(values)).unwrap()
      message.success("Mot de passe modifié avec succès")
      passwordForm.resetFields()
    } catch (error) {
      message.error(error)
    }
  }

  const handlePreferenceChange = (key, value) => {
    const newPreferences = { ...user.preferences }
    if (key.includes(".")) {
      const [parent, child] = key.split(".")
      newPreferences[parent] = { ...newPreferences[parent], [child]: value }
    } else {
      newPreferences[key] = value
    }

    dispatch(updateUserProfile({ preferences: newPreferences }))
    message.success("Préférences mises à jour")
  }

  const handleAccountDeletion = () => {
    Modal.confirm({
      title: "Supprimer le compte",
      icon: <ExclamationCircleOutlined />,
      content: "Cette action est irréversible. Toutes vos données seront supprimées.",
      okText: "Supprimer",
      okType: "danger",
      cancelText: "Annuler",
      onOk() {
        message.success("Demande de suppression envoyée")
        setDeleteModalVisible(false)
      },
    })
  }

  const toggleTwoFactor = (enabled) => {
    if (enabled) {
      Modal.info({
        title: "Activation de l'authentification à deux facteurs",
        content: "Un email avec les instructions vous a été envoyé.",
        onOk() {
          message.success("2FA activé avec succès")
        },
      })
    } else {
      message.success("2FA désactivé")
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600">Gérez vos préférences et paramètres de sécurité</p>
      </div>

      <Tabs defaultActiveKey="account" type="card">
        {/* Account Settings */}
        <TabPane
          tab={
            <span>
              <UserOutlined />
              Compte
            </span>
          }
          key="account"
        >
          <Card title="Modification du mot de passe">
            <Form form={passwordForm} layout="vertical" onFinish={handlePasswordChange} className="max-w-md">
              <Form.Item
                label="Mot de passe actuel"
                name="currentPassword"
                rules={[{ required: true, message: "Mot de passe actuel requis" }]}
              >
                <Password />
              </Form.Item>

              <Form.Item
                label="Nouveau mot de passe"
                name="newPassword"
                rules={[
                  { required: true, message: "Nouveau mot de passe requis" },
                  { min: 8, message: "Au moins 8 caractères" },
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                    message: "Doit contenir majuscule, minuscule, chiffre et caractère spécial",
                  },
                ]}
              >
                <Password />
              </Form.Item>

              <Form.Item
                label="Confirmer le nouveau mot de passe"
                name="confirmPassword"
                dependencies={["newPassword"]}
                rules={[
                  { required: true, message: "Confirmation requise" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error("Les mots de passe ne correspondent pas"))
                    },
                  }),
                ]}
              >
                <Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<LockOutlined />} loading={loading}>
                  Modifier le mot de passe
                </Button>
              </Form.Item>
            </Form>
          </Card>

          <Card title="Zone de danger" className="mt-6">
            <Alert
              message="Suppression du compte"
              description="Cette action supprimera définitivement votre compte et toutes vos données."
              type="error"
              showIcon
              className="mb-4"
            />
            <Button danger icon={<DeleteOutlined />} onClick={() => setDeleteModalVisible(true)}>
              Supprimer mon compte
            </Button>
          </Card>
        </TabPane>

        {/* Security Settings */}
        <TabPane
          tab={
            <span>
              <ShieldOutlined />
              Sécurité
            </span>
          }
          key="security"
        >
          <Card title="Authentification à deux facteurs">
            <div className="flex justify-between items-center mb-4">
              <div>
                <Text strong>Authentification à deux facteurs</Text>
                <br />
                <Text type="secondary">Ajoutez une couche de sécurité supplémentaire à votre compte</Text>
              </div>
              <Switch checked={securityInfo.twoFactorEnabled} onChange={toggleTwoFactor} />
            </div>
          </Card>

          <Card title="Informations de sécurité" className="mt-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Text>Dernier changement de mot de passe</Text>
                <Text>{new Date(securityInfo.lastPasswordChange).toLocaleDateString("fr-FR")}</Text>
              </div>
              <div className="flex justify-between">
                <Text>Sessions actives</Text>
                <Tag color="blue">{securityInfo.activeSessions}</Tag>
              </div>
            </div>
          </Card>

          <Card title="Connexions récentes" className="mt-6">
            <List
              dataSource={securityInfo.recentLogins}
              renderItem={(login, index) => (
                <List.Item key={index}>
                  <List.Item.Meta
                    avatar={<MobileOutlined />}
                    title={login.device}
                    description={
                      <div>
                        <div>{login.location}</div>
                        <div className="text-xs text-gray-400">{login.time}</div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </TabPane>

        {/* Notification Settings */}
        <TabPane
          tab={
            <span>
              <BellOutlined />
              Notifications
            </span>
          }
          key="notifications"
        >
          <Card title="Préférences de notification">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <Text strong>Notifications par email</Text>
                  <br />
                  <Text type="secondary">Recevez des notifications par email</Text>
                </div>
                <Switch
                  checked={user?.preferences?.notifications?.email}
                  onChange={(checked) => handlePreferenceChange("notifications.email", checked)}
                />
              </div>

              <Divider />

              <div className="flex justify-between items-center">
                <div>
                  <Text strong>Notifications push</Text>
                  <br />
                  <Text type="secondary">Notifications dans le navigateur</Text>
                </div>
                <Switch
                  checked={user?.preferences?.notifications?.push}
                  onChange={(checked) => handlePreferenceChange("notifications.push", checked)}
                />
              </div>

              <Divider />

              <div className="flex justify-between items-center">
                <div>
                  <Text strong>Notifications SMS</Text>
                  <br />
                  <Text type="secondary">Recevez des SMS pour les alertes importantes</Text>
                </div>
                <Switch
                  checked={user?.preferences?.notifications?.sms}
                  onChange={(checked) => handlePreferenceChange("notifications.sms", checked)}
                />
              </div>
            </div>
          </Card>

          <Card title="Types de notifications" className="mt-6">
            <div className="space-y-4">
              {[
                { key: "training_reminders", label: "Rappels de formation", enabled: true },
                { key: "evaluation_requests", label: "Demandes d'évaluation", enabled: true },
                { key: "budget_alerts", label: "Alertes budget", enabled: false },
                { key: "system_updates", label: "Mises à jour système", enabled: true },
              ].map((notif) => (
                <div key={notif.key} className="flex justify-between items-center">
                  <Text>{notif.label}</Text>
                  <Switch defaultChecked={notif.enabled} />
                </div>
              ))}
            </div>
          </Card>
        </TabPane>

        {/* User Preferences */}
        <TabPane
          tab={
            <span>
              <GlobalOutlined />
              Préférences
            </span>
          }
          key="preferences"
        >
          <Card title="Préférences générales">
            <div className="space-y-6 max-w-md">
              <div>
                <Text strong className="block mb-2">
                  Langue
                </Text>
                <Select
                  value={user?.preferences?.language}
                  onChange={(value) => handlePreferenceChange("language", value)}
                  className="w-full"
                >
                  <Option value="fr">Français</Option>
                  <Option value="en">English</Option>
                  <Option value="es">Español</Option>
                </Select>
              </div>

              <div>
                <Text strong className="block mb-2">
                  Fuseau horaire
                </Text>
                <Select
                  value={user?.preferences?.timezone}
                  onChange={(value) => handlePreferenceChange("timezone", value)}
                  className="w-full"
                >
                  <Option value="Europe/Paris">Europe/Paris (GMT+1)</Option>
                  <Option value="Europe/London">Europe/London (GMT+0)</Option>
                  <Option value="America/New_York">America/New_York (GMT-5)</Option>
                </Select>
              </div>

              <div>
                <Text strong className="block mb-2">
                  Thème
                </Text>
                <Select
                  value={user?.preferences?.theme}
                  onChange={(value) => handlePreferenceChange("theme", value)}
                  className="w-full"
                >
                  <Option value="light">Clair</Option>
                  <Option value="dark">Sombre</Option>
                  <Option value="auto">Automatique</Option>
                </Select>
              </div>
            </div>
          </Card>

          <Card title="Préférences de formation" className="mt-6">
            <div className="space-y-6 max-w-md">
              <div>
                <Text strong className="block mb-2">
                  Format préféré
                </Text>
                <Select defaultValue="mixed" className="w-full">
                  <Option value="online">En ligne</Option>
                  <Option value="offline">Présentiel</Option>
                  <Option value="mixed">Mixte</Option>
                </Select>
              </div>

              <div>
                <Text strong className="block mb-2">
                  Durée préférée
                </Text>
                <Select defaultValue="half_day" className="w-full">
                  <Option value="hour">1 heure</Option>
                  <Option value="half_day">Demi-journée</Option>
                  <Option value="full_day">Journée complète</Option>
                  <Option value="multi_day">Plusieurs jours</Option>
                </Select>
              </div>

              <div>
                <Text strong className="block mb-2">
                  Centres d'intérêt
                </Text>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Leadership", "Technique", "Communication", "Gestion", "Innovation"].map((tag) => (
                    <Tag key={tag} color="blue">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabPane>
      </Tabs>

      {/* Delete Account Modal */}
      <Modal
        title="Confirmer la suppression"
        open={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setDeleteModalVisible(false)}>
            Annuler
          </Button>,
          <Button key="delete" type="primary" danger onClick={handleAccountDeletion}>
            Supprimer définitivement
          </Button>,
        ]}
      >
        <Alert
          message="Attention"
          description="Cette action est irréversible. Toutes vos données seront supprimées définitivement."
          type="error"
          showIcon
          className="mb-4"
        />
        <p>Pour confirmer, tapez "SUPPRIMER" ci-dessous :</p>
        <Input placeholder="SUPPRIMER" />
      </Modal>
    </div>
  )
}

export default SettingsPage
