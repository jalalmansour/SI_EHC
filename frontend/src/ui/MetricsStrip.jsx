const Metric = ({ value, label }) => (
  <div className="text-center">
    <div className="text-2xl font-bold text-gray-900">{value}</div>
    <div className="text-gray-600">{label}</div>
  </div>
)

const MetricsStrip = () => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
    <Metric value="+120" label="Modules" />
    <Metric value="3M+" label="Actions/jour" />
    <Metric value="< 50ms" label="Latence" />
    <Metric value="ISO" label="Certifications" />
  </div>
)

export default MetricsStrip


