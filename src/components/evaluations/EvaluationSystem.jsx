"use client"

import { useState } from "react"
import { Card, Form, Radio, Button, Progress, message, Modal, Rate, Input, Divider, Tag, Space, Alert } from "antd"
import { CheckCircleOutlined, ClockCircleOutlined, StarOutlined } from "@ant-design/icons"

const { TextArea } = Input

const EvaluationSystem = ({ training, type = "hot", onComplete }) => {
  const [form] = Form.useForm()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(false)

  // Mock evaluation questions based on type
  const getQuestions = () => {
    if (type === "hot") {
      return [
        {
          id: 1,
          type: "rating",
          question: "Comment évaluez-vous la qualité du contenu de la formation ?",
          required: true,
        },
        {
          id: 2,
          type: "rating",
          question: "Comment évaluez-vous la pédagogie du formateur ?",
          required: true,
        },
        {
          id: 3,
          type: "mcq",
          question: "Quel aspect de la formation vous a le plus intéressé ?",
          options: [
            "Les concepts théoriques",
            "Les exercices pratiques",
            "Les études de cas",
            "Les échanges avec le groupe",
          ],
          required: true,
        },
        {
          id: 4,
          type: "text",
          question: "Quels sont les points d'amélioration que vous suggérez ?",
          required: false,
        },
        {
          id: 5,
          type: "rating",
          question: "Recommanderiez-vous cette formation à un collègue ?",
          required: true,
        },
      ]
    } else if (type === "cold") {
      return [
        {
          id: 1,
          type: "rating",
          question: "Dans quelle mesure appliquez-vous les compétences acquises dans votre travail quotidien ?",
          required: true,
        },
        {
          id: 2,
          type: "mcq",
          question: "Quel impact la formation a-t-elle eu sur votre performance ?",
          options: ["Impact très positif", "Impact positif", "Impact neutre", "Aucun impact visible"],
          required: true,
        },
        {
          id: 3,
          type: "text",
          question: "Donnez un exemple concret d'application des compétences acquises",
          required: true,
        },
        {
          id: 4,
          type: "rating",
          question: "Votre niveau de confiance dans ce domaine a-t-il augmenté ?",
          required: true,
        },
        {
          id: 5,
          type: "text",
          question: "Quels besoins de formation complémentaire identifiez-vous ?",
          required: false,
        },
      ]
    } else {
      // Competency test
      return [
        {
          id: 1,
          type: "mcq",
          question: "Quelle est la meilleure pratique pour gérer une équipe en télétravail ?",
          options: [
            "Organiser des réunions quotidiennes obligatoires",
            "Définir des objectifs clairs et faire confiance",
            "Surveiller constamment l'activité",
            "Limiter l'autonomie des collaborateurs",
          ],
          correct: 1,
          required: true,
        },
        {
          id: 2,
          type: "mcq",
          question: "Comment résoudre un conflit entre deux membres de l'équipe ?",
          options: [
            "Ignorer le conflit jusqu'à ce qu'il se résolve",
            "Prendre parti pour l'un des deux",
            "Organiser une médiation neutre",
            "Séparer définitivement les deux personnes",
          ],
          correct: 2,
          required: true,
        },
        {
          id: 3,
          type: "practical",
          question: "Décrivez votre approche pour motiver un collaborateur démotivé",
          required: true,
        },
      ]
    }
  }

  const questions = getQuestions()
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleNext = () => {
    const currentQ = questions[currentQuestion]
    if (currentQ.required && !answers[currentQ.id]) {
      message.warning("Cette question est obligatoire")
      return
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)

    try {
      // Calculate score for competency tests
      let score = null
      if (type === "competency") {
        const correctAnswers = questions.filter((q) => q.correct !== undefined && answers[q.id] === q.correct).length
        const totalQuestions = questions.filter((q) => q.correct !== undefined).length
        score = Math.round((correctAnswers / totalQuestions) * 100)
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const evaluationData = {
        trainingId: training.id,
        type,
        answers,
        score,
        completedAt: new Date().toISOString(),
      }

      onComplete?.(evaluationData)

      Modal.success({
        title: "Évaluation terminée",
        content: type === "competency" && score !== null ? `Votre score : ${score}%` : "Merci pour votre retour !",
      })
    } catch (error) {
      message.error("Erreur lors de l'envoi de l'évaluation")
    } finally {
      setLoading(false)
    }
  }

  const renderQuestion = (question) => {
    switch (question.type) {
      case "rating":
        return (
          <div className="text-center">
            <Rate
              count={5}
              value={answers[question.id]}
              onChange={(value) => handleAnswer(question.id, value)}
              style={{ fontSize: "2rem" }}
            />
            <div className="mt-4 text-gray-500">
              {answers[question.id] ? `${answers[question.id]}/5` : "Cliquez pour noter"}
            </div>
          </div>
        )

      case "mcq":
        return (
          <Radio.Group
            value={answers[question.id]}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            className="w-full"
          >
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <Radio key={index} value={index} className="block p-3 border rounded hover:bg-gray-50">
                  {option}
                </Radio>
              ))}
            </div>
          </Radio.Group>
        )

      case "text":
      case "practical":
        return (
          <TextArea
            rows={4}
            value={answers[question.id]}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            placeholder="Votre réponse..."
            showCount
            maxLength={500}
          />
        )

      default:
        return null
    }
  }

  const getEvaluationTitle = () => {
    switch (type) {
      case "hot":
        return "Évaluation à chaud"
      case "cold":
        return "Évaluation à froid"
      case "competency":
        return "Test de compétences"
      default:
        return "Évaluation"
    }
  }

  const getEvaluationDescription = () => {
    switch (type) {
      case "hot":
        return "Évaluez votre satisfaction immédiatement après la formation"
      case "cold":
        return "Évaluez l'impact de la formation sur votre travail quotidien"
      case "competency":
        return "Testez vos compétences acquises lors de la formation"
      default:
        return ""
    }
  }

  const currentQ = questions[currentQuestion]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold flex items-center">
                {type === "hot" && <StarOutlined className="mr-2 text-orange-500" />}
                {type === "cold" && <ClockCircleOutlined className="mr-2 text-blue-500" />}
                {type === "competency" && <CheckCircleOutlined className="mr-2 text-green-500" />}
                {getEvaluationTitle()}
              </h2>
              <p className="text-gray-600">{getEvaluationDescription()}</p>
            </div>
            <Tag color={type === "hot" ? "orange" : type === "cold" ? "blue" : "green"}>{training.title}</Tag>
          </div>

          <Progress
            percent={progress}
            strokeColor={type === "hot" ? "#fa8c16" : type === "cold" ? "#1890ff" : "#52c41a"}
            className="mb-4"
          />

          <div className="text-sm text-gray-500 mb-6">
            Question {currentQuestion + 1} sur {questions.length}
          </div>
        </div>

        {type === "competency" && currentQuestion === 0 && (
          <Alert
            message="Test de compétences"
            description="Ce test évalue vos compétences acquises. Prenez le temps de bien lire chaque question."
            type="info"
            showIcon
            className="mb-6"
          />
        )}

        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">
            {currentQ.question}
            {currentQ.required && <span className="text-red-500 ml-1">*</span>}
          </h3>

          {renderQuestion(currentQ)}
        </div>

        <Divider />

        <div className="flex justify-between">
          <Button onClick={handlePrevious} disabled={currentQuestion === 0}>
            Précédent
          </Button>

          <Space>
            <span className="text-gray-500">
              {Object.keys(answers).length} / {questions.filter((q) => q.required).length} réponses obligatoires
            </span>

            <Button
              type="primary"
              onClick={handleNext}
              loading={loading}
              icon={currentQuestion === questions.length - 1 ? <CheckCircleOutlined /> : undefined}
            >
              {currentQuestion === questions.length - 1 ? "Terminer" : "Suivant"}
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  )
}

export default EvaluationSystem
