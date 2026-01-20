import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { ArticleNewSubscriberFragment } from '~/gql/graphql'

import ActorAction from '../ActorAction'
import ArticleCard from '../ArticleCard'
import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeArticleCard from '../NoticeArticleCard'
import NoticeCard from '../NoticeCard'
import NoticeDate from '../NoticeDate'

const ArticleNewSubscriber = ({
  notice,
}: {
  notice: ArticleNewSubscriberFragment
}) => {
  return (
    <NoticeCard
      notice={notice}
      type="comment"
      action={
        <FormattedMessage
          defaultMessage="bookmarked"
          id="CD688y"
          description="src/components/Notice/ArticleNotice/ArticleNewSubscriberNotice.tsx"
        />
      }
      content={<ArticleCard article={notice.article} />}
    />
  )
}

ArticleNewSubscriber.fragments = {
  notice: gql`
    fragment ArticleNewSubscriber on ArticleNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...ActorActionUser
      }
      article: target {
        ...NoticeArticleCard
        ...ArticleCardArticle
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${ActorAction.fragments.user}
    ${NoticeArticleCard.fragments.article}
    ${ArticleCard.fragments.article}
    ${NoticeDate.fragments.notice}
  `,
}

export default ArticleNewSubscriber
