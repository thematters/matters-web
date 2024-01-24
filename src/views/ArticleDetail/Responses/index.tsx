import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { IconDisableComment24, TextIcon, Translate } from '~/components'
import {
  ArticleResponseQuery,
  ResponseCountArticleFragment,
} from '~/gql/graphql'

import LatestResponses from './LatestResponses'
import { Placeholder } from './Placeholder'
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
    return <Placeholder />
  }

  const { article } = data

  const canComment = article.__typename === 'Article' && article.canComment
  if (!canComment) {
    return (
      <section className={styles.disableResponse}>
        <TextIcon
          icon={<IconDisableComment24 size="md" />}
          color="grey"
          size="smS"
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
    <section className={styles.responses}>
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

Responses.Placeholder = Placeholder

export default Responses
