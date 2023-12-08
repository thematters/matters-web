import dynamic from 'next/dynamic'

import {
  Button,
  Dialog,
  IconArrowLeft16,
  Spinner,
  useDialogSwitch,
} from '~/components'
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

  isNested?: boolean // if nested by another dialog
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <Spinner />,
})

export const BaseBadgeNomadDialog: React.FC<BadgeNomadDialogProps> = ({
  // content,
  children,
  nomadBadgeLevel,
  totalReferredCount,
  shareLink,
  isNested,
}) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  // useEventListener(OPEN_SHOW_NOMAD_BADGE_DIALOG, openDialog)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        {isNested && (
          <Dialog.Header
            title={<span />}
            leftBtn={
              <Button onClick={closeDialog}>
                <IconArrowLeft16 size="mdS" color="greyDarker" />
              </Button>
            }
          />
        )}

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
