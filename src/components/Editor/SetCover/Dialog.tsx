import dynamic from 'next/dynamic'

import { Dialog, SpinnerBlock, useDialogSwitch } from '~/components'

import { SetCoverProps } from '../SetCover'

const DynamicSetCover = dynamic(() => import('../SetCover'), {
  loading: () => <SpinnerBlock />,
})

type SetCoverDialogProps = SetCoverProps & {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const BaseSetCoverDialog = ({ children, ...props }: SetCoverDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog
        isOpen={show}
        onDismiss={closeDialog}
        dismissOnClickOutside={false}
        dismissOnESC={false}
        fixedWidth={false}
      >
        <DynamicSetCover {...props} closeDialog={closeDialog} />
      </Dialog>
    </>
  )
}

const SetCoverDialog = (props: SetCoverDialogProps) => (
  <Dialog.Lazy mounted={<BaseSetCoverDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default SetCoverDialog
