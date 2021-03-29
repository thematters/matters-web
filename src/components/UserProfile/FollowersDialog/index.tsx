import dynamic from 'next/dynamic'

import { Dialog, Spinner, Translate, useDialogSwitch } from '~/components'

import { UserProfileUserPublic_user } from '../__generated__/UserProfileUserPublic'

interface FollowersDialogProps {
  user: UserProfileUserPublic_user
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), { loading: Spinner })

const BaseFollowersDialog = ({ user, children }: FollowersDialogProps) => {
  const { show, open, close } = useDialogSwitch(true)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={show} onDismiss={close} fixedHeight>
        <Dialog.Header
          title={
            <Translate
              zh_hant={`${user.displayName} 的追蹤者`}
              zh_hans={`${user.displayName} 的追踪者`}
              en={`Followers of ${user.displayName}`}
            />
          }
          close={close}
          closeTextId="close"
        />

        <DynamicContent />
      </Dialog>
    </>
  )
}

export const FollowersDialog = (props: FollowersDialogProps) => (
  <Dialog.Lazy mounted={<BaseFollowersDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)
