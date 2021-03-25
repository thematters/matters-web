import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'

import { fragments } from './gql'

import { EditProfileDialogUserPublic } from './__generated__/EditProfileDialogUserPublic'

interface EditProfileDialogProps {
  user: EditProfileDialogUserPublic
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const DynamicConetnt = dynamic(() => import('./Content'), {
  ssr: false,
  loading: Spinner,
})

const BaseEditProfileDialog = ({ user, children }: EditProfileDialogProps) => {
  const { show, open, close } = useDialogSwitch(true)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={show} onDismiss={close} fixedHeight>
        <DynamicConetnt user={user} closeDialog={close} />
      </Dialog>
    </>
  )
}

export const EditProfileDialog = (props: EditProfileDialogProps) => (
  <Dialog.Lazy mounted={<BaseEditProfileDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

EditProfileDialog.fragments = fragments
