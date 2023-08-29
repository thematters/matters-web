import { FormattedMessage } from 'react-intl'

import { Button } from '~/components'

import styles from './styles.module.css'

export const SendLoginCodeButton = ({
  sendLoginCode,
}: {
  sendLoginCode: () => void
}) => (
  <section className={styles.option}>
    <FormattedMessage
      defaultMessage="Forgot password?"
      description="src/components/Forms/EmailLoginForm/Buttons.tsx"
    />
    <Button aria-haspopup="dialog" onClick={sendLoginCode}>
      <FormattedMessage
        defaultMessage="Send login code"
        description="src/components/Forms/EmailLoginForm/Buttons.tsx"
      />
    </Button>
  </section>
)

const OtherOptions = ({
  isInPage,
  hasSendCode,
  sendLoginCode,
}: {
  isInPage: boolean
  hasSendCode: boolean
  sendLoginCode?: () => any
}) => {
  return (
    <section className={styles.otherOptions}>
      {!hasSendCode && sendLoginCode && (
        <SendLoginCodeButton sendLoginCode={sendLoginCode} />
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
