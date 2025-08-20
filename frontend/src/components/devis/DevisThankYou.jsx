import { memo } from 'react'
import { Card, Typography } from 'antd'

const { Title, Paragraph } = Typography

function DevisThankYou() {
  return (
    <Card bordered style={{ borderRadius: 16, textAlign: 'center' }}>
      <Title level={3} style={{ marginBottom: 8 }}>Merci pour votre demande</Title>
      <Paragraph style={{ color: '#667085' }}>
        Nous avons bien reçu votre demande de devis. Un conseiller vous contactera sous 24 heures.
      </Paragraph>
    </Card>
  )
}

export default memo(DevisThankYou)


