import _pickBy from 'lodash/pickBy'
import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'

// import { ADD_TOAST } from '~/common/enums'
// import styles from './styles.css'

export type SetSupportSettingProps = {
  onBack?: () => any
  onClose?: () => any
}

interface SupportSettingDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), { loading: Spinner })

const BaseSupportSettingDialog = ({ children }: SupportSettingDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}
      <Dialog size="lg" isOpen={show} onDismiss={closeDialog} fixedHeight>
        <DynamicContent closeDialog={closeDialog} />
      </Dialog>
    </>
  )
}

const SupportSettingDialog = (props: SupportSettingDialogProps) => (
  <Dialog.Lazy mounted={<BaseSupportSettingDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default SupportSettingDialog
