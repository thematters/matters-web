import dynamic from 'next/dynamic'

import { Dialog, Spinner, Translate, useDialogSwitch } from '~/components'

import { ProfileCirclePublic } from '../__generated__/ProfileCirclePublic'

interface FollowersDialogProps {
  circle: ProfileCirclePublic
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), { loading: Spinner })

const BaseFollowersDialog = ({ circle, children }: FollowersDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <Translate
              zh_hant={`${circle.displayName} 的追蹤者`}
              zh_hans={`${circle.displayName} 的追踪者`}
              en={`Followers of ${circle.displayName}`}
            />
          }
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
