import gql from 'graphql-tag'

import { DateTime, Icon } from '~/components'
import { BookmarkButton } from '~/components/Button/Bookmark'
import { UserDigest } from '~/components/UserDigest'

import ICON_DOT_DIVIDER from '~/static/icons/dot-divider.svg?sprite'

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

const IconDotDivider = () => (
  <Icon
    id={ICON_DOT_DIVIDER.id}
    viewBox={ICON_DOT_DIVIDER.viewBox}
    style={{ width: 18, height: 18 }}
  />
)

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
        <span className="space-right">
          <UserDigest.Mini user={article.author} />
        </span>
      )}

      <MAT article={article} size={size} />

      <IconDotDivider />
      <CommentCount article={article} size={size} />

      {hasDateTime && 'subscribed' in article && (
        <>
          <IconDotDivider />
          <BookmarkButton article={article} />
        </>
      )}

      {hasBookmark && 'createdAt' in article && (
        <span className="space-left">
          <DateTime date={article.createdAt} />
        </span>
      )}

      <style jsx>{styles}</style>
    </footer>
  )
}

Actions.fragments = fragments

export default Actions
