import { ApolloClient, gql } from '@apollo/client'

import {
  GetArticleByShortHashQuery,
  GetCampaignByShortHashQuery,
  UserLanguage,
} from '~/gql/graphql'

const MAX_TITLE_LENGTH = 20

const GET_ARTICLE_BY_SHORT_HASH = gql`
  query GetArticleByShortHash($shortHash: String!) {
    article(input: { shortHash: $shortHash }) {
      id
      title
      shortHash
    }
  }
`

const GET_CAMPAIGN_BY_SHORT_HASH = gql`
  query GetCampaignByShortHash($shortHash: String!) {
    campaign(input: { shortHash: $shortHash }) {
      id
      shortHash
      ... on WritingChallenge {
        id
        nameZhHant: name(input: { language: zh_hant })
        nameZhHans: name(input: { language: zh_hans })
        nameEn: name(input: { language: en })
      }
    }
  }
`

export const makeSmartLinkOptions = ({
  client,
  lang,
}: {
  client: ApolloClient<object>
  lang: UserLanguage
}) => {
  return {
    findRule: new RegExp(
      `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/(?<type>a|e)/(?<key>[a-zA-Z0-9]+)(?:\\?.*|#.*)?`,
      'g'
    ),
    search: async ({
      key,
      type,
      replace,
    }: {
      key: string
      type: string
      replace: (text: string) => void
    }) => {
      const isArticle = type === 'a'
      const isCampaign = type === 'e'

      const query = isArticle
        ? GET_ARTICLE_BY_SHORT_HASH
        : isCampaign
          ? GET_CAMPAIGN_BY_SHORT_HASH
          : null

      if (!query) {
        return
      }

      const { data } = await client.query<
        GetArticleByShortHashQuery | GetCampaignByShortHashQuery
      >({
        query,
        variables: { shortHash: key },
      })

      let link = ''
      let title = ''
      if (isArticle && 'article' in data) {
        const article = data.article

        if (!article) {
          return
        }

        link = `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/a/${article.shortHash}`
        title = article.title
      } else if (isCampaign && 'campaign' in data) {
        const campaign = data.campaign

        if (!campaign) {
          return
        }

        link = `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/e/${campaign.shortHash}`
        title =
          lang === UserLanguage.En
            ? campaign.nameEn
            : lang === UserLanguage.ZhHans
              ? campaign.nameZhHans
              : campaign.nameZhHant
      }

      title =
        title.length > MAX_TITLE_LENGTH
          ? `${title.slice(0, MAX_TITLE_LENGTH)}...`
          : title

      replace(
        `<a target="_blank" rel="noopener noreferrer nofollow" href="${link}">${title}</a>&nbsp;`
      )
    },
  }
}
