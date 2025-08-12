"use client"

import type React from "react"
import { useState } from "react"
import { Card, Tabs, Typography, Space, Tag, Button, Collapse, Table, Alert, Input, Select } from "antd"
import { CopyOutlined, ApiOutlined } from "@ant-design/icons"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism"

const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs
const { Panel } = Collapse
const { TextArea } = Input
const { Option } = Select

interface APIEndpoint {
  method: string
  path: string
  description: string
  parameters?: Array<{
    name: string
    type: string
    required: boolean
    description: string
  }>
  responses: Array<{
    code: number
    description: string
    example?: any
  }>
}

const APIDocumentation: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("auth")
  const [apiKey, setApiKey] = useState<string>("")
  const [environment, setEnvironment] = useState<string>("sandbox")

  const endpoints: Record<string, APIEndpoint[]> = {
    auth: [
      {
        method: "POST",
        path: "/api/v1/auth/login",
        description: "Authentification utilisateur avec email et mot de passe",
        parameters: [
          { name: "email", type: "string", required: true, description: "Adresse email de l'utilisateur" },
          { name: "password", type: "string", required: true, description: "Mot de passe" },
          { name: "remember_me", type: "boolean", required: false, description: "Maintenir la session active" },
        ],
        responses: [
          {
            code: 200,
            description: "Connexion réussie",
            example: {
              success: true,
              data: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                user: {
                  id: 1,
                  email: "user@example.com",
                  role: "employee",
                  tenant_id: "acme-corp",
                },
                expires_at: "2024-12-31T23:59:59Z",
              },
            },
          },
          {
            code: 401,
            description: "Identifiants invalides",
            example: {
              success: false,
              error: {
                code: "INVALID_CREDENTIALS",
                message: "Email ou mot de passe incorrect",
              },
            },
          },
        ],
      },
      {
        method: "POST",
        path: "/api/v1/auth/refresh",
        description: "Renouvellement du token d'authentification",
        parameters: [{ name: "refresh_token", type: "string", required: true, description: "Token de renouvellement" }],
        responses: [
          {
            code: 200,
            description: "Token renouvelé avec succès",
            example: {
              success: true,
              data: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                expires_at: "2024-12-31T23:59:59Z",
              },
            },
          },
        ],
      },
    ],
    formations: [
      {
        method: "GET",
        path: "/api/v1/formations",
        description: "Récupération de la liste des formations",
        parameters: [
          { name: "page", type: "integer", required: false, description: "Numéro de page (défaut: 1)" },
          { name: "limit", type: "integer", required: false, description: "Nombre d'éléments par page (défaut: 20)" },
          { name: "category", type: "string", required: false, description: "Filtrer par catégorie" },
          {
            name: "status",
            type: "string",
            required: false,
            description: "Filtrer par statut (active, draft, archived)",
          },
        ],
        responses: [
          {
            code: 200,
            description: "Liste des formations récupérée avec succès",
            example: {
              success: true,
              data: {
                formations: [
                  {
                    id: 1,
                    title: "Formation Leadership",
                    description: "Développer ses compétences de leadership",
                    category: "Management",
                    duration: 16,
                    status: "active",
                    created_at: "2024-01-15T10:00:00Z",
                  },
                ],
                pagination: {
                  current_page: 1,
                  total_pages: 5,
                  total_items: 95,
                  per_page: 20,
                },
              },
            },
          },
        ],
      },
      {
        method: "POST",
        path: "/api/v1/formations",
        description: "Création d'une nouvelle formation",
        parameters: [
          { name: "title", type: "string", required: true, description: "Titre de la formation" },
          { name: "description", type: "string", required: true, description: "Description détaillée" },
          { name: "category", type: "string", required: true, description: "Catégorie de la formation" },
          { name: "duration", type: "integer", required: true, description: "Durée en heures" },
        ],
        responses: [
          {
            code: 201,
            description: "Formation créée avec succès",
            example: {
              success: true,
              data: {
                id: 123,
                title: "Nouvelle Formation",
                status: "draft",
                created_at: "2024-01-20T14:30:00Z",
              },
            },
          },
        ],
      },
    ],
    participants: [
      {
        method: "GET",
        path: "/api/v1/participants",
        description: "Liste des participants aux formations",
        parameters: [
          { name: "formation_id", type: "integer", required: false, description: "Filtrer par formation" },
          { name: "status", type: "string", required: false, description: "Statut du participant" },
        ],
        responses: [
          {
            code: 200,
            description: "Liste des participants",
            example: {
              success: true,
              data: {
                participants: [
                  {
                    id: 1,
                    user_id: 456,
                    formation_id: 123,
                    status: "enrolled",
                    progress: 75,
                    enrolled_at: "2024-01-10T09:00:00Z",
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  }

  const codeExamples = {
    javascript: `
// Installation
npm install @ingenia/sdk

// Configuration
import { IngeniaSDK } from '@ingenia/sdk'

const client = new IngeniaSDK({
  apiKey: 'your-api-key',
  environment: 'production' // ou 'sandbox'
})

// Authentification
const auth = await client.auth.login({
  email: 'user@example.com',
  password: 'password123'
})

// Récupération des formations
const formations = await client.formations.list({
  page: 1,
  limit: 20,
  category: 'Management'
})

// Inscription à une formation
const enrollment = await client.participants.enroll({
  formation_id: 123,
  user_id: 456
})
    `,
    python: `
# Installation
pip install ingenia-sdk

# Configuration
from ingenia_sdk import IngeniaClient

client = IngeniaClient(
    api_key='your-api-key',
    environment='production'  # ou 'sandbox'
)

# Authentification
auth_response = client.auth.login(
    email='user@example.com',
    password='password123'
)

# Récupération des formations
formations = client.formations.list(
    page=1,
    limit=20,
    category='Management'
)

# Inscription à une formation
enrollment = client.participants.enroll(
    formation_id=123,
    user_id=456
)
    `,
    curl: `
# Authentification
curl -X POST https://api.ingenia.com/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'

# Récupération des formations (avec token)
curl -X GET "https://api.ingenia.com/v1/formations?page=1&limit=20" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json"

# Création d'une formation
curl -X POST https://api.ingenia.com/v1/formations \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Formation Leadership",
    "description": "Développer ses compétences de leadership",
    "category": "Management",
    "duration": 16
  }'
    `,
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const renderEndpoint = (endpoint: APIEndpoint) => (
    <Card key={`${endpoint.method}-${endpoint.path}`} style={{ marginBottom: "16px" }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <div>
          <Space>
            <Tag color={endpoint.method === "GET" ? "blue" : endpoint.method === "POST" ? "green" : "orange"}>
              {endpoint.method}
            </Tag>
            <Text code style={{ fontSize: "16px" }}>
              {endpoint.path}
            </Text>
          </Space>
          <Paragraph style={{ marginTop: "8px" }}>{endpoint.description}</Paragraph>
        </div>

        {endpoint.parameters && endpoint.parameters.length > 0 && (
          <div>
            <Title level={5}>Paramètres</Title>
            <Table
              size="small"
              dataSource={endpoint.parameters}
              columns={[
                { title: "Nom", dataIndex: "name", key: "name", render: (text) => <Text code>{text}</Text> },
                { title: "Type", dataIndex: "type", key: "type" },
                {
                  title: "Requis",
                  dataIndex: "required",
                  key: "required",
                  render: (required) => <Tag color={required ? "red" : "default"}>{required ? "Oui" : "Non"}</Tag>,
                },
                { title: "Description", dataIndex: "description", key: "description" },
              ]}
              pagination={false}
            />
          </div>
        )}

        <div>
          <Title level={5}>Réponses</Title>
          <Collapse>
            {endpoint.responses.map((response, index) => (
              <Panel
                key={index}
                header={
                  <Space>
                    <Tag color={response.code === 200 || response.code === 201 ? "success" : "error"}>
                      {response.code}
                    </Tag>
                    <span>{response.description}</span>
                  </Space>
                }
              >
                {response.example && (
                  <div>
                    <div style={{ marginBottom: "8px" }}>
                      <Button
                        size="small"
                        icon={<CopyOutlined />}
                        onClick={() => copyToClipboard(JSON.stringify(response.example, null, 2))}
                      >
                        Copier
                      </Button>
                    </div>
                    <SyntaxHighlighter language="json" style={tomorrow} customStyle={{ fontSize: "12px" }}>
                      {JSON.stringify(response.example, null, 2)}
                    </SyntaxHighlighter>
                  </div>
                )}
              </Panel>
            ))}
          </Collapse>
        </div>
      </Space>
    </Card>
  )

  return (
    <div style={{ padding: "24px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Card style={{ marginBottom: "24px" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <div>
            <Title level={1}>
              <ApiOutlined style={{ marginRight: "12px", color: "#6C5CE7" }} />
              Documentation API INGÉNIA
            </Title>
            <Paragraph>
              API REST complète pour intégrer INGÉNIA dans vos applications. Gérez les formations, participants,
              évaluations et bien plus encore.
            </Paragraph>
          </div>

          <Alert
            message="Environnement de test disponible"
            description="Utilisez l'environnement sandbox pour tester vos intégrations sans affecter les données de production."
            type="info"
            showIcon
          />

          <Space>
            <div>
              <Text strong>Environnement:</Text>
              <Select value={environment} onChange={setEnvironment} style={{ marginLeft: "8px", width: "120px" }}>
                <Option value="sandbox">Sandbox</Option>
                <Option value="production">Production</Option>
              </Select>
            </div>
            <div>
              <Text strong>URL de base:</Text>
              <Text code style={{ marginLeft: "8px" }}>
                {environment === "sandbox" ? "https://api-sandbox.ingenia.com/v1" : "https://api.ingenia.com/v1"}
              </Text>
            </div>
          </Space>
        </Space>
      </Card>

      <Tabs defaultActiveKey="endpoints" size="large">
        <TabPane tab="Points de terminaison" key="endpoints">
          <div style={{ display: "flex", gap: "24px" }}>
            <div style={{ width: "300px" }}>
              <Card title="Catégories" size="small">
                <Space direction="vertical" style={{ width: "100%" }}>
                  {Object.keys(endpoints).map((category) => (
                    <Button
                      key={category}
                      type={selectedEndpoint === category ? "primary" : "default"}
                      block
                      onClick={() => setSelectedEndpoint(category)}
                      style={{ textAlign: "left" }}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                      <Tag style={{ float: "right" }}>{endpoints[category].length}</Tag>
                    </Button>
                  ))}
                </Space>
              </Card>
            </div>

            <div style={{ flex: 1 }}>{endpoints[selectedEndpoint]?.map((endpoint) => renderEndpoint(endpoint))}</div>
          </div>
        </TabPane>

        <TabPane tab="Exemples de code" key="examples">
          <Tabs tabPosition="left">
            <TabPane tab="JavaScript/Node.js" key="javascript">
              <Card>
                <div style={{ marginBottom: "16px" }}>
                  <Button icon={<CopyOutlined />} onClick={() => copyToClipboard(codeExamples.javascript)}>
                    Copier le code
                  </Button>
                </div>
                <SyntaxHighlighter language="javascript" style={tomorrow}>
                  {codeExamples.javascript}
                </SyntaxHighlighter>
              </Card>
            </TabPane>

            <TabPane tab="Python" key="python">
              <Card>
                <div style={{ marginBottom: "16px" }}>
                  <Button icon={<CopyOutlined />} onClick={() => copyToClipboard(codeExamples.python)}>
                    Copier le code
                  </Button>
                </div>
                <SyntaxHighlighter language="python" style={tomorrow}>
                  {codeExamples.python}
                </SyntaxHighlighter>
              </Card>
            </TabPane>

            <TabPane tab="cURL" key="curl">
              <Card>
                <div style={{ marginBottom: "16px" }}>
                  <Button icon={<CopyOutlined />} onClick={() => copyToClipboard(codeExamples.curl)}>
                    Copier le code
                  </Button>
                </div>
                <SyntaxHighlighter language="bash" style={tomorrow}>
                  {codeExamples.curl}
                </SyntaxHighlighter>
              </Card>
            </TabPane>
          </Tabs>
        </TabPane>

        <TabPane tab="Authentification" key="auth">
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            <Card title="Clé API">
              <Space direction="vertical" style={{ width: "100%" }}>
                <Paragraph>
                  Toutes les requêtes API doivent inclure votre clé API dans l'en-tête Authorization.
                </Paragraph>

                <div>
                  <Text strong>Votre clé API:</Text>
                  <Input.Password
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Saisissez votre clé API"
                    style={{ marginTop: "8px" }}
                  />
                </div>

                <Alert
                  message="Sécurité"
                  description="Ne partagez jamais votre clé API et utilisez HTTPS pour toutes les requêtes."
                  type="warning"
                  showIcon
                />
              </Space>
            </Card>

            <Card title="Authentification Bearer Token">
              <Space direction="vertical" style={{ width: "100%" }}>
                <Paragraph>Après connexion, utilisez le token JWT dans l'en-tête Authorization:</Paragraph>

                <SyntaxHighlighter language="bash" style={tomorrow}>
                  {`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}
                </SyntaxHighlighter>

                <Alert
                  message="Expiration des tokens"
                  description="Les tokens expirent après 24 heures. Utilisez le endpoint /auth/refresh pour les renouveler."
                  type="info"
                  showIcon
                />
              </Space>
            </Card>
          </Space>
        </TabPane>

        <TabPane tab="Webhooks" key="webhooks">
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            <Card title="Configuration des Webhooks">
              <Paragraph>
                Les webhooks vous permettent de recevoir des notifications en temps réel lorsque des événements se
                produisent dans INGÉNIA.
              </Paragraph>

              <Title level={4}>Événements disponibles</Title>
              <Table
                dataSource={[
                  { key: "1", event: "formation.created", description: "Nouvelle formation créée" },
                  { key: "2", event: "participant.enrolled", description: "Participant inscrit à une formation" },
                  { key: "3", event: "formation.completed", description: "Formation terminée par un participant" },
                  { key: "4", event: "evaluation.submitted", description: "Évaluation soumise" },
                ]}
                columns={[
                  { title: "Événement", dataIndex: "event", key: "event", render: (text) => <Text code>{text}</Text> },
                  { title: "Description", dataIndex: "description", key: "description" },
                ]}
                pagination={false}
              />
            </Card>
          </Space>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default APIDocumentation
