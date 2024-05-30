import dynamic from 'next/dynamic'
import { useState } from 'react'

import {
  CLOSE_SET_PAYMENT_PASSWORD_DIALOG,
  OPEN_SET_PAYMENT_PASSWORD_DIALOG,
} from '~/common/enums'
import {
  Dialog,
  SpinnerBlock,
  useDialogSwitch,
  useEventListener,
} from '~/components'

interface SetPaymentPasswordDialogProps {
  submitCallback?: () => void
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <SpinnerBlock />,
})

const BaseSetPaymentPasswordDialog = ({
  submitCallback,
}: SetPaymentPasswordDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  useEventListener(OPEN_SET_PAYMENT_PASSWORD_DIALOG, openDialog)
  useEventListener(CLOSE_SET_PAYMENT_PASSWORD_DIALOG, closeDialog)

  return (
    <>
      <Dialog isOpen={show} onDismiss={closeDialog}>
        <DynamicContent
          closeDialog={closeDialog}
          submitCallback={submitCallback}
        />
      </Dialog>
    </>
  )
}

export const SetPaymentPasswordDialog = (
  props: SetPaymentPasswordDialogProps
) => {
  const [sumbitCallback, setSubmitCallback] = useState<() => void>(
    () => () => {}
  )
  const Children = ({ openDialog }: { openDialog: () => void }) => {
    useEventListener(
      OPEN_SET_PAYMENT_PASSWORD_DIALOG,
      (detail?: { submitCallback: () => void }) => {
        if (detail?.submitCallback) {
          setSubmitCallback(() => detail.submitCallback)
          openDialog()
        }
      }
    )
    return <></>
  }

  return (
    <Dialog.Lazy
      mounted={
        <BaseSetPaymentPasswordDialog
          {...props}
          submitCallback={sumbitCallback}
        />
      }
    >
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}
