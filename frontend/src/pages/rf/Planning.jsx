"use client"

import { useState } from "react"
import {
  Card,
  Row,
  Col,
  Button,
  Calendar,
  Badge,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Space,
  List,
  Avatar,
  Tag,
  Statistic,
  Alert,
  Tabs,
  InputNumber,
} from "antd"
import {
  CalendarOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  BookOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons"
import moment from "moment"
import "moment/locale/fr"

moment.locale("fr")

const { Option } = Select
const { RangePicker } = DatePicker
const { TabPane } = Tabs

const Planning = () => {
  const [loading, setLoading] = useState(false)
  const [sessionModalVisible, setSessionModalVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState(moment())
  const [selectedSession, setSelectedSession] = useState(null)
  const [form] = Form.useForm()
  const [viewMode, setViewMode] = useState("month")

  // Données simulées pour les sessions de formation
  const sessions = [
    {
      id: 1,
      title: "Leadership et Management",
      date: "2024-01-20",
      startTime: "09:00",
      endTime: "17:00",
      trainer: "Marie Dubois",
      location: "Salle A - Bâtiment Principal",
      participants: 15,
      maxParticipants: 20,
      status: "confirmed",
      type: "Présentiel",
      category: "Leadership",
    },
    {
      id: 2,
      title: "Cybersécurité Avancée",
      date: "2024-01-22",
      startTime: "14:00",
      endTime: "18:00",
      trainer: "Pierre Martin",
      location: "Salle Informatique",
      participants: 8,
      maxParticipants: 12,
      status: "confirmed",
      type: "Présentiel",
      category: "IT",
    },
    {
      id: 3,
      title: "Communication Interpersonnelle",
      date: "2024-01-25",
      startTime: "09:30",
      endTime: "12:30",
      trainer: "Sophie Laurent",
      location: "Visioconférence",
      participants: 25,
      maxParticipants: 30,
      status: "pending",
      type: "Distanciel",
      category: "Soft Skills",
    },
    {
      id: 4,
      title: "Gestion de Projet Agile",
      date: "2024-01-28",
      startTime: "10:00",
      endTime: "16:00",
      trainer: "Jean Dupont",
      location: "Salle B - Étage 2",
      participants: 12,
      maxParticipants: 15,
      status: "confirmed",
      type: "Présentiel",
      category: "Management",
    },
    {
      id: 5,
      title: "Excel Avancé",
      date: "2024-01-30",
      startTime: "13:00",
      endTime: "17:00",
      trainer: "Claire Bernard",
      location: "Salle Informatique",
      participants: 20,
      maxParticipants: 20,
      status: "full",
      type: "Présentiel",
      category: "Bureautique",
    },
  ]

  const trainers = [
    { id: 1, name: "Marie Dubois", specialties: ["Leadership", "Management"] },
    { id: 2, name: "Pierre Martin", specialties: ["IT", "Cybersécurité"] },
    { id: 3, name: "Sophie Laurent", specialties: ["Soft Skills", "Communication"] },
    { id: 4, name: "Jean Dupont", specialties: ["Management", "Gestion de projet"] },
    { id: 5, name: "Claire Bernard", specialties: ["Bureautique", "Office"] },
  ]

  const locations = [
    "Salle A - Bâtiment Principal",
    "Salle B - Étage 2",
    "Salle Informatique",
    "Amphithéâtre",
    "Salle de Réunion 1",
    "Visioconférence",
  ]

  const getListData = (value) => {
    const dateStr = value.format("YYYY-MM-DD")
    return sessions.filter((session) => session.date === dateStr)
  }

  const dateCellRender = (value) => {
    const listData = getListData(value)
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.id}>
            <Badge
              status={
                item.status === "confirmed"
                  ? "success"
                  : item.status === "pending"
                    ? "processing"
                    : item.status === "full"
                      ? "warning"
                      : "error"
              }
              text={
                <span style={{ fontSize: "11px" }}>
                  {item.startTime} - {item.title.substring(0, 20)}...
                </span>
              }
            />
          </li>
        ))}
      </ul>
    )
  }

  const handleDateSelect = (value) => {
    setSelectedDate(value)
  }

  const handleAddSession = () => {
    setSelectedSession(null)
    form.resetFields()
    form.setFieldsValue({
      date: selectedDate,
    })
    setSessionModalVisible(true)
  }

  const handleEditSession = (session) => {
    setSelectedSession(session)
    form.setFieldsValue({
      title: session.title,
      date: moment(session.date),
      startTime: moment(session.startTime, "HH:mm"),
      endTime: moment(session.endTime, "HH:mm"),
      trainer: session.trainer,
      location: session.location,
      maxParticipants: session.maxParticipants,
      type: session.type,
      category: session.category,
    })
    setSessionModalVisible(true)
  }

  const handleDeleteSession = (session) => {
    Modal.confirm({
      title: "Supprimer la session",
      content: `Êtes-vous sûr de vouloir supprimer la session "${session.title}" du ${moment(session.date).format(
        "DD/MM/YYYY",
      )} ?`,
      onOk: () => {
        console.log("Delete session:", session.id)
      },
    })
  }

  const handleSaveSession = (values) => {
    const sessionData = {
      ...values,
      date: values.date.format("YYYY-MM-DD"),
      startTime: values.startTime.format("HH:mm"),
      endTime: values.endTime.format("HH:mm"),
    }
    console.log("Save session:", sessionData)
    setSessionModalVisible(false)
    form.resetFields()
    setSelectedSession(null)
  }

  const getSessionsForSelectedDate = () => {
    const dateStr = selectedDate.format("YYYY-MM-DD")
    return sessions.filter((session) => session.date === dateStr)
  }

  const getUpcomingSessions = () => {
    const today = moment().format("YYYY-MM-DD")
    return sessions
      .filter((session) => session.date >= today)
      .sort((a, b) => moment(a.date).diff(moment(b.date)))
      .slice(0, 5)
  }

  const planningStats = {
    totalSessions: sessions.length,
    confirmedSessions: sessions.filter((s) => s.status === "confirmed").length,
    pendingSessions: sessions.filter((s) => s.status === "pending").length,
    totalParticipants: sessions.reduce((sum, s) => sum + s.participants, 0),
  }

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Planification des Formations</h1>
        <p className="text-gray-600">Gestion du planning et organisation des sessions de formation</p>
      </div>

      {/* Alertes */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={24}>
          <Alert
            message="Session complète"
            description="La formation 'Excel Avancé' du 30/01 a atteint sa capacité maximale (20/20 participants)."
            type="warning"
            showIcon
            closable
          />
        </Col>
      </Row>

      {/* Statistiques */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Sessions Totales"
              value={planningStats.totalSessions}
              prefix={<CalendarOutlined style={{ color: "#1890ff" }} />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Sessions Confirmées"
              value={planningStats.confirmedSessions}
              prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="En Attente"
              value={planningStats.pendingSessions}
              prefix={<ExclamationCircleOutlined style={{ color: "#faad14" }} />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Participants"
              value={planningStats.totalParticipants}
              prefix={<TeamOutlined style={{ color: "#722ed1" }} />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="calendar" type="card">
        {/* Onglet Calendrier */}
        <TabPane
          tab={
            <span>
              <CalendarOutlined />
              Calendrier
            </span>
          }
          key="calendar"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <Card
                title="Planning des Formations"
                extra={
                  <Space>
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAddSession}>
                      Nouvelle Session
                    </Button>
                  </Space>
                }
              >
                <Calendar
                  dateCellRender={dateCellRender}
                  onSelect={handleDateSelect}
                  value={selectedDate}
                  style={{ minHeight: "600px" }}
                />
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card title={`Sessions du ${selectedDate.format("DD/MM/YYYY")}`} className="mb-4">
                {getSessionsForSelectedDate().length > 0 ? (
                  <List
                    dataSource={getSessionsForSelectedDate()}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <Button
                            key="edit"
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => handleEditSession(item)}
                          />,
                          <Button
                            key="delete"
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDeleteSession(item)}
                          />,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              style={{
                                backgroundColor:
                                  item.status === "confirmed"
                                    ? "#52c41a"
                                    : item.status === "pending"
                                      ? "#faad14"
                                      : "#ff4d4f",
                              }}
                            >
                              <BookOutlined />
                            </Avatar>
                          }
                          title={
                            <div>
                              <span style={{ fontWeight: "bold" }}>{item.title}</span>
                              <Tag color="blue" style={{ marginLeft: "8px" }}>
                                {item.category}
                              </Tag>
                            </div>
                          }
                          description={
                            <div>
                              <div>
                                <ClockCircleOutlined /> {item.startTime} - {item.endTime}
                              </div>
                              <div>
                                <TeamOutlined /> {item.trainer}
                              </div>
                              <div>
                                <EnvironmentOutlined /> {item.location}
                              </div>
                              <div>
                                Participants: {item.participants}/{item.maxParticipants}
                              </div>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <CalendarOutlined style={{ fontSize: "48px", marginBottom: "16px" }} />
                    <p>Aucune session prévue ce jour</p>
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAddSession}>
                      Ajouter une session
                    </Button>
                  </div>
                )}
              </Card>

              <Card title="Prochaines Sessions">
                <List
                  dataSource={getUpcomingSessions()}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar style={{ backgroundColor: "#1890ff" }}>{moment(item.date).format("DD")}</Avatar>
                        }
                        title={item.title}
                        description={
                          <div>
                            <div>
                              {moment(item.date).format("DD/MM/YYYY")} - {item.startTime}
                            </div>
                            <div>{item.trainer}</div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        {/* Onglet Liste */}
        <TabPane
          tab={
            <span>
              <BookOutlined />
              Liste des Sessions
            </span>
          }
          key="list"
        >
          <Card title="Toutes les Sessions">
            <List
              dataSource={sessions.sort((a, b) => moment(a.date).diff(moment(b.date)))}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button key="edit" type="link" onClick={() => handleEditSession(item)}>
                      Modifier
                    </Button>,
                    <Button key="delete" type="link" danger onClick={() => handleDeleteSession(item)}>
                      Supprimer
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{
                          backgroundColor:
                            item.status === "confirmed"
                              ? "#52c41a"
                              : item.status === "pending"
                                ? "#faad14"
                                : item.status === "full"
                                  ? "#ff7a00"
                                  : "#ff4d4f",
                        }}
                      >
                        <BookOutlined />
                      </Avatar>
                    }
                    title={
                      <div>
                        <span style={{ fontWeight: "bold" }}>{item.title}</span>
                        <Tag color="blue" style={{ marginLeft: "8px" }}>
                          {item.category}
                        </Tag>
                        <Tag
                          color={
                            item.status === "confirmed"
                              ? "green"
                              : item.status === "pending"
                                ? "orange"
                                : item.status === "full"
                                  ? "gold"
                                  : "red"
                          }
                          style={{ marginLeft: "4px" }}
                        >
                          {item.status === "confirmed"
                            ? "Confirmé"
                            : item.status === "pending"
                              ? "En attente"
                              : item.status === "full"
                                ? "Complet"
                                : "Annulé"}
                        </Tag>
                      </div>
                    }
                    description={
                      <div>
                        <Row gutter={16}>
                          <Col span={8}>
                            <div>
                              <CalendarOutlined /> {moment(item.date).format("DD/MM/YYYY")}
                            </div>
                            <div>
                              <ClockCircleOutlined /> {item.startTime} - {item.endTime}
                            </div>
                          </Col>
                          <Col span={8}>
                            <div>
                              <TeamOutlined /> {item.trainer}
                            </div>
                            <div>
                              <EnvironmentOutlined /> {item.location}
                            </div>
                          </Col>
                          <Col span={8}>
                            <div>
                              Participants: {item.participants}/{item.maxParticipants}
                            </div>
                            <div>Type: {item.type}</div>
                          </Col>
                        </Row>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </TabPane>
      </Tabs>

      {/* Modal de session */}
      <Modal
        title={selectedSession ? "Modifier Session" : "Nouvelle Session"}
        open={sessionModalVisible}
        onCancel={() => {
          setSessionModalVisible(false)
          setSelectedSession(null)
          form.resetFields()
        }}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveSession}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Titre de la formation"
                name="title"
                rules={[{ required: true, message: "Saisissez le titre" }]}
              >
                <Input placeholder="Titre de la formation" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Catégorie"
                name="category"
                rules={[{ required: true, message: "Sélectionnez une catégorie" }]}
              >
                <Select placeholder="Sélectionnez une catégorie">
                  <Option value="Leadership">Leadership</Option>
                  <Option value="IT">IT</Option>
                  <Option value="Soft Skills">Soft Skills</Option>
                  <Option value="Management">Management</Option>
                  <Option value="Bureautique">Bureautique</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Date" name="date" rules={[{ required: true, message: "Sélectionnez une date" }]}>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Heure de début"
                name="startTime"
                rules={[{ required: true, message: "Sélectionnez l'heure de début" }]}
              >
                <TimePicker style={{ width: "100%" }} format="HH:mm" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Heure de fin"
                name="endTime"
                rules={[{ required: true, message: "Sélectionnez l'heure de fin" }]}
              >
                <TimePicker style={{ width: "100%" }} format="HH:mm" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Formateur"
                name="trainer"
                rules={[{ required: true, message: "Sélectionnez un formateur" }]}
              >
                <Select placeholder="Sélectionnez un formateur">
                  {trainers.map((trainer) => (
                    <Option key={trainer.id} value={trainer.name}>
                      {trainer.name} - {trainer.specialties.join(", ")}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Lieu" name="location" rules={[{ required: true, message: "Sélectionnez un lieu" }]}>
                <Select placeholder="Sélectionnez un lieu">
                  {locations.map((location) => (
                    <Option key={location} value={location}>
                      {location}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Nombre max de participants"
                name="maxParticipants"
                rules={[{ required: true, message: "Saisissez le nombre maximum" }]}
              >
                <InputNumber style={{ width: "100%" }} placeholder="Nombre maximum" min={1} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Type de formation"
                name="type"
                rules={[{ required: true, message: "Sélectionnez le type" }]}
              >
                <Select placeholder="Type de formation">
                  <Option value="Présentiel">Présentiel</Option>
                  <Option value="Distanciel">Distanciel</Option>
                  <Option value="Hybride">Hybride</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item className="mb-0 text-right">
            <Space>
              <Button
                onClick={() => {
                  setSessionModalVisible(false)
                  setSelectedSession(null)
                  form.resetFields()
                }}
              >
                Annuler
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {selectedSession ? "Modifier" : "Créer"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Planning
