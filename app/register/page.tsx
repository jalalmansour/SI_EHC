"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, User, Briefcase, MapPin, CheckCircle, Rocket } from "lucide-react"
import Link from "next/link"

interface FormData {
  // Personal Info
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string

  // Profile Type
  userType: string

  // Professional Info
  company: string
  department: string
  employeeId: string
  position: string
  experience: string
  address: string
  postalCode: string
  city: string
  country: string

  // Preferences
  notifications: boolean
  newsletter: boolean
  acceptTerms: boolean
}

const steps = [
  { id: 1, title: "Type", icon: User },
  { id: 2, title: "Personnel", icon: User },
  { id: 3, title: "Professionnel", icon: Briefcase },
  { id: 4, title: "Finalisation", icon: CheckCircle },
]

const userTypes = [
  { value: "employee", label: "Employé" },
  { value: "manager", label: "Manager" },
  { value: "trainer", label: "Formateur" },
  { value: "hr", label: "Responsable RH" },
  { value: "rf", label: "Responsable Formation" },
  { value: "consultant", label: "Business Management Consultant" },
]

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "",
    company: "",
    department: "",
    employeeId: "",
    position: "",
    experience: "",
    address: "",
    postalCode: "",
    city: "",
    country: "France",
    notifications: true,
    newsletter: false,
    acceptTerms: false,
  })

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    // Here you would typically send the data to your API
    console.log("Registration data:", formData)
    // Redirect to dashboard or success page
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Link>

          <div className="flex items-center justify-center mb-4">
            <div className="bg-white rounded-full p-3 shadow-lg">
              <img className="w-20" src="./images/logo.png" alt="Logo" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Demander un devis SI EHC
          </h1>
          <p className="text-gray-600">
            Rejoignez la plateforme d'ingénierie de formation
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id
                    ? "bg-teal-600 border-teal-600 text-white"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {currentStep > step.id ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-0.5 mx-2 ${
                    currentStep > step.id ? "bg-teal-600" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center mb-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <span
                className={`text-sm font-medium ${
                  currentStep >= step.id ? "text-teal-600" : "text-gray-400"
                }`}
              >
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <span className="mx-4 text-gray-300">•</span>
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <Card className="shadow-xl">
          <CardContent className="p-8">
            {/* Step 1: User Type Selection */}
            {currentStep === 1 && (
              <div>
                <div className="flex items-center mb-6">
                  <User className="h-5 w-5 text-teal-600 mr-2" />
                  <h2 className="text-xl font-semibold">Sélection du profil</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Choisissez le type de compte qui correspond à votre rôle
                </p>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="userType">Type d'utilisateur *</Label>
                    <Select
                      value={formData.userType}
                      onValueChange={(value) =>
                        updateFormData("userType", value)
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Sélectionnez votre profil" />
                      </SelectTrigger>
                      <SelectContent>
                        {userTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <div>
                <div className="flex items-center mb-6">
                  <User className="h-5 w-5 text-teal-600 mr-2" />
                  <h2 className="text-xl font-semibold">
                    Informations personnelles
                  </h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Renseignez vos informations personnelles et de connexion
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-4 md:space-y-0">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      placeholder="Votre prénom"
                      value={formData.firstName}
                      onChange={(e) =>
                        updateFormData("firstName", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      placeholder="Votre nom"
                      value={formData.lastName}
                      onChange={(e) =>
                        updateFormData("lastName", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="email">Email professionnel *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre.email@entreprise.com"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      placeholder="06 12 34 56 78"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Professional Information */}
            {currentStep === 3 && (
              <div>
                <div className="flex items-center mb-6">
                  <Briefcase className="h-5 w-5 text-teal-600 mr-2" />
                  <h2 className="text-xl font-semibold">
                    Informations professionnelles
                  </h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Complétez vos informations professionnelles
                </p>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="company">Entreprise *</Label>
                    <Input
                      id="company"
                      placeholder="Nom de votre entreprise"
                      value={formData.company}
                      onChange={(e) =>
                        updateFormData("company", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="department">Département/Service</Label>
                      <Input
                        id="department"
                        placeholder="RH, IT, Commercial..."
                        value={formData.department}
                        onChange={(e) =>
                          updateFormData("department", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="employeeId">ID Employé</Label>
                      <Input
                        id="employeeId"
                        placeholder="Identifiant interne"
                        value={formData.employeeId}
                        onChange={(e) =>
                          updateFormData("employeeId", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="position">Poste occupé *</Label>
                    <Input
                      id="position"
                      placeholder="Votre fonction dans l'entreprise"
                      value={formData.position}
                      onChange={(e) =>
                        updateFormData("position", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience">Expérience en formation</Label>
                    <Textarea
                      id="experience"
                      placeholder="Décrivez votre expérience dans le domaine de la formation..."
                      value={formData.experience}
                      onChange={(e) =>
                        updateFormData("experience", e.target.value)
                      }
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center mb-4">
                      <MapPin className="h-4 w-4 text-teal-600 mr-2" />
                      <h3 className="font-medium">Adresse</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">Adresse</Label>
                        <Input
                          id="address"
                          placeholder="Numéro et nom de rue"
                          value={formData.address}
                          onChange={(e) =>
                            updateFormData("address", e.target.value)
                          }
                          className="mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="postalCode">Code postal</Label>
                          <Input
                            id="postalCode"
                            placeholder="75001"
                            value={formData.postalCode}
                            onChange={(e) =>
                              updateFormData("postalCode", e.target.value)
                            }
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="city">Ville</Label>
                          <Input
                            id="city"
                            placeholder="Paris"
                            value={formData.city}
                            onChange={(e) =>
                              updateFormData("city", e.target.value)
                            }
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="country">Pays</Label>
                          <Select
                            value={formData.country}
                            onValueChange={(value) =>
                              updateFormData("country", value)
                            }
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="France">France</SelectItem>
                              <SelectItem value="Belgium">Belgique</SelectItem>
                              <SelectItem value="Switzerland">
                                Suisse
                              </SelectItem>
                              <SelectItem value="Canada">Canada</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Finalization */}
            {currentStep === 4 && (
              <div>
                <div className="flex items-center mb-6">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                  <h2 className="text-xl font-semibold">Finalisation</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Vérifiez vos informations et finalisez votre inscription
                </p>

                <div className="space-y-6">
                  {/* Registration Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium mb-3">
                      Récapitulatif de votre inscription
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Type de compte:</span>
                        <span className="font-medium">
                          {
                            userTypes.find((t) => t.value === formData.userType)
                              ?.label
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Nom complet:</span>
                        <span className="font-medium">
                          {formData.firstName} {formData.lastName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span className="font-medium">{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Entreprise:</span>
                        <span className="font-medium">{formData.company}</span>
                      </div>
                    </div>
                  </div>

                  {/* Communication Preferences */}
                  <div>
                    <h3 className="font-medium mb-3">
                      Préférences de communication
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="notifications"
                          checked={formData.notifications}
                          onCheckedChange={(checked) =>
                            updateFormData("notifications", checked as boolean)
                          }
                        />
                        <Label htmlFor="notifications" className="text-sm">
                          Recevoir les notifications importantes (formations,
                          évaluations, etc.)
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="newsletter"
                          checked={formData.newsletter}
                          onCheckedChange={(checked) =>
                            updateFormData("newsletter", checked as boolean)
                          }
                        />
                        <Label htmlFor="newsletter" className="text-sm">
                          S'abonner à la newsletter INGÉNIA (nouveautés,
                          conseils formation)
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) =>
                        updateFormData("acceptTerms", checked as boolean)
                      }
                      className="mt-1"
                    />
                    <Label htmlFor="acceptTerms" className="text-sm">
                      J'accepte les{" "}
                      <a href="#" className="text-teal-600 hover:underline">
                        conditions d'utilisation
                      </a>{" "}
                      et la{" "}
                      <a href="#" className="text-teal-600 hover:underline">
                        politique de confidentialité
                      </a>{" "}
                      d'INGÉNIA *
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center"
              >
                Précédent
              </Button>

              <div className="flex items-center space-x-4">
                {currentStep < 4 && (
                  <Link
                    href="/login"
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Déjà un compte ?
                  </Link>
                )}

                {currentStep < 4 ? (
                  <Button
                    onClick={nextStep}
                    disabled={
                      (currentStep === 1 && !formData.userType) ||
                      (currentStep === 2 &&
                        (!formData.firstName ||
                          !formData.lastName ||
                          !formData.email ||
                          !formData.password)) ||
                      (currentStep === 3 &&
                        (!formData.company || !formData.position))
                    }
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Suivant
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!formData.acceptTerms}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Créer mon compte
                  </Button>
                )}
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
