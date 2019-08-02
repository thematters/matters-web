import classNames from 'classnames'
import gql from 'graphql-tag'

import { DateTime, Icon } from '~/components'
import { BookmarkButton } from '~/components/Button/Bookmark'
import { UserDigest } from '~/components/UserDigest'

import ICON_DOT_DIVIDER from '~/static/icons/dot-divider.svg?sprite'

import { DigestActionsArticle } from './__generated__/DigestActionsArticle'
import { ResponseDigestActionsArticle } from './__generated__/ResponseDigestActionsArticle'
import MAT from './MAT'
import ResponseCount from './ResponseCount'
import State from './State'
import styles from './styles.css'
import TopicScore from './TopicScore'

type ActionsType = 'feature' | 'feed' | 'sidebar' | 'related' | 'response'
export interface ActionsControls {
  hasAuthor?: boolean
  hasDateTime?: boolean
  hasBookmark?: boolean
  hasTopicScore?: boolean
  hasState?: boolean
}
type ActionsProps = {
  article: DigestActionsArticle | ResponseDigestActionsArticle
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
      ...ResponseCountArticle
      ...BookmarkArticle @include(if: $hasArticleDigestActionBookmark)
      ...TopicScoreArticle @include(if: $hasArticleDigestActionTopicScore)
      ...StateActionsArticle
    }
    ${UserDigest.Mini.fragments.user}
    ${MAT.fragments.article}
    ${ResponseCount.fragments.article}
    ${BookmarkButton.fragments.article}
    ${TopicScore.fragments.article}
    ${State.fragments.article}
  `,
  response: gql`
    fragment ResponseDigestActionsArticle on Article {
      author {
        ...UserDigestMiniUser @include(if: $hasArticleDigestActionAuthor)
      }
      createdAt
      ...MATArticle
      ...ResponseCountArticle
      ...BookmarkArticle @include(if: $hasArticleDigestActionBookmark)
      ...TopicScoreArticle @include(if: $hasArticleDigestActionTopicScore)
      ...ResponseStateActionsArticle
    }
    ${UserDigest.Mini.fragments.user}
    ${MAT.fragments.article}
    ${ResponseCount.fragments.article}
    ${BookmarkButton.fragments.article}
    ${TopicScore.fragments.article}
    ${State.fragments.response}
  `
}

const IconDotDivider = () => (
  <Icon
    id={ICON_DOT_DIVIDER.id}
    viewBox={ICON_DOT_DIVIDER.viewBox}
    style={{ width: 18, height: 18 }}
  />
)

const isNotActive = (article: any): boolean => {
  if (article.hasOwnProperty('state')) {
    return article.state !== 'active'
  }
  if (article.hasOwnProperty('articleState')) {
    return article.articleState !== 'active'
  }
  return true
}

const Actions = ({
  article,
  type,
  hasAuthor,
  hasDateTime,
  hasBookmark,
  hasTopicScore,
  hasState
}: ActionsProps) => {
  const isResponseMode = type === 'response'
  const size =
    ['feature', 'feed', 'response'].indexOf(type) >= 0 ? 'small' : 'xsmall'

  // used in user article feed
  if (hasState && isNotActive(article)) {
    return (
      <footer className="actions">
        <State article={article} />

        <span className="space-left">
          <DateTime date={article.createdAt} />
        </span>

        <style jsx>{styles}</style>
      </footer>
    )
  }

  const footerClassNames = classNames({
    actions: true,
    space: isResponseMode
  })

  return (
    <footer className={footerClassNames}>
      <div className="left">
        {hasAuthor && 'author' in article && (
          <span className="space-right">
            <UserDigest.Mini user={article.author} />
          </span>
        )}

        <MAT article={article} size={size} />

        <IconDotDivider />
        <ResponseCount article={article} size={size} />

        {hasBookmark && 'subscribed' in article && (
          <>
            <IconDotDivider />
            <BookmarkButton article={article} size={size} />
          </>
        )}

        {hasTopicScore && 'topicScore' in article && (
          <>
            <IconDotDivider />
            <TopicScore article={article} hasArrowIcon={type === 'sidebar'} />
          </>
        )}

        {hasDateTime && 'createdAt' in article && !isResponseMode && (
          <span className="space-left">
            <DateTime date={article.createdAt} />
          </span>
        )}
      </div>
      {hasDateTime && 'createdAt' in article && isResponseMode && (
        <DateTime date={article.createdAt} />
      )}
      <style jsx>{styles}</style>
    </footer>
  )
}

Actions.fragments = fragments

export default Actions
