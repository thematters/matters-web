import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconCircleMinus } from '@/public/static/icons/24px/circle-minus.svg'
import { ReactComponent as IconCirclePlus } from '@/public/static/icons/24px/circle-plus.svg'
import { Icon, Menu, toast, useMutation } from '~/components'
import { ToggleCampaignFeaturedArticleMutation } from '~/gql/graphql'

const TOGGLE_CAMPAIGN_FEATURED_ARTICLE = gql`
  mutation ToggleCampaignFeaturedArticle(
    $campaign: ID!
    $articles: [ID!]!
    $isFeatured: Boolean!
  ) {
    toggleWritingChallengeFeaturedArticles(
      input: { campaign: $campaign, articles: $articles, enabled: $isFeatured }
    ) {
      id
    }
  }
`

const ToggleCampaignFeatured = ({
  articleId,
  campaignId,
  campaignFeatured,
}: {
  articleId: string
  campaignId: string
  campaignFeatured: boolean
}) => {
  const [update] = useMutation<ToggleCampaignFeaturedArticleMutation>(
    TOGGLE_CAMPAIGN_FEATURED_ARTICLE,
    {
      variables: {
        campaign: campaignId,
        articles: [articleId],
        isFeatured: !campaignFeatured,
      },
    }
  )

  return (
    <Menu.Item
      text={
        campaignFeatured ? (
          <FormattedMessage
            defaultMessage="Remove featured from Free Write"
            id="ZN1IzT"
          />
        ) : (
          <FormattedMessage
            defaultMessage="Add featured on Free Write"
            id="QFCfA7"
          />
        )
      }
      icon={
        <Icon
          icon={campaignFeatured ? IconCircleMinus : IconCirclePlus}
          size={20}
        />
      }
      onClick={async () => {
        await update()

        toast.success({
          message: campaignFeatured ? (
            <FormattedMessage
              defaultMessage="The article has been removed from the Featured"
              id="jXDxa6"
            />
          ) : (
            <FormattedMessage
              defaultMessage="The article has been added to the Featured"
              id="5SgH7l"
            />
          ),
        })
      }}
    />
  )
}

export default ToggleCampaignFeatured
