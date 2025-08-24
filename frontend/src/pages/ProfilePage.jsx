"use client"
// removed dashboard layout
import UserProfileForm from "@/components/forms/user-profile-form"

export default function ProfilePage() {
  // Mock user data - in real app, this would come from authentication context
  const mockUserData = {
    firstName: "Pierre",
    lastName: "Formateur",
    email: "pierre.formateur@ehc.com",
    phone: "+33 1 23 45 67 89",
    address: "123 Rue de la Formation",
    city: "Paris",
    postalCode: "75001",
    country: "france",
    birthDate: "1985-06-15",
    role: "formateur",
    department: "formation",
    position: "Formateur Senior",
    bio: "Formateur expérimenté spécialisé dans les technologies web et la gestion de projet. Passionné par la transmission de connaissances et l'accompagnement des équipes.",
    avatar: "",
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
  }

  const handleSave = async (data) => {
    // In real app, this would make an API call to update user profile
    console.log("Saving profile data:", data)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return (
    <DashboardLayout userRole="formateur" userName="Pierre Formateur">
      <UserProfileForm initialData={mockUserData} onSave={handleSave} readonly={true} />
    </DashboardLayout>
  )
}
