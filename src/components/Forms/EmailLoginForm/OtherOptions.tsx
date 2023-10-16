import { FormattedMessage } from 'react-intl'

import { Button } from '~/components'

import styles from './styles.module.css'

export const SendLoginCodeButton = ({
  sendLoginCode,
  disabled,
}: {
  sendLoginCode: () => void
  disabled?: boolean
}) => (
  <section className={styles.option}>
    <FormattedMessage
      defaultMessage="Forgot password?"
      description="src/components/Forms/EmailLoginForm/Buttons.tsx"
    />
    <Button aria-haspopup="dialog" onClick={sendLoginCode} disabled={disabled}>
      <FormattedMessage
        defaultMessage="Send login code"
        description="src/components/Forms/EmailLoginForm/Buttons.tsx"
      />
    </Button>
  </section>
)

const OtherOptions = ({
  hasSendCode,
  sendLoginCode,
  disabled,
}: {
  hasSendCode: boolean
  sendLoginCode?: () => any
  disabled?: boolean
}) => {
  return (
    <section className={styles.otherOptions}>
      {!hasSendCode && sendLoginCode && (
        <SendLoginCodeButton
          sendLoginCode={sendLoginCode}
          disabled={disabled}
        />
      )}
      {hasSendCode && (
        <section className={styles.hasSendCode}>
          <FormattedMessage
            defaultMessage="The login code has been sent to your inbox"
            description="src/components/Forms/EmailLoginForm/OtherOptions.tsx"
          />
        </section>
      )}
    </section>
  )
}

export default OtherOptions
