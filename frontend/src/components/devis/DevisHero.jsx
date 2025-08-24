import { memo } from 'react'
import { Typography } from 'antd'

const { Title, Paragraph } = Typography

function DevisHero() {
  return (
    <div
      style={{
        borderRadius: 24,
        padding: 32,
        background: 'radial-gradient(1000px 300px at 10% -10%, rgba(24,144,255,0.25), transparent), linear-gradient(135deg, #0B1220 0%, #0E172A 100%)',
        color: 'white',
        marginBottom: 16,
      }}
      role="region"
      aria-label="Entête Demande de devis"
    >
      <Title level={2} style={{ color: 'white', marginBottom: 8 }}>Demande de devis</Title>
      <Paragraph style={{ color: '#A5B4FC', margin: 0 }}>Concevez votre parcours de formation. Réponse sous 24h.</Paragraph>
    </div>
  )
}

export default memo(DevisHero)


