"use client"

import { useState } from "react"
import { Card, Upload, Button, Table, message, Modal, Select, Alert, Space, Tag, Progress } from "antd"
import { UploadOutlined, DownloadOutlined, FileExcelOutlined, CheckCircleOutlined } from "@ant-design/icons"
import {
  exportToExcel,
  importFromExcel,
  validateExcelData,
  generateTrainingTemplate,
  generateParticipantsTemplate,
  generateBudgetTemplate,
  generateOrgChartTemplate,
} from "../../utils/excelUtils"

const { Option } = Select
const { Dragger } = Upload

const ExcelManager = ({ dataType = "trainings", onDataImported }) => {
  const [importData, setImportData] = useState(null)
  const [validationResults, setValidationResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)

  const getRequiredFields = () => {
    switch (dataType) {
      case "trainings":
        return ["Titre", "Description", "Catégorie", "Durée (heures)", "Participants max"]
      case "participants":
        return ["Nom", "Prénom", "Email", "Département", "Formation"]
      case "budget":
        return ["Nom Budget", "Période", "Date début", "Date fin", "Montant initial (DHS)"]
      case "orgchart":
        return ["Nom", "Prénom", "Email", "Poste", "Département"]
      default:
        return []
    }
  }

  const getTemplate = () => {
    switch (dataType) {
      case "trainings":
        return generateTrainingTemplate()
      case "participants":
        return generateParticipantsTemplate()
      case "budget":
        return generateBudgetTemplate()
      case "orgchart":
        return generateOrgChartTemplate()
      default:
        return []
    }
  }

  const handleFileUpload = async (file) => {
    setLoading(true)
    try {
      const result = await importFromExcel(file)
      const validation = validateExcelData(result.data, getRequiredFields())

      setImportData(result)
      setValidationResults(validation)
      setPreviewVisible(true)

      if (validation.isValid) {
        message.success(`${result.data.length} lignes importées avec succès`)
      } else {
        message.warning("Données importées avec des erreurs")
      }
    } catch (error) {
      message.error("Erreur lors de l'importation du fichier")
      console.error(error)
    } finally {
      setLoading(false)
    }

    return false // Prevent default upload
  }

  const handleExportTemplate = () => {
    const template = getTemplate()
    const filename = `template_${dataType}_${new Date().toISOString().split("T")[0]}.xlsx`

    if (exportToExcel(template, filename, "Template")) {
      message.success("Template téléchargé avec succès")
    } else {
      message.error("Erreur lors du téléchargement")
    }
  }

  const handleExportData = (data, filename) => {
    if (exportToExcel(data, filename)) {
      message.success("Données exportées avec succès")
    } else {
      message.error("Erreur lors de l'export")
    }
  }

  const handleImportConfirm = () => {
    if (importData && validationResults?.isValid) {
      onDataImported?.(importData.data)
      setPreviewVisible(false)
      setImportData(null)
      setValidationResults(null)
      message.success("Données importées dans le système")
    }
  }

  const getTableColumns = () => {
    if (!importData?.data?.length) return []

    const firstRow = importData.data[0]
    return Object.keys(firstRow).map((key) => ({
      title: key,
      dataIndex: key,
      key,
      ellipsis: true,
      width: 150,
    }))
  }

  const getDataTypeLabel = () => {
    switch (dataType) {
      case "trainings":
        return "Formations"
      case "participants":
        return "Participants"
      case "budget":
        return "Budget"
      case "orgchart":
        return "Organigramme"
      default:
        return "Données"
    }
  }

  return (
    <div className="space-y-6">
      {/* Export Section */}
      <Card title={`Export ${getDataTypeLabel()}`}>
        <div className="space-y-4">
          <Alert
            message="Export de données"
            description="Téléchargez vos données au format Excel pour analyse ou sauvegarde."
            type="info"
            showIcon
          />

          <Space>
            <Button icon={<DownloadOutlined />} onClick={handleExportTemplate}>
              Télécharger Template
            </Button>

            <Button
              type="primary"
              icon={<FileExcelOutlined />}
              onClick={() => handleExportData(getTemplate(), `export_${dataType}.xlsx`)}
            >
              Exporter les Données
            </Button>
          </Space>
        </div>
      </Card>

      {/* Import Section */}
      <Card title={`Import ${getDataTypeLabel()}`}>
        <div className="space-y-4">
          <Alert
            message="Import de données"
            description="Importez vos données depuis un fichier Excel. Utilisez le template pour le bon format."
            type="info"
            showIcon
          />

          <Dragger accept=".xlsx,.xls" beforeUpload={handleFileUpload} showUploadList={false} loading={loading}>
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">Cliquez ou glissez un fichier Excel ici</p>
            <p className="ant-upload-hint">Formats supportés: .xlsx, .xls</p>
          </Dragger>

          {loading && (
            <div className="text-center">
              <Progress type="circle" percent={50} size={80} />
              <p className="mt-2">Traitement du fichier...</p>
            </div>
          )}
        </div>
      </Card>

      {/* Preview Modal */}
      <Modal
        title="Aperçu des données importées"
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        width={1000}
        footer={[
          <Button key="cancel" onClick={() => setPreviewVisible(false)}>
            Annuler
          </Button>,
          <Button
            key="import"
            type="primary"
            disabled={!validationResults?.isValid}
            onClick={handleImportConfirm}
            icon={<CheckCircleOutlined />}
          >
            Importer les Données
          </Button>,
        ]}
      >
        {validationResults && (
          <div className="mb-4">
            {validationResults.isValid ? (
              <Alert
                message="Validation réussie"
                description={`${importData?.data?.length} lignes prêtes à être importées`}
                type="success"
                showIcon
              />
            ) : (
              <Alert
                message="Erreurs de validation"
                description={
                  <ul className="mt-2">
                    {validationResults.errors.map((error, index) => (
                      <li key={index} className="text-red-600">
                        {error}
                      </li>
                    ))}
                  </ul>
                }
                type="error"
                showIcon
              />
            )}
          </div>
        )}

        {importData && (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <div>
                <Tag color="blue">Fichier: {importData.filename}</Tag>
                <Tag color="green">{importData.data.length} lignes</Tag>
              </div>
            </div>

            <Table
              columns={getTableColumns()}
              dataSource={importData.data.map((row, index) => ({ ...row, key: index }))}
              scroll={{ x: 800, y: 400 }}
              pagination={{ pageSize: 10 }}
              size="small"
            />
          </div>
        )}
      </Modal>
    </div>
  )
}

export default ExcelManager
