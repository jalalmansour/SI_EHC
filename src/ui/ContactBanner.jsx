const ContactBanner = () => (
  <div className="rounded-2xl bg-white border shadow-md p-8 flex flex-col md:flex-row items-center justify-between gap-6">
    <div>
      <div className="text-2xl font-semibold text-gray-900">Parlons de votre projet</div>
      <div className="text-gray-600">Nos experts vous accompagnent dans votre transformation RH</div>
    </div>
    <a href="#contact" className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">Nous contacter</a>
  </div>
)

export default ContactBanner


