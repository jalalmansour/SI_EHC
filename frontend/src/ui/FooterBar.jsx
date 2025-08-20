const FooterBar = () => (
  <footer className="bg-white border-t">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/images/logo.png" alt="EHC" className="h-8 w-auto" />
          <span className="text-gray-600">© {new Date().getFullYear()} EHC. Tous droits réservés.</span>
        </div>
        <div className="text-gray-500 text-sm">Conformité RGPD • Hébergé en UE</div>
      </div>
    </div>
  </footer>
)

export default FooterBar


