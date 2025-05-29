import { Dialog, Spacer } from '~/components'
import { ArticleDetailPublicQuery } from '~/gql/graphql'

import FixedToolbar from '../../Toolbar/FixedToolbar'
import LatestComments from '../LatestComments'
import styles from './styles.module.css'

interface CommentsDialogListContentProps {
  id: string
  lock: boolean
  closeDialog: () => void

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

  articleDetails,
  translated,
  translatedLanguage,
  privateFetched,
  openCommentsDialog,
}: CommentsDialogListContentProps) => {
  return (
    <>
      <Dialog.Content fixedHeight>
        <LatestComments id={id} lock={lock} />
        <Spacer size="sp20" />
        <section className={styles.fixedToolbar}>
          <FixedToolbar
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
