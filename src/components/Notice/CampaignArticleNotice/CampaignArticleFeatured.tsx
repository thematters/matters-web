import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { CampaignArticleFeaturedFragment } from '~/gql/graphql'

import ActorAction from '../ActorAction'
import ArticleCard from '../ArticleCard'
import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeArticleCard from '../NoticeArticleCard'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeCard from '../NoticeCard'
import NoticeDate from '../NoticeDate'

const CampaignArticleFeatured = ({
  notice,
}: {
  notice: CampaignArticleFeaturedFragment
}) => {
  return (
    <NoticeCard
      notice={notice}
      type="system"
      content={
        <>
          <FormattedMessage
            defaultMessage="Great! Your work has been featured in the event!"
            description="src/components/Notice/CampaignArticleNotice/CampaignArticleFeaturedNotice.tsx"
            id="TDcpi1"
          />
          <ArticleCard article={notice.article} />
        </>
      }
    />
  )
}

CampaignArticleFeatured.fragments = {
  notice: gql`
    fragment CampaignArticleFeatured on CampaignArticleNotice {
      id
      unread
      __typename
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...ActorActionUser
      }
      campaign: target {
        id
        shortHash
      }
      article {
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

export default CampaignArticleFeatured
