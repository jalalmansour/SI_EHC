/*!
  =========================================================
  * EHC Training Hub - Dashboard Navigation
  =========================================================
  * Based on EHC Training Hub requirements
  * Role-based navigation for Admin, RRH, RF, Manager, Employee, Trainer
  * Updated with valid Ant Design icons and modern UI/UX
  =========================================================
*/

import { Menu, Button, Avatar, Tooltip } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/slices/authSlice';
import { getRoleMenu, getRoleDisplayName, getRoleColor } from '../../../utils/roleUtils';
import { 
  DashboardOutlined, 
  BookOutlined, 
  CalendarOutlined, 
  TeamOutlined, 
  DollarOutlined, 
  BarChartOutlined, 
  SettingOutlined, 
  UserOutlined,
  FileTextOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  HomeOutlined,
  BankOutlined,
  AuditOutlined,
  SafetyCertificateOutlined,
  GlobalOutlined,
  MonitorOutlined,
  UserSwitchOutlined,
  TeamOutlined as TeamIcon,
  FormOutlined,
  CheckCircleOutlined,
  FileSearchOutlined,
  CrownOutlined,
  BuildOutlined
} from "@ant-design/icons";
import logo from "/public/images/logo.png";
import { useState, useEffect } from "react";

// Icon mapping for menu items
const iconMap = {
  'dashboard': <DashboardOutlined />,
  'budget-management': <DollarOutlined />,
  'organization-management': <BankOutlined />,
  'training-catalog': <BookOutlined />,
  'participant-management': <TeamOutlined />,
  'reports': <BarChartOutlined />,
  'settings': <SettingOutlined />,
  'training-planning': <CalendarOutlined />,
  'validation-requests': <CheckCircleOutlined />,
  'training-reports': <FileSearchOutlined />,
  'team-formations': <TeamIcon />,
  'mes-formations': <BookOutlined />,
  'demande-formation': <FormOutlined />,
  'mes-certifications': <SafetyCertificateOutlined />,
  'evaluations': <AuditOutlined />,
  'formations-proposees': <TrophyOutlined />,
  'reports-globaux': <BarChartOutlined />,
  'global-management': <GlobalOutlined />,
  'system-monitoring': <MonitorOutlined />,
  'clients-management': <UserSwitchOutlined />,
  'system-settings': <BuildOutlined />,
  'profile': <UserOutlined />,
  'library': <FileTextOutlined />,
  'certifications': <SafetyCertificateOutlined />,
  'history': <ClockCircleOutlined />
};

function Sidenav({ color, collapsed, onCollapse }) {
  const { pathname } = useLocation();
  const user = useSelector(selectUser);
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [hoveredKey, setHoveredKey] = useState(null);

  useEffect(() => {
    let page = "";
    if (pathname === "/dashboard") page = "dashboard";
    else if (pathname.startsWith("/dashboard/")) page = pathname.substring("/dashboard/".length);
    else page = pathname.replace("/", "");
    setSelectedKey(page);
  }, [pathname]);

  // Get role-based menu items
  const roleMenu = getRoleMenu(user?.role) || [];
  
  // Convert role menu to Ant Design menu items
  const menuItems = roleMenu.map(item => ({
    key: item.key,
    icon: iconMap[item.key] || <DashboardOutlined />,
    label: (
      <NavLink to={item.path} className="menu-item-content">
        <span className="menu-icon">{iconMap[item.key] || <DashboardOutlined />}</span>
        {!collapsed && <span className="menu-label">{item.label}</span>}
      </NavLink>
    ),
    className: `menu-item-${item.key}`
  }));

  // Add common items (profile, settings) if user exists
  if (user) {
    menuItems.push(
      { type: "divider", className: "menu-divider" },
      {
        key: "profile",
        icon: <UserOutlined />,
        label: (
          <NavLink to="/dashboard/profile" className="menu-item-content">
            <span className="menu-icon"><UserOutlined /></span>
            {!collapsed && <span className="menu-label">Mon Profil</span>}
          </NavLink>
        ),
        className: "menu-item-profile"
      },
      {
        key: "settings",
        icon: <SettingOutlined />,
        label: (
          <NavLink to="/dashboard/settings" className="menu-item-content">
            <span className="menu-icon"><SettingOutlined /></span>
            {!collapsed && <span className="menu-label">Paramètres</span>}
          </NavLink>
        ),
        className: "menu-item-settings"
      }
    );
  }

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
  };

  const handleMouseEnter = (key) => {
    setHoveredKey(key);
  };

  const handleMouseLeave = () => {
    setHoveredKey(null);
  };

  return (
    <div className={`ehc-sidenav ${collapsed ? 'collapsed' : ''}`}>
      {/* Enhanced Brand Section */}
      <div className="brand-section">
        <div className="brand-logo">
          <img src={logo} alt="EHC" className="logo-image" />
          {!collapsed && (
            <div className="brand-text">
              <h3 className="brand-title">EHC Training Hub</h3>
              <p className="brand-subtitle">Plateforme de Formation</p>
              {user && (
                <div className="user-role-badge" style={{ 
                  background: getRoleColor(user.role),
                  color: '#fff',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '600',
                  marginTop: '4px'
                }}>
                  {getRoleDisplayName(user.role)}
                </div>
              )}
            </div>
          )}
        </div>
        <Button
          type="text"
          icon={collapsed ? <HomeOutlined /> : <HomeOutlined />}
          onClick={onCollapse}
          className="collapse-btn"
          size="small"
        />
      </div>

      <hr className="brand-divider" />

      {/* Enhanced Menu */}
      <div className="menu-container">
        <Menu 
          theme="light" 
          mode="inline" 
          items={menuItems}
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="ehc-menu"
          style={{ 
            border: "none",
            background: "transparent"
          }}
        />
      </div>

      {/* Enhanced Footer */}
      <div className="aside-footer">
        <div
          className="footer-box"
          style={{
            background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
            borderRadius: "12px",
            padding: "20px",
            margin: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
          }}
        >
          <div className="footer-content">
            <span className="icon" style={{ color: "#fff", fontSize: "24px" }}>
              <FileTextOutlined />
            </span>
            <h6 style={{ color: "#fff", margin: "8px 0 4px 0" }}>Besoin d'Aide ?</h6>
            <p style={{ color: "#fff", fontSize: "12px", margin: "0 0 16px 0" }}>
              Consultez notre documentation
            </p>
            <Button 
              type="primary" 
              className="ant-btn-sm ant-btn-block"
              style={{
                background: "#fff",
                color: color,
                border: "none",
                borderRadius: "8px",
                fontWeight: "600"
              }}
            >
              DOCUMENTATION
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidenav;