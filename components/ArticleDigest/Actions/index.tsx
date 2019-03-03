import gql from 'graphql-tag'

import { BookmarkButton } from '~/components/Button/Bookmark'
import { DateTime } from '~/components/DateTime'
import { Icon } from '~/components/Icon'
import { UserDigest } from '~/components/UserDigest'

import ICON_DOT_DIVIDER from '~/static/icons/dot-divider.svg?sprite'

import { DigestActionsArticle } from './__generated__/DigestActionsArticle'
import CommentCount from './CommentCount'
import MAT from './MAT'
import styles from './styles.css'
import TopicScore from './TopicScore'

type ActionsType = 'feature' | 'feed' | 'sidebar' | 'related'
export interface ActionsControls {
  hasAuthor?: boolean
  hasDateTime?: boolean
  hasBookmark?: boolean
  hasTopicScore?: boolean
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
      ...BookmarkArticle @include(if: $hasArticleDigestActionBookmark)
      ...TopicScoreArticle @include(if: $hasArticleDigestActionTopicScore)
    }
    ${UserDigest.Mini.fragments.user}
    ${MAT.fragments.article}
    ${CommentCount.fragments.article}
    ${BookmarkButton.fragments.article}
    ${TopicScore.fragments.article}
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
  hasBookmark,
  hasTopicScore
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

      {hasBookmark && 'subscribed' in article && (
        <>
          <IconDotDivider />
          <BookmarkButton article={article} />
        </>
      )}

      {hasTopicScore && 'topicScore' in article && (
        <>
          <IconDotDivider />
          <TopicScore article={article} hasArrowIcon={type === 'sidebar'} />
        </>
      )}

      {hasDateTime && 'createdAt' in article && (
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
