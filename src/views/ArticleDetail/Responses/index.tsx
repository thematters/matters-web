import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'

import { Title, Translate } from '~/components'

import { getQuery } from '~/common/utils'

import FeatureComments from './FeaturedComments'
import LatestResponses from './LatestResponses'
import ResponseCount from './ResponseCount'

import { ArticleResponse } from './__generated__/ArticleResponse'

const ARTICLE_RESPONSE = gql`
  query ArticleResponse(
    $mediaHash: String # $after: String # $first: Int = 8
  ) {
    article(input: { mediaHash: $mediaHash }) {
      id
      live
      author {
        id
        isBlocking
      }
      ...ResponseCountArticle
    }
  }
  ${ResponseCount.fragments.article}
`

const Responses = () => {
  const router = useRouter()
  const mediaHash = getQuery({ router, key: 'mediaHash' })

  const { data, loading } = useQuery<ArticleResponse>(ARTICLE_RESPONSE, {
    variables: { mediaHash },
  })

  if (loading || !data || !data.article) {
    return null
  }

  const { article } = data

  return (
    <section className="responses" id="comments">
      <header>
        <Title type="nav" is="h2">
          <Translate id="response" />
          <ResponseCount article={article} />
        </Title>
      </header>

      <FeatureComments />
      <LatestResponses />
    </section>
  )
}

Responses.fragments = {
  article: gql`
    fragment ResponsesArticle on Article {
      id
      live
      author {
        id
        isBlocking
      }
      ...ResponseCountArticle
    }
    ${ResponseCount.fragments.article}
  `,
}

export default Responses
