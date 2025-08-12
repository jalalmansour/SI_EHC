"use client"
import { Card, Row, Col, Button, Typography, List } from "antd"

const { Title, Text } = Typography

const PredefinedCatalog = ({ onUse, onCustomize, onClose }) => {
  const transversalTrainings = [
    "Leadership et Management",
    "Communication Interpersonnelle",
    "Gestion du Temps",
    "Bureautique Avancée",
  ]

  const jobSpecificTrainings = ["Développement Web", "Comptabilité Avancée", "Marketing Digital", "Gestion de Projet"]

  return (
    <Card className="shadow-lg border-0">
      <Title level={4} className="mb-6">
        Catalogue de Formation Prédéfini
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <div className="bg-blue-50 p-4 rounded-lg h-full">
            <Title level={5} className="text-blue-800 mb-4">
              Formations Transversales
            </Title>
            <List
              dataSource={transversalTrainings}
              renderItem={(item) => (
                <List.Item className="border-0 py-2">
                  <Text className="text-gray-700">• {item}</Text>
                </List.Item>
              )}
            />
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div className="bg-green-50 p-4 rounded-lg h-full">
            <Title level={5} className="text-green-800 mb-4">
              Formations Métier
            </Title>
            <List
              dataSource={jobSpecificTrainings}
              renderItem={(item) => (
                <List.Item className="border-0 py-2">
                  <Text className="text-gray-700">• {item}</Text>
                </List.Item>
              )}
            />
          </div>
        </Col>
      </Row>

      <div className="flex justify-center space-x-4 mt-6">
        <Button
          type="primary"
          size="large"
          onClick={onUse}
          className="bg-gradient-to-r from-orange-500 to-orange-600 border-0 px-8"
        >
          Utiliser ce Catalogue
        </Button>
        <Button size="large" onClick={onCustomize} className="px-8">
          Personnaliser
        </Button>
        <Button size="large" onClick={onClose} className="px-8">
          Fermer
        </Button>
      </div>
    </Card>
  )
}

export default PredefinedCatalog
