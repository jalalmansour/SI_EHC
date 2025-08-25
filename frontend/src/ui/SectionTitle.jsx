const SectionTitle = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-4xl font-bold text-gray-900 mb-3">{title}</h2>
    {subtitle && <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
)

export default SectionTitle


