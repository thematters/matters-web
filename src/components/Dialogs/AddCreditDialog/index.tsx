import dynamic from 'next/dynamic'
import { useContext, useEffect } from 'react'

import { analytics } from '~/common/utils'
import {
  Dialog,
  Spinner,
  useDialogSwitch,
  useStep,
  ViewerContext,
} from '~/components'

type Step = 'setPaymentPassword' | 'addCredit'

interface AddCreditDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicSetPaymentPasswordContent = dynamic(
  () => import('~/components/Dialogs/SetPaymentPasswordDialog/Content'),
  { loading: () => <Spinner /> }
)

const DynamicAddCreditForm = dynamic(
  () => import('~/components/Forms/PaymentForm/AddCredit'),
  { loading: () => <Spinner /> }
)

const BaseAddCreditDialog = ({ children }: AddCreditDialogProps) => {
  const viewer = useContext(ViewerContext)
  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog,
  } = useDialogSwitch(true)

  const initialStep = viewer.status?.hasPaymentPassword
    ? 'addCredit'
    : 'setPaymentPassword'
  const { currStep, forward } = useStep<Step>(initialStep)

  const openDialog = () => {
    forward(initialStep)
    baseOpenDialog()
  }

  const isSetPaymentPassword = currStep === 'setPaymentPassword'
  const isAddCredit = currStep === 'addCredit'

  useEffect(() => {
    analytics.trackEvent('view_add_credit_dialog', { step: currStep })
  }, [currStep])

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        {isSetPaymentPassword && (
          <DynamicSetPaymentPasswordContent
            submitCallback={() => forward('addCredit')}
            closeDialog={closeDialog}
          />
        )}

        {isAddCredit && <DynamicAddCreditForm closeDialog={closeDialog} />}
      </Dialog>
    </>
  )
}

export const AddCreditDialog = (props: AddCreditDialogProps) => (
  <Dialog.Lazy mounted={<BaseAddCreditDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
