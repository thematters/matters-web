import dynamic from 'next/dynamic'

import { OPEN_GRAND_SLAM_BADGE_DIALOG } from '~/common/enums'
import {
  Dialog,
  SpinnerBlock,
  useDialogSwitch,
  useEventListener,
} from '~/components'

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

export const BadgeGrandSlamDialog = (props: BadgeGrandSlamDialogProps) => {
  const Children = ({ openDialog }: { openDialog: () => void }) => {
    useEventListener(OPEN_GRAND_SLAM_BADGE_DIALOG, openDialog)
    return <>{props.children && props.children({ openDialog })}</>
  }

  return (
    <Dialog.Lazy mounted={<BaseBadgeGrandSlamDialog {...props} />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}
