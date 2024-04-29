import dynamic from 'next/dynamic'
import { useEffect } from 'react'

import { analytics } from '~/common/utils'
import { Dialog, SpinnerBlock, useDialogSwitch, useStep } from '~/components'

import { fragments } from './gql'
import { BaseDonationDialogProps, Step } from './types'

type DonationDialogProps = BaseDonationDialogProps & {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  defaultStep?: Step
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <SpinnerBlock />,
})

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

  useEffect(() => {
    analytics.trackEvent('view_donation_dialog', { step: currStep })
  }, [currStep])

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
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
