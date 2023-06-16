import _get from 'lodash/get'

import { Dialog, Spacer, Translate, useDialogSwitch } from '~/components'

import ToggleAccess, { ToggleAccessProps } from '../../ToggleAccess'
import ToggleResponse, { ToggleResponseProps } from '../../ToggleResponse'

type AccessDialogProps = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
} & ToggleAccessProps &
  ToggleResponseProps

const BaseAccessDialog = ({
  children,
  canComment,
  toggleComment,
  ...props
}: AccessDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const toggleResponseProps: ToggleResponseProps = {
    canComment,
    toggleComment,
    disableChangeCanComment: props.article?.canComment,
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} hidePaddingBottom>
        <Dialog.Header
          title="articleManagement"
          closeDialog={closeDialog}
          leftBtn={<span />}
          rightBtn={
            <Dialog.TextButton
              color="green"
              onClick={closeDialog}
              text={<Translate id="done" />}
            />
          }
        />

        <Dialog.Content spacing={['base', 'base']}>
          <ToggleResponse {...toggleResponseProps} />
          <Spacer size="base" />
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
