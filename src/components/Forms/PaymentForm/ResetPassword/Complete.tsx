import { Dialog, Translate } from '~/components'

interface CompleteProps {
  closeDialog: () => void
  callback?: () => any
  callbackText?: React.ReactNode
}

const Complete: React.FC<CompleteProps> = ({
  closeDialog,
  callback,
  callbackText,
}) => {
  return (
    <>
      <Dialog.Header title="resetPaymentPassword" />

      <Dialog.Message spacing="md">
        <h3>
          <Translate id="successResetPaymentPassword" />
        </h3>
      </Dialog.Message>

      <Dialog.Footer
        closeDialog={callback ? undefined : closeDialog}
        cancelText={callback ? undefined : 'close'}
        btns={
          callback ? (
            <Dialog.RoundedButton
              text={callbackText}
              color="green"
              onClick={callback}
            />
          ) : null
        }
        mdUpBtns={
          callback ? (
            <Dialog.TextButton
              text={callbackText}
              color="green"
              onClick={callback}
            />
          ) : null
        }
      />
    </>
  )
}

export default Complete
