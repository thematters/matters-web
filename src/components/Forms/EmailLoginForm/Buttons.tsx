import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { appendTarget } from '~/common/utils'
import { Button, TextIcon } from '~/components'

import styles from './styles.module.css'

export const PasswordResetDialogButton = ({
  gotoResetPassword,
}: {
  gotoResetPassword: () => void
}) => (
  <Button
    spacing={['xtight', 0]}
    aria-haspopup="dialog"
    onClick={gotoResetPassword}
    tabIndex={-1}
  >
    <TextIcon color="green">
      <FormattedMessage
        defaultMessage="Forget Password"
        description="src/components/Forms/EmailLoginForm/Buttons.tsx"
      />
    </TextIcon>
  </Button>
)

export const PasswordResetRedirectButton = () => (
  <Button spacing={['xtight', 0]} {...appendTarget(PATHS.FORGET)} tabIndex={-1}>
    <TextIcon color="green">
      <FormattedMessage
        defaultMessage="Forget Password"
        description="src/components/Forms/EmailLoginForm/Buttons.tsx"
      />
    </TextIcon>
  </Button>
)

export const EmailSignUpDialogButton = ({
  gotoEmailSignUp,
  isInPage,
}: {
  gotoEmailSignUp: () => void
  isInPage: boolean
}) => (
  <section
    className={[styles.altButtons, isInPage ? styles.isInPage : ''].join(' ')}
  >
    <FormattedMessage
      defaultMessage="Not Registered?"
      description="src/components/Forms/EmailLoginForm/Buttons.tsx"
    />

    <button type="button" onClick={gotoEmailSignUp}>
      <FormattedMessage defaultMessage="Register" description="" />
    </button>
  </section>
)
