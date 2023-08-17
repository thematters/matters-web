import { FormattedMessage } from 'react-intl'

import { Button } from '~/components'

import styles from './styles.module.css'

export const PasswordResetDialogButton = ({
  gotoResetPassword,
}: {
  gotoResetPassword: () => void
}) => (
  <section className={styles.option}>
    <FormattedMessage
      defaultMessage="Forgot password?"
      description="src/components/Forms/EmailLoginForm/Buttons.tsx"
    />
    <Button aria-haspopup="dialog" onClick={gotoResetPassword}>
      <FormattedMessage
        defaultMessage="Send login code"
        description="src/components/Forms/EmailLoginForm/Buttons.tsx"
      />
    </Button>
  </section>
)

const OtherOptions = ({
  isInPage,
  gotoResetPassword,
}: {
  isInPage: boolean
  gotoResetPassword?: () => any
}) => {
  return (
    <section className={styles.otherOptions}>
      {gotoResetPassword && (
        <PasswordResetDialogButton gotoResetPassword={gotoResetPassword} />
      )}
    </section>
  )
}

export default OtherOptions
