/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Drawer, Affix } from "antd";
import Sidenav from "./Sidenav.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }) {
  const [sidenavColor, setSidenavColor] = useState("#1890ff");
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixedNavbar, setFixedNavbar] = useState(true);
  const [openSidenav, setOpenSidenav] = useState(true);
  const [sidenavCollapsed, setSidenavCollapsed] = useState(false);

  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleFixedNavbar = (fixed) => setFixedNavbar(fixed);
  const handleSidenavCollapse = () => setSidenavCollapsed(!sidenavCollapsed);

  useEffect(() => {
    // Add responsive behavior
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidenavCollapsed(true);
        setOpenSidenav(false);
      } else {
        setSidenavCollapsed(false);
        setOpenSidenav(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="ehc-dashboard-layout">
      <Layout className={`layout-dashboard ${fixedNavbar ? 'fixed-navbar' : ''}`}>
        <Sidenav 
          color={sidenavColor} 
          collapsed={sidenavCollapsed}
          onCollapse={handleSidenavCollapse}
        />
        <Layout className="layout-content">
          <Header
            onPress={() => setOpenSidenav(!openSidenav)}
            name={window.location.pathname}
            subName={window.location.pathname}
            handleSidenavColor={handleSidenavColor}
            handleSidenavType={handleSidenavType}
            handleFixedNavbar={handleFixedNavbar}
            placement="right"
          />
          <div className="main-content">
            {children}
          </div>
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
}

export default Main;


