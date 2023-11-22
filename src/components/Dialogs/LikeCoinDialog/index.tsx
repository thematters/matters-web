import dynamic from 'next/dynamic'

import { TEST_ID } from '~/common/enums'
import { Dialog, Spinner, useDialogSwitch } from '~/components'

interface LikeCoinDialogProps {
  children?: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <Spinner />,
})

const BaseLikeCoinDialog: React.FC<LikeCoinDialogProps> = ({ children }) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children && children({ openDialog })}

      <Dialog
        isOpen={show}
        onDismiss={closeDialog}
        testId={TEST_ID.DIALOG_LIKECOIN}
      >
        <DynamicContent closeDialog={closeDialog} />
      </Dialog>
    </>
  )
}

export const LikeCoinDialog = (props: LikeCoinDialogProps) => {
  const Children = ({ openDialog }: { openDialog: () => void }) => {
    return <>{props.children && props.children({ openDialog })}</>
  }

  return (
    <Dialog.Lazy mounted={<BaseLikeCoinDialog {...props} />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}
