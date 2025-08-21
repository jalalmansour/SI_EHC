"use client";

import { Layout } from "antd";
import Sidenav from "../components/dashboard/layout/Sidenav.jsx";
import Header from "../components/dashboard/layout/Header.jsx";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

export default function DashboardShell({ children }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidenav />
      <Layout>
        <Header />
        <Content style={{ margin: "24px 16px 0" }}>
          {/* Si on passe des children on les rend, sinon on rend l'Outlet pour les routes imbriquées */}
          {children ?? <Outlet />}
        </Content>
      </Layout>
    </Layout>
  );
}
