import { Modal, ModalProps } from '@mantine/core'
import { QrReader } from 'react-qr-reader'

import { navigate, routes } from '@redwoodjs/router'

interface Props extends ModalProps {}

const QrScanModal = ({ opened, onClose }: Props) => {
  return (
    <Modal opened={opened} onClose={onClose} title="Scan QR Code">
      <QrReader
        onResult={(result, error) => {
          if (result) {
            const text = result.getText()
            navigate(routes.item({ id: parseInt(text) }))
          }

          if (error) {
            console.info(error)
          }
        }}
        constraints={{ facingMode: ['environment', 'user'] }}
      />
    </Modal>
  )
}

export default QrScanModal
