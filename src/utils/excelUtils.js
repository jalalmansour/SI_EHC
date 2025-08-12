import * as XLSX from "xlsx"
import moment from "moment"

// Helper function to validate email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const exportToExcel = (data, filename = "export.xlsx", sheetName = "Data") => {
  try {
    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(data)

    // Auto-size columns
    const colWidths = []
    if (data.length > 0) {
      Object.keys(data[0]).forEach((key, index) => {
        const maxLength = Math.max(key.length, ...data.map((row) => String(row[key] || "").length))
        colWidths[index] = { wch: Math.min(maxLength + 2, 50) }
      })
      worksheet["!cols"] = colWidths
    }

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

    // Write file
    XLSX.writeFile(workbook, filename)
    return true
  } catch (error) {
    console.error("Error exporting to Excel:", error)
    return false
  }
}

export const importFromExcel = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: "array" })

        // Get first worksheet
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]

        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          raw: false,
          dateNF: "DD/MM/YYYY",
        })

        resolve({
          data: jsonData,
          filename: file.name,
          sheetNames: workbook.SheetNames,
          totalRows: jsonData.length,
        })
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => reject(new Error("Error reading file"))
    reader.readAsArrayBuffer(file)
  })
}

export const validateExcelData = (data, requiredFields, customValidators = {}) => {
  const errors = []
  const warnings = []

  if (!data || data.length === 0) {
    errors.push("Le fichier est vide ou ne contient pas de données")
    return { isValid: false, errors, warnings }
  }

  // Check required fields
  const firstRow = data[0]
  const availableFields = Object.keys(firstRow)

  requiredFields.forEach((field) => {
    if (!availableFields.includes(field)) {
      errors.push(`Champ requis manquant: ${field}`)
    }
  })

  // Validate data rows
  data.forEach((row, index) => {
    const rowNumber = index + 2 // Excel row number (header is row 1)

    // Check required fields
    requiredFields.forEach((field) => {
      if (!row[field] || row[field].toString().trim() === "") {
        errors.push(`Ligne ${rowNumber}: ${field} est requis`)
      }
    })

    // Email validation
    if (row.Email && !isValidEmail(row.Email)) {
      errors.push(`Ligne ${rowNumber}: Email invalide (${row.Email})`)
    }

    // Numeric validations
    const numericFields = ["Durée (heures)", "Participants max", "Coût (DHS)", "Budget alloué (€)"]
    numericFields.forEach((field) => {
      if (row[field] && isNaN(Number(row[field]))) {
        errors.push(`Ligne ${rowNumber}: ${field} doit être un nombre`)
      }
    })

    // Date validations
    const dateFields = ["Date début", "Date fin", "Date inscription"]
    dateFields.forEach((field) => {
      if (row[field] && !moment(row[field], ["DD/MM/YYYY", "YYYY-MM-DD"], true).isValid()) {
        warnings.push(`Ligne ${rowNumber}: Format de date invalide pour ${field} (${row[field]})`)
      }
    })

    // Custom validations
    Object.keys(customValidators).forEach((field) => {
      if (row[field]) {
        const validator = customValidators[field]
        const result = validator(row[field], row, rowNumber)
        if (result !== true) {
          errors.push(`Ligne ${rowNumber}: ${result}`)
        }
      }
    })
  })

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    validRowCount: data.length - errors.filter((e) => e.includes("Ligne")).length,
    totalRowCount: data.length,
  }
}

export const generateTrainingTemplate = () => {
  return [
    {
      Titre: "Formation Leadership Avancé",
      Description: "Formation intensive sur les techniques de leadership moderne",
      Catégorie: "Management",
      Type: "PLANNED",
      "Durée (heures)": 16,
      "Participants max": 12,
      "Coût (DHS)": 15000,
      Prestataire: "FormaPro",
      Externe: "OUI",
      Prérequis: "Expérience managériale 2 ans",
      Objectifs: "Développer les compétences de leadership, Améliorer la communication",
      "Public cible": "Managers, Team Leaders",
      Compétences: "Leadership, Communication, Gestion équipe",
    },
    {
      Titre: "Formation Java Avancé",
      Description: "Développement Java avec Spring Boot et microservices",
      Catégorie: "Technique",
      Type: "PLANNED",
      "Durée (heures)": 40,
      "Participants max": 15,
      "Coût (DHS)": 20000,
      Prestataire: "EHC Formation",
      Externe: "NON",
      Prérequis: "Java de base, Programmation orientée objet",
      Objectifs: "Maîtriser Spring Boot, Développer des microservices",
      "Public cible": "Développeurs, Architectes",
      Compétences: "Java, Spring Boot, Microservices",
    },
  ]
}

