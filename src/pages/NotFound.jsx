"use client"

import { memo } from "react"
import { Result, Button } from "antd"
import { Link } from "react-router-dom"

function NotFoundImpl() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="La page demandée est introuvable."
      extra={
        <Link to="/">
          <Button type="primary">Retour à l'accueil</Button>
        </Link>
      }
    />
  )
}

export default memo(NotFoundImpl)


