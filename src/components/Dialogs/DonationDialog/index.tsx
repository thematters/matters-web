import dynamic from 'next/dynamic'
import { useEffect } from 'react'

import { analytics } from '~/common/utils'
import { Dialog, Spinner, useDialogSwitch, useStep } from '~/components'
import {
  ArticleDetailPublicQuery,
  UserDonationRecipientFragment,
} from '~/gql/graphql'

import { fragments } from './gql'

type Step =
  | 'currencyChoice'
  | 'walletSelect'
  | 'setAmount'
  | 'addCredit'
  | 'complete'
  | 'confirm'
  | 'processing'
  | 'resetPassword'
  | 'setPaymentPassword'

interface DonationDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  completeCallback?: () => void
  defaultStep?: Step
  recipient: UserDonationRecipientFragment
  article: NonNullable<ArticleDetailPublicQuery['article']>
  targetId: string
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
