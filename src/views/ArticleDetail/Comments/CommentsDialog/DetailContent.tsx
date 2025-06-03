import { Dialog } from '~/components'

import CommentDetail from '../CommentDetail'

// interface CommentsDialogDetailContentProps {
//   closeDialog: () => void

//   backToCommentList: () => void
// }

const CommentsDialogDetailContent = () => {
  return (
    <>
      <Dialog.Content fixedHeight>
        <CommentDetail />
      </Dialog.Content>
    </>
  )
}

export default CommentsDialogDetailContent
