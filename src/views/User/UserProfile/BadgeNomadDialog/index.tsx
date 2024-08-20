import dynamic from 'next/dynamic'

import { OPEN_NOMAD_BADGE_DIALOG } from '~/common/enums'
import {
  Dialog,
  SpinnerBlock,
  useDialogSwitch,
  useEventListener,
} from '~/components'

type BadgeNomadLabelProps = {
  nomadBadgeLevel: 1 | 2 | 3 | 4
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
}) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog scrollable isOpen={show} onDismiss={closeDialog}>
        <DynamicContent
          nomadBadgeLevel={nomadBadgeLevel}
          closeDialog={closeDialog}
        />
      </Dialog>
    </>
  )
}

export const BadgeNomadDialog = (props: BadgeNomadDialogProps) => {
  const Children = ({ openDialog }: { openDialog: () => void }) => {
    useEventListener(OPEN_NOMAD_BADGE_DIALOG, openDialog)
    return <>{props.children && props.children({ openDialog })}</>
  }

  return (
    <Dialog.Lazy mounted={<BaseBadgeNomadDialog {...props} />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}
