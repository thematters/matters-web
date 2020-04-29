import { Dialog, Translate } from '~/components'

interface CompleteProps {
  footerButtons?: React.ReactNode
}

const Complete: React.FC<CompleteProps> = ({ footerButtons }) => {
  return (
    <>
      <Dialog.Message>
        <h3>
          <Translate id="successResetPaymentPassword" />
        </h3>
      </Dialog.Message>

      {footerButtons && <Dialog.Footer>{footerButtons}</Dialog.Footer>}
    </>
  )
}

export default Complete
