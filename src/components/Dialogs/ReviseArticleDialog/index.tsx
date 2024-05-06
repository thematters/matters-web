import { FormattedMessage } from 'react-intl'

import { Dialog, useDialogSwitch } from '~/components'

import styles from './styles.module.css'

interface Props {
  children?: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  revisionCountLeft: number
}

export const ReviseArticleDialog = ({ children, revisionCountLeft }: Props) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children && children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <FormattedMessage
              defaultMessage="Notice"
              id="MIA5xy"
              description="src/components/Dialogs/ReviseArticleDialog/index.tsx"
            />
          }
        />

        <Dialog.Content>
          <Dialog.Content.Message align="left" smUpAlign="left">
            <p>
              <FormattedMessage
                defaultMessage="The revised work will be republished to decentralized network. Please backup of the previous edition before revision."
                id="9Dwh/Z"
              />{' '}
              📃
            </p>
            <p>
              <b>
                <FormattedMessage
                  defaultMessage="{left} modifications available"
                  id="gS1u3d"
                  values={{
                    left: (
                      <span className={styles.count}>{revisionCountLeft}</span>
                    ),
                  }}
                />
              </b>
            </p>
          </Dialog.Content.Message>
        </Dialog.Content>

        <Dialog.Footer
          btns={
            <Dialog.RoundedButton
              text={
                <FormattedMessage
                  defaultMessage="Edit"
                  id="rJqgwV"
                  description="src/components/Dialogs/ReviseArticleDialog/index.tsx"
                />
              }
              onClick={closeDialog}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={
                <FormattedMessage
                  defaultMessage="Edit"
                  id="rJqgwV"
                  description="src/components/Dialogs/ReviseArticleDialog/index.tsx"
                />
              }
              onClick={closeDialog}
            />
          }
        />
      </Dialog>
    </>
  )
}
