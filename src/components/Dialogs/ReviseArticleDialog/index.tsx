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
              defaultMessage="{left} modifications available"
              id="gS1u3d"
              values={{
                left: <span className={styles.count}>{revisionCountLeft}</span>,
              }}
            />
          }
        />

        <Dialog.Content>
          <Dialog.Content.Message align="left" smUpAlign="left">
            <p>
              <FormattedMessage
                defaultMessage='After the modification is completed, the new version will be released to IPFS again. You can view the historical version from "...published on IPFS" under the article title.'
                id="HJcB0d"
              />
              📃
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
