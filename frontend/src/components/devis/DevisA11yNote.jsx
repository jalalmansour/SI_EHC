import { memo } from 'react'
import { Alert } from 'antd'

function DevisA11yNote() {
  return (
    <Alert
      type="info"
      showIcon
      message="Accessibilité"
      description="Chi 7ajaj Bghitu Tziduha hna like ISO certification, CNDP etc..."
      style={{ marginTop: 16 }}
    />
  )
}

export default memo(DevisA11yNote)


