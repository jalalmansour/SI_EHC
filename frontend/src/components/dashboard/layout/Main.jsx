import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Drawer, Affix } from "antd";
import Sidenav from "./Sidenav";
import Header from "./Header";
import Footer from "./Footer";

const { Header: AntHeader, Content, Sider } = Layout;

const Main = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [sidenavColor, setSidenavColor] = useState("#1890ff");
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixed, setFixed] = useState(false);

  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (status) => setFixed(status);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  useEffect(() => {
    setPlacement(pathname === "rtl" ? "left" : "right");
  }, [pathname]);

  return (
    <Layout
      className={`layout-dashboard ${pathname === "profile" ? "layout-profile" : ""} ${
        pathname === "rtl" ? "layout-dashboard-rtl" : ""
      }`}
    >
      {/* Drawer for mobile / responsive */}
      <Drawer
        title={null}
        placement={placement === "right" ? "left" : "right"}
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
        width={250}
        className={`drawer-sidebar ${pathname === "rtl" ? "drawer-sidebar-rtl" : ""}`}
      >
        <Layout className={`${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}>
          <Sider
            trigger={null}
            width={250}
            theme="light"
            className={`sider-primary ant-layout-sider-primary ${
              sidenavType === "#fff" ? "active-route" : ""
            }`}
            style={{ background: sidenavType }}
          >
            <Sidenav color={sidenavColor} />
          </Sider>
        </Layout>
      </Drawer>

      {/* Desktop Sidenav */}
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        width={250}
        theme="light"
        className={`sider-primary ant-layout-sider-primary ${
          sidenavType === "#fff" ? "active-route" : ""
        }`}
        style={{ background: sidenavType }}
      >
        <Sidenav color={sidenavColor} />
      </Sider>

      <Layout>
        {/* Header */}
        {fixed ? (
          <Affix>
            <AntHeader className="ant-header-fixed">
              <Header
                onPress={openDrawer}
                name={pathname}
                subName={pathname}
                handleSidenavColor={handleSidenavColor}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
                placement={placement}
              />
            </AntHeader>
          </Affix>
        ) : (
          <AntHeader>
            <Header
              onPress={openDrawer}
              name={pathname}
              subName={pathname}
              handleSidenavColor={handleSidenavColor}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
             placement={placement}
            />
          </AntHeader>
        )}

        {/* Main Content */}
        <Content className="content-ant">{children}</Content>

        {/* Footer */}
        <Footer />
      </Layout>
    </Layout>
  );
};

export default Main;
