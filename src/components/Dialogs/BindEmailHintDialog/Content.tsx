import { FormattedMessage } from 'react-intl'

import { PATHS, URL_ME_SETTINGS } from '~/common/enums'
import { Dialog } from '~/components/Dialog'
import { useRoute } from '~/components/Hook'

interface Props {
  closeDialog: () => void
}

const Content: React.FC<Props> = ({ closeDialog }) => {
  const { router } = useRoute()

  const gotoBindEmail = () => {
    // go to settings page and open setEmailDialog
    router.push(
      PATHS.ME_SETTINGS +
        `?${URL_ME_SETTINGS.OPEN_SET_EMAIL_DIALOG.key}=${URL_ME_SETTINGS.OPEN_SET_EMAIL_DIALOG.value}`
    )
  }

  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage
            defaultMessage="Please connect email"
            id="Me4s4Q"
            description="src/components/Dialogs/BindEmailHintDialog/index.tsx"
          />
        }
      />

      <Dialog.Content>
        <Dialog.Content.Message>
          <p>
            <FormattedMessage
              defaultMessage="You have not connected your email yet. For security, email is required for top-up."
              id="Dq29Hb"
              description="src/components/Dialogs/BindEmailHintDialog/index.tsx"
            />
          </p>
        </Dialog.Content.Message>
      </Dialog.Content>

      <Dialog.Footer
        btns={
          <>
            <Dialog.RoundedButton
              text={
                <FormattedMessage
                  defaultMessage="Go to Settings"
                  id="XfRKZY"
                  description="src/components/Dialogs/BindEmailHintDialog/index.tsx"
                />
              }
              onClick={gotoBindEmail}
            />
            <Dialog.RoundedButton
              text={<FormattedMessage defaultMessage="Cancel" id="47FYwb" />}
              color="greyDarker"
              onClick={closeDialog}
            />
          </>
        }
        smUpBtns={
          <>
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Cancel" id="47FYwb" />}
              color="greyDarker"
              onClick={closeDialog}
            />
            <Dialog.TextButton
              text={
                <FormattedMessage
                  defaultMessage="Go to Settings"
                  id="XfRKZY"
                  description="src/components/Dialogs/BindEmailHintDialog/index.tsx"
                />
              }
              onClick={gotoBindEmail}
            />
          </>
        }
      />
    </>
  )
}

export default Content
