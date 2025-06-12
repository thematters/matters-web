import dynamic from 'next/dynamic'

import { OPEN_GRAND_BADGE_DIALOG } from '~/common/enums'
import {
  Dialog,
  SpinnerBlock,
  useDialogSwitch,
  useEventListener,
} from '~/components'

type BadgeGrandDialogProps = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <SpinnerBlock />,
})

export const BaseBadgeGrandDialog: React.FC<BadgeGrandDialogProps> = ({
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

export const BadgeGrandDialog = (props: BadgeGrandDialogProps) => {
  const Children = ({ openDialog }: { openDialog: () => void }) => {
    useEventListener(OPEN_GRAND_BADGE_DIALOG, openDialog)
    return <>{props.children && props.children({ openDialog })}</>
  }

  return (
    <Dialog.Lazy mounted={<BaseBadgeGrandDialog {...props} />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}
