import { FormattedMessage } from 'react-intl'

import { Dialog, useDialogSwitch } from '~/components'

interface BadgesDialogProps {
  content: React.ReactNode
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const BaseBadgesDialog = ({ content, children }: BadgesDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <FormattedMessage
              defaultMessage="Badges"
              description="src/components/UserProfile/index.tsx"
            />
          }
        />

        <Dialog.Content>{content}</Dialog.Content>
      </Dialog>
    </>
  )
}

export const BadgesDialog = (props: BadgesDialogProps) => (
  <Dialog.Lazy mounted={<BaseBadgesDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
