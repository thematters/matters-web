import dynamic from 'next/dynamic'

import { Dialog, Spinner, Translate, useDialogSwitch } from '~/components'

interface FollowersDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), { loading: Spinner })

const BaseFollowersDialog = ({ children }: FollowersDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} fixedHeight>
        <Dialog.Header
          title={<Translate zh_hant="追蹤者" zh_hans="追踪者" en="Followers" />}
          closeDialog={closeDialog}
          closeTextId="close"
        />

        <DynamicContent />
      </Dialog>
    </>
  )
}

export const FollowersDialog = (props: FollowersDialogProps) => (
  <Dialog.Lazy mounted={<BaseFollowersDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
