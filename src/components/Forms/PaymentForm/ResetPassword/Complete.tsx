import { Dialog, Translate } from '~/components'

interface CompleteProps {
  closeDialog: () => void
  footerButtons?: React.ReactNode
}

const Complete: React.FC<CompleteProps> = ({
  closeDialog,
  footerButtons,
}) => {
  return (
    <>
      <Dialog.Message spacing="md">
        <h3>
          <Translate id="successResetPaymentPassword" />
        </h3>
      </Dialog.Message>

      <Dialog.Footer>
        {footerButtons
          ? <Dialog.Footer>{footerButtons}</Dialog.Footer>
          : (
            <Dialog.Footer.Button
              bgColor="grey-lighter"
              textColor="black"
              onClick={closeDialog}
            >
              <Translate id="close" />
            </Dialog.Footer.Button>
          )
        }
      </Dialog.Footer>
    </>
  )
}

export default Complete
