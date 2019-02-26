import gql from 'graphql-tag'

import { DateTime } from '~/components'
import { BookmarkButton } from '~/components/Button/Bookmark'
import { UserDigest } from '~/components/UserDigest'

import { DigestActionsArticle } from './__generated__/DigestActionsArticle'
import CommentCount from './CommentCount'
import MAT from './MAT'
import styles from './styles.css'

type ActionsType = 'feature' | 'feed' | 'sidebar' | 'related'
export interface ActionsControls {
  hasAuthor?: boolean
  hasDateTime?: boolean
  hasBookmark?: boolean
}
type ActionsProps = {
  article: DigestActionsArticle
  type: ActionsType
} & ActionsControls

const fragments = {
  article: gql`
    fragment DigestActionsArticle on Article {
      author {
        ...UserDigestMiniUser @include(if: $hasArticleDigestActionAuthor)
      }
      createdAt
      ...MATArticle
      ...CommentCountArticle
      ...BookmarkArticle @include(if: $hasArticleDigestActionDateTime)
    }
    ${UserDigest.Mini.fragments.user}
    ${MAT.fragments.article}
    ${CommentCount.fragments.article}
    ${BookmarkButton.fragments.article}
  `
}

const Actions = ({
  article,
  type,
  hasAuthor,
  hasDateTime,
  hasBookmark
}: ActionsProps) => {
  const size = ['feature', 'feed'].indexOf(type) >= 0 ? 'default' : 'small'

  return (
    <footer className="actions">
      {hasAuthor && 'author' in article && (
        <UserDigest.Mini user={article.author} />
      )}

      <MAT article={article} size={size} />

      <CommentCount article={article} size={size} />

      {hasDateTime && 'subscribed' in article && (
        <BookmarkButton article={article} />
      )}

      {hasBookmark && 'createdAt' in article && (
        <DateTime date={article.createdAt} />
      )}

      <style jsx>{styles}</style>
    </footer>
  )
}

Actions.fragments = fragments

export default Actions
