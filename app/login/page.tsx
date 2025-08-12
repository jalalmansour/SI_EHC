"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Eye, EyeOff, Rocket, Mail, Lock } from "lucide-react"
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
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Link>

          <div className="flex items-center justify-center mb-4">
            <div className="bg-white rounded-full p-3 shadow-lg">
              <Rocket className="h-8 w-8 text-[#6C5CE7]" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Connexion INGÉNIA</h1>
          <p className="text-gray-600">Accédez à votre plateforme de formation</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email professionnel</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre.email@entreprise.com"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
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
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))}
                  />
                  <Label htmlFor="rememberMe" className="text-sm">
                    Se souvenir de moi
                  </Label>
                </div>

                <Link href="/forgot-password" className="text-sm text-teal-600 hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>

              <Button type="submit" className="w-full bg-[#6C5CE7] hover:bg-[#5A4BBF] text-white py-3">
                Se connecter
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Pas encore de compte ?{" "}
                <Link href="/register" className="text-teal-600 hover:underline font-medium">
                  Créer un compte
                </Link>
              </p>
            </div>

            {/* Demo Accounts */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Comptes de démonstration :</h3>
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
                  <span className="font-mono">manager@ingenia.fr / demo123</span>
                </div>
                <div className="flex justify-between">
                  <span>Employé:</span>
                  <span className="font-mono">employe@ingenia.fr / demo123</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Besoin d'aide ? Contactez notre support à{" "}
            <a href="mailto:support@ingenia.fr" className="text-teal-600 hover:underline">
              support@ingenia.fr
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
