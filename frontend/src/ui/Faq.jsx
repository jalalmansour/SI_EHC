const Faq = () => (
  <div className="space-y-4">
    {[1,2,3,4].map((n) => (
      <details key={n} className="bg-white border rounded-lg p-4 shadow-sm">
        <summary className="cursor-pointer font-medium text-gray-900">Question fréquente #{n}</summary>
        <p className="mt-2 text-gray-600">Réponse concise et utile expliquant le fonctionnement.</p>
      </details>
    ))}
  </div>
)

export default Faq


