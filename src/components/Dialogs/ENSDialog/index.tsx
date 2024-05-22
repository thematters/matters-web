import dynamic from 'next/dynamic'

import { Dialog, SpinnerBlock, useDialogSwitch, useStep } from '~/components'

import { BaseENSDialogProps, Step } from './types'

type ENSDialogProps = BaseENSDialogProps & {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  defaultStep?: Step
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <SpinnerBlock />,
})

const BaseENSDilaog = ({
  children,
  defaultStep = 'connectWallet',
  ...restProps
}: ENSDialogProps) => {
  const { currStep, forward } = useStep<Step>(defaultStep)

  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog,
  } = useDialogSwitch(true)

  const openDialog = () => {
    forward(defaultStep)
    baseOpenDialog()
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <DynamicContent
          closeDialog={closeDialog}
          currStep={currStep}
          forward={forward}
          {...restProps}
        />
      </Dialog>
    </>
  )
}

export const ENSDialog = (props: ENSDialogProps) => (
  <Dialog.Lazy mounted={<BaseENSDilaog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
