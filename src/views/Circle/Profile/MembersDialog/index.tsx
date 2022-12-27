import dynamic from 'next/dynamic'

import { Dialog, Spinner, Translate, useDialogSwitch } from '~/components'

interface MembersDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), {
  ssr: false,
  loading: Spinner,
})

const BaseMembersDialog = ({ children }: MembersDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={<Translate zh_hant="成員" zh_hans="成員" en="Members" />}
          closeDialog={closeDialog}
          closeTextId="close"
        />

        <DynamicContent />
      </Dialog>
    </>
  )
}

export const MembersDialog = (props: MembersDialogProps) => (
  <Dialog.Lazy mounted={<BaseMembersDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
