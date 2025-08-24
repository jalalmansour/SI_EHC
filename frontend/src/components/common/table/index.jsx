import { Table as AntTable } from "antd"

const Table = ({
  columns,
  dataSource,
  loading = false,
  pagination = true,
  rowKey = "id",
  className = "",
  ...props
}) => {
  return (
    <AntTable
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={pagination}
      rowKey={rowKey}
      className={`bg-white rounded-lg shadow-sm ${className}`}
      {...props}
    />
  )
}

export default Table