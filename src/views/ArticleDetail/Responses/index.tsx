import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Title, Translate } from '~/components'
import {
  ArticleResponseQuery,
  ResponseCountArticleFragment,
} from '~/gql/graphql'

import FeatureComments from './FeaturedComments'
import LatestResponses from './LatestResponses'
import ResponseCount from './ResponseCount'

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
  const { data, loading } = useQuery<ArticleResponseQuery>(ARTICLE_RESPONSE, {
    variables: { id },
  })

  if (loading || !data?.article) {
    return null
  }

  const { article } = data

  return (
    <section className="responses">
      <header>
        <Title type="nav" is="h2">
          <Translate id="responses" />
          <ResponseCount article={article as ResponseCountArticleFragment} />
        </Title>
      </header>

      <FeatureComments
        id={(article as ResponseCountArticleFragment).id}
        lock={lock}
      />
      <LatestResponses
        id={(article as ResponseCountArticleFragment).id}
        lock={lock}
      />
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
