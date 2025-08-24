/*! Profile page uses Ant Design and dashboard styles (EHC) */
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';
import { getRoleDisplayName, getRoleColor } from '../../utils/roleUtils';
import moment from 'moment';

import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Upload,
  message,
  Input,
  Form,
  Divider,
  Badge,
  Tag,
  Progress,
  Statistic,
  Space,
  Tooltip,
  Modal,
  Select,
  DatePicker,
} from "antd";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  VerticalAlignTopOutlined,
  EditOutlined,
  SaveOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  TrophyOutlined,
  StarOutlined,
  HeartOutlined,
  EyeOutlined,
  MessageOutlined,
  SettingOutlined,
  BellOutlined,
  LockOutlined,
  SafetyOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

import BgProfile from "@/assets/images/bg-profile.jpg";
import profilavatar from "@/assets/images/face-1.jpg";
import convesionImg from "@/assets/images/face-3.jpg";
import convesionImg2 from "@/assets/images/face-4.jpg";
import convesionImg3 from "@/assets/images/face-5.jpeg";
import convesionImg4 from "@/assets/images/face-6.jpeg";
import convesionImg5 from "@/assets/images/face-2.jpg";
import project1 from "@/assets/images/home-decor-1.jpeg";
import project2 from "@/assets/images/home-decor-2.jpeg";
import project3 from "@/assets/images/home-decor-3.jpeg";

const { TextArea } = Input;
const { Option } = Select;

