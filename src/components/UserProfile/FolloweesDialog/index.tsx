import dynamic from 'next/dynamic'

import { Dialog, Spinner, Translate, useDialogSwitch } from '~/components'

import { UserProfileUserPublic_user } from '../__generated__/UserProfileUserPublic'

interface FolloweesDialogProps {
  user: UserProfileUserPublic_user
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const DynamicConetnt = dynamic(() => import('./Content'), {
  ssr: false,
  loading: Spinner,
})

const BaseFolloweesDialog = ({ user, children }: FolloweesDialogProps) => {
  const { show, open, close } = useDialogSwitch(true)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={show} onDismiss={close} fixedHeight>
        <Dialog.Header
          title={
            <Translate
              zh_hant={`${user.displayName} 追蹤的作者`}
              zh_hans={`${user.displayName} 追踪的作者`}
              en={`Followed by ${user.displayName}`}
            />
          }
          close={close}
          closeTextId="close"
        />

        <DynamicConetnt />
      </Dialog>
    </>
  )
}

export const FolloweesDialog = (props: FolloweesDialogProps) => (
  <Dialog.Lazy mounted={<BaseFolloweesDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)
