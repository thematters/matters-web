import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'

import { fragments } from './gql'

import { EditProfileDialogUserPrivate } from './__generated__/EditProfileDialogUserPrivate'
// import { EditProfileDialogUserPublic } from './__generated__/EditProfileDialogUserPublic'

interface EditProfileDialogProps {
  user: EditProfileDialogUserPrivate
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), { loading: Spinner })

const BaseEditProfileDialog = ({ user, children }: EditProfileDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} fixedHeight>
        <DynamicContent user={user} closeDialog={closeDialog} />
      </Dialog>
    </>
  )
}

export const EditProfileDialog = (props: EditProfileDialogProps) => (
  <Dialog.Lazy mounted={<BaseEditProfileDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

EditProfileDialog.fragments = fragments
