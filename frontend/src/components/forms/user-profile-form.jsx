"use client"

import { useState } from "react"
import { Form, Input, Button, Upload, Avatar, Select, DatePicker, Row, Col, Card, message, Switch } from "antd"
import {
  UserOutlined,
  UploadOutlined,
  SaveOutlined,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  IdcardOutlined,
} from "@ant-design/icons"
import dayjs from "dayjs"

const { Option } = Select
const { TextArea } = Input

export default function UserProfileForm({ initialData = {}, onSave, readonly = false }) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(initialData.avatar || "")
  const [isEditing, setIsEditing] = useState(!readonly)

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      const profileData = {
        ...values,
        avatar: avatarUrl,
        birthDate: values.birthDate?.format("YYYY-MM-DD"),
        notifications: {
          email: values.emailNotifications || false,
          sms: values.smsNotifications || false,
          push: values.pushNotifications || false,
        },
      }

      if (onSave) {
        await onSave(profileData)
      }

      message.success("Profil mis à jour avec succès!")
      if (readonly) setIsEditing(false)
    } catch (error) {
      message.error("Erreur lors de la mise à jour du profil")
    } finally {
      setLoading(false)
    }
  }

  const uploadProps = {
    name: "avatar",
    listType: "picture",
    showUploadList: false,
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
      if (!isJpgOrPng) {
        message.error("Vous ne pouvez télécharger que des fichiers JPG/PNG!")
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error("L'image doit faire moins de 2MB!")
        return false
      }

      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarUrl(e.target?.result)
      }
      reader.readAsDataURL(file)

      return false // Prevent auto upload
    },
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card
        className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50"
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <UserOutlined className="text-white text-lg" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 m-0">Mon Profil</h2>
                <p className="text-sm text-gray-500 m-0">Gérez vos informations personnelles</p>
              </div>
            </div>
            {readonly && (
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 border-0"
              >
                Modifier
              </Button>
            )}
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            ...initialData,
            birthDate: initialData.birthDate ? dayjs(initialData.birthDate) : null,
            emailNotifications: initialData.notifications?.email || true,
            smsNotifications: initialData.notifications?.sms || false,
            pushNotifications: initialData.notifications?.push || true,
          }}
          disabled={!isEditing}
        >
          {/* Avatar Section */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <Avatar size={120} src={avatarUrl} icon={<UserOutlined />} className="ring-4 ring-blue-100 shadow-lg" />
              {isEditing && (
                <Upload {...uploadProps}>
                  <Button
                    icon={<UploadOutlined />}
                    className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 flex items-center justify-center bg-blue-500 text-white border-0 hover:bg-blue-600"
                    size="small"
                  />
                </Upload>
              )}
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {initialData.firstName} {initialData.lastName}
              </h3>
              <p className="text-gray-500 capitalize">
                {initialData.role} - {initialData.department}
              </p>
            </div>
          </div>

          <Row gutter={24}>
            {/* Personal Information */}
            <Col xs={24} lg={12}>
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <IdcardOutlined className="text-blue-500" />
                    <span>Informations Personnelles</span>
                  </div>
                }
                className="mb-6 border border-blue-100"
              >
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="firstName"
                      label="Prénom"
                      rules={[{ required: true, message: "Le prénom est requis" }]}
                    >
                      <Input placeholder="Votre prénom" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item name="lastName" label="Nom" rules={[{ required: true, message: "Le nom est requis" }]}>
                      <Input placeholder="Votre nom" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "L'email est requis" },
                    { type: "email", message: "Format d'email invalide" },
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="votre.email@ehc.com" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Téléphone"
                  rules={[{ required: true, message: "Le téléphone est requis" }]}
                >
                  <Input prefix={<PhoneOutlined />} placeholder="+33 1 23 45 67 89" />
                </Form.Item>

                <Form.Item name="birthDate" label="Date de naissance">
                  <DatePicker
                    className="w-full"
                    placeholder="Sélectionnez votre date de naissance"
                    format="DD/MM/YYYY"
                  />
                </Form.Item>
              </Card>
            </Col>

            {/* Professional Information */}
            <Col xs={24} lg={12}>
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <UserOutlined className="text-green-500" />
                    <span>Informations Professionnelles</span>
                  </div>
                }
                className="mb-6 border border-green-100"
              >
                <Form.Item name="role" label="Rôle">
                  <Select placeholder="Sélectionnez votre rôle">
                    <Option value="admin">Administrateur</Option>
                    <Option value="superadmin">Super Administrateur</Option>
                    <Option value="rrh">Responsable RH</Option>
                    <Option value="rf">Responsable Formation</Option>
                    <Option value="manager">Manager</Option>
                    <Option value="employee">Employé</Option>
                    <Option value="formateur">Formateur</Option>
                  </Select>
                </Form.Item>

                <Form.Item name="department" label="Département">
                  <Select placeholder="Sélectionnez votre département">
                    <Option value="rh">Ressources Humaines</Option>
                    <Option value="formation">Formation</Option>
                    <Option value="it">Informatique</Option>
                    <Option value="finance">Finance</Option>
                    <Option value="commercial">Commercial</Option>
                    <Option value="marketing">Marketing</Option>
                  </Select>
                </Form.Item>

                <Form.Item name="position" label="Poste">
                  <Input placeholder="Votre poste actuel" />
                </Form.Item>

                <Form.Item name="bio" label="Biographie">
                  <TextArea
                    rows={4}
                    placeholder="Décrivez brièvement votre parcours et vos compétences..."
                    maxLength={500}
                    showCount
                  />
                </Form.Item>
              </Card>
            </Col>

            {/* Address Information */}
            <Col xs={24}>
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <HomeOutlined className="text-orange-500" />
                    <span>Adresse</span>
                  </div>
                }
                className="mb-6 border border-orange-100"
              >
                <Row gutter={16}>
                  <Col xs={24} lg={12}>
                    <Form.Item name="address" label="Adresse">
                      <Input placeholder="Numéro et nom de rue" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} lg={6}>
                    <Form.Item name="postalCode" label="Code postal">
                      <Input placeholder="75001" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} lg={6}>
                    <Form.Item name="city" label="Ville">
                      <Input placeholder="Paris" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item name="country" label="Pays">
                  <Select placeholder="Sélectionnez votre pays" defaultValue="france">
                    <Option value="france">France</Option>
                    <Option value="belgium">Belgique</Option>
                    <Option value="switzerland">Suisse</Option>
                    <Option value="canada">Canada</Option>
                  </Select>
                </Form.Item>
              </Card>
            </Col>

            {/* Notification Preferences */}
            <Col xs={24}>
              <Card title="Préférences de notification" className="mb-6 border border-purple-100">
                <Row gutter={24}>
                  <Col xs={24} sm={8}>
                    <Form.Item name="emailNotifications" label="Notifications par email" valuePropName="checked">
                      <Switch />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Form.Item name="smsNotifications" label="Notifications SMS" valuePropName="checked">
                      <Switch />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Form.Item name="pushNotifications" label="Notifications push" valuePropName="checked">
                      <Switch />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          {isEditing && (
            <div className="flex justify-end gap-3 mt-6">
              {readonly && <Button onClick={() => setIsEditing(false)}>Annuler</Button>}
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<SaveOutlined />}
                className="bg-gradient-to-r from-blue-500 to-purple-600 border-0"
              >
                Sauvegarder
              </Button>
            </div>
          )}
        </Form>
      </Card>
    </div>
  )
}
