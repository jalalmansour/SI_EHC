import React, { useState } from 'react'
import { Card, Form, Input, Select, DatePicker, Button, Upload, message, Row, Col, Typography, Divider, Alert, Space, Tag } from 'antd'
import { UploadOutlined, SendOutlined, FileTextOutlined, InfoCircleOutlined } from '@ant-design/icons'

const { TextArea } = Input
const { Option } = Select
const { Title } = Typography

const DemandeFormation = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [fileList, setFileList] = useState([])

  const formationTypes = [
    { value: 'technique', label: 'Formation Technique' },
    { value: 'management', label: 'Formation Management' },
    { value: 'soft_skills', label: 'Formation Soft Skills' },
    { value: 'certification', label: 'Formation Certification' },
    { value: 'langue', label: 'Formation Langue' }
  ]

  const priorities = [
    { value: 'low', label: 'Faible', color: 'green' },
    { value: 'medium', label: 'Moyenne', color: 'orange' },
    { value: 'high', label: 'Élevée', color: 'red' },
    { value: 'urgent', label: 'Urgente', color: 'red' }
  ]

  const onFinish = async (values) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      message.success('Demande de formation envoyée avec succès!')
      form.resetFields()
      setFileList([])
    } catch (error) {
      message.error('Erreur lors de l\'envoi de la demande')
    } finally {
      setLoading(false)
    }
  }

  const uploadProps = {
    fileList,
    beforeUpload: (file) => {
      const isPDF = file.type === 'application/pdf'
      const isDoc = file.type === 'application/msword' || 
                   file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      
      if (!isPDF && !isDoc) {
        message.error('Vous ne pouvez télécharger que des fichiers PDF ou Word!')
        return false
      }
      
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        message.error('Le fichier doit faire moins de 10MB!')
        return false
      }
      
      setFileList([...fileList, file])
      return false
    },
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    }
  }

  return (
    <div>
      <Title level={2} style={{ marginBottom: '24px' }}>Demande de Formation</Title>

      <Alert
        message="Informations importantes"
        description="Votre demande sera examinée par votre manager et les ressources humaines."
        type="info"
        showIcon
        icon={<InfoCircleOutlined />}
        style={{ marginBottom: '24px' }}
      />

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card title="Formulaire de demande">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{ priority: 'medium', type: 'technique' }}
            >
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="formationTitle"
                    label="Titre de la formation souhaitée"
                    rules={[{ required: true, message: 'Veuillez saisir le titre de la formation' }]}
                  >
                    <Input placeholder="Ex: React.js Avancé" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="type"
                    label="Type de formation"
                    rules={[{ required: true, message: 'Veuillez sélectionner le type' }]}
                  >
                    <Select placeholder="Sélectionner le type">
                      {formationTypes.map(type => (
                        <Option key={type.value} value={type.value}>{type.label}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="provider"
                    label="Organisme de formation"
                    rules={[{ required: true, message: 'Veuillez saisir l\'organisme' }]}
                  >
                    <Input placeholder="Ex: EHC Formation" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="estimatedCost"
                    label="Coût estimé (DHS)"
                    rules={[
                      { required: true, message: 'Veuillez saisir le coût estimé' },
                      { pattern: /^\d+$/, message: 'Veuillez saisir un nombre valide' }
                    ]}
                  >
                    <Input placeholder="Ex: 15000" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="justification"
                label="Justification de la demande"
                rules={[
                  { required: true, message: 'Veuillez justifier votre demande' },
                  { min: 50, message: 'La justification doit contenir au moins 50 caractères' }
                ]}
              >
                <TextArea 
                  rows={4} 
                  placeholder="Expliquez pourquoi cette formation est nécessaire..."
                />
              </Form.Item>

              <Form.Item
                label="Documents justificatifs"
                extra="Formats acceptés: PDF, DOC, DOCX (max 10MB par fichier)"
              >
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />}>Télécharger des fichiers</Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={loading}
                    icon={<SendOutlined />}
                    size="large"
                  >
                    Envoyer la demande
                  </Button>
                  <Button onClick={() => form.resetFields()} size="large">
                    Réinitialiser
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Guide de demande">
            <div>
              <h4>Conseils pour une demande réussie :</h4>
              <ul style={{ paddingLeft: '20px' }}>
                <li>Justifiez clairement le lien avec votre poste</li>
                <li>Expliquez les bénéfices pour l'entreprise</li>
                <li>Précisez les compétences à acquérir</li>
                <li>Joignez des documents justificatifs</li>
              </ul>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DemandeFormation
