import dynamic from 'next/dynamic'
import { FormattedMessage } from 'react-intl'

import { Dialog, Spinner, useDialogSwitch } from '~/components'
import { ProfileCirclePublicFragment } from '~/gql/graphql'

interface FollowersDialogProps {
  circle: ProfileCirclePublicFragment
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), { loading: Spinner })

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
              description="src/views/Circle/Profile/FollowersDialog/index.tsx"
              values={{
                circleName: circle.displayName,
              }}
            />
          }
          closeDialog={closeDialog}
          closeText="close"
        />

        <DynamicContent />

        <Dialog.Footer
          smUpBtns={
            <Dialog.TextButton
              text="close"
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
