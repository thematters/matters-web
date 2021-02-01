import _get from 'lodash/get'

import { Dialog, useDialogSwitch } from '~/components'

import ToggleCircle, { ToggleCircleProps } from '../../ToggleCircle'

type MoreActionDialogProps = {
  children: ({ open }: { open: () => void }) => React.ReactNode
} & ToggleCircleProps

const BaseMoreActionDialog = ({
  children,
  ...props
}: MoreActionDialogProps) => {
  const { show, open, close } = useDialogSwitch(true)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={show} onDismiss={close} fixedHeight>
        <Dialog.Header title="articleManagement" close={close} />

        <Dialog.Content spacing={['base', 'base']}>
          <ToggleCircle {...props} />
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
