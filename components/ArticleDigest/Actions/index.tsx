import gql from 'graphql-tag'

import { DateTime } from '~/components'
import { BookmarkButton } from '~/components/Button/Bookmark'
import { UserDigest } from '~/components/UserDigest'

import { FeatureDigestActionsArticle } from './__generated__/FeatureDigestActionsArticle'
import { FeedDigestActionsArticle } from './__generated__/FeedDigestActionsArticle'
import { RelatedDigestActionsArticle } from './__generated__/RelatedDigestActionsArticle'
import { SidebarDigestActionsArticle } from './__generated__/SidebarDigestActionsArticle'
import CommentCount from './CommentCount'
import MAT from './MAT'
import styles from './styles.css'

type ActionsType = 'feature' | 'feed' | 'sidebar' | 'related'

// TODO: refactor
const fragments = {
  featureDigest: gql`
    fragment FeatureDigestActionsArticle on Article {
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
  feedDigest: gql`
    fragment FeedDigestActionsArticle on Article {
      createdAt
      ...MATArticle
      ...CommentCountArticle
      ...BookmarkArticle
    }
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
  `,
  relatedDigest: gql`
    fragment RelatedDigestActionsArticle on Article {
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
  article:
    | FeatureDigestActionsArticle
    | FeedDigestActionsArticle
    | SidebarDigestActionsArticle
    | RelatedDigestActionsArticle
  type: ActionsType
}) => {
  const isShowUserDigest = type === 'feature'
  const isShowDateTime = ['feature', 'feed'].indexOf(type) >= 0
  const isShowBookmark = ['feature', 'feed'].indexOf(type) >= 0
  const size = ['feature', 'feed'].indexOf(type) >= 0 ? 'default' : 'small'

  return (
    <footer className="actions">
      {isShowUserDigest && 'author' in article && (
        <UserDigest.Mini user={article.author} />
      )}

      <MAT article={article} size={size} />

      <CommentCount article={article} size={size} />

      {isShowBookmark && 'subscribed' in article && (
        <BookmarkButton article={article} />
      )}

      {isShowDateTime && 'createdAt' in article && (
        <DateTime date={article.createdAt} />
      )}

      <style jsx>{styles}</style>
    </footer>
  )
}

Actions.fragments = fragments

export default Actions
