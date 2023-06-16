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
      <Dialog.Message spacing="md">
        <h3>
          <Translate id="successResetPaymentPassword" />
        </h3>
      </Dialog.Message>

      <Dialog.Footer
        closeDialog={callback ? closeDialog : undefined}
        cancelText={callback ? <Translate id="close" /> : undefined}
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
