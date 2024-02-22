import { FormattedMessage } from 'react-intl'

import { Dialog, IconClose24 } from '~/components'
import {
  ArticleDetailPublicQuery,
  ToolbarArticlePrivateFragment,
  ToolbarArticlePublicFragment,
} from '~/gql/graphql'

import FixedToolbar from '../../Toolbar/FixedToolbar'
import LatestComments from '../LatestComments'
import styles from './styles.module.css'

interface CommentsDialogContentProps {
  id: string
  lock: boolean
  closeDialog: () => void

  // FixedToolbar
  article: ToolbarArticlePublicFragment & Partial<ToolbarArticlePrivateFragment>
  articleDetails: NonNullable<ArticleDetailPublicQuery['article']>
  translated: boolean
  translatedLanguage?: string | null
  privateFetched: boolean
  showCommentToolbar: boolean
  openCommentsDialog?: () => void
}

const CommentsDialogContent = ({
  id,
  lock,
  closeDialog,

  // from FixedToolbar
  article,
  articleDetails,
  translated,
  translatedLanguage,
  privateFetched,
  showCommentToolbar,
  openCommentsDialog,
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

        <section className={styles.fixedToolbar}>
          <FixedToolbar
            article={article}
            articleDetails={articleDetails}
            translated={translated}
            translatedLanguage={translatedLanguage}
            privateFetched={privateFetched}
            lock={lock}
            showCommentToolbar={true}
            openCommentsDialog={openCommentsDialog}
          />
        </section>
      </Dialog.Content>
    </>
  )
}

export default CommentsDialogContent
