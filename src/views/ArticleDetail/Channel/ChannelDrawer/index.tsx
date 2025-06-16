import { useState } from 'react'
import { useIntl } from 'react-intl'

import { Drawer } from '~/components'

import Content, { Step } from '../Content'
interface ChannelDrawerProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: (channels: string[]) => Promise<void>
  selectedChannels?: string[]
}

const ChannelDrawer = ({
  isOpen,
  onClose: _onClose,
  onConfirm,
}: ChannelDrawerProps) => {
  const intl = useIntl()
  const [step, setStep] = useState<Step>('select')

  const handleClose = () => {
    setTimeout(() => setStep('select'), 200)
    _onClose()
  }

  return (
    <Drawer isOpen={isOpen} onClose={handleClose}>
      <Drawer.Header
        title={intl.formatMessage({
          defaultMessage: 'Channel suggestion',
          id: 'A4P0al',
        })}
        closeDrawer={handleClose}
        fixedWidth
      />
      <Drawer.Content fixedWidth>
        <Content
          step={step}
          setStep={setStep}
          onClose={handleClose}
          onConfirm={onConfirm}
        />
      </Drawer.Content>
    </Drawer>
  )
}

export default ChannelDrawer
