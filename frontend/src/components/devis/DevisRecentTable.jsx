import { memo } from 'react'
import { Table, Tag } from 'antd'

function DevisRecentTable({ data = [], loading }) {
  const columns = [
    { title: 'Devis', dataIndex: 'quoteNumber', key: 'quoteNumber' },
    { title: 'Client', dataIndex: 'companyName', key: 'companyName' },
    { title: 'Montant', dataIndex: 'amount', key: 'amount', render: (v) => `${Number(v).toLocaleString()} €` },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (s) => {
        const map = { accepted: 'success', pending: 'warning', rejected: 'error' }
        return <Tag color={map[s] || 'default'}>{s}</Tag>
      },
    },
  ]
  return <Table size="small" columns={columns} dataSource={data} loading={loading} pagination={{ pageSize: 5 }} rowKey={(r) => r.quoteNumber} />
}

export default memo(DevisRecentTable)


