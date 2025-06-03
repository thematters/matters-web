import React from 'react'
import { FormattedMessage } from 'react-intl'

import {
  Dialog,
  SetPaymentPasswordForm,
  SpinnerBlock,
  useStep,
} from '~/components'

import styles from './styles.module.css'

interface FormProps {
  submitCallback?: () => void
  closeDialog?: () => void
}

const SetPaymentPasswordContent: React.FC<FormProps> = ({
  submitCallback,
  closeDialog,
}) => {
  const { currStep, forward } = useStep<'password' | 'comparedPassword'>(
    'password'
  )
  const isInPassword = currStep === 'password'
  const isInComparedPassword = currStep === 'comparedPassword'

  const header = (
    <section className={styles.hint}>
      {isInPassword && (
        <p>
          <FormattedMessage
            defaultMessage="To protect the security of your assets, please set a six-digit transaction password first."
            id="fLvbqA"
          />
        </p>
      )}

      {isInComparedPassword && (
        <p>
          <FormattedMessage
            defaultMessage="Please confirm transaction password"
            id="RU5NDB"
            description="src/components/Forms/PaymentForm/SetPassword/index.tsx"
          />
        </p>
      )}
    </section>
  )

  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage defaultMessage="Transaction Password" id="9UNFGm" />
        }
        closeDialog={closeDialog}
      />

      <Dialog.Content>
        <SetPaymentPasswordForm
          submitCallback={submitCallback}
          step={currStep}
          forward={forward}
          header={header}
          loading={<SpinnerBlock />}
        />
      </Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <Dialog.TextButton
            text={<FormattedMessage defaultMessage="Cancel" id="47FYwb" />}
            color="greyDarker"
            onClick={closeDialog}
          />
        }
      />
    </>
  )
}

export default SetPaymentPasswordContent
