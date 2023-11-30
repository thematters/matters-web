import { FormattedMessage } from 'react-intl'

import { OPEN_SHOW_NOMAD_BADGE_DIALOG } from '~/common/enums'
import {
  Button,
  Dialog,
  IconClose20,
  useDialogSwitch,
  useEventListener,
} from '~/components'

import { BadgesOptions } from '../Badges'

interface BadgesDialogProps extends BadgesOptions {
  content: React.ReactNode
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  defaultShow: boolean
}

export const BaseBadgesDialog = ({
  content,
  children,
  defaultShow,
}: BadgesDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(defaultShow)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} dismissOnClickOutside>
        <Dialog.Header
          title={
            <FormattedMessage
              defaultMessage="Badges"
              id="DYrDcG"
              description="src/components/UserProfile/index.tsx"
            />
          }
          titleLeft
          rightBtn={
            <Button onClick={closeDialog}>
              <IconClose20 size="mdS" color="greyDarker" />{' '}
            </Button>
          }
        />

        <Dialog.Content fixedHeight>{content}</Dialog.Content>

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

export const BadgesDialog = (props: BadgesDialogProps) => {
  const Children = ({ openDialog }: { openDialog: () => void }) => {
    // useEventListener(OPEN_SET_USER_NAME_DIALOG, openDialog)
    useEventListener(OPEN_SHOW_NOMAD_BADGE_DIALOG, openDialog)
    return <>{props?.children({ openDialog })}</>
  }

  return (
    <Dialog.Lazy mounted={<BaseBadgesDialog {...props} />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}
