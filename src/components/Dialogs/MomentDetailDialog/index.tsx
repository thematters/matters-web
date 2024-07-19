import dynamic from 'next/dynamic'

import { Dialog, SpinnerBlock, useDialogSwitch } from '~/components'

interface MomentDetailDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  shortHash: string
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <SpinnerBlock />,
})

const BaseMomentDetailDialog = ({
  children,
  shortHash,
}: MomentDetailDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog
        isOpen={show}
        onDismiss={closeDialog}
        fixedWidth={false}
        dismissOnClickOutside={false}
      >
        <DynamicContent shortHash={shortHash} closeDialog={closeDialog} />
      </Dialog>
    </>
  )
}

export const MomentDetailDialog = (props: MomentDetailDialogProps) => (
  <Dialog.Lazy mounted={<BaseMomentDetailDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
