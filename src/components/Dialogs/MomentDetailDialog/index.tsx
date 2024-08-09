import dynamic from 'next/dynamic'

import { Dialog, useDialogSwitch } from '~/components'

import Placeholder from './Placeholder'

interface MomentDetailDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  shortHash: string
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <Placeholder onClose={() => {}} />,
})

const BaseMomentDetailDialog = ({
  children,
  shortHash,
}: MomentDetailDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} fixedWidth={false}>
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
