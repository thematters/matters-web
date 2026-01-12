import gql from 'graphql-tag'

import { CampaignArticleNoticeFragment } from '~/gql/graphql'

import CampaignArticleFeatured from './CampaignArticleFeatured'

const CampaignArticleNotice = ({
  notice,
}: {
  notice: CampaignArticleNoticeFragment
}) => {
  switch (notice.campaignArticleNoticeType) {
    case 'CampaignArticleFeatured':
      return <CampaignArticleFeatured notice={notice} />
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
      ...CampaignArticleFeatured
    }
    ${CampaignArticleFeatured.fragments.notice}
  `,
}

export default CampaignArticleNotice
