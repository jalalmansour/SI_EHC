"use client"

import { useState, useEffect } from "react"
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Select,
  Space,
  Tag,
  message,
  Alert,
  Tabs,
  Input,
  Avatar,
  Tooltip,
  Progress,
} from "antd"
import {
  UserAddOutlined,
  MailOutlined,
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons"

const { Option } = Select
const { TabPane } = Tabs
const { Search } = Input

const ParticipantManagement = () => {
  const [participants, setParticipants] = useState([])
  const [trainingSessions, setTrainingSessions] = useState([])
  const [registrations, setRegistrations] = useState([])
  const [inviteModalVisible, setInviteModalVisible] = useState(false)
  const [selectedSession, setSelectedSession] = useState(null)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("sessions")

  // Mock data
  useEffect(() => {
    const mockParticipants = [
      {
        id: "1",
        firstName: "Marie",
        lastName: "Dubois",
        email: "marie.dubois@company.com",
        department: "IT",
        position: "Développeur Senior",
        manager: "Pierre Martin",
      },
      {
        id: "2",
        firstName: "Ahmed",
        lastName: "Benali",
        email: "ahmed.benali@company.com",
        department: "Commercial",
        position: "Chef de Vente",
        manager: "Sophie Laurent",
      },
      {
        id: "3",
        firstName: "Fatima",
        lastName: "El Amrani",
        email: "fatima.elamrani@company.com",
        department: "RH",
        position: "Responsable RH",
        manager: "Direction",
      },
    ]

    const mockSessions = [
      {
        id: "1",
        title: "Formation Leadership Avancé - Session 1",
        startDate: "2024-02-15",
        endDate: "2024-02-16",
        maxParticipants: 12,
        registeredCount: 8,
        status: "SCHEDULED",
      },
      {
        id: "2",
        title: "Formation Java Avancé - Session 1",
        startDate: "2024-02-20",
        endDate: "2024-02-24",
        maxParticipants: 15,
        registeredCount: 12,
        status: "SCHEDULED",
      },
    ]

    const mockRegistrations = [
      {
        id: "1",
        trainingSessionId: "1",
        participantId: "1",
        status: "CONFIRMED",
        registeredAt: "2024-01-15",
        managerApproval: true,
        rfApproval: true,
        rrhApproval: true,
      },
      {
        id: "2",
        trainingSessionId: "1",
        participantId: "2",
        status: "REGISTERED",
        registeredAt: "2024-01-16",
        managerApproval: true,
        rfApproval: false,
        rrhApproval: false,
      },
      {
        id: "3",
        trainingSessionId: "2",
        participantId: "3",
        status: "INVITED",
        registeredAt: "2024-01-17",
        managerApproval: null,
        rfApproval: null,
        rrhApproval: null,
      },
    ]

    setParticipants(mockParticipants)
    setTrainingSessions(mockSessions)
    setRegistrations(mockRegistrations)
  }, [])

  const handleInviteParticipants = async (values) => {
    setLoading(true)
    try {
      const newRegistrations = values.participants.map((participantId) => ({
        id: Date.now().toString() + participantId,
        trainingSessionId: values.sessionId,
        participantId,
        status: "INVITED",
        registeredAt: new Date().toISOString(),
        managerApproval: null,
        rfApproval: null,
        rrhApproval: null,
      }))

      setRegistrations([...registrations, ...newRegistrations])
      setInviteModalVisible(false)
      form.resetFields()
      message.success(`${values.participants.length} invitations envoyées`)
    } catch (error) {
      message.error("Erreur lors de l'envoi des invitations")
    } finally {
      setLoading(false)
    }
  }

  const handleApproval = (registrationId, approvalType, approved) => {
    const updatedRegistrations = registrations.map((reg) => {
      if (reg.id === registrationId) {
        const updates = { ...reg }
        updates[approvalType] = approved

        // Update status based on approvals
        if (updates.managerApproval && updates.rfApproval && updates.rrhApproval) {
          updates.status = "CONFIRMED"
        } else if (updates.managerApproval === false || updates.rfApproval === false || updates.rrhApproval === false) {
          updates.status = "REJECTED"
        } else {
          updates.status = "REGISTERED"
        }

        return updates
      }
      return reg
    })

    setRegistrations(updatedRegistrations)
    message.success(approved ? "Inscription approuvée" : "Inscription rejetée")
  }

  const getParticipantName = (participantId) => {
    const participant = participants.find((p) => p.id === participantId)
    return participant ? `${participant.firstName} ${participant.lastName}` : "Inconnu"
  }

  const getParticipantDetails = (participantId) => {
    return participants.find((p) => p.id === participantId)
  }

  const getSessionTitle = (sessionId) => {
    const session = trainingSessions.find((s) => s.id === sessionId)
    return session ? session.title : "Session inconnue"
  }

  const sessionColumns = [
    {
      title: "Formation",
      dataIndex: "title",
      key: "title",
      render: (title, record) => (
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-sm text-gray-500">
            {record.startDate} - {record.endDate}
          </div>
        </div>
      ),
    },
    {
      title: "Participants",
      key: "participants",
      render: (_, record) => (
        <div>
          <Progress
            percent={Math.round((record.registeredCount / record.maxParticipants) * 100)}
            size="small"
            format={() => `${record.registeredCount}/${record.maxParticipants}`}
          />
        </div>
      ),
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const colors = {
          SCHEDULED: "blue",
          IN_PROGRESS: "orange",
          COMPLETED: "green",
          CANCELLED: "red",
        }
        return <Tag color={colors[status]}>{status}</Tag>
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<UserAddOutlined />}
            onClick={() => {
              setSelectedSession(record)
              setInviteModalVisible(true)
            }}
          >
            Inviter
          </Button>
          <Button type="text" size="small" icon={<EyeOutlined />}>
            Voir Participants
          </Button>
        </Space>
      ),
    },
  ]

  const registrationColumns = [
    {
      title: "Participant",
      key: "participant",
      render: (_, record) => {
        const participant = getParticipantDetails(record.participantId)
        return participant ? (
          <div className="flex items-center">
            <Avatar className="mr-2">
              {participant.firstName[0]}
              {participant.lastName[0]}
            </Avatar>
            <div>
              <div className="font-medium">{getParticipantName(record.participantId)}</div>
              <div className="text-sm text-gray-500">
                {participant.department} - {participant.position}
              </div>
            </div>
          </div>
        ) : (
          "Participant inconnu"
        )
      },
    },
    {
      title: "Formation",
      key: "training",
      render: (_, record) => <div className="text-sm">{getSessionTitle(record.trainingSessionId)}</div>,
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const colors = {
          INVITED: "default",
          REGISTERED: "orange",
          CONFIRMED: "green",
          REJECTED: "red",
          ATTENDED: "blue",
          ABSENT: "red",
        }
        const labels = {
          INVITED: "Invité",
          REGISTERED: "Inscrit",
          CONFIRMED: "Confirmé",
          REJECTED: "Rejeté",
          ATTENDED: "Présent",
          ABSENT: "Absent",
        }
        return <Tag color={colors[status]}>{labels[status]}</Tag>
      },
    },
    {
      title: "Approbations",
      key: "approvals",
      render: (_, record) => (
        <div className="space-y-1">
          <div className="flex items-center text-sm">
            <span className="w-16">Manager:</span>
            {record.managerApproval === null ? (
              <Tag color="default">En attente</Tag>
            ) : record.managerApproval ? (
              <Tag color="green">Approuvé</Tag>
            ) : (
              <Tag color="red">Rejeté</Tag>
            )}
          </div>
          <div className="flex items-center text-sm">
            <span className="w-16">RF:</span>
            {record.rfApproval === null ? (
              <Tag color="default">En attente</Tag>
            ) : record.rfApproval ? (
              <Tag color="green">Approuvé</Tag>
            ) : (
              <Tag color="red">Rejeté</Tag>
            )}
          </div>
          <div className="flex items-center text-sm">
            <span className="w-16">RRH:</span>
            {record.rrhApproval === null ? (
              <Tag color="default">En attente</Tag>
            ) : record.rrhApproval ? (
              <Tag color="green">Approuvé</Tag>
            ) : (
              <Tag color="red">Rejeté</Tag>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space direction="vertical" size="small">
          {record.managerApproval === null && (
            <Space>
              <Tooltip title="Approuver (Manager)">
                <Button
                  type="text"
                  size="small"
                  icon={<CheckOutlined />}
                  onClick={() => handleApproval(record.id, "managerApproval", true)}
                />
              </Tooltip>
              <Tooltip title="Rejeter (Manager)">
                <Button
                  type="text"
                  size="small"
                  icon={<CloseOutlined />}
                  danger
                  onClick={() => handleApproval(record.id, "managerApproval", false)}
                />
              </Tooltip>
            </Space>
          )}
          {record.managerApproval && record.rfApproval === null && (
            <Space>
              <Tooltip title="Approuver (RF)">
                <Button
                  type="text"
                  size="small"
                  icon={<CheckOutlined />}
                  onClick={() => handleApproval(record.id, "rfApproval", true)}
                />
              </Tooltip>
              <Tooltip title="Rejeter (RF)">
                <Button
                  type="text"
                  size="small"
                  icon={<CloseOutlined />}
                  danger
                  onClick={() => handleApproval(record.id, "rfApproval", false)}
                />
              </Tooltip>
            </Space>
          )}
          {record.rfApproval && record.rrhApproval === null && (
            <Space>
              <Tooltip title="Approuver (RRH)">
                <Button
                  type="text"
                  size="small"
                  icon={<CheckOutlined />}
                  onClick={() => handleApproval(record.id, "rrhApproval", true)}
                />
              </Tooltip>
              <Tooltip title="Rejeter (RRH)">
                <Button
                  type="text"
                  size="small"
                  icon={<CloseOutlined />}
                  danger
                  onClick={() => handleApproval(record.id, "rrhApproval", false)}
                />
              </Tooltip>
            </Space>
          )}
        </Space>
      ),
    },
  ]

  const pendingRegistrations = registrations.filter((reg) => reg.status === "INVITED" || reg.status === "REGISTERED")

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Participants</h1>
            <p className="text-gray-600">Gérez les inscriptions et invitations aux formations</p>
          </div>
        </div>
      </div>

      {/* Pending Approvals Alert */}
      {pendingRegistrations.length > 0 && (
        <Alert
          message="Inscriptions en attente"
          description={`${pendingRegistrations.length} inscriptions nécessitent une validation`}
          type="info"
          showIcon
          className="mb-6"
        />
      )}

      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Sessions de Formation" key="sessions">
            <Table columns={sessionColumns} dataSource={trainingSessions} rowKey="id" pagination={{ pageSize: 10 }} />
          </TabPane>
          <TabPane tab={`Inscriptions (${registrations.length})`} key="registrations">
            <div className="mb-4">
              <Search placeholder="Rechercher un participant..." style={{ width: 300 }} prefix={<SearchOutlined />} />
            </div>
            <Table columns={registrationColumns} dataSource={registrations} rowKey="id" pagination={{ pageSize: 10 }} />
          </TabPane>
          <TabPane tab={`Validations (${pendingRegistrations.length})`} key="pending">
            <Table
              columns={registrationColumns}
              dataSource={pendingRegistrations}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* Invite Modal */}
      <Modal
        title="Inviter des Participants"
        open={inviteModalVisible}
        onCancel={() => {
          setInviteModalVisible(false)
          setSelectedSession(null)
          form.resetFields()
        }}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleInviteParticipants}>
          <Form.Item label="Session de Formation" name="sessionId" initialValue={selectedSession?.id}>
            <Select disabled>
              <Option value={selectedSession?.id}>{selectedSession?.title}</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Participants à Inviter"
            name="participants"
            rules={[{ required: true, message: "Sélectionnez au moins un participant" }]}
          >
            <Select mode="multiple" placeholder="Sélectionner les participants" optionFilterProp="children" showSearch>
              {participants.map((participant) => (
                <Option key={participant.id} value={participant.id}>
                  <div className="flex items-center">
                    <Avatar size="small" className="mr-2">
                      {participant.firstName[0]}
                      {participant.lastName[0]}
                    </Avatar>
                    {participant.firstName} {participant.lastName} - {participant.department}
                  </div>
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Alert
            message="Information"
            description="Les participants recevront une invitation par email. L'inscription nécessitera l'approbation du manager, RF et RRH."
            type="info"
            showIcon
            className="mb-4"
          />

          <Form.Item>
            <Space>
              <Button onClick={() => setInviteModalVisible(false)}>Annuler</Button>
              <Button type="primary" htmlType="submit" loading={loading} icon={<MailOutlined />}>
                Envoyer les Invitations
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ParticipantManagement
