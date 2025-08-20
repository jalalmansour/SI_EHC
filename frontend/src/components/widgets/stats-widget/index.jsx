import { Card, Statistic } from "antd"
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons"

const StatsWidget = ({ title, value, prefix, suffix, trend, trendValue, color = "blue" }) => {
  const trendIcon = trend === "up" ? <ArrowUpOutlined /> : <ArrowDownOutlined />
  const trendColor = trend === "up" ? "#3f8600" : "#cf1322"

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
      <Statistic title={title} value={value} prefix={prefix} suffix={suffix} valueStyle={{ color: `var(--ant-${color}-6)` }} />
      {trend && (
        <div className="mt-2 flex items-center">
          <span style={{ color: trendColor }} className="flex items-center">
            {trendIcon}
            <span className="ml-1">{trendValue}%</span>
          </span>
          <span className="ml-2 text-gray-500">vs mois dernier</span>
        </div>
      )}
    </Card>
  )
}

export default StatsWidget


