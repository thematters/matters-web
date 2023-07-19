import _get from 'lodash/get'

import { Dialog, Translate, useDialogSwitch } from '~/components'

import ToggleAccess, { ToggleAccessProps } from '../../ToggleAccess'
import ToggleResponse, { ToggleResponseProps } from '../../ToggleResponse'
import styles from './styles.module.css'

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

  const CloseButton = () => (
    <Dialog.TextButton onClick={closeDialog} text={<Translate id="done" />} />
  )

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} hidePaddingBottom>
        <Dialog.Header
          title="articleManagement"
          leftBtn={<span />}
          rightBtn={<CloseButton />}
        />

        <Dialog.Content>
          <section className={styles.response}>
            <ToggleResponse {...toggleResponseProps} />
          </section>

          <section className={styles.access}>
            <ToggleAccess {...props} />
          </section>
        </Dialog.Content>

        <Dialog.Footer smUpBtns={<CloseButton />} />
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
