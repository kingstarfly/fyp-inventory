import { Checkbox, Modal, ModalProps } from '@mantine/core'
import { QrReader } from 'react-qr-reader'

import { navigate, routes } from '@redwoodjs/router'

interface Props extends ModalProps {}

const QrScanModal = ({ opened, onClose }: Props) => {
  const [isLegacyId, setIsLegacyId] = React.useState(false)
  return (
    <Modal opened={opened} onClose={onClose} title="Scan QR Code">
      <QrReader
        onResult={(result, error) => {
          if (result) {
            const text = result.getText()
            navigate(routes.item({ id: result.getText() }))
          }

          if (error) {
            console.info('Unable to read QR code:', error)
          }
        }}
        constraints={{ facingMode: ['environment', 'user'] }}
      />
      <Checkbox
        label="Legacy ID"
        checked={isLegacyId}
        onChange={(event) => setIsLegacyId(event.currentTarget.checked)}
      />
    </Modal>
  )
}

export default QrScanModal
