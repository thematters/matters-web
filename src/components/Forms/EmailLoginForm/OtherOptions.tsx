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
      id="O2Nqk8"
      description="src/components/Forms/EmailLoginForm/Buttons.tsx"
    />
    <Button aria-haspopup="dialog" onClick={sendLoginCode} disabled={disabled}>
      <FormattedMessage
        defaultMessage="Send login code"
        id="qNuRmA"
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
  sendLoginCode?: () => void
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
            id="wbIHgJ"
            description="src/components/Forms/EmailLoginForm/OtherOptions.tsx"
          />
        </section>
      )}
    </section>
  )
}

export default OtherOptions
