"use client"
import { Card, Progress, Tag, Button } from "antd"
import { DollarOutlined, AlertOutlined } from "@ant-design/icons"

const BudgetWidget = ({
  title = "Budget Formation",
  totalBudget = 100000,
  usedBudget = 65000,
  departments = [],
  onViewDetails,
  loading = false,
}) => {
  const usagePercentage = Math.round((usedBudget / totalBudget) * 100)
  const remainingBudget = totalBudget - usedBudget

  const getStatusColor = (percentage) => {
    if (percentage >= 90) return "red"
    if (percentage >= 75) return "orange"
    return "green"
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(amount)
  }

  return (
    <Card
      title={
        <div className="flex items-center space-x-2">
          <DollarOutlined className="text-green-600" />
          <span>{title}</span>
        </div>
      }
      extra={
        <Button type="link" onClick={onViewDetails} size="small">
          Voir détails
        </Button>
      }
      className="h-full shadow-lg hover:shadow-xl transition-all duration-300"
      loading={loading}
    >
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Budget Total</span>
            <span className="font-bold text-lg">{formatCurrency(totalBudget)}</span>
          </div>

          <Progress
            percent={usagePercentage}
            strokeColor={{ "0%": "#10b981", "75%": "#f59e0b", "90%": "#ef4444" }}
            className="mb-2"
          />

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Utilisé: {formatCurrency(usedBudget)}</span>
            <span className={`font-medium ${remainingBudget > 0 ? "text-green-600" : "text-red-600"}`}>
              Restant: {formatCurrency(remainingBudget)}
            </span>
          </div>
        </div>

        {usagePercentage >= 75 && (
          <div className={`flex items-center space-x-2 p-3 rounded-lg ${usagePercentage >= 90 ? "bg-red-50 text-red-700" : "bg-orange-50 text-orange-700"}`}>
            <AlertOutlined />
            <span className="text-sm font-medium">
              {usagePercentage >= 90 ? "Budget critique - Action requise" : "Attention - Budget bientôt épuisé"}
            </span>
          </div>
        )}

        {departments.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Répartition par Département</h4>
            <div className="space-y-2">
              {departments.slice(0, 3).map((dept, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{dept.name}</span>
                  <div className="flex items-center space-x-2">
                    <Tag color={getStatusColor(dept.usage)}>{dept.usage}%</Tag>
                    <span className="text-sm font-medium">{formatCurrency(dept.amount)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{departments.length}</div>
            <div className="text-xs text-gray-500">Départements</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{usagePercentage < 100 ? "✓" : "!"}</div>
            <div className="text-xs text-gray-500">{usagePercentage < 100 ? "Dans budget" : "Dépassé"}</div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default BudgetWidget


