import { useState } from 'react'

import { Dialog, Translate } from '~/components'

import { PATHS } from '~/common/enums'

interface AskProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const Ask = ({ children }: AskProps) => {
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} size="sm" slideIn>
        <Dialog.Header title="changeUserName" close={close} headerHidden />

        <Dialog.Message
          headline="changeUserName"
          description={
            <Translate
              zh_hant="您的 Matters ID 僅能永久修改一次，確定要繼續嗎？"
              zh_hans="您的 Matters ID 仅能永久修改一次，确定要继续吗？"
            />
          }
        />

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
