"use client"

import { useState } from "react"
import { Card, Typography, List, Tag, Button, Collapse, Space } from "antd"
import {
  InfoCircleOutlined,
  SecurityScanOutlined,
  ClockCircleOutlined,
  KeyOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons"
import { PASSWORD_POLICIES, generateSecurePassword } from "../../utils/passwordUtils"

const { Title, Text, Paragraph } = Typography
const { Panel } = Collapse

const PasswordPolicyInfo = ({ compact = false }) => {
  const [showExample, setShowExample] = useState(false)
  const [examplePassword, setExamplePassword] = useState("")

  const handleGenerateExample = () => {
    const newPassword = generateSecurePassword(16)
    setExamplePassword(newPassword)
    setShowExample(true)
  }

  const policyItems = [
    {
      title: "Longueur minimale",
      description: `Au moins ${PASSWORD_POLICIES.minLength} caractères`,
      icon: <KeyOutlined />,
      color: "blue",
    },
    {
      title: "Complexité requise",
      description: "Majuscules, minuscules, chiffres et caractères spéciaux",
      icon: <SecurityScanOutlined />,
      color: "green",
    },
    {
      title: "Restrictions",
      description: "Pas de mots communs ni d'informations personnelles",
      icon: <InfoCircleOutlined />,
      color: "orange",
    },
    {
      title: "Expiration",
      description: `Changement requis tous les ${PASSWORD_POLICIES.expirationDays} jours`,
      icon: <ClockCircleOutlined />,
      color: "purple",
    },
  ]

  const detailedRules = [
    `Minimum ${PASSWORD_POLICIES.minLength} caractères, maximum ${PASSWORD_POLICIES.maxLength}`,
    "Au moins une lettre majuscule (A-Z)",
    "Au moins une lettre minuscule (a-z)",
    "Au moins un chiffre (0-9)",
    "Au moins un caractère spécial (!@#$%^&*...)",
    `Maximum ${PASSWORD_POLICIES.maxConsecutiveChars} caractères identiques consécutifs`,
    "Ne doit pas contenir vos informations personnelles",
    "Ne doit pas être un mot de passe commun",
    `Ne peut pas être identique aux ${PASSWORD_POLICIES.historyCount} derniers mots de passe`,
    `Expire après ${PASSWORD_POLICIES.expirationDays} jours`,
  ]

  if (compact) {
    return (
      <Card size="small" style={{ marginBottom: 16 }}>
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <SecurityScanOutlined style={{ color: "#1890ff", marginRight: 8 }} />
            <Text strong>Politique de mot de passe</Text>
          </div>

          <Space wrap size={[4, 4]}>
            {policyItems.map((item, index) => (
              <Tag key={index} color={item.color} icon={item.icon}>
                {item.title}
              </Tag>
            ))}
          </Space>

          <Button type="link" size="small" onClick={handleGenerateExample} icon={<KeyOutlined />}>
            Générer un exemple sécurisé
          </Button>

          {showExample && (
            <div
              style={{
                background: "#f6ffed",
                border: "1px solid #b7eb8f",
                borderRadius: 4,
                padding: 8,
                fontSize: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Text code style={{ fontSize: 12 }}>
                  {examplePassword}
                </Text>
                <Button
                  type="text"
                  size="small"
                  icon={showExample ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  onClick={() => setShowExample(!showExample)}
                />
              </div>
              <Text type="secondary" style={{ fontSize: 11 }}>
                Exemple de mot de passe sécurisé
              </Text>
            </div>
          )}
        </Space>
      </Card>
    )
  }

  return (
    <Card>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <SecurityScanOutlined style={{ fontSize: 48, color: "#1890ff", marginBottom: 16 }} />
        <Title level={3}>Politique de Sécurité des Mots de Passe</Title>
        <Paragraph type="secondary">Respectez ces exigences pour garantir la sécurité de votre compte</Paragraph>
      </div>

      <Collapse defaultActiveKey={["1"]} ghost>
        <Panel header="Exigences de base" key="1">
          <List
            dataSource={policyItems}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<div style={{ color: item.color, fontSize: 16 }}>{item.icon}</div>}
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Panel>

        <Panel header="Règles détaillées" key="2">
          <List
            size="small"
            dataSource={detailedRules}
            renderItem={(rule, index) => (
              <List.Item>
                <Text>
                  <span
                    style={{
                      display: "inline-block",
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: "#1890ff",
                      color: "white",
                      textAlign: "center",
                      fontSize: 12,
                      lineHeight: "20px",
                      marginRight: 12,
                    }}
                  >
                    {index + 1}
                  </span>
                  {rule}
                </Text>
              </List.Item>
            )}
          />
        </Panel>

        <Panel header="Exemple de mot de passe sécurisé" key="3">
          <Space direction="vertical" style={{ width: "100%" }}>
            <Button type="primary" onClick={handleGenerateExample} icon={<KeyOutlined />}>
              Générer un exemple
            </Button>

            {showExample && (
              <div
                style={{
                  background: "#f6ffed",
                  border: "1px solid #b7eb8f",
                  borderRadius: 6,
                  padding: 16,
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}
                >
                  <Text strong>Mot de passe généré :</Text>
                  <Button
                    type="text"
                    icon={showExample ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                    onClick={() => setShowExample(!showExample)}
                  />
                </div>
                <Text code style={{ fontSize: 14, padding: "4px 8px", background: "#fff" }}>
                  {examplePassword}
                </Text>
                <div style={{ marginTop: 8 }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    ✅ Ce mot de passe respecte toutes les exigences de sécurité
                  </Text>
                </div>
              </div>
            )}
          </Space>
        </Panel>
      </Collapse>
    </Card>
  )
}

export default PasswordPolicyInfo
