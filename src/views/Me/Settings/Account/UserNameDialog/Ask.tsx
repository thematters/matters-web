import { Dialog, Translate } from '~/components'

interface AskProps {
  nextStep: () => void
  closeDialog: () => void
}

const Ask = ({ nextStep, closeDialog }: AskProps) => (
  <>
    <Dialog.Header
      title={<Translate id="changeUserName" />}
      close={closeDialog}
      headerHidden
    />

    <Dialog.Message
      headline={<Translate id="changeUserName" />}
      description={
        <Translate
          zh_hant="您的 Matters ID 僅能永久修改一次，確定要繼續嗎？"
          zh_hans="您的 Matters ID 仅能永久修改一次，确定要继续吗？"
        />
      }
    />

    <Dialog.Footer>
      <Dialog.Footer.Button onClick={nextStep}>
        <Translate id="confirm" />
      </Dialog.Footer.Button>

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

export default Ask
