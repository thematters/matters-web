import { ApolloClient } from '@apollo/client'

import { GET_ARTICLE_BY_SHORT_HASH } from '~/components/GQL/queries/getArticle'
import { GetArticleByShortHashQuery } from '~/gql/graphql'

export const makeSmartLinkOptions = ({
  client,
}: {
  client: ApolloClient<{}>
}) => {
  return {
    findRule: new RegExp(
      `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/a/(?<key>[a-zA-Z0-9]+)(?:\\?.*|#.*)?`,
      'g'
    ),
    search: async ({
      key,
      replace,
    }: {
      key: string
      replace: (text: string) => void
    }) => {
      const { data } = await client.query<GetArticleByShortHashQuery>({
        query: GET_ARTICLE_BY_SHORT_HASH,
        variables: { shortHash: key },
      })
      const article = data.article

      if (!article) {
        return
      }

      const link = `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/a/${article.shortHash}`
      const MAX_TITLE_LENGTH = 20
      const title =
        article.title.length > MAX_TITLE_LENGTH
          ? `${article.title.slice(0, MAX_TITLE_LENGTH)}...`
          : article.title

      replace(
        `<a target="_blank" rel="noopener noreferrer nofollow" href="${link}">${title}</a>&nbsp;`
      )
    },
  }
}
