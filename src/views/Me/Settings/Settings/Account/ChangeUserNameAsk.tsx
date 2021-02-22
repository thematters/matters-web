import { Dialog, Translate, useDialogSwitch } from '~/components'

import { PATHS } from '~/common/enums'

interface AskProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const Ask = ({ children }: AskProps) => {
  const { show, open, close } = useDialogSwitch(false)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={show} onDismiss={close} size="sm">
        <Dialog.Header title="changeUserName" close={close} mode="inner" />

        <Dialog.Message>
          <p>
            <Translate
              zh_hant="您的 Matters ID 僅能永久修改一次，確定要繼續嗎？"
              zh_hans="您的 Matters ID 仅能永久修改一次，确定要继续吗？"
              en="Your Matters ID can only be changed once. Proceed?"
            />
          </p>
        </Dialog.Message>

        <Dialog.Footer>
          <Dialog.Footer.Button href={PATHS.ME_SETTINGS_CHANGE_USERNAME}>
            <Translate id="confirm" />
          </Dialog.Footer.Button>

          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={close}
          >
            <Translate id="close" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

export default Ask
