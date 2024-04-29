import dynamic from 'next/dynamic'

import { Dialog, SpinnerBlock, useDialogSwitch } from '~/components'

type BadgeNomadLabelProps = {
  nomadBadgeLevel: 1 | 2 | 3 | 4
  shareLink: string
}

type BadgeNomadDialogProps = BadgeNomadLabelProps & {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <SpinnerBlock />,
})

export const BaseBadgeNomadDialog: React.FC<BadgeNomadDialogProps> = ({
  children,
  nomadBadgeLevel,
  shareLink,
}) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog scrollable isOpen={show} onDismiss={closeDialog}>
        <DynamicContent
          nomadBadgeLevel={nomadBadgeLevel}
          closeDialog={closeDialog}
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
