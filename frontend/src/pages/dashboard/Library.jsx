"use client"

import { memo } from "react"
import { Row, Col, Card, Input, Empty } from "antd"
import { GlassCard } from "../../ui/GlassCard.jsx"

function LibraryImpl() {
  return (
    <div>
      <Input.Search placeholder="Rechercher une ressource" className="mb-4" allowClear />
      <Row gutter={[16, 16]}>
        {[1, 2, 3, 4].map((i) => (
          <Col xs={24} md={12} lg={6} key={i}>
            <GlassCard title={`Ressource ${i}`}>
              <Card.Meta description="Document de formation" />
            </GlassCard>
          </Col>
        ))}
      </Row>
      <div className="mt-6">
        <Empty description="Plus de contenus bientôt" />
      </div>
    </div>
  )
}

export default memo(LibraryImpl)


