"use client"

import { useState } from "react"
import { Modal, Tabs, Table, Button, Tag, Input } from "antd"

const { TabPane } = Tabs
const { Search } = Input

const CatalogVisualizationModal = ({ visible, onClose }) => {
  const [activeTab, setActiveTab] = useState("tous")

  const catalogData = [
    {
      key: "1",
      fichier: "Fichier de recueil de besoin 004",
      dateModification: "04 12 2025",
      statut: "Créé",
      type: "created",
    },
    {
      key: "2",
      fichier: "Fichier de recueil de besoin 003",
      dateModification: "03 12 2025",
      statut: "Importé",
      type: "imported",
    },
    {
      key: "3",
      fichier: "Fichier de recueil de besoin 002",
      dateModification: "02 12 2025",
      statut: "Créé",
      type: "created",
    },
    {
      key: "4",
      fichier: "Fichier de recueil de besoin 001",
      dateModification: "01 12 2025",
      statut: "Importé",
      type: "imported",
    },
    {
      key: "5",
      fichier: "Fichier de recueil de besoin 002",
      dateModification: "02 12 2025",
      statut: "Créé",
      type: "created",
    },
    {
      key: "6",
      fichier: "Fichier de recueil de besoin 001",
      dateModification: "01 12 2025",
      statut: "Importé",
      type: "imported",
    },
  ]

  const columns = [
    {
      title: "Fichier",
      dataIndex: "fichier",
      key: "fichier",
      render: (text) => (
        <Button type="link" className="p-0 h-auto text-left">
          {text}
        </Button>
      ),
    },
    {
      title: "Date de modification",
      dataIndex: "dateModification",
      key: "dateModification",
      align: "center",
    },
    {
      title: "Statut",
      dataIndex: "statut",
      key: "statut",
      align: "center",
      render: (statut, record) => <Tag color={record.type === "created" ? "blue" : "green"}>{statut}</Tag>,
    },
  ]

  const getFilteredData = () => {
    switch (activeTab) {
      case "importes":
        return catalogData.filter((item) => item.type === "imported")
      case "crees":
        return catalogData.filter((item) => item.type === "created")
      case "plateforme":
        return catalogData // All data for platform view
      default:
        return catalogData
    }
  }

  return (
    <Modal
      title="Visualisation du Catalogue de Formation"
      open={visible}
      onCancel={onClose}
      width={800}
      footer={null}
      className="catalog-modal"
    >
      <Tabs activeKey={activeTab} onChange={setActiveTab} className="mb-4">
        <TabPane
          tab={
            <Button
              type={activeTab === "tous" ? "primary" : "default"}
              className={activeTab === "tous" ? "bg-gray-800 border-gray-800" : ""}
            >
              Tous les fichiers
            </Button>
          }
          key="tous"
        />
        <TabPane
          tab={
            <Button
              type={activeTab === "importes" ? "primary" : "default"}
              className={activeTab === "importes" ? "bg-gray-800 border-gray-800" : ""}
            >
              Importés
            </Button>
          }
          key="importes"
        />
        <TabPane
          tab={
            <Button
              type={activeTab === "crees" ? "primary" : "default"}
              className={activeTab === "crees" ? "bg-gray-800 border-gray-800" : ""}
            >
              Créés
            </Button>
          }
          key="crees"
        />
        <TabPane
          tab={
            <Button
              type={activeTab === "plateforme" ? "primary" : "default"}
              className={activeTab === "plateforme" ? "bg-gray-800 border-gray-800" : ""}
            >
              Vue Plateforme
            </Button>
          }
          key="plateforme"
        />
      </Tabs>

      <Table
        columns={columns}
        dataSource={getFilteredData()}
        pagination={false}
        className="catalog-table"
        size="middle"
      />
    </Modal>
  )
}

export default CatalogVisualizationModal
