import dynamic from 'next/dynamic'
import { FormattedMessage } from 'react-intl'

import { Dialog, SpinnerBlock, useDialogSwitch } from '~/components'
import { ProfileCirclePublicFragment } from '~/gql/graphql'

interface FollowersDialogProps {
  circle: ProfileCirclePublicFragment
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <SpinnerBlock />,
})

const BaseFollowersDialog = ({ circle, children }: FollowersDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <FormattedMessage
              defaultMessage="Followers of {circleName}"
              id="WuvE8X"
              description="src/views/Circle/Profile/FollowersDialog/index.tsx"
              values={{
                circleName: circle.displayName,
              }}
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
