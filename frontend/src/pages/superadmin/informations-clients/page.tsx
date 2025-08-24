"use client"

import { useState } from "react"
import { Modal, Form, Input, Select, Button, message } from "antd"
import { EditOutlined, EyeOutlined } from "@ant-design/icons"
// removed dashboard layout

const { Option } = Select

export default function InformationsClientsPage() {
  const [editModal, setEditModal] = useState(false)
  const [viewModal, setViewModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [form] = Form.useForm()

  const [clients, setClients] = useState([
    {
      id: 1,
      nom: "TechCorp Solutions",
      secteur: "Technologie",
      taille: "250-500 employés",
      telephone: "+33 1 23 45 67 89",
      adresse: "123 Rue de la Tech, 75001 Paris",
      email: "admin@techcorp.com",
      dateInscription: "2023-01-15",
      statut: "Client Actif",
    },
    {
      id: 2,
      nom: "InnovateLab",
      secteur: "R&D",
      taille: "50-100 employés",
      telephone: "+33 1 98 76 54 32",
      adresse: "456 Avenue Innovation, 69000 Lyon",
      email: "contact@innovatelab.fr",
      dateInscription: "2023-03-22",
      statut: "Client Actif",
    },
  ])

  const handleEdit = (client: any) => {
    setSelectedClient(client)
    form.setFieldsValue(client)
    setEditModal(true)
  }

  const handleView = (client: any) => {
    setSelectedClient(client)
    setViewModal(true)
  }

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      setClients(clients.map((c) => (c.id === selectedClient.id ? { ...c, ...values } : c)))
      message.success("Informations client mises à jour avec succès")
      setEditModal(false)
    } catch (error) {
      console.error("Validation failed:", error)
    }
  }

  return (
    <DashboardLayout userRole="superadmin">
      <div className="p-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Fiches Entreprises Détaillées</h1>

          <div className="space-y-6">
            {clients.map((client) => (
              <div key={client.id} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-xl">🏢</span>
                    <h2 className="text-xl font-semibold text-gray-800">{client.nom}</h2>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {client.statut}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  <div>
                    <div className="mb-3">
                      <span className="text-gray-600 text-sm">Secteur d'activité</span>
                      <p className="text-gray-800 font-medium">{client.secteur}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Téléphone</span>
                      <p className="text-gray-800 font-medium">{client.telephone}</p>
                    </div>
                  </div>

                  <div>
                    <div className="mb-3">
                      <span className="text-gray-600 text-sm">Taille (effectif)</span>
                      <p className="text-gray-800 font-medium">{client.taille}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Adresse</span>
                      <p className="text-gray-800 font-medium">{client.adresse}</p>
                    </div>
                  </div>

                  <div>
                    <div className="mb-3">
                      <span className="text-gray-600 text-sm">Email</span>
                      <p className="text-gray-800 font-medium">{client.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Date d'inscription</span>
                      <p className="text-gray-800 font-medium">{client.dateInscription}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(client)}
                    className="flex items-center gap-2"
                  >
                    Modifier
                  </Button>
                  <Button
                    type="text"
                    icon={<EyeOutlined />}
                    onClick={() => handleView(client)}
                    className="flex items-center gap-2"
                  >
                    Voir détails
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Modal */}
        <Modal
          title="Modifier les informations client"
          open={editModal}
          onCancel={() => setEditModal(false)}
          footer={[
            <Button key="cancel" onClick={() => setEditModal(false)}>
              Annuler
            </Button>,
            <Button key="save" type="primary" onClick={handleSave}>
              Sauvegarder
            </Button>,
          ]}
        >
          <Form form={form} layout="vertical">
            <Form.Item name="nom" label="Nom de l'entreprise" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="secteur" label="Secteur d'activité" rules={[{ required: true }]}>
              <Select>
                <Option value="Technologie">Technologie</Option>
                <Option value="R&D">R&D</Option>
                <Option value="Industrie">Industrie</Option>
              </Select>
            </Form.Item>
            <Form.Item name="taille" label="Taille (effectif)" rules={[{ required: true }]}>
              <Select>
                <Option value="1-10 employés">1-10 employés</Option>
                <Option value="11-50 employés">11-50 employés</Option>
                <Option value="51-100 employés">51-100 employés</Option>
                <Option value="101-250 employés">101-250 employés</Option>
                <Option value="250-500 employés">250-500 employés</Option>
                <Option value="500+ employés">500+ employés</Option>
              </Select>
            </Form.Item>
            <Form.Item name="telephone" label="Téléphone" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="adresse" label="Adresse" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>

        {/* View Modal */}
        <Modal
          title="Détails du client"
          open={viewModal}
          onCancel={() => setViewModal(false)}
          footer={[
            <Button key="close" onClick={() => setViewModal(false)}>
              Fermer
            </Button>,
          ]}
        >
          {selectedClient && (
            <div className="space-y-4">
              <div>
                <strong>Nom:</strong> {selectedClient.nom}
              </div>
              <div>
                <strong>Secteur:</strong> {selectedClient.secteur}
              </div>
              <div>
                <strong>Taille:</strong> {selectedClient.taille}
              </div>
              <div>
                <strong>Téléphone:</strong> {selectedClient.telephone}
              </div>
              <div>
                <strong>Adresse:</strong> {selectedClient.adresse}
              </div>
              <div>
                <strong>Email:</strong> {selectedClient.email}
              </div>
              <div>
                <strong>Date d'inscription:</strong> {selectedClient.dateInscription}
              </div>
              <div>
                <strong>Statut:</strong> {selectedClient.statut}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  )
}
