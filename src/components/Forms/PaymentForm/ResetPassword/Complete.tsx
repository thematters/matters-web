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

      <Dialog.Message>
        <h3>
          <Translate id="successResetPaymentPassword" />
        </h3>
      </Dialog.Message>

      <Dialog.Footer
        closeDialog={callback ? undefined : closeDialog}
        closeText={callback ? undefined : 'close'}
        btns={
          callback ? (
            <Dialog.RoundedButton text={callbackText} onClick={callback} />
          ) : null
        }
        smUpBtns={
          callback ? (
            <Dialog.TextButton text={callbackText} onClick={callback} />
          ) : null
        }
      />
    </>
  )
}

export default Complete
