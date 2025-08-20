import { memo } from 'react'
import { Steps } from 'antd'

function DevisProgress({ current = 0 }) {
  return (
    <Steps
      current={current}
      items={[
        { title: 'Besoin' },
        { title: 'Coordonnées' },
        { title: 'Validation' },
      ]}
      responsive
    />
  )
}

export default memo(DevisProgress)


