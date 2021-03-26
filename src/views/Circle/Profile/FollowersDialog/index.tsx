import dynamic from 'next/dynamic'

import { Dialog, Spinner, Translate, useDialogSwitch } from '~/components'

import { ProfileCirclePublic } from '../__generated__/ProfileCirclePublic'

interface FollowersDialogProps {
  circle: ProfileCirclePublic
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), {
  ssr: false,
  loading: Spinner,
})

const BaseFollowersDialog = ({ circle, children }: FollowersDialogProps) => {
  const { show, open, close } = useDialogSwitch(true)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={show} onDismiss={close} fixedHeight>
        <Dialog.Header
          title={
            <Translate
              zh_hant={`${circle.displayName} 的追蹤者`}
              zh_hans={`${circle.displayName} 的追踪者`}
              en={`Followers of ${circle.displayName}`}
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
