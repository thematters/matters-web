import { FormattedMessage } from 'react-intl'

import { Dialog, IconArrowLeft24, IconClose24 } from '~/components'

import CommentDetail from '../CommentDetail'

interface CommentsDialogDetailContentProps {
  closeDialog: () => void

  backToCommentList: () => void
}

const CommentsDialogDetailContent = ({
  closeDialog,

  backToCommentList,
}: CommentsDialogDetailContentProps) => {
  return (
    <>
      <Dialog.Header
        title={
          <section>
            <FormattedMessage defaultMessage="Comment Details" id="4OMGUj" />
          </section>
        }
        leftBtn={
          <button onClick={backToCommentList}>
            <IconArrowLeft24 size="md" />
          </button>
        }
        rightBtn={
          <button
            onClick={() => {
              backToCommentList()
              closeDialog()
            }}
          >
            <IconClose24 size="md" />
          </button>
        }
      />

      <Dialog.Content>
        <CommentDetail />
      </Dialog.Content>
    </>
  )
}

export default CommentsDialogDetailContent
