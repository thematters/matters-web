import gql from 'graphql-tag'

import { DateTime } from '~/components'
import { BookmarkButton } from '~/components/Button/Bookmark'
import { UserDigest } from '~/components/UserDigest'
import CommentCount from './CommentCount'
import MAT from './MAT'

import { FeedDigestActionsArticle } from './__generated__/FeedDigestActionsArticle'
import styles from './styles.css'

type ActionsType = 'feature' | 'feed' | 'sidebar' | 'related'

const fragments = {
  feedDigest: gql`
    fragment FeedDigestActionsArticle on Article {
      author {
        ...UserDigestMiniUser
      }
      createdAt
      ...MATArticle
      ...CommentCountArticle
      ...BookmarkArticle
    }
    ${UserDigest.Mini.fragments.user}
    ${MAT.fragments.article}
    ${CommentCount.fragments.article}
    ${BookmarkButton.fragments.article}
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

const Actions = ({
  article,
  type
}: {
  article: FeedDigestActionsArticle
  type: ActionsType
}) => {
  const isShowUserDigest = type === 'feature'
  const isShowDateTime = ['feature', 'feed'].indexOf(type) >= 0
  const isShowBookmark = ['feature', 'feed'].indexOf(type) >= 0
  const size = ['feature', 'feed'].indexOf(type) >= 0 ? 'default' : 'small'

  return (
    <footer className="actions">
      {isShowUserDigest && <UserDigest.Mini user={article.author} />}
      <MAT article={article} size={size} />
      <CommentCount article={article} size={size} />
      {isShowBookmark && <BookmarkButton article={article} />}
      {isShowDateTime && <DateTime date={article.createdAt} />}

      <style jsx>{styles}</style>
    </footer>
  )
}

Actions.fragments = fragments

export default Actions
