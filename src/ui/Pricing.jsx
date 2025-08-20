import { Card, Button } from 'antd'

const tiers = [
  { name: 'Essentiel', price: '0€', features: ['Jusqu’à 5 utilisateurs', 'Analytics de base', 'Support email'] },
  { name: 'Pro', price: '49€', features: ['Utilisateurs illimités', 'Analytics avancés', 'Support prioritaire'] },
  { name: 'Entreprise', price: 'Contact', features: ['SLA & SSO', 'Intégrations avancées', 'Accompagnement dédié'] },
]

const Pricing = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {tiers.map((t, i) => (
      <Card key={i} className="border-0 shadow-lg hover:shadow-xl transition-all text-center">
        <div className="text-2xl font-semibold mb-2">{t.name}</div>
        <div className="text-4xl font-bold mb-4">{t.price}</div>
        <ul className="text-gray-600 space-y-2 mb-6">
          {t.features.map((f, j) => (<li key={j}>{f}</li>))}
        </ul>
        <Button type="primary" className="bg-gradient-to-r from-blue-500 to-purple-600 border-0">Choisir</Button>
      </Card>
    ))}
  </div>
)

export default Pricing


