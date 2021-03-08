import dynamic from 'next/dynamic'

import { Dialog, Spinner, Translate, useDialogSwitch } from '~/components'

import { UserProfileUserPublic_user } from '../__generated__/UserProfileUserPublic'

interface FollowingDialogProps {
  user: UserProfileUserPublic_user
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const DynamicConetnt = dynamic(() => import('./Content'), {
  ssr: false,
  loading: Spinner,
})

const BaseFollowingDialog = ({ user, children }: FollowingDialogProps) => {
  const { show, open, close } = useDialogSwitch(true)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={show} onDismiss={close} fixedHeight>
        <Dialog.Header
          title={
            <Translate zh_hant="追蹤內容" zh_hans="追踪内容" en={`Following`} />
          }
          close={close}
          closeTextId="close"
        />

        <DynamicConetnt />
      </Dialog>
    </>
  )
}

export const FollowingDialog = (props: FollowingDialogProps) => (
  <Dialog.Lazy mounted={<BaseFollowingDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)
