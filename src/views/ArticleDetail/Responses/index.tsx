import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { IconDisableComment24, TextIcon, Title, Translate } from '~/components'
import {
  ArticleResponseQuery,
  ResponseCountArticleFragment,
} from '~/gql/graphql'

import FeatureComments from './FeaturedComments'
import LatestResponses from './LatestResponses'
import ResponseCount from './ResponseCount'
import styles from './styles.module.css'

const ARTICLE_RESPONSE = gql`
  query ArticleResponse(
    $id: ID! # $after: String # $first: first_Int_min_0 = 8
  ) {
    article: node(input: { id: $id }) {
      ... on Article {
        id
        canComment
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

  const canComment = article.__typename === 'Article' && article.canComment
  if (!canComment) {
    return (
      <section className="disable-response">
        <TextIcon
          icon={<IconDisableComment24 size="md" />}
          color="grey"
          size="sm-s"
          allowUserSelect
        >
          <Translate
            zh_hans="作者已关闭所有回应"
            zh_hant="作者已關閉所有回應"
            en="The author has turned off all responses"
          />
        </TextIcon>
      </section>
    )
  }

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