function Profile() {
  const user = useSelector(selectUser);
  const [imageURL, setImageURL] = useState(false);
  const [, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        birthDate: user.birthDate ? moment(user.birthDate) : null,
        bio: user.bio || '',
      });
    }
  }, [user, form]);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(false);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageURL(false);
      });
    }
  };

  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];

  const uploadButton = (
    <div className="ant-upload-text font-semibold text-dark">
      {<VerticalAlignTopOutlined style={{ width: 20, color: "#000" }} />}
      <div>Upload New Project</div>
    </div>
  );

  const data = [
    { title: "Sophie B.", avatar: convesionImg, description: "Hi! I need more information…", time: "2 min ago", status: "online" },
    { title: "Anne Marie", avatar: convesionImg2, description: "Awesome work, can you…", time: "5 min ago", status: "online" },
    { title: "Ivan", avatar: convesionImg3, description: "About files I can…", time: "10 min ago", status: "offline" },
    { title: "Peterson", avatar: convesionImg4, description: "Have a great afternoon…", time: "15 min ago", status: "online" },
    { title: "Nick Daniel", avatar: convesionImg5, description: "Hi! I need more information…", time: "1 hour ago", status: "offline" },
  ];

  const project = [
    { img: project1, titlesub: "Project #1", title: "Modern", disciption: "As Uber works through a huge amount of internal management turmoil.", progress: 75, team: [profilavatar, convesionImg, convesionImg2, convesionImg3] },
    { img: project2, titlesub: "Project #2", title: "Scandinavian", disciption: "Music is something that every person has his or her own specific opinion about.", progress: 45, team: [profilavatar, convesionImg, convesionImg2] },
    { img: project3, titlesub: "Project #3", title: "Minimalist", disciption: "Different people have different taste, and various types of music, Zimbali Resort", progress: 90, team: [profilavatar, convesionImg] },
  ];

  // Role-specific statistics
  const getRoleStats = (userRole) => {
    const roleStats = {
      rrh: [
        { title: "Formations Gérées", value: 45, icon: <TrophyOutlined />, color: "#1890ff" },
        { title: "Participants", value: 156, icon: <UserOutlined />, color: "#52c41a" },
        { title: "Budget Utilisé", value: 78, suffix: "%", icon: <StarOutlined />, color: "#faad14" },
        { title: "Sessions Actives", value: 12, icon: <EyeOutlined />, color: "#722ed1" },
      ],
      employee: [
        { title: "Formations Suivies", value: 8, icon: <TrophyOutlined />, color: "#1890ff" },
        { title: "Certifications", value: 3, icon: <UserOutlined />, color: "#52c41a" },
        { title: "Satisfaction", value: 92, suffix: "%", icon: <StarOutlined />, color: "#faad14" },
        { title: "Formations en Cours", value: 2, icon: <EyeOutlined />, color: "#722ed1" },
      ],
      rf: [
        { title: "Formations Planifiées", value: 18, icon: <TrophyOutlined />, color: "#1890ff" },
        { title: "Formateurs", value: 8, icon: <UserOutlined />, color: "#52c41a" },
        { title: "Taux de Réussite", value: 95, suffix: "%", icon: <StarOutlined />, color: "#faad14" },
        { title: "Sessions Confirmées", value: 15, icon: <EyeOutlined />, color: "#722ed1" },
      ],
      manager: [
        { title: "Équipe Gérée", value: 12, icon: <TrophyOutlined />, color: "#1890ff" },
        { title: "Demandes Approuvées", value: 24, icon: <UserOutlined />, color: "#52c41a" },
        { title: "Performance Équipe", value: 88, suffix: "%", icon: <StarOutlined />, color: "#faad14" },
        { title: "Formations Équipe", value: 6, icon: <EyeOutlined />, color: "#722ed1" },
      ],
      formateur: [
        { title: "Sessions Animées", value: 32, icon: <TrophyOutlined />, color: "#1890ff" },
        { title: "Participants Formés", value: 89, icon: <UserOutlined />, color: "#52c41a" },
        { title: "Note Moyenne", value: 4.8, suffix: "/5", icon: <StarOutlined />, color: "#faad14" },
        { title: "Sessions à Venir", value: 5, icon: <EyeOutlined />, color: "#722ed1" },
      ],
      admin: [
        { title: "Clients Gérés", value: 15, icon: <TrophyOutlined />, color: "#1890ff" },
        { title: "Utilisateurs", value: 245, icon: <UserOutlined />, color: "#52c41a" },
        { title: "Système Uptime", value: 99.9, suffix: "%", icon: <StarOutlined />, color: "#faad14" },
        { title: "Tickets Support", value: 8, icon: <EyeOutlined />, color: "#722ed1" },
      ],
      superadmin: [
        { title: "Plateformes Gérées", value: 3, icon: <TrophyOutlined />, color: "#1890ff" },
        { title: "Administrateurs", value: 12, icon: <UserOutlined />, color: "#52c41a" },
        { title: "Performance Globale", value: 98.5, suffix: "%", icon: <StarOutlined />, color: "#faad14" },
        { title: "Systèmes Actifs", value: 5, icon: <EyeOutlined />, color: "#722ed1" },
      ]
    };
    
    return roleStats[userRole] || [
      { title: "Activités", value: 0, icon: <TrophyOutlined />, color: "#1890ff" },
      { title: "Membres", value: 0, icon: <UserOutlined />, color: "#52c41a" },
      { title: "Satisfaction", value: 0, suffix: "%", icon: <StarOutlined />, color: "#faad14" },
      { title: "Projets", value: 0, icon: <EyeOutlined />, color: "#722ed1" },
    ];
  };

  const stats = getRoleStats(user?.role);

  const handleSave = () => {
    setIsEditing(false);
    message.success("Profile updated successfully!");
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    message.success("Settings updated successfully!");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header" style={{ backgroundImage: "url(" + BgProfile + ")" }}>
        <div className="profile-header-overlay">
          <Row justify="space-between" align="middle" gutter={[24, 24]}>
            <Col span={24} md={16}>
              <div className="profile-info">
                <Avatar size={120} src={profilavatar} className="profile-avatar" />
                <div className="profile-details">
                  <h1 className="profile-name">
                    {user ? `${user.firstName || 'User'} ${user.lastName || 'Name'}` : 'Loading...'}
                  </h1>
                  <p className="profile-title">
                    {user ? getRoleDisplayName(user.role) : 'Loading...'}
                  </p>
                  <div className="profile-tags">
                    <Tag color={getRoleColor(user?.role)}>
                      {user ? getRoleDisplayName(user.role) : 'User'}
                    </Tag>
                    <Tag color="blue">EHC Training Hub</Tag>
                    <Tag color="green">Active</Tag>
                  </div>
                  <div className="profile-stats">
                    <Space size="large">
                      <Statistic title="Role" value={user?.role?.toUpperCase() || 'USER'} />
                      <Statistic title="Status" value="Active" />
                      <Statistic title="Member Since" value="2024" />
                    </Space>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={24} md={8}>
              <div className="profile-actions">
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <Button type="primary" size="large" icon={<EditOutlined />} onClick={() => setIsEditing(true)}>
                    Modifier le Profil
                  </Button>
                  <Button size="large" icon={<SettingOutlined />} onClick={showModal}>
                    Paramètres
                  </Button>
                  <Button size="large" icon={<BellOutlined />}>
                    Notifications
                  </Button>
                </Space>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Card className="profile-nav-card" bodyStyle={{ padding: 0 }}>
        <Radio.Group 
          value={activeTab} 
          onChange={(e) => setActiveTab(e.target.value)}
          className="profile-nav-tabs"
        >
          <Radio.Button value="overview">Aperçu</Radio.Button>
          <Radio.Button value="profile">Profil</Radio.Button>
          <Radio.Button value="projects">Activités</Radio.Button>
          <Radio.Button value="messages">Messages</Radio.Button>
          <Radio.Button value="settings">Paramètres</Radio.Button>
        </Radio.Group>
      </Card>

      {/* Content based on active tab */}
      {activeTab === "overview" && (
        <>
          {/* Statistics Cards */}
          <Row gutter={[24, 24]} className="mb-24">
            {stats.map((stat, index) => (
              <Col span={24} md={6} key={index}>
                <Card className="stat-card">
                  <div className="stat-content">
                    <div className="stat-icon" style={{ color: stat.color }}>
                      {stat.icon}
                    </div>
                    <div className="stat-info">
                      <Statistic title={stat.title} value={stat.value} suffix={stat.suffix} />
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Main Content */}
          <Row gutter={[24, 24]}>
            <Col span={24} lg={16}>
              <Card title={user?.role === 'rrh' ? 'Formations Récentes' : 'Activités Récentes'} className="projects-card">
                <Row gutter={[24, 24]}>
                  {project.map((p, index) => (
                    <Col span={24} md={12} key={index}>
                      <Card className="project-item" cover={<img alt="project" src={p.img} />}>
                        <div className="project-tag">{p.titlesub}</div>
                        <h4>{p.title}</h4>
                        <p>{p.disciption}</p>
                        <div className="project-progress">
                          <Progress percent={p.progress} size="small" />
                        </div>
                        <Row justify="space-between" align="middle" className="project-footer">
                          <Col>
                            <Avatar.Group size="small">
                              {p.team.map((member, idx) => (
                                <Avatar key={idx} src={member} />
                              ))}
                            </Avatar.Group>
                          </Col>
                          <Col>
                            <Button type="primary" size="small">View Details</Button>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
            <Col span={24} lg={8}>
              <Card title="Notifications Récentes" className="messages-card">
                <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Badge dot={item.status === "online"}>
                            <Avatar src={item.avatar} />
                          </Badge>
                        }
                        title={
                          <div className="message-header">
                            <span>{item.title}</span>
                            <span className="message-time">{item.time}</span>
                          </div>
                        }
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </>
      )}

      {activeTab === "profile" && (
        <Row gutter={[24, 24]}>
          <Col span={24} lg={16}>
            <Card title="Informations Personnelles" className="profile-info-card">
              <Form layout="vertical" form={form}>
                <Row gutter={[24, 0]}>
                  <Col span={12}>
                    <Form.Item label="Prénom" name="firstName">
                      <Input prefix={<UserOutlined />} placeholder="Prénom" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Nom" name="lastName">
                      <Input prefix={<UserOutlined />} placeholder="Nom" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[24, 0]}>
                  <Col span={12}>
                    <Form.Item label="Email" name="email">
                      <Input prefix={<MailOutlined />} placeholder="Email" disabled />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Téléphone" name="phone">
                      <Input prefix={<PhoneOutlined />} placeholder="Téléphone" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[24, 0]}>
                  <Col span={12}>
                    <Form.Item label="Localisation" name="location">
                      <Input prefix={<EnvironmentOutlined />} placeholder="Localisation" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Date de naissance" name="birthDate">
                      <DatePicker style={{ width: '100%' }} placeholder="Date de naissance" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[24, 0]}>
                  <Col span={12}>
                    <Form.Item label="Rôle" name="role">
                      <Input 
                        prefix={<UserOutlined />} 
                        value={user ? getRoleDisplayName(user.role) : ''} 
                        disabled 
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Statut" name="status">
                      <Input 
                        prefix={<SafetyOutlined />} 
                        value="Actif" 
                        disabled 
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="Biographie" name="bio">
                  <TextArea rows={4} placeholder="Parlez-nous de vous..." />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
                    Sauvegarder les Modifications
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col span={24} lg={8}>
            <Card title="Informations Supplémentaires" className="social-links-card">
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div style={{ padding: '12px', border: '1px solid #f0f0f0', borderRadius: '6px' }}>
                  <Text strong>Rôle:</Text> {user ? getRoleDisplayName(user.role) : 'Non défini'}
                </div>
                <div style={{ padding: '12px', border: '1px solid #f0f0f0', borderRadius: '6px' }}>
                  <Text strong>Email:</Text> {user?.email || 'Non défini'}
                </div>
                <div style={{ padding: '12px', border: '1px solid #f0f0f0', borderRadius: '6px' }}>
                  <Text strong>Membre depuis:</Text> 2024
                </div>
                <div style={{ padding: '12px', border: '1px solid #f0f0f0', borderRadius: '6px' }}>
                  <Text strong>Statut:</Text> <Tag color="green">Actif</Tag>
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      )}

      {activeTab === "projects" && (
        <Card title="All Projects" className="all-projects-card">
          <Row gutter={[24, 24]}>
            {project.map((p, index) => (
              <Col span={24} md={12} xl={8} key={index}>
                <Card className="project-card" cover={<img alt="project" src={p.img} />}>
                  <div className="project-tag">{p.titlesub}</div>
                  <h4>{p.title}</h4>
                  <p>{p.disciption}</p>
                  <div className="project-progress">
                    <Progress percent={p.progress} size="small" />
                  </div>
                  <Row justify="space-between" align="middle" className="project-footer">
                    <Col>
                      <Avatar.Group size="small">
                        {p.team.map((member, idx) => (
                          <Avatar key={idx} src={member} />
                        ))}
                      </Avatar.Group>
                    </Col>
                    <Col>
                      <Button type="primary" size="small">View Project</Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
            <Col span={24} md={12} xl={8}>
              <Upload name="avatar" listType="picture-card" className="avatar-uploader projects-uploader" showUploadList={false} action="https://www.mocky.io/v2/5cc8019d300000980a055e76" beforeUpload={beforeUpload} onChange={handleChange}>
                {imageURL ? (<img src={imageURL} alt="avatar" style={{ width: "100%" }} />) : (uploadButton)}
              </Upload>
            </Col>
          </Row>
        </Card>
      )}

      {activeTab === "messages" && (
        <Card title="Messages" className="messages-card">
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button type="link" icon={<MessageOutlined />}>Reply</Button>,
                  <Button type="link" icon={<EyeOutlined />}>View</Button>
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Badge dot={item.status === "online"}>
                      <Avatar size={48} src={item.avatar} />
                    </Badge>
                  }
                  title={
                    <div className="message-header">
                      <span>{item.title}</span>
                      <span className="message-time">{item.time}</span>
                    </div>
                  }
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Card>
      )}

      {activeTab === "settings" && (
        <Row gutter={[24, 24]}>
          <Col span={24} md={12}>
            <Card title="Paramètres de Notification" className="settings-card">
              <List>
                <List.Item>
                  <div className="setting-item">
                    <div>
                      <h4>Notifications Email</h4>
                      <p>Recevoir des notifications par email pour les mises à jour importantes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </List.Item>
                <List.Item>
                  <div className="setting-item">
                    <div>
                      <h4>Notifications Push</h4>
                      <p>Recevoir des notifications push sur votre appareil</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </List.Item>
                <List.Item>
                  <div className="setting-item">
                    <div>
                      <h4>Notifications SMS</h4>
                      <p>Recevoir des notifications SMS pour les urgences</p>
                    </div>
                    <Switch />
                  </div>
                </List.Item>
              </List>
            </Card>
          </Col>
          <Col span={24} md={12}>
            <Card title="Paramètres de Confidentialité" className="settings-card">
              <List>
                <List.Item>
                  <div className="setting-item">
                    <div>
                      <h4>Visibilité du Profil</h4>
                      <p>Contrôler qui peut voir votre profil</p>
                    </div>
                    <Select defaultValue="public" style={{ width: 120 }}>
                      <Option value="public">Public</Option>
                      <Option value="private">Privé</Option>
                      <Option value="friends">Amis Seulement</Option>
                    </Select>
                  </div>
                </List.Item>
                <List.Item>
                  <div className="setting-item">
                    <div>
                      <h4>Authentification à Deux Facteurs</h4>
                      <p>Ajouter une couche de sécurité supplémentaire</p>
                    </div>
                                          <Button type="primary" icon={<LockOutlined />}>Activer</Button>
                  </div>
                </List.Item>
              </List>
            </Card>
          </Col>
        </Row>
      )}

      {/* Settings Modal */}
      <Modal
        title="Paramètres Avancés"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
      >
        <Form layout="vertical">
          <Form.Item label="Langue" name="language">
            <Select placeholder="Sélectionner la langue">
              <Option value="en">English</Option>
              <Option value="fr">Français</Option>
              <Option value="es">Español</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Thème" name="theme">
            <Select placeholder="Sélectionner le thème">
              <Option value="light">Clair</Option>
              <Option value="dark">Sombre</Option>
              <Option value="auto">Automatique</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Fuseau Horaire" name="timezone">
            <Select placeholder="Sélectionner le fuseau horaire">
              <Option value="utc">UTC</Option>
              <Option value="est">EST</Option>
              <Option value="pst">PST</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Profile;

