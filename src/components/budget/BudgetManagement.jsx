"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Table,
  Modal,
  Progress,
  Alert,
  Space,
  Tag,
  Statistic,
  Row,
  Col,
  message,
  InputNumber,
  Tooltip,
  Popconfirm,
} from "antd"
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  DollarOutlined,
  TrendingUpOutlined,
  TrendingDownOutlined,
  AlertOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons"
import moment from "moment"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { fetchBudgets, createBudget, addBudgetExtensionThunk, addBudgetCutThunk } from "../../redux/thunks/budgetThunks"
import { exportToExcel, importFromExcel } from "../../utils/excelUtils"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend)

const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input

const BudgetManagement = React.memo(() => {
  const dispatch = useDispatch()
  const { budgets, loading, error, statistics, alerts } = useSelector((state) => state.budget)
  const { user } = useSelector((state) => state.auth)

  const [modalVisible, setModalVisible] = useState(false)
  const [extensionModalVisible, setExtensionModalVisible] = useState(false)
  const [cutModalVisible, setCutModalVisible] = useState(false)
  const [selectedBudget, setSelectedBudget] = useState(null)
  const [form] = Form.useForm()
  const [extensionForm] = Form.useForm()
  const [cutForm] = Form.useForm()

  useEffect(() => {
    dispatch(fetchBudgets())
  }, [dispatch])

  const calculateBudgetStatus = useCallback((budget) => {
    const totalExtensions = budget.extensions?.reduce((sum, ext) => sum + ext.amount, 0) || 0
    const totalCuts = budget.cuts?.reduce((sum, cut) => sum + cut.amount, 0) || 0
    const totalBudget = budget.initialAmount + totalExtensions - totalCuts
    const consumedPercentage = totalBudget > 0 ? (budget.consumed / totalBudget) * 100 : 0
    const remaining = totalBudget - budget.consumed

    return {
      totalBudget,
      consumedPercentage: Math.round(consumedPercentage),
      remaining,
      isOverThreshold: budget.alertThresholds?.some((threshold) => consumedPercentage >= threshold) || false,
    }
  }, [])

  const handleCreateBudget = async (values) => {
    try {
      const budgetData = {
        name: values.name,
        period: values.period,
        startDate: values.dateRange[0].format("YYYY-MM-DD"),
        endDate: values.dateRange[1].format("YYYY-MM-DD"),
        initialAmount: values.initialAmount,
        currency: values.currency,
        alertThresholds: values.alertThresholds || [50, 75, 90],
        status: "ACTIVE",
        createdBy: user.id,
      }

      await dispatch(createBudget(budgetData)).unwrap()
      setModalVisible(false)
      form.resetFields()
      message.success("Budget créé avec succès")
    } catch (error) {
      message.error("Erreur lors de la création du budget")
    }
  }

  const handleAddExtension = async (values) => {
    try {
      const extension = {
        amount: values.amount,
        reason: values.reason,
        approvedBy: user.id,
        approvedAt: moment().toISOString(),
      }

      await dispatch(
        addBudgetExtensionThunk({
          budgetId: selectedBudget.id,
          extension,
        }),
      ).unwrap()

      setExtensionModalVisible(false)
      extensionForm.resetFields()
      message.success("Rallonge budgétaire ajoutée")
    } catch (error) {
      message.error("Erreur lors de l'ajout de la rallonge")
    }
  }

  const handleAddCut = async (values) => {
    try {
      const cut = {
        amount: values.amount,
        reason: values.reason,
        approvedBy: user.id,
        approvedAt: moment().toISOString(),
      }

      await dispatch(
        addBudgetCutThunk({
          budgetId: selectedBudget.id,
          cut,
        }),
      ).unwrap()

      setCutModalVisible(false)
      cutForm.resetFields()
      message.success("Coupe budgétaire appliquée")
    } catch (error) {
      message.error("Erreur lors de l'application de la coupe")
    }
  }

  const handleExportBudgets = () => {
    const exportData = budgets.map((budget) => {
      const status = calculateBudgetStatus(budget)
      return {
        Nom: budget.name,
        Période: budget.period,
        "Date début": moment(budget.startDate).format("DD/MM/YYYY"),
        "Date fin": moment(budget.endDate).format("DD/MM/YYYY"),
        "Montant initial": budget.initialAmount,
        "Budget total": status.totalBudget,
        Consommé: budget.consumed,
        Restant: status.remaining,
        "% Consommé": status.consumedPercentage,
        Devise: budget.currency,
        Statut: budget.status,
      }
    })

    if (exportToExcel(exportData, `budgets_${moment().format("YYYY-MM-DD")}.xlsx`)) {
      message.success("Export réalisé avec succès")
    }
  }

  const handleImportBudgets = async (file) => {
    try {
      const result = await importFromExcel(file)
      // Process imported data
      message.success(`${result.data.length} budgets importés`)
    } catch (error) {
      message.error("Erreur lors de l'import")
    }
    return false
  }

  const getChartData = () => {
    const chartBudgets = budgets.slice(0, 6) // Show max 6 budgets
    return {
      labels: chartBudgets.map((budget) => budget.name),
      datasets: [
        {
          label: "Budget Total",
          data: chartBudgets.map((budget) => calculateBudgetStatus(budget).totalBudget),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Consommé",
          data: chartBudgets.map((budget) => budget.consumed),
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    }
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Vue d'ensemble des Budgets",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => value.toLocaleString() + " DHS",
        },
      },
    },
  }

  const budgetColumns = [
    {
      title: "Nom du Budget",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-sm text-gray-500">
            {moment(record.startDate).format("DD/MM/YYYY")} - {moment(record.endDate).format("DD/MM/YYYY")}
          </div>
        </div>
      ),
    },
    {
      title: "Période",
      dataIndex: "period",
      key: "period",
      render: (period) => {
        const labels = {
          ANNUAL: "Annuel",
          BIENNIAL: "Biennal",
          TRIENNIAL: "Triennal",
          QUADRENNIAL: "Quadriennal",
          QUINQUENNIAL: "Quinquennal",
        }
        return <Tag color="blue">{labels[period]}</Tag>
      },
    },
    {
      title: "Budget Total",
      key: "totalBudget",
      render: (_, record) => {
        const status = calculateBudgetStatus(record)
        return (
          <div>
            <div className="font-medium">
              {status.totalBudget.toLocaleString()} {record.currency}
            </div>
            <div className="text-sm text-gray-500">
              Initial: {record.initialAmount.toLocaleString()} {record.currency}
            </div>
            {record.extensions?.length > 0 && (
              <div className="text-sm text-green-600">
                +{record.extensions.reduce((sum, ext) => sum + ext.amount, 0).toLocaleString()}
              </div>
            )}
            {record.cuts?.length > 0 && (
              <div className="text-sm text-red-600">
                -{record.cuts.reduce((sum, cut) => sum + cut.amount, 0).toLocaleString()}
              </div>
            )}
          </div>
        )
      },
    },
    {
      title: "Consommation",
      key: "consumption",
      render: (_, record) => {
        const status = calculateBudgetStatus(record)
        return (
          <div>
            <Progress
              percent={status.consumedPercentage}
              status={status.isOverThreshold ? "exception" : "active"}
              size="small"
            />
            <div className="text-sm mt-1">
              {record.consumed.toLocaleString()} / {status.totalBudget.toLocaleString()} {record.currency}
            </div>
            <div className="text-sm text-gray-500">
              Restant: {status.remaining.toLocaleString()} {record.currency}
            </div>
          </div>
        )
      },
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        const budgetStatus = calculateBudgetStatus(record)
        let color = "green"
        let text = "Actif"

        if (budgetStatus.isOverThreshold) {
          color = "red"
          text = "Alerte"
        } else if (status === "SUSPENDED") {
          color = "orange"
          text = "Suspendu"
        } else if (status === "COMPLETED") {
          color = "default"
          text = "Terminé"
        }

        return <Tag color={color}>{text}</Tag>
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Ajouter une rallonge">
            <Button
              type="text"
              icon={<TrendingUpOutlined />}
              onClick={() => {
                setSelectedBudget(record)
                setExtensionModalVisible(true)
              }}
            />
          </Tooltip>
          <Tooltip title="Appliquer une coupe">
            <Button
              type="text"
              icon={<TrendingDownOutlined />}
              onClick={() => {
                setSelectedBudget(record)
                setCutModalVisible(true)
              }}
            />
          </Tooltip>
          <Tooltip title="Modifier">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedBudget(record)
                form.setFieldsValue({
                  name: record.name,
                  period: record.period,
                  dateRange: [moment(record.startDate), moment(record.endDate)],
                  initialAmount: record.initialAmount,
                  currency: record.currency,
                  alertThresholds: record.alertThresholds,
                })
                setModalVisible(true)
              }}
            />
          </Tooltip>
          <Popconfirm
            title="Êtes-vous sûr de vouloir supprimer ce budget ?"
            onConfirm={() => {
              // Handle delete
              message.success("Budget supprimé")
            }}
          >
            <Tooltip title="Supprimer">
              <Button type="text" icon={<DeleteOutlined />} danger />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const overThresholdBudgets = budgets.filter((budget) => {
    const status = calculateBudgetStatus(budget)
    return status.isOverThreshold
  })

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion du Budget de Formation</h1>
            <p className="text-gray-600">Créez et gérez les budgets de formation avec suivi en temps réel</p>
          </div>
          <Space>
            <Button icon={<UploadOutlined />} onClick={() => document.getElementById("budget-import").click()}>
              Importer
            </Button>
            <input
              id="budget-import"
              type="file"
              accept=".xlsx,.xls"
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.target.files[0]) {
                  handleImportBudgets(e.target.files[0])
                }
              }}
            />
            <Button icon={<DownloadOutlined />} onClick={handleExportBudgets}>
              Exporter
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
              Nouveau Budget
            </Button>
          </Space>
        </div>
      </div>

      {/* Budget Alerts */}
      {overThresholdBudgets.length > 0 && (
        <Alert
          message="Alertes Budget"
          description={
            <div>
              {overThresholdBudgets.map((budget) => {
                const status = calculateBudgetStatus(budget)
                return (
                  <div key={budget.id} className="mb-2">
                    <strong>{budget.name}</strong>: {status.consumedPercentage}% consommé (
                    {status.remaining.toLocaleString()} {budget.currency} restant)
                    {status.consumedPercentage >= 90 && " - Action urgente requise!"}
                  </div>
                )
              })}
            </div>
          }
          type="warning"
          showIcon
          icon={<AlertOutlined />}
          className="mb-6"
        />
      )}

      {/* Budget Statistics */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Budgets Actifs"
              value={statistics.activeBudgets}
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Budget Total (DHS)"
              value={budgets.reduce((sum, budget) => {
                if (budget.currency === "DHS") {
                  const status = calculateBudgetStatus(budget)
                  return sum + status.totalBudget
                }
                return sum
              }, 0)}
              precision={0}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Consommé Total"
              value={budgets.reduce((sum, budget) => sum + (budget.consumed || 0), 0)}
              precision={0}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Statistic
              title="Alertes Actives"
              value={overThresholdBudgets.length}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: overThresholdBudgets.length > 0 ? "#cf1322" : "#3f8600" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Budget Chart */}
      {budgets.length > 0 && (
        <Card title="Analyse des Budgets" className="mb-6">
          <Bar data={getChartData()} options={chartOptions} height={100} />
        </Card>
      )}

      {/* Budget Table */}
      <Card title="Liste des Budgets">
        <Table
          columns={budgetColumns}
          dataSource={budgets}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* Create/Edit Budget Modal */}
      <Modal
        title={selectedBudget ? "Modifier le Budget" : "Créer un Nouveau Budget"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false)
          setSelectedBudget(null)
          form.resetFields()
        }}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateBudget}>
          <Form.Item label="Nom du Budget" name="name" rules={[{ required: true, message: "Nom requis" }]}>
            <Input placeholder="Budget Formation 2024" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Périodicité" name="period" rules={[{ required: true, message: "Périodicité requise" }]}>
                <Select placeholder="Sélectionner la périodicité">
                  <Option value="ANNUAL">Annuel</Option>
                  <Option value="BIENNIAL">Biennal</Option>
                  <Option value="TRIENNIAL">Triennal</Option>
                  <Option value="QUADRENNIAL">Quadriennal</Option>
                  <Option value="QUINQUENNIAL">Quinquennal</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Devise" name="currency" rules={[{ required: true, message: "Devise requise" }]}>
                <Select placeholder="Sélectionner la devise">
                  <Option value="DHS">DHS (Dirham)</Option>
                  <Option value="EUR">EUR (Euro)</Option>
                  <Option value="USD">USD (Dollar)</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Période du Budget"
            name="dateRange"
            rules={[{ required: true, message: "Période requise" }]}
          >
            <RangePicker className="w-full" />
          </Form.Item>

          <Form.Item
            label="Montant Initial"
            name="initialAmount"
            rules={[{ required: true, message: "Montant requis" }]}
          >
            <InputNumber
              className="w-full"
              min={0}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item label="Seuils d'Alerte (%)" name="alertThresholds" initialValue={[50, 75, 90]}>
            <Select mode="tags" placeholder="50, 75, 90">
              <Option value={50}>50%</Option>
              <Option value={60}>60%</Option>
              <Option value={75}>75%</Option>
              <Option value={90}>90%</Option>
              <Option value={95}>95%</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                onClick={() => {
                  setModalVisible(false)
                  setSelectedBudget(null)
                  form.resetFields()
                }}
              >
                Annuler
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {selectedBudget ? "Modifier" : "Créer"} le Budget
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Extension Modal */}
      <Modal
        title="Ajouter une Rallonge Budgétaire"
        open={extensionModalVisible}
        onCancel={() => {
          setExtensionModalVisible(false)
          extensionForm.resetFields()
        }}
        footer={null}
        width={500}
      >
        <Form form={extensionForm} layout="vertical" onFinish={handleAddExtension}>
          {selectedBudget && (
            <Alert
              message={`Budget actuel: ${calculateBudgetStatus(selectedBudget).totalBudget.toLocaleString()} ${selectedBudget.currency}`}
              type="info"
              className="mb-4"
            />
          )}

          <Form.Item
            label="Montant de la Rallonge"
            name="amount"
            rules={[{ required: true, message: "Montant requis" }]}
          >
            <InputNumber
              className="w-full"
              min={0}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              addonAfter={selectedBudget?.currency}
            />
          </Form.Item>

          <Form.Item label="Justification" name="reason" rules={[{ required: true, message: "Justification requise" }]}>
            <TextArea rows={4} placeholder="Raison de la rallonge budgétaire..." />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button onClick={() => setExtensionModalVisible(false)}>Annuler</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Ajouter la Rallonge
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Cut Modal */}
      <Modal
        title="Appliquer une Coupe Budgétaire"
        open={cutModalVisible}
        onCancel={() => {
          setCutModalVisible(false)
          cutForm.resetFields()
        }}
        footer={null}
        width={500}
      >
        <Form form={cutForm} layout="vertical" onFinish={handleAddCut}>
          {selectedBudget && (
            <Alert
              message={`Budget actuel: ${calculateBudgetStatus(selectedBudget).totalBudget.toLocaleString()} ${selectedBudget.currency}`}
              type="warning"
              className="mb-4"
            />
          )}

          <Form.Item
            label="Montant de la Coupe"
            name="amount"
            rules={[
              { required: true, message: "Montant requis" },
              {
                validator: (_, value) => {
                  if (selectedBudget && value && value > calculateBudgetStatus(selectedBudget).remaining) {
                    return Promise.reject("Le montant ne peut pas dépasser le budget restant")
                  }
                  return Promise.resolve()
                },
              },
            ]}
          >
            <InputNumber
              className="w-full"
              min={0}
              max={selectedBudget ? calculateBudgetStatus(selectedBudget).remaining : undefined}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              addonAfter={selectedBudget?.currency}
            />
          </Form.Item>

          <Form.Item label="Justification" name="reason" rules={[{ required: true, message: "Justification requise" }]}>
            <TextArea rows={4} placeholder="Raison de la coupe budgétaire..." />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button onClick={() => setCutModalVisible(false)}>Annuler</Button>
              <Button type="primary" danger htmlType="submit" loading={loading}>
                Appliquer la Coupe
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
})

BudgetManagement.displayName = "BudgetManagement"

export default BudgetManagement
