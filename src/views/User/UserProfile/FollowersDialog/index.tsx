import dynamic from 'next/dynamic'
import { FormattedMessage } from 'react-intl'

import { Dialog, SpinnerBlock, Translate, useDialogSwitch } from '~/components'
import { UserProfileUserPublicQuery } from '~/gql/graphql'

interface FollowersDialogProps {
  user: NonNullable<UserProfileUserPublicQuery['user']>
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <SpinnerBlock />,
})

const BaseFollowersDialog = ({ user, children }: FollowersDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <Translate
              zh_hant={`${user.displayName} 的關注者`}
              zh_hans={`${user.displayName} 的关注者`}
              en={`Followers of ${user.displayName}`}
            />
          }
          closeDialog={closeDialog}
          closeText={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
        />

        <DynamicContent />

        <Dialog.Footer
          smUpBtns={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
              color="greyDarker"
              onClick={closeDialog}
            />
          }
        />
      </Dialog>
    </>
  )
}

export const FollowersDialog = (props: FollowersDialogProps) => (
  <Dialog.Lazy mounted={<BaseFollowersDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
