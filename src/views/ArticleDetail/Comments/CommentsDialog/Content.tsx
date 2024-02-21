import { FormattedMessage } from 'react-intl'

import { Dialog, IconClose24 } from '~/components'

import LatestComments from '../LatestComments'

interface CommentsDialogContentProps {
  id: string
  lock: boolean
  closeDialog: () => void
}

const CommentsDialogContent = ({
  id,
  lock,
  closeDialog,
}: CommentsDialogContentProps) => {
  return (
    <>
      <Dialog.Header
        title={
          <>
            <FormattedMessage defaultMessage="Comment" id="LgbKvU" />
          </>
        }
        titleLeft
        rightBtn={
          <button onClick={closeDialog}>
            <IconClose24 size="md" />
          </button>
        }
      />

      <Dialog.Content>
        <LatestComments id={id} lock={lock} />
      </Dialog.Content>
    </>
  )
}

export default CommentsDialogContent
