import dynamic from 'next/dynamic'

import { Dialog, Spinner, Translate, useDialogSwitch } from '~/components'

import { UserProfileUserPublic_user } from '../__generated__/UserProfileUserPublic'

interface FollowingDialogProps {
  user: UserProfileUserPublic_user
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), { loading: Spinner })

const BaseFollowingDialog = ({ user, children }: FollowingDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <Translate zh_hant="追蹤內容" zh_hans="追踪内容" en={`Following`} />
          }
          closeDialog={closeDialog}
          closeTextId="close"
        />

        <DynamicContent />
      </Dialog>
    </>
  )
}

export const FollowingDialog = (props: FollowingDialogProps) => (
  <Dialog.Lazy mounted={<BaseFollowingDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
