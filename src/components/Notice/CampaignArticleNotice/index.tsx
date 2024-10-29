import gql from 'graphql-tag'

import { CampaignArticleNoticeFragment } from '~/gql/graphql'

import CampaignArticleFeaturedNotice from './CampaignArticleFeaturedNotice'

const CampaignArticleNotice = ({
  notice,
}: {
  notice: CampaignArticleNoticeFragment
}) => {
  switch (notice.campaignArticleNoticeType) {
    case 'CampaignArticleFeatured':
      return <CampaignArticleFeaturedNotice notice={notice} />
    default:
      return null
  }
}

CampaignArticleNotice.fragments = {
  notice: gql`
    fragment CampaignArticleNotice on CampaignArticleNotice {
      id
      unread
      __typename
      campaignArticleNoticeType: type
      ...CampaignArticleFeaturedNotice
    }
    ${CampaignArticleFeaturedNotice.fragments.notice}
  `,
}

export default CampaignArticleNotice
