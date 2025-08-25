const Step = ({ n, title, body }) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">{n}</div>
    <div>
      <div className="font-semibold text-gray-900">{title}</div>
      <div className="text-gray-600">{body}</div>
    </div>
  </div>
)

const StepsShowcase = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <Step n={1} title="Configurez" body="Paramétrez votre espace en quelques minutes." />
    <Step n={2} title="Déployez" body="Invitez les équipes et créez vos premiers workflows." />
    <Step n={3} title="Analysez" body="Suivez la performance et améliorez en continu." />
  </div>
)

export default StepsShowcase


