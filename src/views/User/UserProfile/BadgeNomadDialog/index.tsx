import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'
import { UserStatus } from '~/gql/graphql'

type BadgeNomadLabelProps = {
  hasTooltip?: boolean
  nomadBadgeLevel: 1 | 2 | 3 | 4
  totalReferredCount?: UserStatus['totalReferredCount']
  shareLink?: string
  // defaultShowDialog: boolean
}

type BadgeNomadDialogProps = BadgeNomadLabelProps & {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <Spinner />,
})

export const BaseBadgeNomadDialog: React.FC<BadgeNomadDialogProps> = ({
  children,
  nomadBadgeLevel,
  totalReferredCount,
  shareLink,
}) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <DynamicContent
          nomadBadgeLevel={nomadBadgeLevel}
          closeDialog={closeDialog}
          totalReferredCount={totalReferredCount}
          shareLink={shareLink}
        />
      </Dialog>
    </>
  )
}

export const BadgeNomadDialog = (props: BadgeNomadDialogProps) => (
  <Dialog.Lazy mounted={<BaseBadgeNomadDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
