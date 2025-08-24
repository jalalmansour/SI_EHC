import React, { useState } from 'react';
import { Card, Row, Col, Button, Typography, Space, Alert } from 'antd';
import { testRoleRouting, testUsers, simulateLogin } from '../utils/testRoleRouting';

const { Title, Text } = Typography;

const TestRoleRouting = () => {
  const [testResults, setTestResults] = useState(null);

  const runTests = () => {
    console.log('Running role-based routing tests...');
    testRoleRouting();
    
    // Test each user role
    const results = testUsers.map(user => simulateLogin(user));
    setTestResults(results);
    
    console.log('Test results:', results);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Title level={2}>Test Role-Based Routing</Title>
            <Text type="secondary">
              Test utility for verifying role-based routing functionality
            </Text>
          </Card>
        </Col>
        
        <Col span={24}>
          <Card title="Test Controls">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Button type="primary" onClick={runTests} size="large">
                Run Role-Based Routing Tests
              </Button>
              
              <Alert
                message="Test Instructions"
                description="Click the button above to run tests. Check the browser console for detailed results."
                type="info"
                showIcon
              />
            </Space>
          </Card>
        </Col>

        {testResults && (
          <Col span={24}>
            <Card title="Test Results">
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                {testResults.map((result, index) => (
                  <Card key={index} size="small" style={{ border: '1px solid #d9d9d9' }}>
                    <Row gutter={[16, 16]} align="middle">
                      <Col span={6}>
                        <Text strong>{result.user.role.toUpperCase()}</Text>
                      </Col>
                      <Col span={6}>
                        <Text>{result.user.firstName} {result.user.lastName}</Text>
                      </Col>
                      <Col span={6}>
                        <Text code>{result.dashboard}</Text>
                      </Col>
                      <Col span={6}>
                        <Text>{result.menu.length} menu items</Text>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Space>
            </Card>
          </Col>
        )}

        <Col span={24}>
          <Card title="Test Users">
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              {testUsers.map((user, index) => (
                <div key={index} style={{ 
                  padding: '8px', 
                  border: '1px solid #f0f0f0', 
                  borderRadius: '4px',
                  backgroundColor: '#fafafa'
                }}>
                  <Text strong>{user.role.toUpperCase()}:</Text> {user.email} / {user.password}
                </div>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TestRoleRouting;
