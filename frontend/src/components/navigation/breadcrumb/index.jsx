"use client"
import { Breadcrumb } from "antd"
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  TeamOutlined,
  BookOutlined,
  BarChartOutlined,
} from "@ant-design/icons"
import { useLocation, Link } from "react-router-dom"

const BreadcrumbComponent = ({ items = [] }) => {
  const location = useLocation()

  const generateBreadcrumbItems = () => {
    const pathSegments = location.pathname.split("/").filter((segment) => segment)
    const breadcrumbItems = [
      {
        title: (
          <span className="flex items-center gap-1">
            <HomeOutlined />
            Accueil
          </span>
        ),
        href: "/",
      },
    ]

    const iconMap = {
      admin: <UserOutlined />,
      superadmin: <SettingOutlined />,
      rrh: <TeamOutlined />,
      formateur: <BookOutlined />,
      employee: <UserOutlined />,
      dashboard: <BarChartOutlined />,
      clients: <TeamOutlined />,
      formations: <BookOutlined />,
      reports: <BarChartOutlined />,
      settings: <SettingOutlined />,
    }

    const labelMap = {
      admin: "Administrateur",
      superadmin: "Super Admin",
      rrh: "Ressources Humaines",
      formateur: "Formateur",
      employee: "Employé",
      dashboard: "Tableau de Bord",
      clients: "Clients",
      formations: "Formations",
      reports: "Rapports",
      settings: "Paramètres",
      "informations-clients": "Informations Clients",
      "suivi-commercial": "Suivi Commercial",
      "gestion-paiements": "Gestion Paiements",
      contrats: "Contrats",
      "prospection-devis": "Prospection & Devis",
      "budget-management": "Gestion Budget",
      "training-catalog": "Catalogue Formations",
      "mes-formations": "Mes Formations",
    }

    let currentPath = ""
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const isLast = index === pathSegments.length - 1
      const label = labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
      const icon = iconMap[segment]

      breadcrumbItems.push({
        title: (
          <span className={`flex items-center gap-1 ${isLast ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-500"}`}>
            {icon}
            {label}
          </span>
        ),
        href: isLast ? undefined : currentPath,
      })
    })

    return breadcrumbItems
  }

  const breadcrumbItems = items.length > 0 ? items : generateBreadcrumbItems()

  return (
    <div className="bg-white px-6 py-3 border-b border-gray-200 shadow-sm">
      <Breadcrumb
        className="text-sm"
        separator="/"
        items={breadcrumbItems.map((item) => ({
          title: item.href ? <Link to={item.href}>{item.title}</Link> : item.title,
        }))}
      />
    </div>
  )
}

export default BreadcrumbComponent


