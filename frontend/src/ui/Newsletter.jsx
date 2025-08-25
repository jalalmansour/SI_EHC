const Newsletter = () => (
  <form className="flex flex-col sm:flex-row gap-3">
    <input type="email" required placeholder="Votre email" className="h-12 px-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500" />
    <button type="submit" className="h-12 px-6 rounded-lg bg-blue-600 text-white font-semibold">S’inscrire</button>
  </form>
)

export default Newsletter


