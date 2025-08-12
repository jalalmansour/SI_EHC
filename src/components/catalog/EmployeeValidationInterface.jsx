"use client"

import { useState } from "react"
import { Card, Typography, Button, Space, Tag, Collapse, Checkbox, Alert, message } from "antd"
import { CheckCircleOutlined, CloseCircleOutlined, EyeOutlined } from "@ant-design/icons"

const { Title, Text } = Typography
const { Panel } = Collapse

const EmployeeValidationInterface = () => {
  const [validationStatus, setValidationStatus] = useState({})

  const employeeRequests = [
    {
      category: "Stratégie - Développement Durable",
      department: "Département Stratégie",
      manager: "Sophie Martin",
      employees: [
        { name: "Jean Dupont", requests: ["Formation Leadership", "Gestion de projet", "Communication"] },
        { name: "Marie Claire", requests: ["Développement durable", "RSE"] },
        { name: "Pierre Martin", requests: ["Stratégie d'entreprise"] },
      ],
      status: "pending",
      color: "blue",
    },
    {
      category: "Développement commercial avec le numérique intégré - Vente Prospection Négociation",
      department: "Département Commercial",
      manager: "Marc Dubois",
      employees: [
        { name: "Sophie Laurent", requests: ["Techniques de vente", "Négociation commerciale"] },
        { name: "Thomas Bernard", requests: ["Prospection digitale", "CRM"] },
      ],
      status: "approved",
      color: "green",
    },
    {
      category: "Stratégie - Ressources Humaines",
      department: "Département RH",
      manager: "Claire Moreau",
      employees: [
        { name: "Antoine Rousseau", requests: ["Gestion des talents", "Recrutement"] },
        { name: "Isabelle Petit", requests: ["Droit du travail", "Formation"] },
      ],
      status: "rejected",
      color: "red",
    },
    {
      category: "Stratégie - Ressources Humaines",
      department: "Département RH",
      manager: "Claire Moreau",
      employees: [{ name: "Julien Moreau", requests: ["Management", "Leadership"] }],
      status: "pending",
      color: "orange",
    },
  ]

  const handleValidation = (categoryIndex, action) => {
    setValidationStatus((prev) => ({
      ...prev,
      [categoryIndex]: action,
    }))

    const actionText = action === "approve" ? "approuvées" : "rejetées"
    message.success(`Demandes ${actionText} avec succès`)
  }

  const getStatusTag = (status) => {
    const statusConfig = {
      pending: { color: "orange", text: "En attente" },
      approved: { color: "green", text: "Approuvé" },
      rejected: { color: "red", text: "Rejeté" },
    }

    const config = statusConfig[status] || statusConfig.pending
    return <Tag color={config.color}>{config.text}</Tag>
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <Title level={2} className="mb-2 text-gray-800">
          Validation des Propositions d'Employés
        </Title>
        <Text className="text-gray-600">Responsable RH - Accès complet</Text>
      </div>

      <Alert
        message="Demandes en attente de validation"
        description="Vous avez 12 demandes de formation en attente de validation de la part des employés."
        type="info"
        showIcon
        className="mb-6"
      />

      <div className="space-y-4">
        {employeeRequests.map((category, categoryIndex) => (
          <Card key={categoryIndex} className={`shadow-lg border-l-4 border-l-${category.color}-500`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <Title level={5} className="mb-2 text-gray-800">
                  {category.category}
                </Title>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <Text>{category.department}</Text>
                  <Text>Manager: {category.manager}</Text>
                  {getStatusTag(validationStatus[categoryIndex] || category.status)}
                </div>
              </div>
              <Space>
                <Button
                  type="primary"
                  icon={<CheckCircleOutlined />}
                  className="bg-green-500 border-green-500"
                  onClick={() => handleValidation(categoryIndex, "approve")}
                  disabled={validationStatus[categoryIndex]}
                >
                  Approuver
                </Button>
                <Button
                  danger
                  icon={<CloseCircleOutlined />}
                  onClick={() => handleValidation(categoryIndex, "reject")}
                  disabled={validationStatus[categoryIndex]}
                >
                  Rejeter
                </Button>
                <Button icon={<EyeOutlined />}>Détails</Button>
              </Space>
            </div>

            <Collapse className="bg-gray-50">
              <Panel header={`Demandes des employés (${category.employees.length})`} key="1">
                <div className="space-y-3">
                  {category.employees.map((employee, empIndex) => (
                    <div key={empIndex} className="bg-white p-3 rounded border">
                      <div className="flex justify-between items-start">
                        <div>
                          <Text strong className="block mb-2">
                            {employee.name}
                          </Text>
                          <div className="space-y-1">
                            {employee.requests.map((request, reqIndex) => (
                              <div key={reqIndex} className="flex items-center space-x-2">
                                <Checkbox defaultChecked />
                                <Text className="text-sm">{request}</Text>
                              </div>
                            ))}
                          </div>
                        </div>
                        <Space>
                          <Button size="small" type="link">
                            Modifier
                          </Button>
                          <Button size="small" type="link" danger>
                            Supprimer
                          </Button>
                        </Space>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </Collapse>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Space size="large">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">156</div>
            <Text className="text-gray-600">Total</Text>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">89</div>
            <Text className="text-gray-600">Approuvées</Text>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">45</div>
            <Text className="text-gray-600">En attente</Text>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">22</div>
            <Text className="text-gray-600">Rejetées</Text>
          </div>
        </Space>
      </div>
    </div>
  )
}

export default EmployeeValidationInterface
