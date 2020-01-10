import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Translate } from '~/components'
import CommentForm from '~/components/Form/CommentForm'
import ARTICLE_RESPONSE_COUNT from '~/components/GQL/queries/articleResponseCount'

import { REFETCH_RESPONSES, TEXT } from '~/common/enums'

import FeatureComments from './FeaturedComments'
import LatestResponses from './LatestResponses'
import styles from './styles.css'

import { ArticleResponseCount } from '~/components/GQL/queries/__generated__/ArticleResponseCount'
import { ResponsesArticle } from './__generated__/ResponsesArticle'

const ResponseCount = ({ mediaHash }: { mediaHash: string }) => {
  const { data } = useQuery<ArticleResponseCount>(ARTICLE_RESPONSE_COUNT, {
    variables: { mediaHash }
  })
  const count = data?.article?.responseCount || 0

  return (
    <span className="count">
      {count}

      <style jsx>{styles}</style>
    </span>
  )
}

const Responses = ({ article }: { article: ResponsesArticle }) => {
  const refetchResponses = () => {
    if (!article.live) {
      window.dispatchEvent(new CustomEvent(REFETCH_RESPONSES, {}))
    }
  }

  return (
    <section className="responses" id="comments">
      <header>
        <h2>
          <Translate
            zh_hant={TEXT.zh_hant.response}
            zh_hans={TEXT.zh_hans.response}
          />
          <ResponseCount mediaHash={article.mediaHash || ''} />
        </h2>

        <section>
          <CommentForm
            articleId={article.id}
            articleAuthorId={article.author.id}
            submitCallback={refetchResponses}
            blocked={article.author.isBlocking}
          />
        </section>
      </header>

      <FeatureComments />
      <LatestResponses />

      <style jsx>{styles}</style>
    </section>
  )
}

Responses.fragments = {
  article: gql`
    fragment ResponsesArticle on Article {
      id
      live
      mediaHash
      author {
        id
        isBlocking
      }
    }
  `
}

export default Responses
