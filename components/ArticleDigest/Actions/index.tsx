import gql from 'graphql-tag'
import { DateTime } from '~/components'

import Bookmark from './Bookmark'
import CommentCount from './CommentCount'
import MAT from './MAT'

import styles from './styles.css'

interface ActionsProps {
  article: any
}

const fragments = {
  feedDigest: gql`
    fragment FeedDigestActionsArticle on Article {
      createdAt
      ...MATArticle
      ...CommentCountArticle
    }
    ${MAT.fragments.article}
    ${CommentCount.fragments.article}
  `
}

const Actions: React.SFC<ActionsProps> & {
  fragments: typeof fragments
} = ({ article }) => (
  <div className="actions">
    <MAT article={article} />
    <CommentCount article={article} />
    <Bookmark />
    <DateTime date={article.createdAt} />

    <style jsx>{styles}</style>
  </div>
)

Actions.fragments = fragments

export default Actions
