import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import IconTimes from '@/public/static/icons/24px/times.svg'
import { Dialog, Icon, useDialogSwitch } from '~/components'

import Content, { Step } from '../Content'
interface ChannelDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  onConfirm?: (channels: string[]) => Promise<void>
  selectedChannels?: string[]
}

const BaseChannelDialog = ({ children, onConfirm }: ChannelDialogProps) => {
  const [step, setStep] = useState<Step>('select')
  const { show, openDialog, closeDialog: _closeDialog } = useDialogSwitch(true)

  const closeDialog = () => {
    setTimeout(() => setStep('select'), 200)
    _closeDialog()
  }

  return (
    <>
      {children({ openDialog })}
      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <FormattedMessage defaultMessage="Channel suggestion" id="A4P0al" />
          }
          titleLeft
          rightBtn={
            <Dialog.TextButton
              text={<Icon icon={IconTimes} size={24} />}
              color="black"
              onClick={closeDialog}
            />
          }
        />
        <Dialog.Content>
          <Content
            step={step}
            setStep={setStep}
            onClose={closeDialog}
            onConfirm={onConfirm}
          />
        </Dialog.Content>
      </Dialog>
    </>
  )
}

export const ChannelDialog = (props: ChannelDialogProps) => {
  return (
    <Dialog.Lazy mounted={<BaseChannelDialog {...props} />}>
      {({ openDialog }) => <>{props.children({ openDialog })}</>}
    </Dialog.Lazy>
  )
}
