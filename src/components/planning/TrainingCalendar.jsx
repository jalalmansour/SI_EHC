"use client"

import { useState, useEffect } from "react"
import {
  Calendar,
  Card,
  Modal,
  Form,
  DatePicker,
  TimePicker,
  Input,
  Select,
  Button,
  Tag,
  Space,
  message,
  Alert,
} from "antd"
import { PlusOutlined, ClockCircleOutlined, TeamOutlined, EnvironmentOutlined } from "@ant-design/icons"
import dayjs from "dayjs"

const { Option } = Select
const { TextArea } = Input

const TrainingCalendar = () => {
  const [trainingSessions, setTrainingSessions] = useState([])
  const [catalogItems, setCatalogItems] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  // Mock data
  useEffect(() => {
    const mockCatalogItems = [
      {
        id: "1",
        title: "Formation Leadership Avancé",
        duration: 16,
        maxParticipants: 12,
        cost: 15000,
      },
      {
        id: "2",
        title: "Formation Java Avancé",
        duration: 40,
        maxParticipants: 15,
        cost: 20000,
      },
      {
        id: "3",
        title: "Formation Communication",
        duration: 8,
        maxParticipants: 20,
        cost: 5000,
      },
    ]

    const mockSessions = [
      {
        id: "1",
        catalogItemId: "1",
        title: "Formation Leadership Avancé - Session 1",
        startDate: "2024-02-15",
        endDate: "2024-02-16",
        startTime: "09:00",
        endTime: "17:00",
        location: "Salle de formation A",
        maxParticipants: 12,
        registeredParticipants: 8,
        status: "SCHEDULED",
        trainer: "Jean Dupont",
        description: "Session intensive de leadership pour managers",
      },
      {
        id: "2",
        catalogItemId: "2",
        title: "Formation Java Avancé - Session 1",
        startDate: "2024-02-20",
        endDate: "2024-02-24",
        startTime: "09:00",
        endTime: "17:00",
        location: "Laboratoire informatique",
        maxParticipants: 15,
        registeredParticipants: 12,
        status: "SCHEDULED",
        trainer: "Marie Martin",
        description: "Formation technique Java avec Spring Boot",
      },
      {
        id: "3",
        catalogItemId: "3",
        title: "Formation Communication - Session 1",
        startDate: "2024-02-10",
        endDate: "2024-02-10",
        startTime: "14:00",
        endTime: "18:00",
        location: "Salle de conférence",
        maxParticipants: 20,
        registeredParticipants: 18,
        status: "COMPLETED",
        trainer: "Sophie Dubois",
        description: "Améliorer les compétences de communication",
      },
    ]

    setCatalogItems(mockCatalogItems)
    setTrainingSessions(mockSessions)
  }, [])

  const handleCreateSession = async (values) => {
    setLoading(true)
    try {
      const catalogItem = catalogItems.find((item) => item.id === values.catalogItemId)
      const newSession = {
        id: Date.now().toString(),
        catalogItemId: values.catalogItemId,
        title: `${catalogItem.title} - ${values.sessionName || "Session"}`,
        startDate: values.dateRange[0].format("YYYY-MM-DD"),
        endDate: values.dateRange[1].format("YYYY-MM-DD"),
        startTime: values.timeRange[0].format("HH:mm"),
        endTime: values.timeRange[1].format("HH:mm"),
        location: values.location,
        maxParticipants: values.maxParticipants || catalogItem.maxParticipants,
        registeredParticipants: 0,
        status: "SCHEDULED",
        trainer: values.trainer,
        description: values.description,
        createdAt: new Date().toISOString(),
      }

      setTrainingSessions([...trainingSessions, newSession])
      setModalVisible(false)
      form.resetFields()
      message.success("Session de formation planifiée avec succès")
    } catch (error) {
      message.error("Erreur lors de la planification")
    } finally {
      setLoading(false)
    }
  }

  const getSessionsForDate = (date) => {
    const dateStr = date.format("YYYY-MM-DD")
    return trainingSessions.filter((session) => {
      const sessionStart = dayjs(session.startDate)
      const sessionEnd = dayjs(session.endDate)
      return date.isSame(sessionStart, "day") || date.isBetween(sessionStart, sessionEnd, "day", "[]")
    })
  }

  const dateCellRender = (date) => {
    const sessions = getSessionsForDate(date)
    if (sessions.length === 0) return null

    return (
      <div className="space-y-1">
        {sessions.slice(0, 2).map((session) => (
          <div
            key={session.id}
            className={`text-xs p-1 rounded truncate ${
              session.status === "COMPLETED"
                ? "bg-green-100 text-green-800"
                : session.status === "IN_PROGRESS"
                  ? "bg-blue-100 text-blue-800"
                  : session.status === "CANCELLED"
                    ? "bg-red-100 text-red-800"
                    : "bg-orange-100 text-orange-800"
            }`}
          >
            {session.title}
          </div>
        ))}
        {sessions.length > 2 && <div className="text-xs text-gray-500">+{sessions.length - 2} autres</div>}
      </div>
    )
  }

  const onDateSelect = (date) => {
    setSelectedDate(date)
    const sessions = getSessionsForDate(date)
    if (sessions.length > 0) {
      Modal.info({
        title: `Formations du ${date.format("DD/MM/YYYY")}`,
        content: (
          <div className="space-y-3 mt-4">
            {sessions.map((session) => (
              <Card key={session.id} size="small">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{session.title}</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center">
                        <ClockCircleOutlined className="mr-1" />
                        {session.startTime} - {session.endTime}
                      </div>
                      <div className="flex items-center">
                        <EnvironmentOutlined className="mr-1" />
                        {session.location}
                      </div>
                      <div className="flex items-center">
                        <TeamOutlined className="mr-1" />
                        {session.registeredParticipants}/{session.maxParticipants} participants
                      </div>
                      {session.trainer && <div>Formateur: {session.trainer}</div>}
                    </div>
                  </div>
                  <Tag
                    color={
                      session.status === "COMPLETED"
                        ? "green"
                        : session.status === "IN_PROGRESS"
                          ? "blue"
                          : session.status === "CANCELLED"
                            ? "red"
                            : "orange"
                    }
                  >
                    {session.status}
                  </Tag>
                </div>
              </Card>
            ))}
          </div>
        ),
        width: 600,
      })
    }
  }

  const getStatusStats = () => {
    const stats = {
      SCHEDULED: 0,
      IN_PROGRESS: 0,
      COMPLETED: 0,
      CANCELLED: 0,
      POSTPONED: 0,
    }

    trainingSessions.forEach((session) => {
      stats[session.status] = (stats[session.status] || 0) + 1
    })

    return stats
  }

  const stats = getStatusStats()

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Calendrier des Formations</h1>
            <p className="text-gray-600">Planifiez et gérez les sessions de formation</p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
            Planifier une Session
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.SCHEDULED}</div>
            <div className="text-sm text-gray-500">Planifiées</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.IN_PROGRESS}</div>
            <div className="text-sm text-gray-500">En Cours</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.COMPLETED}</div>
            <div className="text-sm text-gray-500">Terminées</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{stats.CANCELLED}</div>
            <div className="text-sm text-gray-500">Annulées</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.POSTPONED || 0}</div>
            <div className="text-sm text-gray-500">Reportées</div>
          </div>
        </Card>
      </div>

      {/* Calendar */}
      <Card title="Calendrier des Sessions">
        <Alert
          message="Navigation du calendrier"
          description="Cliquez sur une date pour voir les détails des formations. Les formations sont colorées selon leur statut."
          type="info"
          showIcon
          className="mb-4"
        />
        <Calendar dateCellRender={dateCellRender} onSelect={onDateSelect} />
      </Card>

      {/* Create Session Modal */}
      <Modal
        title="Planifier une Session de Formation"
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false)
          form.resetFields()
        }}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateSession}>
          <Form.Item label="Formation" name="catalogItemId" rules={[{ required: true, message: "Formation requise" }]}>
            <Select placeholder="Sélectionner une formation du catalogue">
              {catalogItems.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.title} ({item.duration}h - {item.maxParticipants} participants max)
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Nom de la Session" name="sessionName">
            <Input placeholder="Session 1, Session Janvier, etc." />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Période de Formation"
              name="dateRange"
              rules={[{ required: true, message: "Période requise" }]}
            >
              <DatePicker.RangePicker className="w-full" />
            </Form.Item>

            <Form.Item label="Horaires" name="timeRange" rules={[{ required: true, message: "Horaires requis" }]}>
              <TimePicker.RangePicker className="w-full" format="HH:mm" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Lieu" name="location" rules={[{ required: true, message: "Lieu requis" }]}>
              <Input placeholder="Salle de formation A" />
            </Form.Item>

            <Form.Item label="Formateur" name="trainer">
              <Input placeholder="Nom du formateur" />
            </Form.Item>
          </div>

          <Form.Item label="Nombre Maximum de Participants" name="maxParticipants">
            <Input placeholder="Laissez vide pour utiliser la valeur du catalogue" type="number" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <TextArea rows={3} placeholder="Description de la session..." />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                onClick={() => {
                  setModalVisible(false)
                  form.resetFields()
                }}
              >
                Annuler
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Planifier la Session
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default TrainingCalendar
