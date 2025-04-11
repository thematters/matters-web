import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconCircleMinus } from '@/public/static/icons/24px/circle-minus.svg'
import { Icon, Menu, toast, useMutation } from '~/components'
import { BanCampaignArticleMutation } from '~/gql/graphql'

const BAN_CAMPAIGN_ARTICLE = gql`
  mutation BanCampaignArticle($campaign: ID!, $articles: [ID!]!) {
    banCampaignArticles(input: { campaign: $campaign, articles: $articles }) {
      id
    }
  }
`

const BanCampaignArticleButton = ({
  articleId,
  campaignId,
}: {
  articleId: string
  campaignId: string
}) => {
  const [update] = useMutation<BanCampaignArticleMutation>(
    BAN_CAMPAIGN_ARTICLE,
    { variables: { campaign: campaignId, articles: [articleId] } }
  )

  return (
    <Menu.Item
      text={
        <FormattedMessage defaultMessage="Move out of the event" id="HUf/E+" />
      }
      icon={<Icon icon={IconCircleMinus} size={20} />}
      textColor="red"
      textActiveColor="redDark"
      onClick={async () => {
        await update()

        toast.success({
          message: (
            <FormattedMessage
              defaultMessage="The article has been removed from the event"
              id="/wbyoV"
            />
          ),
        })
      }}
    />
  )
}

export default BanCampaignArticleButton
