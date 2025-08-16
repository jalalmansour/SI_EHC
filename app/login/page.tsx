"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Eye, EyeOff, Rocket, Mail, Lock, BookOpen, Users2Icon, BarChart, BarChart2, BarChart2Icon, BarChart3, Calendar } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically authenticate with your API
    console.log("Login data:", formData)
    // Redirect to dashboard
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Header */}

        <div className="text-center mb-8 space-y-6">
          <div>
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white rounded-full p-3 shadow-lg">
                <img className="w-20" src="./images/logo.png" alt="Logo" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">SI EHC</h1>
            <p className="text-gray-600">
              SI EHC révolutionne la gestion de la formation en entreprise avec
              une approche complète : planifier, former et évaluer en toute
              simplicité.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="flex items-center space-x-3 p-4 bg-transparent rounded-lg shadow-sm">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold">Catalogue Formation</h3>
                <p className="text-sm text-gray-600">Gestion complète</p>
              </div>
            </Card>
            <Card className="flex items-center space-x-3 p-4 bg-transparent rounded-lg shadow-sm">
              <Calendar className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="font-semibold">Planification</h3>
                <p className="text-sm text-gray-600">Agenda intelligent</p>
              </div>
            </Card>
            <Card className="flex items-center space-x-3 p-4 bg-transparent rounded-lg shadow-sm">
              <BarChart3 className="h-8 w-8 text-[rgb(122,36,189)]" />
              <div>
                <h3 className="font-semibold">Evaluations</h3>
                <p className="text-sm text-gray-600">À chaud et à froid</p>
              </div>
            </Card>
            <Card className="flex items-center space-x-3 p-4 bg-transparent rounded-lg shadow-sm">
              <Users2Icon className="h-8 w-8 text-orange-500" />
              <div>
                <h3 className="font-semibold">Multi-acteurs</h3>
                <p className="text-sm text-gray-600">Rôles définis</p>
              </div>
            </Card>
          </div>
          <Link
            href="/"
            className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Link>
        </div>

        {/* Login Form */}
        <Card className="shadow-xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h1 className="text-center font-bold text-3xl">Connexion</h1>
                <p className="text-sm text-gray-400 text-center">
                  Accédez à votre espace selon votre profil
                </p>
              </div>
              <div>
                <Label htmlFor="email">Email professionnel</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre.email@entreprise.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Votre mot de passe"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        rememberMe: checked as boolean,
                      }))
                    }
                  />
                  <Label htmlFor="rememberMe" className="text-sm">
                    Se souvenir de moi
                  </Label>
                </div>

                <Link
                  href="/forgot-password"
                  className="text-sm text-teal-600 hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-[rgb(13_148_136/1)] hover:bg-[rgb(10,119,110)] text-white py-3"
              >
                Se connecter
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Pas encore de compte ?{" "}
                <Link
                  href="/register"
                  className="text-teal-600 hover:underline font-medium"
                >
                  Demande devis
                </Link>
              </p>
            </div>

            {/* Demo Accounts */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Comptes de démonstration :
              </h3>
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="flex justify-between">
                  <span>Admin:</span>
                  <span className="font-mono">admin@ingenia.fr / demo123</span>
                </div>
                <div className="flex justify-between">
                  <span>RRH:</span>
                  <span className="font-mono">rrh@ingenia.fr / demo123</span>
                </div>
                <div className="flex justify-between">
                  <span>Manager:</span>
                  <span className="font-mono">
                    manager@ingenia.fr / demo123
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Employé:</span>
                  <span className="font-mono">
                    employe@ingenia.fr / demo123
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Besoin d'aide ? Contactez notre support à{" "}
            <a
              href="mailto:support@ingenia.fr"
              className="text-teal-600 hover:underline"
            >
              support@ingenia.fr
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
