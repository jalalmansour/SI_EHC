import { memo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, Col, Form, Row, Typography, message } from 'antd'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { submitDevisRequest, fetchDevisSummary } from '@/redux/slices/devisSlice.js'
import DevisPublicLayout from '@/components/layouts/devis-layout/index.jsx'
import DevisHero from '@/components/devis/DevisHero.jsx'
import DevisProgress from '@/components/devis/DevisProgress.jsx'
import DevisA11yNote from '@/components/devis/DevisA11yNote.jsx'
import DevisResponsiveTips from '@/components/devis/DevisResponsiveTips.jsx'
import DevisForm from '@/components/common/form/DevisForm.jsx'
import DevisCTA from '@/components/devis/DevisCTA.jsx'

const { Title, Paragraph, Text } = Typography

const schema = z.object({
  companyName: z.string().min(2),
  contactName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  trainingTopic: z.string().min(2),
  participants: z.coerce.number().int().positive(),
  preferredMode: z.enum(['presentiel', 'distanciel', 'hybride']),
  targetStart: z.coerce.date(),
  notes: z.string().optional(),
})

function DemandeDevisInner() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { submitting, lastSubmission, submitError } = useSelector((s) => s.devis)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) })

  useEffect(() => {
    dispatch(fetchDevisSummary())
  }, [dispatch])

  useEffect(() => {
    if (lastSubmission) {
      message.success('Votre demande a été envoyée avec succès')
      reset()
      navigate('/demande-devis/success')
    }
  }, [lastSubmission, reset, navigate])

  useEffect(() => {
    if (submitError) message.error(submitError)
  }, [submitError])

  const onSubmit = (values) => {
    const payload = {
      ...values,
      targetStart: moment(values.targetStart).format('YYYY-MM-DD'),
    }
    dispatch(submitDevisRequest(payload))
  }

  return (
    <DevisPublicLayout>
      <DevisHero />
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={14}>
          <Card bordered style={{ borderRadius: 16 }}>
            <Title level={3} style={{ marginBottom: 16 }}>Demande de devis</Title>
            <Paragraph style={{ color: '#667085' }}>Un conseiller vous contactera sous 24h pour finaliser votre besoin.</Paragraph>
            <div style={{ margin: '12px 0 24px' }}>
              <DevisProgress current={0} />
            </div>

            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
              <DevisForm control={control} errors={errors} />
              <DevisCTA loading={submitting} />
              <DevisA11yNote />
              <DevisResponsiveTips />
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card bordered style={{ borderRadius: 16, background: 'linear-gradient(135deg, #111827 0%, #0B1220 100%)', color: 'white' }}>
            <Title level={4} style={{ color: 'white' }}>Pourquoi EHC Formation ?</Title>
            <ul style={{ lineHeight: 2 }}>
              <li>Catalogue certifié et formateurs experts</li>
              <li>Planification flexible multi-sites et hybride</li>
              <li>Reporting avancé et conformité RH</li>
              <li>Intégrations CRM et SIRH</li>
            </ul>
            <Text type="secondary" style={{ color: '#CBD5E1' }}>Design 2025: micro-interactions, bords adoucis, contrastes maîtrisés.</Text>
          </Card>
        </Col>
      </Row>
    </DevisPublicLayout>
  )
}

export default memo(DemandeDevisInner)


