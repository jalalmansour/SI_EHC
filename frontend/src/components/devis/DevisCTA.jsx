import { memo } from 'react'
import { Button } from 'antd'

function DevisCTA({ onClick, loading }) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button type="primary" htmlType="submit" size="large" loading={loading} onClick={onClick}>
        Envoyer la demande
      </Button>
      </div>
  )
}

export default memo(DevisCTA)


