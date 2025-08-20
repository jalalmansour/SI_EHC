import { memo } from 'react'
import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'

function DemandeDevisSuccess() {
  return (
    <Result
      status="success"
      title="Votre demande a été envoyée !"
      subTitle="Un conseiller vous contactera sous 24 heures pour finaliser votre devis."
      extra={[
        <Link key="home" to="/">
          <Button type="primary">Retour à l'accueil</Button>
        </Link>,
      ]}
    />
  )
}

export default memo(DemandeDevisSuccess)


