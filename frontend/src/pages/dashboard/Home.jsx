import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';
import { getRoleDashboard } from '../../utils/roleUtils';
import { Card, Row, Col, Typography, Spin } from 'antd';

const { Title, Text } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    // If user is logged in, redirect to their role-specific dashboard
    if (user && user.role) {
      const roleDashboard = getRoleDashboard(user.role);
      if (roleDashboard !== '/dashboard') {
        navigate(roleDashboard, { replace: true });
      }
    }
  }, [user, navigate]);

  // Show loading while redirecting
  if (user && user.role) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <Spin size="large" />
        <Text>Redirection vers votre tableau de bord...</Text>
      </div>
    );
  }

  // Default dashboard content
  return (
    <div className="dashboard-home">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Title level={2}>Tableau de Bord EHC Training Hub</Title>
            <Text type="secondary">
              Bienvenue dans la plateforme de formation EHC
            </Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;

