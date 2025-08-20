import React from "react"
import { Modal, Input, Typography } from "antd"

const { Text } = Typography

export default function ForgotPasswordModal({ open, onOk, onCancel, defaultEmail, onEmailChange }) {
  return (
    <Modal
      title="Réinitialiser le mot de passe"
      open={open}
      onOk={onOk}
      okText="Envoyer le lien"
      onCancel={onCancel}
    >
      <Text className="text-gray-600">Entrez l'adresse email associée à votre compte. Nous vous enverrons un lien de réinitialisation.</Text>
      <Input
        className="mt-3"
        placeholder="Email"
        type="email"
        defaultValue={defaultEmail}
        onChange={(e) => onEmailChange?.(e.target.value)}
      />
    </Modal>
  )
}


