import dynamic from 'next/dynamic'
import { FormattedMessage } from 'react-intl'

import { Dialog, Spinner, useDialogSwitch } from '~/components'

interface MembersDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), {
  ssr: false,
  loading: Spinner,
})

const BaseMembersDialog = ({ children }: MembersDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={<FormattedMessage defaultMessage="Members" description="" />}
          closeDialog={closeDialog}
          closeText="close"
        />

        <DynamicContent />

        <Dialog.Footer
          noSpacing={false}
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

export const MembersDialog = (props: MembersDialogProps) => (
  <Dialog.Lazy mounted={<BaseMembersDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
