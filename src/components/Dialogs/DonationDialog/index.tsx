import dynamic from 'next/dynamic'
import { useEffect } from 'react'

import { analytics } from '~/common/utils'
import { Dialog, Spinner, useDialogSwitch, useStep } from '~/components'

import { fragments } from './gql'
import { BaseDonationDialogProps, Step } from './types'

type DonationDialogProps = BaseDonationDialogProps & {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  defaultStep?: Step
}

const DynamicContent = dynamic(() => import('./Content'), { loading: Spinner })

const BaseDonationDialog = ({
  children,
  defaultStep = 'currencyChoice',
  ...restProps
}: DonationDialogProps) => {
  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog: baseCloseDialog,
  } = useDialogSwitch(true)
  const { currStep, forward, back } = useStep<Step>(defaultStep)

  const openDialog = () => {
    forward(defaultStep)
    baseOpenDialog()
  }

  const closeDialog = () => {
    baseCloseDialog()
  }

  const setAmountCallback = (values: SetAmountCallbackValues) => {
    setAmount(values.amount)
    setCurrency(values.currency)
    if (values.currency === CURRENCY.HKD) {
      forward(
        viewer.status?.hasPaymentPassword ? 'confirm' : 'setPaymentPassword'
      )
    } else {
      forward('confirm')
    }
  }

  const setAmountOpenTabCallback = (values: SetAmountOpenTabCallbackValues) => {
    setWindowRef(values.window)
    setPayToTx(values.transaction)
    forward('processing')
  }

  const ContinueDonationButton = (
    <Dialog.Footer.Button onClick={() => forward('setAmount')}>
      <Translate zh_hant="回到支持" zh_hans="回到支持" en="Back to support" />
    </Dialog.Footer.Button>
  )

  /**
   * Wallet
   */

  const isWalletSelect = currStep === 'walletSelect'

  /**
   * Donation
   */

  const isCurrencyChoice = currStep === 'currencyChoice'
  // complete dialog for donation
  const isComplete = currStep === 'complete'

  useEffect(() => {
    analytics.trackEvent('view_donation_dialog', { step: currStep })
  }, [currStep])

  return (
    <>
      {children({ openDialog })}

      <Dialog
        size={isComplete ? 'lg' : 'sm'}
        isOpen={show}
        onDismiss={closeDialog}
        fixedHeight
      >
        <DynamicContent
          closeDialog={closeDialog}
          currStep={currStep}
          forward={forward}
          back={back}
          {...restProps}
        />
      </Dialog>
    </>
  )
}

export const DonationDialog = (props: DonationDialogProps) => (
  <Dialog.Lazy mounted={<BaseDonationDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

DonationDialog.fragments = fragments
