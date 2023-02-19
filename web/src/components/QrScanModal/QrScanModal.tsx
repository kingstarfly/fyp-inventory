import { Checkbox, Modal, ModalProps } from '@mantine/core'
import { QrReader } from 'react-qr-reader'

import { navigate, routes } from '@redwoodjs/router'

interface Props extends ModalProps {}

const QrScanModal = ({ opened, onClose }: Props) => {
  return (
    <Modal opened={opened} onClose={onClose} title="Scan QR Code">
      <QrReader
        onResult={(result, error) => {
          if (result) {
            navigate(routes.item({ id: result.getText() }))
          }

          if (error) {
            console.info('Unable to read QR code:', error.message)
          }
        }}
        constraints={{ facingMode: ['environment', 'user'] }}
      />
    </Modal>
  )
}

export default QrScanModal
