import { memo } from 'react'
import { Card, Descriptions, Button } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

function DemandeDevisPreview() {
  const location = useLocation()
  const navigate = useNavigate()
  const data = location.state || {}

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <Card title="Aperçu de votre demande" bordered>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Entreprise">{data.companyName}</Descriptions.Item>
          <Descriptions.Item label="Contact">{data.contactName}</Descriptions.Item>
          <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
          <Descriptions.Item label="Téléphone">{data.phone}</Descriptions.Item>
          <Descriptions.Item label="Thématique">{data.trainingTopic}</Descriptions.Item>
          <Descriptions.Item label="Participants">{data.participants}</Descriptions.Item>
          <Descriptions.Item label="Mode">{data.preferredMode}</Descriptions.Item>
          <Descriptions.Item label="Date cible">{data.targetStart}</Descriptions.Item>
          <Descriptions.Item label="Notes">{data.notes}</Descriptions.Item>
        </Descriptions>
        <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
          <Button onClick={() => navigate(-1)}>Modifier</Button>
          <Button type="primary" onClick={() => navigate('/demande-devis')}>Nouvelle demande</Button>
        </div>
      </Card>
    </div>
  )
}

export default memo(DemandeDevisPreview)


