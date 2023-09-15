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
            description="src/components/Dialogs/BindEmailHintDialog/index.tsx"
          />
        }
      />
      <Dialog.Message>
        <p>
          <FormattedMessage
            defaultMessage="You have not connected your email yet. For security, email is required for top-up."
            description="src/components/Dialogs/BindEmailHintDialog/index.tsx"
          />
        </p>
      </Dialog.Message>
      <Dialog.Footer
        btns={
          <>
            <Dialog.RoundedButton
              text={
                <FormattedMessage
                  defaultMessage="Go to Settings"
                  description="src/components/Dialogs/BindEmailHintDialog/index.tsx"
                />
              }
              onClick={gotoBindEmail}
            />
            <Dialog.RoundedButton
              text={<FormattedMessage defaultMessage="Cancel" />}
              color="greyDarker"
              onClick={closeDialog}
            />
          </>
        }
        smUpBtns={
          <>
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Cancel" />}
              color="greyDarker"
              onClick={closeDialog}
            />
            <Dialog.TextButton
              text={
                <FormattedMessage
                  defaultMessage="Go to Settings"
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
