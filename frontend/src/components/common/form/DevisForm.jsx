import { memo } from 'react'
import { Controller } from 'react-hook-form'
import { Form, Input, Select, DatePicker } from 'antd'
import moment from 'moment'

const { Option } = Select

function DevisForm({ control, errors, onSubmit }) {
  return (
    <Form layout="vertical" onFinish={onSubmit} size="medium" className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-2 responsive-grid">
        <Form.Item label="Entreprise" validateStatus={errors.companyName ? 'error' : ''} help={errors.companyName?.message} className="col-span-1 md:col-span-2">
          <Controller 
            name="companyName" 
            control={control} 
            render={({ field }) => (
              <Input 
                {...field} 
                size="large" 
                placeholder="EHC Groupe" 
                className="w-full rounded-lg border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-colors duration-200 enhanced-input"
              />
            )} 
          />
        </Form.Item>
        
        <Form.Item label="Contact" validateStatus={errors.contactName ? 'error' : ''} help={errors.contactName?.message}>
          <Controller 
            name="contactName" 
            control={control} 
            render={({ field }) => (
              <Input 
                {...field} 
                size="large" 
                placeholder="Prénom Nom" 
                className="w-full rounded-lg border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-colors duration-200 enhanced-input"
              />
            )} 
          />
        </Form.Item>
        
        <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
          <Controller 
            name="email" 
            control={control} 
            render={({ field }) => (
              <Input 
                {...field} 
                size="large" 
                placeholder="contact@entreprise.com" 
                className="w-full rounded-lg border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-colors duration-200 enhanced-input"
              />
            )} 
          />
        </Form.Item>
        
        <Form.Item label="Téléphone" validateStatus={errors.phone ? 'error' : ''} help={errors.phone?.message}>
          <Controller 
            name="phone" 
            control={control} 
            render={({ field }) => (
              <Input 
                {...field} 
                size="large" 
                placeholder="+33 6 12 34 56 78" 
                className="w-full rounded-lg border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-colors duration-200 enhanced-input"
              />
            )} 
          />
        </Form.Item>
        
        <Form.Item label="Thématique" validateStatus={errors.trainingTopic ? 'error' : ''} help={errors.trainingTopic?.message} className="col-span-1 md:col-span-2">
          <Controller 
            name="trainingTopic" 
            control={control} 
            render={({ field }) => (
              <Input 
                {...field} 
                size="large" 
                placeholder="Leadership, Excel, Sécurité..." 
                className="w-full rounded-lg border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-colors duration-200 enhanced-input"
              />
            )} 
          />
        </Form.Item>
        
        <Form.Item label="Participants" validateStatus={errors.participants ? 'error' : ''} help={errors.participants?.message}>
          <Controller 
            name="participants" 
            control={control} 
            render={({ field }) => (
              <Input 
                {...field} 
                size="large" 
                type="number" 
                min={1} 
                placeholder="Nombre" 
                className="w-full rounded-lg border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-colors duration-200 enhanced-input"
              />
            )} 
          />
        </Form.Item>
        
        <Form.Item label="Mode" validateStatus={errors.preferredMode ? 'error' : ''} help={errors.preferredMode?.message}>
          <Controller
            name="preferredMode"
            control={control}
            render={({ field }) => (
              <Select 
                {...field} 
                size="large" 
                placeholder="Sélectionner"
                className="w-full rounded-lg enhanced-input"
              >
                <Option value="presentiel">Présentiel</Option>
                <Option value="distanciel">Distanciel</Option>
                <Option value="hybride">Hybride</Option>
              </Select>
            )}
          />
        </Form.Item>
        
        <Form.Item label="Date cible" validateStatus={errors.targetStart ? 'error' : ''} help={errors.targetStart?.message} className="col-span-1 md:col-span-2">
          <Controller
            name="targetStart"
            control={control}
            render={({ field }) => (
              <DatePicker
                value={field.value ? moment(field.value) : null}
                onChange={(d) => field.onChange(d ? d.toDate() : null)}
                size="large"
                style={{ width: '100%' }}
                className="w-full rounded-lg enhanced-input"
                disabledDate={(d) => d && d < moment().startOf('day')}
              />
            )}
          />
        </Form.Item>
        
        <Form.Item label="Notes" className="col-span-1 md:col-span-2">
          <Controller 
            name="notes" 
            control={control} 
            render={({ field }) => (
              <Input.TextArea 
                {...field} 
                rows={3} 
                placeholder="Contexte, objectifs, préférences..." 
                className="w-full rounded-lg border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-colors duration-200 enhanced-input"
              />
            )} 
          />
        </Form.Item>
      </div>
    </Form>
  )
}

export default memo(DevisForm)


