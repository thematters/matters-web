import { Dialog, Spacer } from '~/components'
import {
  ArticleDetailPublicQuery,
  ToolbarArticlePrivateFragment,
  ToolbarArticlePublicFragment,
} from '~/gql/graphql'

import FixedToolbar from '../../Toolbar/FixedToolbar'
import LatestComments from '../LatestComments'
import styles from './styles.module.css'

interface CommentsDialogListContentProps {
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

const CommentsDialogListContent = ({
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
}: CommentsDialogListContentProps) => {
  return (
    <>
      <Dialog.Content fixedHeight>
        <LatestComments id={id} lock={lock} />
        <Spacer size="baseLoose" />
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

export default CommentsDialogListContent
