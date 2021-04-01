import dynamic from 'next/dynamic'

import { Dialog, Spinner, Translate, useDialogSwitch } from '~/components'

import { ProfileCirclePublic } from '../__generated__/ProfileCirclePublic'

interface MembersDialogProps {
  circle: ProfileCirclePublic
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), {
  ssr: false,
  loading: Spinner,
})

const BaseMembersDialog = ({ circle, children }: MembersDialogProps) => {
  const { show, open, close } = useDialogSwitch(true)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={show} onDismiss={close} fixedHeight>
        <Dialog.Header
          title={
            <Translate
              zh_hant={`${circle.displayName} 的成員`}
              zh_hans={`${circle.displayName} 的成員`}
              en={`Members of ${circle.displayName}`}
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

export const MembersDialog = (props: MembersDialogProps) => (
  <Dialog.Lazy mounted={<BaseMembersDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)
