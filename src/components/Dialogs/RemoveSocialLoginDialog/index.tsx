import dynamic from 'next/dynamic'

import { DialogBeta, Spinner, useDialogSwitch } from '~/components'
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

      <DialogBeta isOpen={show} onDismiss={closeDialog}>
        <DynamicContent closeDialog={closeDialog} type={type} />
      </DialogBeta>
    </>
  )
}

export const RemoveSocialLoginDialog = (
  props: RemoveSocialLoginDialogProps
) => (
  <DialogBeta.Lazy mounted={<BaseRemoveSocialLoginDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </DialogBeta.Lazy>
)
