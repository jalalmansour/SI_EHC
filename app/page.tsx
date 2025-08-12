"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  Users,
  BarChart,
  ShieldCheck,
  ArrowRight,
  CheckCircle,
  Rocket,
  Clock,
  Lock,
  TrendingUp,
  Star,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function Component() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 md:px-8 lg:px-12">
        <div className="flex items-center space-x-2">
          <Rocket className="h-6 w-6 text-[#6C5CE7]" />
          <span className="text-2xl font-bold text-[#1A202C]">INGÉNIA</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-700 hover:text-[#6C5CE7] font-medium">
            Fonctionnalités
          </a>
          <a href="#actors" className="text-gray-700 hover:text-[#6C5CE7] font-medium">
            Utilisateurs
          </a>
          <a href="#mission" className="text-gray-700 hover:text-[#6C5CE7] font-medium">
            À propos
          </a>
          <Link href="/login">
            <Button variant="outline" className="border-[#6C5CE7] text-[#6C5CE7] hover:bg-[#6C5CE7]/10 bg-transparent">
              Se connecter
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-[#6C5CE7] hover:bg-[#5A4BBF]">Créer un compte</Button>
          </Link>
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 px-4 space-y-4">
          <a href="#features" className="block text-gray-700 hover:text-[#6C5CE7] font-medium">
            Fonctionnalités
          </a>
          <a href="#actors" className="block text-gray-700 hover:text-[#6C5CE7] font-medium">
            Utilisateurs
          </a>
          <a href="#mission" className="block text-gray-700 hover:text-[#6C5CE7] font-medium">
            À propos
          </a>
          <Link href="/login">
            <Button
              variant="outline"
              className="w-full border-[#6C5CE7] text-[#6C5CE7] hover:bg-[#6C5CE7]/10 bg-transparent"
            >
              Se connecter
            </Button>
          </Link>
          <Link href="/register">
            <Button className="w-full bg-[#6C5CE7] hover:bg-[#5A4BBF]">Créer un compte</Button>
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative px-4 py-12 md:py-20 lg:py-24 md:px-8 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="lg:w-1/2 text-center lg:text-left">
          <p className="text-lg font-semibold text-[#6C5CE7] mb-2 flex items-center justify-center lg:justify-start">
            <Rocket className="h-5 w-5 mr-2" /> Plateforme nouvelle génération
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            L&apos;ingénierie de <span className="text-[#6C5CE7]">formation</span> réinventée
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto lg:mx-0">
            INGÉNIA révolutionne la gestion de la formation en entreprise avec une approche complète : planifier, former
            et évaluer en toute simplicité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
            <Link href="/register">
              <Button className="bg-[#6C5CE7] hover:bg-[#5A4BBF] text-white px-6 py-3 rounded-lg text-lg flex items-center">
                Créer mon compte <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-3 rounded-lg text-lg bg-transparent"
            >
              Démo gratuite
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-[#6C5CE7]">500+</p>
              <p className="text-gray-600">Formations</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#6C5CE7]">10K+</p>
              <p className="text-gray-600">Participants</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#6C5CE7]">98%</p>
              <p className="text-gray-600">Satisfaction</p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 relative flex justify-center lg:justify-end">
          <div className="w-full max-w-md h-80 md:h-96 bg-white rounded-xl shadow-lg flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=384&width=512"
              alt="Placeholder illustration"
              width={512}
              height={384}
              className="rounded-xl object-cover"
            />
          </div>
          <Card className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-0 p-4 shadow-md flex items-center space-x-2">
            <span className="h-3 w-3 rounded-full bg-green-500" />
            <div>
              <p className="font-semibold text-sm">127 formations actives</p>
              <p className="text-xs text-gray-500">En temps réel</p>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-12 md:py-20 lg:py-24 md:px-8 lg:px-12 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Une plateforme complète pour tous vos besoins</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            De l&apos;analyse des besoins à l&apos;évaluation des résultats, INGÉNIA couvre l&apos;intégralité du cycle
            de formation avec des outils innovants et intuitifs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6 text-center flex flex-col items-center">
            <div className="bg-[#E0E7FF] p-3 rounded-full mb-4">
              <BookOpen className="h-8 w-8 text-[#6C5CE7]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Catalogue de Formation</h3>
            <p className="text-gray-600">
              Gestion centralisée de votre catalogue avec recherche avancée et recommandations personnalisées.
            </p>
          </Card>
          <Card className="p-6 text-center flex flex-col items-center">
            <div className="bg-[#E0E7FF] p-3 rounded-full mb-4">
              <CalendarDays className="h-8 w-8 text-[#6C5CE7]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Planification Intelligente</h3>
            <p className="text-gray-600">
              Optimisation automatique des plannings avec gestion des conflits et notifications en temps réel.
            </p>
          </Card>
          <Card className="p-6 text-center flex flex-col items-center">
            <div className="bg-[#E0E7FF] p-3 rounded-full mb-4">
              <ClipboardCheck className="h-8 w-8 text-[#6C5CE7]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Évaluations Complètes</h3>
            <p className="text-gray-600">
              Évaluations à chaud et à froid avec analyses statistiques et rapports détaillés.
            </p>
          </Card>
          <Card className="p-6 text-center flex flex-col items-center">
            <div className="bg-[#E0E7FF] p-3 rounded-full mb-4">
              <Users className="h-8 w-8 text-[#6C5CE7]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Gestion Multi-acteurs</h3>
            <p className="text-gray-600">
              Rôles et permissions adaptés à chaque profil : employés, managers, formateurs, RH.
            </p>
          </Card>
          <Card className="p-6 text-center flex flex-col items-center">
            <div className="bg-[#E0E7FF] p-3 rounded-full mb-4">
              <BarChart className="h-8 w-8 text-[#6C5CE7]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Suivi des Compétences</h3>
            <p className="text-gray-600">
              Cartographie des compétences et suivi des progressions individuelles et collectives.
            </p>
          </Card>
          <Card className="p-6 text-center flex flex-col items-center">
            <div className="bg-[#E0E7FF] p-3 rounded-full mb-4">
              <ShieldCheck className="h-8 w-8 text-[#6C5CE7]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Conformité & Sécurité</h3>
            <p className="text-gray-600">
              Respect des normes RGPD avec traçabilité complète et sécurisation des données.
            </p>
          </Card>
        </div>
      </section>

      {/* Actors Section */}
      <section id="actors" className="px-4 py-12 md:py-20 lg:py-24 md:px-8 lg:px-12 bg-[#F8FAFC]">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Conçu pour tous les acteurs de la formation</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Chaque profil dispose d&apos;un espace personnalisé avec les fonctionnalités adaptées à ses besoins
            spécifiques.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Employés</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Accès aux formations, suivi des progressions,
                évaluations
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Catalogue personnalisé
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Planning individuel
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Évaluations
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Certificats
              </li>
            </ul>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Managers</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Gestion des équipes, validation des demandes,
                reporting
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Validation formations
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Suivi équipes
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Budgets
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Rapports RH
              </li>
            </ul>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Formateurs</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Animation des sessions, évaluations, gestion du
                contenu
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Planning sessions
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Évaluations participants
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Ressources
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Feedback
              </li>
            </ul>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Responsables</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Pilotage stratégique, analyses, optimisation des
                parcours
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Tableaux de bord
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Analytics avancés
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> ROI formation
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Stratégie
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Mission / Why Choose Us Section */}
      <section
        id="mission"
        className="px-4 py-12 md:py-20 lg:py-24 md:px-8 lg:px-12 bg-white flex flex-col lg:flex-row items-center gap-12"
      >
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Notre Mission <br /> L&apos;excellence en ingénierie de formation
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            INGÉNIA est née de la conviction que la formation est le levier principal de la performance
            organisationnelle. Notre plateforme accompagne les entreprises dans leur transformation en optimisant chaque
            étape du processus de formation.
          </p>
          <h3 className="text-2xl font-semibold mb-4">Pourquoi choisir INGÉNIA ?</h3>
          <ul className="space-y-3 text-gray-700 text-lg">
            <li className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" /> Interface intuitive et moderne
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" /> Intégration avec vos outils existants
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" /> Support technique réactif 24/7
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" /> Conformité RGPD garantie
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" /> Mises à jour régulières incluses
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" /> Formation des utilisateurs offerte
            </li>
          </ul>
        </div>
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start">
          <h3 className="text-2xl font-semibold mb-8 text-center lg:text-left">Nos 3 piliers fondamentaux :</h3>
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="bg-[#6C5CE7] text-white rounded-full h-16 w-16 flex items-center justify-center text-3xl font-bold">
                P
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-1">Planifier</h4>
                <p className="text-gray-600">
                  Analyse des besoins, conception des parcours et optimisation des ressources
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="bg-[#6C5CE7] text-white rounded-full h-16 w-16 flex items-center justify-center text-3xl font-bold">
                F
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-1">Former</h4>
                <p className="text-gray-600">
                  Déploiement des formations avec suivi en temps réel et adaptation continue
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="bg-[#6C5CE7] text-white rounded-full h-16 w-16 flex items-center justify-center text-3xl font-bold">
                E
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-1">Évaluer</h4>
                <p className="text-gray-600">
                  Mesure de l&apos;efficacité et de l&apos;impact sur la performance organisationnelle
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 mt-12 text-center lg:text-left">
            <div>
              <p className="text-4xl font-bold text-[#6C5CE7]">15+</p>
              <p className="text-gray-600">Années d&apos;expertise</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#6C5CE7]">200+</p>
              <p className="text-gray-600">Entreprises clientes</p>
            </div>
          </div>
          <Link href="/register">
            <Button className="bg-[#6C5CE7] hover:bg-[#5A4BBF] text-white px-8 py-4 rounded-lg text-lg mt-12">
              Découvrir INGÉNIA
            </Button>
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-12 md:py-20 lg:py-24 md:px-8 lg:px-12 bg-[#F8FAFC]">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Les bénéfices concrets d&apos;INGÉNIA</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Transformez votre approche de la formation et obtenez des résultats mesurables dès les premiers mois
            d&apos;utilisation.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 text-center flex flex-col items-center">
            <div className="bg-[#E0E7FF] p-3 rounded-full mb-4">
              <Clock className="h-8 w-8 text-[#6C5CE7]" />
            </div>
            <h3 className="text-4xl font-bold text-[#6C5CE7] mb-2">75%</h3>
            <h4 className="text-xl font-semibold mb-2">Gain de temps</h4>
            <p className="text-gray-600">
              Réduction du temps administratif grâce à l&apos;automatisation des processus
            </p>
          </Card>
          <Card className="p-6 text-center flex flex-col items-center">
            <div className="bg-[#E0E7FF] p-3 rounded-full mb-4">
              <Lock className="h-8 w-8 text-[#6C5CE7]" />
            </div>
            <h3 className="text-4xl font-bold text-[#6C5CE7] mb-2">100%</h3>
            <h4 className="text-xl font-semibold mb-2">Sécurité renforcée</h4>
            <p className="text-gray-600">Conformité RGPD et sécurisation complète de vos données sensibles</p>
          </Card>
          <Card className="p-6 text-center flex flex-col items-center">
            <div className="bg-[#E0E7FF] p-3 rounded-full mb-4">
              <TrendingUp className="h-8 w-8 text-[#6C5CE7]" />
            </div>
            <h3 className="text-4xl font-bold text-[#6C5CE7] mb-2">+40%</h3>
            <h4 className="text-xl font-semibold mb-2">ROI formation</h4>
            <p className="text-gray-600">Amélioration mesurable du retour sur investissement formation</p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12 md:py-20 lg:py-24 md:px-8 lg:px-12 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à révolutionner votre formation ?</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
          Rejoignez les centaines d&apos;entreprises qui font confiance à INGÉNIA pour optimiser leur stratégie de
          formation et développer les compétences de leurs équipes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Link href="/register">
            <Button className="bg-[#6C5CE7] hover:bg-[#5A4BBF] text-white px-8 py-4 rounded-lg text-lg">
              Commencer gratuitement
            </Button>
          </Link>
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg bg-transparent"
          >
            Voir la démo
          </Button>
        </div>
        <p className="text-gray-600 flex items-center justify-center">
          <Star className="h-5 w-5 text-yellow-400 mr-2 fill-yellow-400" />
          4.9/5 - Plus de 1000 avis clients
        </p>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 md:py-16 lg:py-20 md:px-8 lg:px-12 bg-gray-800 text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Rocket className="h-6 w-6 text-[#6C5CE7]" />
              <span className="text-2xl font-bold text-white">INGÉNIA</span>
            </div>
            <p className="text-gray-400">
              La plateforme de référence pour l&apos;ingénierie de formation en entreprise. Planifiez, formez et évaluez
              avec excellence.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Produit</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Ingénierie de Formation
                </a>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-white">
                  Fonctionnalités
                </a>
              </li>
              <li>
                <a href="#actors" className="text-gray-400 hover:text-white">
                  Utilisateurs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Tarifs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Intégrations
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Entreprise</h3>
            <ul className="space-y-2">
              <li>
                <a href="#mission" className="text-gray-400 hover:text-white">
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Carrières
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Partenaires
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Presse
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Centre d&apos;aide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Démo
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Statut
                </a>
              </li>
              <li>
                <Link href="/register" className="text-gray-400 hover:text-white">
                  Créer un compte
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-500 text-sm">
          <p>© 2024 INGÉNIA. Tous droits réservés.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-white">
              Mentions légales
            </a>
            <a href="#" className="hover:text-white">
              Confidentialité
            </a>
            <a href="#" className="hover:text-white">
              Cookies
            </a>
            <a href="#" className="hover:text-white">
              CGU
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
