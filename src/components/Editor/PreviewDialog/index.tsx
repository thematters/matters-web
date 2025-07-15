import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { Dialog, useDialogSwitch } from '~/components'
import { EditorPreviewDialogDraftFragment } from '~/gql/graphql'

import { FeedDigest } from './FeedDigest'
import styles from './styles.module.css'

const fragment = gql`
  fragment EditorPreviewDialogDraft on Draft {
    ...FeedDigestDraft
  }
`

export type PreviewDialogButtons = {
  confirmButtonText?: string | React.ReactNode
  cancelButtonText?: string | React.ReactNode
  onConfirm?: () => void
}

export type EditorPreviewDialogProps = {
  draft: EditorPreviewDialogDraftFragment
  saving: boolean
  disabled: boolean

  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
} & PreviewDialogButtons

const BaseEditorPreviewDialog = ({
  draft,
  saving,
  disabled,
  confirmButtonText,
  cancelButtonText,
  onConfirm,

  children,
}: EditorPreviewDialogProps) => {
  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog,
  } = useDialogSwitch(true)

  const openDialog = () => {
    baseOpenDialog()
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog
        fixedWidth={false}
        isOpen={show}
        onDismiss={closeDialog}
        dismissOnClickOutside={false}
        dismissOnESC={false}
      >
        <Dialog.Header
          title={
            <FormattedMessage
              defaultMessage="Preview"
              id="b0JEjP"
              description="src/components/Editor/PreviewDialog/index.tsx"
            />
          }
          closeDialog={cancelButtonText ? closeDialog : undefined}
          closeText={cancelButtonText || undefined}
          rightBtn={
            <Dialog.TextButton
              text={confirmButtonText}
              onClick={() => {
                onConfirm?.()
              }}
              loading={saving}
              disabled={disabled}
            />
          }
        />
        <Dialog.Content>
          <ul className={styles.container} role="list">
            <li>
              <FeedDigest draft={draft} />
            </li>
          </ul>
        </Dialog.Content>

        {(confirmButtonText || cancelButtonText) && (
          <Dialog.Footer
            smUpBtns={
              <>
                <Dialog.TextButton
                  text={cancelButtonText}
                  color="greyDarker"
                  onClick={closeDialog}
                />
                <Dialog.TextButton
                  text={confirmButtonText}
                  onClick={() => {
                    onConfirm?.()
                  }}
                  loading={saving}
                  disabled={disabled}
                />
              </>
            }
          />
        )}
      </Dialog>
    </>
  )
}

export const EditorPreviewDialog = (props: EditorPreviewDialogProps) => (
  <Dialog.Lazy mounted={<BaseEditorPreviewDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

EditorPreviewDialog.fragment = fragment
