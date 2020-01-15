import classNames from 'classnames'
import gql from 'graphql-tag'

import { DateTime, Icon } from '~/components'
import { BookmarkButton } from '~/components/Button/Bookmark'
import { UserDigest } from '~/components/UserDigest'

import { responseStateIs } from '~/common/utils'

import Appreciation from './Appreciation'
import ResponseCount from './ResponseCount'
import State from './State'
import styles from './styles.css'
import TopicScore from './TopicScore'

import { DigestActionsArticle } from './__generated__/DigestActionsArticle'
import { ResponseDigestActionsArticle } from './__generated__/ResponseDigestActionsArticle'

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
        ...UserDigestMiniUser
      }
      createdAt
      ...AppreciationArticle
      ...ActionsResponseCountArticle
      ...BookmarkArticle
      ...TopicScoreArticle
      ...StateActionsArticle
    }
    ${UserDigest.Mini.fragments.user}
    ${Appreciation.fragments.article}
    ${ResponseCount.fragments.article}
    ${BookmarkButton.fragments.article}
    ${TopicScore.fragments.article}
    ${State.fragments.article}
  `,
  response: gql`
    fragment ResponseDigestActionsArticle on Article {
      author {
        ...UserDigestMiniUser
      }
      createdAt
      ...AppreciationArticle
      ...ActionsResponseCountArticle
      ...BookmarkArticle
      ...TopicScoreArticle
      ...ResponseStateActionsArticle
    }
    ${UserDigest.Mini.fragments.user}
    ${Appreciation.fragments.article}
    ${ResponseCount.fragments.response}
    ${BookmarkButton.fragments.article}
    ${TopicScore.fragments.article}
    ${State.fragments.response}
  `
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
  const size = ['feature', 'feed', 'response'].indexOf(type) >= 0 ? 'sm' : 'xs'

  // used in user article feed
  const isNotActive = !responseStateIs(article, 'active')
  if (hasState && isNotActive) {
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
        {hasAuthor && (
          <span className="space-right">
            <UserDigest.Mini
              user={article.author}
              avatarSize="sm"
              hasAvatar
              hasDisplayName
            />
          </span>
        )}

        <Appreciation article={article} size={size} />

        <Icon.DotDivider />
        <ResponseCount article={article} size={size} />

        {hasBookmark && 'subscribed' in article && (
          <>
            <Icon.DotDivider />
            <BookmarkButton article={article} size={size} />
          </>
        )}

        {hasTopicScore && 'topicScore' in article && (
          <>
            <Icon.DotDivider />
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
