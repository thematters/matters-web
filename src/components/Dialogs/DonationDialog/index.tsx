import gql from 'graphql-tag'
import { useState } from 'react'

import { Dialog, PaymentForm } from '~/components'

import { PAYMENT_CURRENCY } from '~/common/enums'

import { PayTo_payTo_transaction as PayToTransaction } from '~/components/GQL/mutations/__generated__/PayTo'
import { UserDonationRecipient } from './__generated__/UserDonationRecipient'

type Step = 'setAmount' | 'confirm' | 'processing' | 'complete'

interface DonationDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
  recipient: UserDonationRecipient
  targetId: string
}

const fragments = {
  recipient: gql`
    fragment UserDonationRecipient on User {
      id
      avatar
      displayName
      liker {
        likerId
        civicLiker
      }
    }
  `,
}

const BaseDonationDialog = ({
  children,
  recipient,
  targetId,
}: DonationDialogProps) => {
  const [showDialog, setShowDialog] = useState(true)
  const [step, setStep] = useState<Step>('setAmount')

  const [amount, setAmount] = useState<number>(0)
  const [currency, setCurrency] = useState<PAYMENT_CURRENCY>(
    PAYMENT_CURRENCY.LIKE
  )
  const [payToTransaction, setPayToTransaction] = useState<
    Omit<PayToTransaction, '__typename'>
  >()
  const [windowRef, setWindowRef] = useState<Window | undefined>(undefined)

  const open = () => {
    setStep('setAmount')
    setShowDialog(true)
  }

  const close = () => setShowDialog(false)

  const isComplete = step === 'complete'
  const isConfirm = step === 'confirm'
  const isProcessing = step === 'processing'
  const isSetAmount = step === 'setAmount'

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={showDialog} onDismiss={close} fixedHeight>
        <Dialog.Header title="donation" close={close} closeTextId="close" />

        {isSetAmount && (
          <PaymentForm.PayTo.SetAmount
            close={close}
            submitCallback={(values) => {
              switch (values.currency) {
                case PAYMENT_CURRENCY.LIKE:
                  const redirectWindow = window.open(
                    values.redirectUrl,
                    '_blank'
                  )
                  if (redirectWindow) {
                    setWindowRef(redirectWindow)
                    setAmount(values.amount)
                    setCurrency(values.currency)
                    setPayToTransaction(values.transaction)
                    setStep('processing')
                  }
                  break
              }
            }}
            recipient={recipient}
            targetId={targetId}
          />
        )}

        {isConfirm && (
          <PaymentForm.PayTo.Confirm
            amount={amount}
            currency={currency}
            submitCallback={() => setStep('processing')}
          />
        )}

        {isProcessing && (
          <PaymentForm.Processing
            nextStep={() => setStep('complete')}
            txId={payToTransaction?.id || ''}
            windowRef={windowRef}
          />
        )}

        {isComplete && (
          <PaymentForm.PayTo.Complete
            amount={amount}
            currency={currency}
            recipient={recipient}
          />
        )}
      </Dialog>
    </>
  )
}

export const DonationDialog = (props: DonationDialogProps) => (
  <Dialog.Lazy mounted={<BaseDonationDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

DonationDialog.fragments = fragments
