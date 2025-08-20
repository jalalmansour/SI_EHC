import { Modal as AntModal } from "antd"

const Modal = ({ title, children, visible, onOk, onCancel, width = 520, footer = null, className = "", ...props }) => {
  return (
    <AntModal
      title={title}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={width}
      footer={footer}
      className={`${className}`}
      {...props}
    >
      {children}
    </AntModal>
  )
}

export default Modal