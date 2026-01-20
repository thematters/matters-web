import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { ArticleNewCollectedFragment } from '~/gql/graphql'

import ActorAction from '../ActorAction'
import ArticleCard from '../ArticleCard'
import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeArticleCard from '../NoticeArticleCard'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeCard from '../NoticeCard'
import NoticeDate from '../NoticeDate'

const ArticleNewCollected = ({
  notice,
}: {
  notice: ArticleNewCollectedFragment
}) => {
  return (
    <NoticeCard
      notice={notice}
      type="comment"
      action={
        <FormattedMessage
          defaultMessage="connected"
          id="YlPCRU"
          description="src/components/Notice/ArticleArticleNotice/ArticleNewCollectedNotice.tsx"
        />
      }
      content={
        <>
          <ArticleCard article={notice.article} />
          <ArticleCard
            article={notice.collection}
            hasIcon={false}
            hasBorder={true}
          />
        </>
      }
    />
  )
}

ArticleNewCollected.fragments = {
  notice: gql`
    fragment ArticleNewCollected on ArticleArticleNotice {
      id
      unread
      __typename
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...ActorActionUser
      }
      article: target {
        ...NoticeArticleTitle
        ...ArticleCardArticle
      }
      collection: article {
        ...NoticeArticleCard
        ...ArticleCardArticle
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${ActorAction.fragments.user}
    ${NoticeArticleTitle.fragments.article}
    ${NoticeArticleCard.fragments.article}
    ${ArticleCard.fragments.article}
    ${NoticeDate.fragments.notice}
  `,
}

export default ArticleNewCollected