export const generateParticipantsTemplate = () => {
  return [
    {
      Nom: "Dubois",
      Prénom: "Marie",
      Email: "marie.dubois@company.com",
      Département: "IT",
      Poste: "Développeur Senior",
      Manager: "Pierre Martin",
      Formation: "Formation Leadership Avancé",
      Session: "Session 1",
      "Date inscription": "15/01/2024",
      Statut: "INVITED",
      Téléphone: "+212 6 12 34 56 78",
    },
    {
      Nom: "Benali",
      Prénom: "Ahmed",
      Email: "ahmed.benali@company.com",
      Département: "Commercial",
      Poste: "Chef de Vente",
      Manager: "Sophie Laurent",
      Formation: "Formation Java Avancé",
      Session: "Session 1",
      "Date inscription": "16/01/2024",
      Statut: "CONFIRMED",
      Téléphone: "+212 6 87 65 43 21",
    },
  ]
}

export const generateBudgetTemplate = () => {
  return [
    {
      "Nom Budget": "Budget Formation 2024",
      Période: "ANNUAL",
      "Date début": "01/01/2024",
      "Date fin": "31/12/2024",
      "Montant initial (DHS)": 500000,
      Devise: "DHS",
      "Seuils alerte (%)": "50,75,90",
      Statut: "ACTIVE",
      "Créé par": "RRH Admin",
      "Date création": "01/01/2024",
    },
    {
      "Nom Budget": "Budget Formation 2025-2026",
      Période: "BIENNIAL",
      "Date début": "01/01/2025",
      "Date fin": "31/12/2026",
      "Montant initial (DHS)": 1000000,
      Devise: "DHS",
      "Seuils alerte (%)": "60,80,95",
      Statut: "ACTIVE",
      "Créé par": "RRH Admin",
      "Date création": "15/12/2024",
    },
  ]
}

export const generateOrgChartTemplate = () => {
  return [
    {
      ID: "1",
      Nom: "Martin",
      Prénom: "Pierre",
      Email: "pierre.martin@company.com",
      Poste: "Directeur IT",
      Département: "IT",
      Service: "Direction",
      "Manager ID": "",
      Manager: "",
      Niveau: "1",
      "Date embauche": "01/01/2020",
      Statut: "ACTIF",
      Téléphone: "+212 5 22 33 44 55",
    },
    {
      ID: "2",
      Nom: "Dubois",
      Prénom: "Marie",
      Email: "marie.dubois@company.com",
      Poste: "Développeur Senior",
      Département: "IT",
      Service: "Développement",
      "Manager ID": "1",
      Manager: "Pierre Martin",
      Niveau: "2",
      "Date embauche": "15/03/2021",
      Statut: "ACTIF",
      Téléphone: "+212 6 12 34 56 78",
    },
  ]
}

export const generateEvaluationTemplate = () => {
  return [
    {
      Participant: "Marie Dubois",
      Email: "marie.dubois@company.com",
      Formation: "Formation Leadership Avancé",
      "Type évaluation": "HOT",
      "Date évaluation": "20/01/2024",
      "Score global": 85,
      "Compétence 1": "Leadership",
      "Note compétence 1": 4,
      "Compétence 2": "Communication",
      "Note compétence 2": 4,
      "Compétence 3": "Gestion équipe",
      "Note compétence 3": 3,
      Commentaires: "Très bonne participation, amélioration notable",
      Formateur: "Jean Dupont",
      "Note formateur": 4,
    },
  ]
}

// Export multiple sheets
export const exportMultipleSheets = (sheetsData, filename = "export.xlsx") => {
  try {
    const workbook = XLSX.utils.book_new()

    sheetsData.forEach(({ data, sheetName }) => {
      const worksheet = XLSX.utils.json_to_sheet(data)

      // Auto-size columns
      if (data.length > 0) {
        const colWidths = Object.keys(data[0]).map((key) => {
          const maxLength = Math.max(key.length, ...data.map((row) => String(row[key] || "").length))
          return { wch: Math.min(maxLength + 2, 50) }
        })
        worksheet["!cols"] = colWidths
      }

      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
    })

    XLSX.writeFile(workbook, filename)
    return true
  } catch (error) {
    console.error("Error exporting multiple sheets:", error)
    return false
  }
}

// Import with data transformation
export const importWithTransform = async (file, transformFn) => {
  try {
    const result = await importFromExcel(file)
    const transformedData = result.data.map(transformFn)

    return {
      ...result,
      data: transformedData,
    }
  } catch (error) {
    throw new Error(`Import transformation failed: ${error.message}`)
  }
}

// Generate comprehensive report
export const generateComprehensiveReport = (data) => {
  const sheets = [
    {
      data: data.budgets || [],
      sheetName: "Budgets",
    },
    {
      data: data.trainings || [],
      sheetName: "Formations",
    },
    {
      data: data.participants || [],
      sheetName: "Participants",
    },
    {
      data: data.evaluations || [],
      sheetName: "Évaluations",
    },
  ]

  const filename = `rapport_complet_${moment().format("YYYY-MM-DD_HH-mm")}.xlsx`
  return exportMultipleSheets(sheets, filename)
}

export default {
  exportToExcel,
  importFromExcel,
  validateExcelData,
  generateTrainingTemplate,
  generateParticipantsTemplate,
  generateBudgetTemplate,
  generateOrgChartTemplate,
  generateEvaluationTemplate,
  exportMultipleSheets,
  importWithTransform,
  generateComprehensiveReport,
}
