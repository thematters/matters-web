import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Title, Translate } from '~/components'

import FeatureComments from './FeaturedComments'
import LatestResponses from './LatestResponses'
import ResponseCount from './ResponseCount'

import { ResponseCountArticle } from './ResponseCount/__generated__/ResponseCountArticle'
import { ArticleResponse } from './__generated__/ArticleResponse'

const ARTICLE_RESPONSE = gql`
  query ArticleResponse(
    $id: ID! # $after: String # $first: first_Int_min_0 = 8
  ) {
    article: node(input: { id: $id }) {
      ... on Article {
        id
        author {
          id
          isBlocking
        }
        ...ResponseCountArticle
      }
    }
  }
  ${ResponseCount.fragments.article}
`

const Responses = ({ id, lock }: { id: string; lock: boolean }) => {
  // const { getQuery } = useRoute()
  // const mediaHash = getQuery('mediaHash')

  const { data, loading } = useQuery<ArticleResponse>(ARTICLE_RESPONSE, {
    variables: { id },
  })

  if (loading || !data?.article) {
    return null
  }

  const { article } = data

  return (
    <section className="responses" id="comments">
      <header>
        <Title type="nav" is="h2">
          <Translate id="response" />
          <ResponseCount article={article as ResponseCountArticle} />
        </Title>
      </header>

      <FeatureComments id={(article as ResponseCountArticle).id} lock={lock} />
      <LatestResponses id={(article as ResponseCountArticle).id} lock={lock} />
    </section>
  )
}

Responses.fragments = {
  article: gql`
    fragment ResponsesArticle on Article {
      id
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
