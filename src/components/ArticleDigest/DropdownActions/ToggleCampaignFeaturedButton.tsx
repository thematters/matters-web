import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import IconCircleMinus from '@/public/static/icons/24px/circle-minus.svg'
import IconCirclePlus from '@/public/static/icons/24px/circle-plus.svg'
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

const ToggleCampaignFeaturedButton = ({
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
      update: (cache) => {
        cache.evict({
          id: cache.identify({
            __typename: 'WritingChallenge',
            id: campaignId,
          }),
        })
        cache.gc()
      },
      onQueryUpdated(observableQuery) {
        return observableQuery.refetch()
      },
    }
  )

  return (
    <Menu.Item
      text={
        campaignFeatured ? (
          <FormattedMessage
            defaultMessage="Remove from event featured"
            id="+IYfVH"
          />
        ) : (
          <FormattedMessage
            defaultMessage="Add to event featured"
            id="2J3mz4"
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

        toast.info({
          message: campaignFeatured ? (
            <FormattedMessage
              defaultMessage="The article has been removed from the featured of the event"
              id="pZ1keA"
            />
          ) : (
            <FormattedMessage
              defaultMessage="The article has been added to the featured of the event"
              id="yxMEo/"
            />
          ),
        })
      }}
    />
  )
}

export default ToggleCampaignFeaturedButton
