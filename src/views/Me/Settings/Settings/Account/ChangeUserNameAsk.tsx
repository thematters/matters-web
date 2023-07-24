import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { Dialog, Translate, useDialogSwitch } from '~/components'

interface AskProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const Ask = ({ children }: AskProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(false)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header title="changeUserName" />

        <Dialog.Message>
          <p>
            <Translate
              zh_hant="您的 Matters ID 僅能永久修改一次，確定要繼續嗎？"
              zh_hans="您的 Matters ID 仅能永久修改一次，确定要继续吗？"
              en="Your Matters ID can only be changed once. Proceed?"
            />
          </p>
        </Dialog.Message>

        <Dialog.Footer
          closeDialog={closeDialog}
          btns={
            <Dialog.RoundedButton
              text={<FormattedMessage defaultMessage="Confirm" />}
              href={PATHS.ME_SETTINGS_CHANGE_USERNAME}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Confirm" />}
              href={PATHS.ME_SETTINGS_CHANGE_USERNAME}
            />
          }
        />
      </Dialog>
    </>
  )
}

export default Ask
