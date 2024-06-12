import dynamic from 'next/dynamic'

import { Dialog, SpinnerBlock, useDialogSwitch } from '~/components'

interface JournalDetailDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  journalId: string
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <SpinnerBlock />,
})

const BaseJournalDetailDialog = ({
  children,
  journalId,
}: JournalDetailDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} fixedWidth={false}>
        {/* <Dialog.Content noMaxHeight> */}
        <DynamicContent journalId={journalId} closeDialog={closeDialog} />
        {/* </Dialog.Content> */}
      </Dialog>
    </>
  )
}

export const JournalDetailDialog = (props: JournalDetailDialogProps) => (
  <Dialog.Lazy mounted={<BaseJournalDetailDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
