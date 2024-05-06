import _pickBy from 'lodash/pickBy'
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
  submitCallback: () => void
  closeDialog?: () => any
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
    <section className={styles.reason}>
      {isInPassword && (
        <p>
          <FormattedMessage
            defaultMessage="To protect your assets,"
            id="bhehIF"
          />
          <br />
          <FormattedMessage
            defaultMessage="please set transaction password before top-up"
            id="yBkdMI"
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

      <p className={styles.hint}>
        <FormattedMessage
          defaultMessage="Enter a 6-digit payment password."
          id="OpeFTV"
        />
      </p>
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
