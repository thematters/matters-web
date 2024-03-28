import { FormattedMessage } from 'react-intl'

import styles from './styles.module.css'

interface ResendCodeButtonProps {
  showCountDown: boolean
  showResendButton: boolean
  countdown: number
  sendCode: () => void
  disabled?: boolean
}

export const ResendCodeButton = ({
  showCountDown,
  showResendButton,
  countdown,
  sendCode,
  disabled,
}: ResendCodeButtonProps) => {
  return (
    <>
      {showCountDown && countdown > 0 && (
        <span className={styles.resendButton}>
          {countdown}&nbsp;
          <FormattedMessage
            defaultMessage="Resend"
            id="aE5Qq+"
            description="src/components/Forms/Verification/ResendCodeButton/index.tsx"
          />
        </span>
      )}
      {showResendButton && countdown === 0 && (
        <button
          className={styles.resendButton}
          onClick={(e) => {
            e.preventDefault()
            sendCode()
          }}
          disabled={disabled}
        >
          <FormattedMessage
            defaultMessage="Resend"
            id="aE5Qq+"
            description="src/components/Forms/Verification/ResendCodeButton/index.tsx"
          />
        </button>
      )}
    </>
  )
}
