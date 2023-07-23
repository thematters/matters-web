import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { appendTarget } from '~/common/utils'
import { Button } from '~/components'

import styles from './styles.module.css'

export const PasswordResetDialogButton = ({
  gotoResetPassword,
}: {
  gotoResetPassword: () => void
}) => (
  <section className={styles.option}>
    <Button aria-haspopup="dialog" onClick={gotoResetPassword}>
      <FormattedMessage
        defaultMessage="Forget Password"
        description="src/components/Forms/EmailLoginForm/Buttons.tsx"
      />
    </Button>
  </section>
)

export const PasswordResetRedirectButton = () => (
  <section className={styles.option}>
    <Button {...appendTarget(PATHS.FORGET)} tabIndex={-1}>
      <FormattedMessage
        defaultMessage="Forget Password"
        description="src/components/Forms/EmailLoginForm/Buttons.tsx"
      />
    </Button>
  </section>
)

export const EmailSignUpDialogButton = ({
  gotoEmailSignUp,
}: {
  gotoEmailSignUp: () => void
}) => (
  <section className={styles.option}>
    <FormattedMessage
      defaultMessage="Not Registered?"
      description="src/components/Forms/EmailLoginForm/Buttons.tsx"
    />

    <Button onClick={gotoEmailSignUp}>
      <FormattedMessage defaultMessage="Register" />
    </Button>
  </section>
)

const OtherOptions = ({
  isInPage,
  gotoResetPassword,
  gotoEmailSignUp,
}: {
  isInPage: boolean
  gotoResetPassword?: () => any
  gotoEmailSignUp?: () => any
}) => {
  return (
    <section className={styles.otherOptions}>
      {!isInPage && gotoResetPassword && (
        <PasswordResetDialogButton gotoResetPassword={gotoResetPassword} />
      )}
      {isInPage && <PasswordResetRedirectButton />}

      {gotoEmailSignUp && (
        <EmailSignUpDialogButton gotoEmailSignUp={gotoEmailSignUp} />
      )}
    </section>
  )
}

export default OtherOptions
