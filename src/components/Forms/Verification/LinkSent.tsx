import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { Dialog, useRoute } from '~/components'

import styles from './styles.module.css'

export const VerificationLinkSent = ({
  purpose,
  closeDialog,
  email,
}: {
  purpose?: 'dialog' | 'page'
  closeDialog?: () => void
  email?: string
}) => {
  const { router } = useRoute()
  const isInPage = purpose === 'page'

  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage
            defaultMessage="Check your inbox"
            description="src/components/Forms/Verification/LinkSent.tsx"
          />
        }
        closeDialog={closeDialog}
        closeText={<FormattedMessage defaultMessage="Close" />}
      />

      <Dialog.Message>
        <p>
          <FormattedMessage
            defaultMessage="The login link has been sent to {email}"
            description="src/components/Forms/Verification/LinkSent.tsx"
            values={{
              email: <span className={styles.email}>{email}</span>,
            }}
          />
        </p>
      </Dialog.Message>

      {closeDialog && (
        <Dialog.Footer
          smUpBtns={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Close" />}
              color="greyDarker"
              onClick={closeDialog}
            />
          }
        />
      )}

      {isInPage && (
        <Dialog.Footer
          smUpBtns={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Enter Matters" />}
              onClick={() => router.push(PATHS.HOME)}
            />
          }
        />
      )}
    </>
  )
}
