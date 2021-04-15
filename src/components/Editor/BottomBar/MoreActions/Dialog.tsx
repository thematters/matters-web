import _get from 'lodash/get'

import { Dialog, Translate, useDialogSwitch } from '~/components'

import ToggleAccess, { ToggleAccessProps } from '../../ToggleAccess'

type MoreActionDialogProps = {
  children: ({ open }: { open: () => void }) => React.ReactNode
} & ToggleAccessProps

const BaseMoreActionDialog = ({
  children,
  ...props
}: MoreActionDialogProps) => {
  const { show, open, close } = useDialogSwitch(true)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={show} onDismiss={close} fixedHeight>
        <Dialog.Header
          title="articleManagement"
          close={close}
          rightButton={
            <Dialog.Header.RightButton
              onClick={close}
              text={<Translate id="save" />}
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

export const MoreActionDialog = (props: MoreActionDialogProps) => (
  <Dialog.Lazy mounted={<BaseMoreActionDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)
