import dynamic from 'next/dynamic'

import { Dialog, SpinnerBlock, useDialogSwitch } from '~/components'

type BadgeGrandSlamProps = {}

type BadgeGrandSlamDialogProps = BadgeGrandSlamProps & {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <SpinnerBlock />,
})

export const BaseBadgeGrandSlamDialog: React.FC<BadgeGrandSlamDialogProps> = ({
  children,
}) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog scrollable isOpen={show} onDismiss={closeDialog}>
        <DynamicContent closeDialog={closeDialog} />
      </Dialog>
    </>
  )
}

export const BadgeGrandSlamDialog = (props: BadgeGrandSlamDialogProps) => (
  <Dialog.Lazy mounted={<BaseBadgeGrandSlamDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
