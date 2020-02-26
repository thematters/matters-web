import { Dialog, Translate } from '~/components'

interface CompleteProps {
  closeDialog: () => void
}

const Complete = ({ closeDialog }: CompleteProps) => (
  <>
    <Dialog.Header
      title={<Translate id="changeUserName" />}
      close={closeDialog}
      headerHidden
    />

    <Dialog.Message
      headline={<Translate id="changeUserName" />}
      description={<Translate id="successChangeUserName" />}
    />

    <Dialog.Footer>
      <Dialog.Footer.Button
        bgColor="grey-lighter"
        textColor="black"
        onClick={closeDialog}
      >
        <Translate id="close" />
      </Dialog.Footer.Button>
    </Dialog.Footer>
  </>
)

export default Complete
