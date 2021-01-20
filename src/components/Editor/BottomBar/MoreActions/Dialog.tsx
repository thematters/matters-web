import _get from 'lodash/get'
import { useState } from 'react'

import { Dialog } from '~/components'

import ToggleCircle, { ToggleCircleProps } from '../../ToggleCircle'

type MoreActionDialogProps = {
  children: ({ open }: { open: () => void }) => React.ReactNode
} & ToggleCircleProps

const BaseMoreActionDialog = ({
  children,
  ...props
}: MoreActionDialogProps) => {
  const [showDialog, setShowDialog] = useState(true)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} fixedHeight>
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
