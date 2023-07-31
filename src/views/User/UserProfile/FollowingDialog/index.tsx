import dynamic from 'next/dynamic'
import { FormattedMessage } from 'react-intl'

import { Dialog, Spinner, Translate, useDialogSwitch } from '~/components'
import { UserProfileUserPublicQuery } from '~/gql/graphql'

interface FollowingDialogProps {
  user: NonNullable<UserProfileUserPublicQuery['user']>
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), { loading: Spinner })

const BaseFollowingDialog = ({ user, children }: FollowingDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <Translate zh_hant="追蹤內容" zh_hans="追踪内容" en={`Following`} />
          }
          closeDialog={closeDialog}
          closeText={<FormattedMessage defaultMessage="Close" />}
        />

        <DynamicContent />

        <Dialog.Footer
          smUpBtns={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Close" />}
              color="greyDarker"
              onClick={closeDialog}
            />
          }
        />
      </Dialog>
    </>
  )
}

export const FollowingDialog = (props: FollowingDialogProps) => (
  <Dialog.Lazy mounted={<BaseFollowingDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
