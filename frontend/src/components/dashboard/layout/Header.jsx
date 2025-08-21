import { useState, useEffect } from "react";
import { Row, Col, Breadcrumb, Badge, Dropdown, Button, List, Avatar, Input, Drawer, Typography, Switch } from "antd";
import { SearchOutlined, StarOutlined, TwitterOutlined, FacebookFilled } from "@ant-design/icons";
import { NavLink, Link } from "react-router-dom";
import avtar from "@/assets/images/team-2.jpg";

const Header = ({ placement, name, subName, onPress, handleSidenavColor, handleSidenavType, handleFixedNavbar }) => {
  const { Title, Text } = Typography;

  const [visible, setVisible] = useState(false);
  const [sidenavType, setSidenavType] = useState("transparent");

  useEffect(() => window.scrollTo(0, 0), []);

  const showDrawer = () => setVisible(true);
  const hideDrawer = () => setVisible(false);

  // Exemple de notifications simplifiées
  const notifications = [
    { title: "New message from Sophie", description: "2 days ago", avatar: avtar },
    { title: "New album by Travis Scott", description: "2 days ago", avatar: null },
    { title: "Payment completed", description: "2 days ago", avatar: null },
  ];

  const menu = (
    <List
      className="w-full"
      itemLayout="horizontal"
      dataSource={notifications}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={item.avatar ? <Avatar src={item.avatar} /> : <Avatar />}
            title={item.title}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );

  return (
    <>
      <div className="cursor-pointer" onClick={showDrawer}>
        ⚙️
      </div>
      <Row gutter={[24, 0]} className="items-center">
        <Col span={24} md={6}>
          <Breadcrumb className="mb-2">
            <Breadcrumb.Item><NavLink to="/">Pages</NavLink></Breadcrumb.Item>
            <Breadcrumb.Item className="capitalize">{name.replace("/", "")}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="text-xl font-semibold capitalize">{subName.replace("/", "")}</div>
        </Col>

        <Col span={24} md={18} className="flex items-center justify-end gap-4">
          <Badge count={4}>
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button type="text">🔔</Button>
            </Dropdown>
          </Badge>

          <Button type="link" onClick={showDrawer}>⚙️</Button>
          <Button type="link" onClick={onPress}>☰</Button>

          <Drawer
            className="p-4"
            mask={true}
            width={360}
            onClose={hideDrawer}
            placement={placement}
            open={visible}
          >
            <Title level={4}>Configurator <Text className="text-gray-500 text-sm">See our dashboard options.</Text></Title>

            <div className="mb-4">
              <Title level={5}>Sidebar Color</Title>
              <div className="flex gap-2">
                {["#1890ff", "#52c41a", "#d9363e", "#fadb14", "#111"].map((color) => (
                  <Button
                    key={color}
                    style={{ backgroundColor: color, color: "#fff" }}
                    onClick={() => handleSidenavColor(color)}
                  >
                    1
                  </Button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <Title level={5}>Sidenav Type</Title>
              <Text className="text-gray-500 block mb-2">Choose between 2 different sidenav types.</Text>
              <div className="flex gap-2">
                {["transparent", "white"].map((type) => (
                  <Button
                    key={type}
                    type={sidenavType === type ? "primary" : "default"}
                    onClick={() => {
                      handleSidenavType(type === "white" ? "#fff" : type);
                      setSidenavType(type);
                    }}
                  >
                    {type.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <Title level={5}>Navbar Fixed</Title>
              <Switch onChange={handleFixedNavbar} />
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <Button style={{ backgroundColor: "#111", color: "#fff" }}>FREE DOWNLOAD</Button>
              <Button>VIEW DOCUMENTATION</Button>
            </div>

            <div className="flex gap-2 items-center mb-4">
              <a href="#pablo"><StarOutlined /> Star</a>
              <span>190</span>
            </div>

            <div className="flex gap-2">
              <Button style={{ backgroundColor: "#111", color: "#fff" }}><TwitterOutlined /> TWEET</Button>
              <Button style={{ backgroundColor: "#111", color: "#fff" }}><FacebookFilled /> SHARE</Button>
            </div>
          </Drawer>

          <Link to="/sign-in" className="flex items-center gap-1">
            👤 <span>Sign in</span>
          </Link>

          <Input className="w-48" placeholder="Type here..." prefix={<SearchOutlined />} />
        </Col>
      </Row>
    </>
  );
};

export default Header;
