import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Breadcrumb,
  Badge,
  Dropdown,
  Button,
  List,
  Avatar,
  Input,
  Drawer,
  Typography,
  Switch,
} from "antd";
import {
  SearchOutlined,
  StarOutlined,
  TwitterOutlined,
  FacebookFilled,
} from "@ant-design/icons";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import avtar from "../assets/images/team-2.jpg";

const ButtonContainer = styled.div`
  .ant-btn-primary { background-color: #1890ff; }
  .ant-btn-success { background-color: #52c41a; }
  .ant-btn-yellow { background-color: #fadb14; }
  .ant-btn-black { background-color: #262626; color: #fff; border: 0; border-radius: 5px; }
  .ant-switch-checked { background-color: #1890ff; }
`;

const bell = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2C6.68632 2 4 4.68629 4 8V11.5858L3.29292 12.2929C3.00692 12.5789 2.92137 13.009 3.07615 13.3827C3.23093 13.7564 3.59557 14 4 14H16C16.4045 14 16.7691 13.7564 16.9239 13.3827C17.0787 13.009 16.9931 12.5789 16.7071 12.2929L16 11.5858V8C16 4.68629 13.3137 2 10 2Z" fill="#111827"/>
    <path d="M10 18C8.34315 18 7 16.6569 7 15H13C13 16.6569 11.6569 18 10 18Z" fill="#111827"/>
  </svg>
);

// Même chose pour wifi, credit, clockicon, logsetting, profile, toggler, setting
// Tu peux copier-coller le contenu SVG directement comme ci-dessus

const data = [
  { title: "New message from Sophie", description: "2 days ago", avatar: avtar },
  { title: "New album by Travis Scott", description: "2 days ago", avatar: <Avatar shape="square">{/* wifi */}</Avatar> },
  { title: "Payment completed", description: "2 days ago", avatar: <Avatar shape="square">{/* credit */}</Avatar> },
];

const Header = ({
  placement,
  name,
  subName,
  onPress,
  handleSidenavColor,
  handleSidenavType,
  handleFixedNavbar,
}) => {
  const { Title, Text } = Typography;
  const [visible, setVisible] = useState(false);
  const [sidenavType, setSidenavType] = useState("transparent");

  useEffect(() => window.scrollTo(0, 0), []);

  const showDrawer = () => setVisible(true);
  const hideDrawer = () => setVisible(false);

  return (
    <>
      <div className="setting-drwer cursor-pointer" onClick={showDrawer}>{setting}</div>

      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Breadcrumb>
            <Breadcrumb.Item><NavLink to="/">Pages</NavLink></Breadcrumb.Item>
            <Breadcrumb.Item>{name}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="ant-page-header-heading">
            <span className="ant-page-header-heading-title">{subName}</span>
          </div>
        </Col>

        <Col span={24} md={18} className="header-control flex items-center justify-end space-x-2">
          <Badge count={4} size="small">
            <Dropdown
              dropdownRender={() => (
                <List
                  className="header-notifications-dropdown"
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar shape="square" src={item.avatar} />}
                        title={item.title}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              )}
            >
              <a href="#!" onClick={e => e.preventDefault()}>{bell}</a>
            </Dropdown>
          </Badge>

          <Button type="link" onClick={showDrawer}>{logsetting}</Button>
          <Button type="link" className="sidebar-toggler" onClick={onPress}>{toggler}</Button>

          <Drawer
            className="settings-drawer settings-drawer-rtl"
            width={360}
            onClose={hideDrawer}
            placement={placement}
            open={visible}
          >
            <div className="flex flex-col space-y-4">
              <Title level={4}>Configurator <Text className="subtitle">See our dashboard options.</Text></Title>
              
              <div>
                <Title level={5}>Sidebar Color</Title>
                <ButtonContainer className="flex space-x-2 mb-2">
                  <Button type="primary" onClick={() => handleSidenavColor("#1890ff")}>1</Button>
                  <Button type="success" onClick={() => handleSidenavColor("#52c41a")}>1</Button>
                  <Button type="danger" onClick={() => handleSidenavColor("#d9363e")}>1</Button>
                  <Button type="yellow" onClick={() => handleSidenavColor("#fadb14")}>1</Button>
                  <Button type="black" onClick={() => handleSidenavColor("black")}>1</Button>
                </ButtonContainer>

                <Title level={5}>Sidenav Type</Title>
                <Text>Choose between 2 different sidenav types.</Text>
                <ButtonContainer className="flex space-x-2 mb-2">
                  <Button type={sidenavType === "transparent" ? "primary" : "default"} onClick={() => { handleSidenavType("transparent"); setSidenavType("transparent"); }}>TRANSPARENT</Button>
                  <Button type={sidenavType === "white" ? "primary" : "default"} onClick={() => { handleSidenavType("#fff"); setSidenavType("white"); }}>WHITE</Button>
                </ButtonContainer>

                <div className="fixed-nav mb-2">
                  <Title level={5}>Navbar Fixed</Title>
                  <Switch onChange={handleFixedNavbar} />
                </div>

                <ButtonContainer className="flex space-x-2">
                  <Button type="black" size="large">FREE DOWNLOAD</Button>
                  <Button size="large">VIEW DOCUMENTATION</Button>
                </ButtonContainer>
              </div>
            </div>
          </Drawer>

          <Link to="/sign-in" className="btn-sign-in flex items-center space-x-1">
            {profile}<span>Sign in</span>
          </Link>

          <Input className="header-search" placeholder="Type here..." prefix={<SearchOutlined />} />
        </Col>
      </Row>
    </>
  );
};

export default Header;
