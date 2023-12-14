import _get from 'lodash/get'
import { FormattedMessage } from 'react-intl'

import { Dialog, useDialogSwitch } from '~/components'

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
    <Dialog.TextButton
      onClick={closeDialog}
      text={<FormattedMessage defaultMessage="Done" id="JXdbo8" />}
    />
  )

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} hidePaddingBottom>
        <Dialog.Header
          title={
            <FormattedMessage defaultMessage="Article Management" id="ZEMcZ6" />
          }
          leftBtn={<span />}
          rightBtn={<CloseButton />}
        />

        <Dialog.Content noSpacing>
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
