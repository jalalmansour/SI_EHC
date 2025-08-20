"use client"

import { useState, useEffect } from "react"
import { Card, Row, Col, Table, Progress } from "antd"
import DashboardLayout from "@/components/layouts/dashboard-layout"

export default function SuiviCommercialPage() {
  const [data, setData] = useState({
    caTotal: 530000,
    caMensuel: 44167,
    croissance: 15.2,
    lastUpdate: new Date().toLocaleTimeString(),
  })

  const [clientsData, setClientsData] = useState([
    {
      key: "1",
      client: "TechCorp Solutions",
      caTotal: 125000,
      caMensuel: 10417,
      servicesUtilises: "25 missions",
      derniereActivite: "2024-03-01",
    },
    {
      key: "2",
      client: "InnovateLab",
      caTotal: 85000,
      caMensuel: 7083,
      servicesUtilises: "32 missions",
      derniereActivite: "2024-02-28",
    },
    {
      key: "3",
      client: "GlobalManufacturing",
      caTotal: 320000,
      caMensuel: 26667,
      servicesUtilises: "10 missions",
      derniereActivite: "2024-01-15",
    },
  ])

  const secteurData = [
    { secteur: "Technologie", pourcentage: 45, color: "#1890ff" },
    { secteur: "Industrie", pourcentage: 35, color: "#52c41a" },
    { secteur: "R&D", pourcentage: 20, color: "#722ed1" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        caTotal: prev.caTotal + Math.floor(Math.random() * 1000),
        caMensuel: prev.caMensuel + Math.floor(Math.random() * 100),
        croissance: prev.croissance + (Math.random() - 0.5) * 0.5,
        lastUpdate: new Date().toLocaleTimeString(),
      }))
    }, 45000)

    return () => clearInterval(interval)
  }, [])

  const columns = [
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
    },
    {
      title: "CA Total",
      dataIndex: "caTotal",
      key: "caTotal",
      render: (value: number) => `${value.toLocaleString()}€`,
    },
    {
      title: "CA Mensuel",
      dataIndex: "caMensuel",
      key: "caMensuel",
      render: (value: number) => `${value.toLocaleString()}€`,
    },
    {
      title: "Services Utilisés",
      dataIndex: "servicesUtilises",
      key: "servicesUtilises",
    },
    {
      title: "Dernière Activité",
      dataIndex: "derniereActivite",
      key: "derniereActivite",
    },
  ]

  return (
    <DashboardLayout userRole="superadmin">
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Suivi Commercial et Chiffre d'Affaires</h1>

        {/* Évolution du CA */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} lg={12}>
            <Card title="📈 Évolution du CA" className="h-full">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600">CA Total 2024</div>
                  <div className="text-3xl font-bold text-gray-800">{data.caTotal.toLocaleString()}€</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">CA Mensuel Moyen</div>
                  <div className="text-xl font-semibold text-gray-700">{data.caMensuel.toLocaleString()}€</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Croissance vs 2023</div>
                  <div className="text-lg font-semibold text-green-600">+{data.croissance.toFixed(1)}%</div>
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="📊 Répartition par Secteur" className="h-full">
              <div className="space-y-4">
                {secteurData.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">{item.secteur}</span>
                      <span className="font-semibold">{item.pourcentage}%</span>
                    </div>
                    <Progress percent={item.pourcentage} strokeColor={item.color} showInfo={false} />
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>

        {/* Performance par Client */}
        <Card title="💼 Performance par Client" className="mb-6">
          <Table columns={columns} dataSource={clientsData} pagination={false} className="overflow-x-auto" />
        </Card>

        <div className="text-xs text-gray-500 text-center">Dernière mise à jour: {data.lastUpdate}</div>
      </div>
    </DashboardLayout>
  )
}
