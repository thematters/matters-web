import classNames from 'classnames'
import gql from 'graphql-tag'

import { DateTime } from '~/components'

import Bookmark from './Bookmark'
import CommentCount from './CommentCount'
import MAT from './MAT'

import styles from './styles.css'

interface ActionsProps {
  article: any
  type: 'feature' | 'feed' | 'sidebar' | 'related'
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
  `,
  sidebarDigest: gql`
    fragment SidebarDigestActionsArticle on Article {
      ...MATArticle
      ...CommentCountArticle
    }
    ${MAT.fragments.article}
    ${CommentCount.fragments.article}
  `
}

const Actions: React.SFC<ActionsProps> & {
  fragments: typeof fragments
} = ({ article, type }) => {
  const isShowDateTime = ['feature', 'feed'].indexOf(type) >= 0
  const isShowBookmark = ['feature', 'feed'].indexOf(type) >= 0
  const size = ['feature', 'feed'].indexOf(type) >= 0 ? 'default' : 'small'

  return (
    <footer className="actions">
      <MAT article={article} size={size} />
      <CommentCount article={article} size={size} />
      {isShowBookmark && <Bookmark />}
      {isShowDateTime && <DateTime date={article.createdAt} />}

      <style jsx>{styles}</style>
    </footer>
  )
}

Actions.fragments = fragments

export default Actions
