import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'
import { SocialAccountType } from '~/gql/graphql'

interface RemoveSocialLoginDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  type: SocialAccountType
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <Spinner />,
})

const BaseRemoveSocialLoginDialog = ({
  children,
  type,
}: RemoveSocialLoginDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <DynamicContent closeDialog={closeDialog} type={type} />
      </Dialog>
    </>
  )
}

export const RemoveSocialLoginDialog = (
  props: RemoveSocialLoginDialogProps
) => (
  <Dialog.Lazy mounted={<BaseRemoveSocialLoginDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
