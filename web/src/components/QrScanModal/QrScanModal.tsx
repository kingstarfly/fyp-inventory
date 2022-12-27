import { Checkbox, Modal, ModalProps } from '@mantine/core'
import { QrReader } from 'react-qr-reader'

import { navigate, routes } from '@redwoodjs/router'


// TODO: If legacy ID mode, then use this legacy ID to navigate to find the item ID and then navigate to the item page
interface Props extends ModalProps {}

const QrScanModal = ({ opened, onClose }: Props) => {
  const [isLegacyId, setIsLegacyId] = React.useState(false)
  return (
    <Modal opened={opened} onClose={onClose} title="Scan QR Code">
      <QrReader
        onResult={(result, error) => {
          if (result) {
            const text = result.getText()
            if (isLegacyId) {
              navigate(routes.itemViaLegacyId({ id: text }))
            } else {
              navigate(routes.itemViaId({ id: text }))
            }
          }

          if (error) {
            console.info(error)
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
