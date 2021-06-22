import _get from 'lodash/get'

import { Dialog, Translate, useDialogSwitch } from '~/components'

import ToggleAccess, { ToggleAccessProps } from '../../ToggleAccess'

type AccessDialogProps = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
} & ToggleAccessProps

const BaseAccessDialog = ({ children, ...props }: AccessDialogProps) => {
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

const AccessDialog = (props: AccessDialogProps) => (
  <Dialog.Lazy mounted={<BaseAccessDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default AccessDialog
