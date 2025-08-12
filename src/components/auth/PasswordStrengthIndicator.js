import { Progress, Typography, Space, Tag, Alert } from "antd"
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons"

const { Text } = Typography

const PasswordStrengthIndicator = ({
  password = "",
  validation = null,
  showDetails = true,
  showSuggestions = true,
}) => {
  if (!password && !validation) {
    return null
  }

  const getStrengthColor = (strength) => {
    const colors = {
      "very-weak": "#ff4d4f",
      weak: "#ff7a45",
      medium: "#faad14",
      strong: "#52c41a",
      "very-strong": "#389e0d",
    }
    return colors[strength] || "#d9d9d9"
  }

  const getStrengthText = (strength) => {
    const texts = {
      "very-weak": "Très faible",
      weak: "Faible",
      medium: "Moyen",
      strong: "Fort",
      "very-strong": "Très fort",
    }
    return texts[strength] || "Non évalué"
  }

  const getStrengthIcon = (strength) => {
    if (strength === "very-strong" || strength === "strong") {
      return <CheckCircleOutlined style={{ color: "#52c41a" }} />
    }
    if (strength === "medium") {
      return <ExclamationCircleOutlined style={{ color: "#faad14" }} />
    }
    return <CloseCircleOutlined style={{ color: "#ff4d4f" }} />
  }

  if (!validation) {
    return (
      <div style={{ marginTop: 8 }}>
        <Text type="secondary" style={{ fontSize: 12 }}>
          Saisissez un mot de passe pour voir l'évaluation de sécurité
        </Text>
      </div>
    )
  }

  const { score, strength, errors, warnings, suggestions } = validation

  return (
    <div style={{ marginTop: 8 }}>
      {/* Barre de progression de la force */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
          {getStrengthIcon(strength)}
          <Text
            strong
            style={{
              marginLeft: 8,
              color: getStrengthColor(strength),
              fontSize: 13,
            }}
          >
            Force du mot de passe : {getStrengthText(strength)}
          </Text>
        </div>

        <Progress
          percent={score}
          strokeColor={getStrengthColor(strength)}
          trailColor="#f0f0f0"
          showInfo={false}
          size="small"
          style={{ marginBottom: 8 }}
        />

        <Text type="secondary" style={{ fontSize: 11 }}>
          Score : {score}/100
        </Text>
      </div>

      {/* Erreurs de validation */}
      {errors.length > 0 && (
        <Alert
          message="Exigences non respectées"
          type="error"
          showIcon
          size="small"
          style={{ marginBottom: 8 }}
          description={
            <ul style={{ margin: 0, paddingLeft: 16 }}>
              {errors.map((error, index) => (
                <li key={index} style={{ fontSize: 12 }}>
                  {error}
                </li>
              ))}
            </ul>
          }
        />
      )}

      {/* Avertissements */}
      {warnings.length > 0 && (
        <Alert
          message="Recommandations"
          type="warning"
          showIcon
          size="small"
          style={{ marginBottom: 8 }}
          description={
            <ul style={{ margin: 0, paddingLeft: 16 }}>
              {warnings.map((warning, index) => (
                <li key={index} style={{ fontSize: 12 }}>
                  {warning}
                </li>
              ))}
            </ul>
          }
        />
      )}

      {/* Détails de validation */}
      {showDetails && (
        <div style={{ marginBottom: 8 }}>
          <Space wrap size={[4, 4]}>
            <Tag color={/[a-z]/.test(password) ? "green" : "red"} size="small">
              Minuscules
            </Tag>
            <Tag color={/[A-Z]/.test(password) ? "green" : "red"} size="small">
              Majuscules
            </Tag>
            <Tag color={/\d/.test(password) ? "green" : "red"} size="small">
              Chiffres
            </Tag>
            <Tag color={/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(password) ? "green" : "red"} size="small">
              Spéciaux
            </Tag>
            <Tag color={password.length >= 12 ? "green" : "red"} size="small">
              {password.length} caractères
            </Tag>
          </Space>
        </div>
      )}

      {/* Suggestions d'amélioration */}
      {showSuggestions && suggestions.length > 0 && score < 80 && (
        <Alert
          message="Suggestions d'amélioration"
          type="info"
          showIcon
          size="small"
          icon={<InfoCircleOutlined />}
          description={
            <ul style={{ margin: 0, paddingLeft: 16 }}>
              {suggestions.slice(0, 3).map((suggestion, index) => (
                <li key={index} style={{ fontSize: 12 }}>
                  {suggestion}
                </li>
              ))}
            </ul>
          }
        />
      )}
    </div>
  )
}

export default PasswordStrengthIndicator
