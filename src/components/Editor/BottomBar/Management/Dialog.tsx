import _get from 'lodash/get'

import { Dialog, Translate, useDialogSwitch } from '~/components'

import ToggleAccess, { ToggleAccessProps } from '../../ToggleAccess'

type ManagementDialogProps = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
} & ToggleAccessProps

const BaseManagementDialog = ({
  children,
  ...props
}: ManagementDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} fixedHeight>
        <Dialog.Header
          title="articleManagement"
          closeDialog={closeDialog}
          leftButton={<span />}
          rightButton={
            <Dialog.Header.RightButton
              onClick={closeDialog}
              text={<Translate id="done" />}
            />
          }
        />

        <Dialog.Content spacing={['base', 'base']}>
          <ToggleAccess {...props} />
        </Dialog.Content>
      </Dialog>
    </>
  )
}

export const ManagementDialog = (props: ManagementDialogProps) => (
  <Dialog.Lazy mounted={<BaseManagementDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
