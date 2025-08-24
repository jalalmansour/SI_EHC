import React from 'react';
import { Card, Row, Col, Typography, Space, Button, Avatar } from 'antd';
import { 
  UserOutlined, 
  BookOutlined, 
  CalendarOutlined, 
  BarChartOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  FormOutlined,
  TrophyOutlined,
  AuditOutlined,
  UserSwitchOutlined,
  BuildOutlined,
  GlobalOutlined,
  MonitorOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';
import { getRoleDisplayName, getRoleColor } from '../../utils/roleUtils';

const { Title, Text } = Typography;

const RoleDashboard = () => {
  const user = useSelector(selectUser);

  const roleConfig = {
    rf: {
      title: 'Tableau de Bord RF',
      description: 'Responsable Formation',
      features: [
        { icon: <BookOutlined />, title: 'Planification Formation', description: 'Planifier et organiser les formations' },
        { icon: <CalendarOutlined />, title: 'Validation Demandes', description: 'Valider les demandes de formation' },
        { icon: <BarChartOutlined />, title: 'Rapports Formation', description: 'Générer des rapports de formation' }
      ]
    },
    manager: {
      title: 'Tableau de Bord Manager',
      description: 'Gestion d\'équipe',
      features: [
        { icon: <TeamOutlined />, title: 'Formations Équipe', description: 'Gérer les formations de votre équipe' },
        { icon: <CheckCircleOutlined />, title: 'Validation Demandes', description: 'Valider les demandes de votre équipe' }
      ]
    },
    employee: {
      title: 'Tableau de Bord Employé',
      description: 'Espace personnel',
      features: [
        { icon: <BookOutlined />, title: 'Mes Formations', description: 'Voir mes formations en cours et terminées' },
        { icon: <FormOutlined />, title: 'Demande Formation', description: 'Demander une nouvelle formation' },
        { icon: <TrophyOutlined />, title: 'Mes Certifications', description: 'Accéder à mes certifications' }
      ]
    },
    formateur: {
      title: 'Tableau de Bord Formateur',
      description: 'Gestion des sessions',
      features: [
        { icon: <BookOutlined />, title: 'Mes Formations', description: 'Gérer mes sessions de formation' },
        { icon: <AuditOutlined />, title: 'Évaluations', description: 'Évaluer les participants' }
      ]
    },
    admin: {
      title: 'Tableau de Bord Admin',
      description: 'Administration système',
      features: [
        { icon: <UserSwitchOutlined />, title: 'Gestion Clients', description: 'Gérer les clients et utilisateurs' },
        { icon: <BuildOutlined />, title: 'Paramètres Système', description: 'Configurer le système' }
      ]
    },
    superadmin: {
      title: 'Tableau de Bord Super Admin',
      description: 'Administration globale',
      features: [
        { icon: <GlobalOutlined />, title: 'Gestion Globale', description: 'Gestion globale de la plateforme' },
        { icon: <MonitorOutlined />, title: 'Monitoring Système', description: 'Surveiller les performances' }
      ]
    }
  };

  const config = roleConfig[user?.role] || {
    title: 'Tableau de Bord',
    description: 'Utilisateur',
    features: []
  };

  return (
    <div className="role-dashboard">
      {/* Header */}
      <div className="dashboard-header" style={{ marginBottom: '24px' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              {config.title}
            </Title>
            <Text type="secondary">
              Bienvenue, {user?.firstName || 'Utilisateur'} - {getRoleDisplayName(user?.role)}
            </Text>
          </Col>
          <Col>
            <Avatar 
              size={64} 
              icon={<UserOutlined />}
              style={{ 
                backgroundColor: getRoleColor(user?.role),
                border: '3px solid #f0f0f0'
              }}
            />
          </Col>
        </Row>
      </div>

      {/* Role Description */}
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={[16, 16]} align="middle">
          <Col>
            <Title level={4} style={{ margin: 0, color: getRoleColor(user?.role) }}>
              {config.description}
            </Title>
            <Text type="secondary">
              Accédez aux fonctionnalités spécifiques à votre rôle
            </Text>
          </Col>
        </Row>
      </Card>

      {/* Features Grid */}
      <Row gutter={[16, 16]}>
        {config.features.map((feature, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card 
              hoverable
              style={{ 
                height: '100%',
                border: `2px solid ${getRoleColor(user?.role)}20`
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div 
                  style={{ 
                    fontSize: '48px', 
                    color: getRoleColor(user?.role),
                    marginBottom: '16px'
                  }}
                >
                  {feature.icon}
                </div>
                <Title level={4} style={{ margin: '0 0 8px 0' }}>
                  {feature.title}
                </Title>
                <Text type="secondary" style={{ display: 'block', marginBottom: '16px' }}>
                  {feature.description}
                </Text>
                <Button 
                  type="primary" 
                  style={{ backgroundColor: getRoleColor(user?.role) }}
                >
                  Accéder
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Quick Stats */}
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card title="Statistiques Rapides">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <div style={{ textAlign: 'center' }}>
                  <Title level={2} style={{ color: getRoleColor(user?.role), margin: 0 }}>
                    12
                  </Title>
                  <Text type="secondary">Formations actives</Text>
                </div>
              </Col>
              <Col xs={24} sm={8}>
                <div style={{ textAlign: 'center' }}>
                  <Title level={2} style={{ color: getRoleColor(user?.role), margin: 0 }}>
                    85%
                  </Title>
                  <Text type="secondary">Taux de satisfaction</Text>
                </div>
              </Col>
              <Col xs={24} sm={8}>
                <div style={{ textAlign: 'center' }}>
                  <Title level={2} style={{ color: getRoleColor(user?.role), margin: 0 }}>
                    156
                  </Title>
                  <Text type="secondary">Participants</Text>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RoleDashboard;
