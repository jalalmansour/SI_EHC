"use client"

import { useState } from "react"
import { Modal, Select, Input, Button, Alert, Typography, message } from "antd"
import { SendOutlined, EyeOutlined, DownloadOutlined } from "@ant-design/icons"

const { TextArea } = Input
const { Text, Title } = Typography
const { Option } = Select

export const FinalDistributionModal = ({ visible, onClose }) => {
  const [selectedRecipients, setSelectedRecipients] = useState([])
  const [message, setMessage] = useState("Le catalogue de formation final est maintenant disponible...")

  return (
    <Modal
      title={
        <div className="flex justify-between items-center">
          <Title level={4} className="mb-0 text-teal-600">
            Diffusion Finale du Catalogue
          </Title>
          <Text className="text-gray-600">Responsable RH - Accès complet</Text>
        </div>
      }
      open={visible}
      onCancel={onClose}
      width={900}
      footer={null}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Title level={5} className="mb-4">
            Sélectionner les Destinataires Finaux
          </Title>
          <div className="mb-4">
            <Text className="block mb-2">Destinataires</Text>
            <Select
              mode="multiple"
              placeholder="Choisir les destinataires"
              className="w-full"
              value={selectedRecipients}
              onChange={setSelectedRecipients}
            >
              <Option value="managers">Tous les Managers</Option>
              <Option value="employees">Tous les Employés</Option>
              <Option value="hr">Équipe RH</Option>
              <Option value="trainers">Formateurs</Option>
            </Select>
          </div>
        </div>

        <div>
          <Title level={5} className="mb-4">
            Message d'accompagnement
          </Title>
          <div className="mb-4">
            <Text className="block mb-2">Message</Text>
            <TextArea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Le catalogue de formation final est maintenant disponible..."
            />
          </div>
        </div>
      </div>

      <Alert
        message="Aperçu de la diffusion finale:"
        description={
          <div className="mt-2 space-y-1">
            <Text className="block text-green-600">• Catalogue validé par les RRH</Text>
            <Text className="block text-blue-600">• 77 formations disponibles</Text>
            <Text className="block text-orange-600">• Période d'inscription: 10 jours</Text>
          </div>
        }
        type="info"
        className="mb-6"
      />

      <div className="flex justify-center space-x-4">
        <Button type="primary" icon={<EyeOutlined />} className="bg-blue-500 border-blue-500">
          Visualiser le catalogue finale
        </Button>
        <Button type="primary" icon={<DownloadOutlined />} className="bg-green-500 border-green-500">
          Télécharger le catalogue finale en PDF et XLS
        </Button>
        <Button
          type="primary"
          icon={<SendOutlined />}
          className="bg-red-500 border-red-500"
          onClick={() => {
            message.success("Diffusion finale lancée avec succès!")
            onClose()
          }}
        >
          Lancer la Diffusion Finale
        </Button>
        <Button onClick={onClose}>Annuler</Button>
      </div>
    </Modal>
  )
}

export const HRDistributionModal = ({ visible, onClose }) => {
  const [selectedHR, setSelectedHR] = useState([])
  const [hrMessage, setHrMessage] = useState(
    "Chers collègues RRH,\n\nNous vous transmettons le nouveau catalogue de formation pour validation. Ce catalogue a été élaboré en tenant compte des besoins identifiés dans vos départements respectifs.",
  )

  return (
    <Modal
      title="Diffuser le catalogue aux Responsables RH"
      open={visible}
      onCancel={onClose}
      width={800}
      footer={null}
    >
      <div className="space-y-6">
        <div>
          <Text className="block mb-2 font-medium">Sélectionner les Responsables RH</Text>
          <Select
            mode="multiple"
            placeholder="Choisir les destinataires RH"
            className="w-full"
            value={selectedHR}
            onChange={setSelectedHR}
          >
            <Option value="rh1">Marie Dubois - RH Département IT</Option>
            <Option value="rh2">Jean Martin - RH Département Finance</Option>
            <Option value="rh3">Sophie Laurent - RH Département Marketing</Option>
            <Option value="rh4">Pierre Durand - RH Département Ventes</Option>
          </Select>
        </div>

        <div>
          <Text className="block mb-2 font-medium">Message pour les RRH</Text>
          <TextArea rows={6} value={hrMessage} onChange={(e) => setHrMessage(e.target.value)} />
        </div>

        <Alert
          message="Aperçu de la diffusion:"
          description={
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Text className="block">• Destinataires: 6 Responsables RH</Text>
                <Text className="block">• Formations à valider: 77</Text>
              </div>
              <div>
                <Text className="block">• Délai de réponse: 5 jours</Text>
                <Text className="block">• Mode: Email + Notification plateforme</Text>
              </div>
            </div>
          }
          type="info"
          className="mb-4"
        />

        <div className="flex justify-center space-x-4">
          <Button
            type="primary"
            icon={<SendOutlined />}
            className="bg-purple-500 border-purple-500"
            onClick={() => {
              message.success("Catalogue envoyé aux RRH avec succès!")
              onClose()
            }}
          >
            Envoyer aux RRH
          </Button>
          <Button>Programmer l'envoi</Button>
          <Button onClick={onClose}>Annuler</Button>
        </div>
      </div>
    </Modal>
  )
}

export const EmployeeDistributionModal = ({ visible, onClose }) => {
  const [selectedEmployees, setSelectedEmployees] = useState([])
  const [employeeMessage, setEmployeeMessage] = useState(
    "Le nouveau catalogue de formation est maintenant disponible...",
  )

  return (
    <Modal
      title="Diffuser le catalogue aux Employés et au Manager n+1"
      open={visible}
      onCancel={onClose}
      width={800}
      footer={null}
    >
      <div className="space-y-6">
        <div>
          <Text className="block mb-2 font-medium">Destinataires Employés et Manager n+1</Text>
          <Select
            mode="multiple"
            placeholder="Sélectionner les employés et managers"
            className="w-full"
            value={selectedEmployees}
            onChange={setSelectedEmployees}
          >
            <Option value="dept-it">Département IT (45 employés)</Option>
            <Option value="dept-finance">Département Finance (32 employés)</Option>
            <Option value="dept-marketing">Département Marketing (28 employés)</Option>
            <Option value="dept-ventes">Département Ventes (51 employés)</Option>
          </Select>
        </div>

        <div>
          <Text className="block mb-2 font-medium">Message d'accompagnement</Text>
          <TextArea
            rows={4}
            value={employeeMessage}
            onChange={(e) => setEmployeeMessage(e.target.value)}
            placeholder="Le nouveau catalogue de formation est maintenant disponible..."
          />
        </div>

        <Alert
          message="Aperçu du catalogue à diffuser:"
          description={
            <div className="mt-2 space-y-1">
              <Text className="block text-blue-600">• 45 formations transversales disponibles</Text>
              <Text className="block text-green-600">• 32 formations métier spécialisées</Text>
              <Text className="block text-orange-600">• Période d'inscription: 15 jours</Text>
              <Text className="block text-purple-600">• Diffusion automatique aux managers n+1 pour validation</Text>
            </div>
          }
          type="info"
          className="mb-4"
        />

        <div className="flex justify-center space-x-4">
          <Button
            type="primary"
            icon={<SendOutlined />}
            className="bg-teal-500 border-teal-500"
            onClick={() => {
              message.success("Catalogue diffusé aux employés et managers avec succès!")
              onClose()
            }}
          >
            Diffuser aux Employés et au Manager n+1
          </Button>
          <Button onClick={onClose}>Annuler</Button>
        </div>
      </div>
    </Modal>
  )
}
