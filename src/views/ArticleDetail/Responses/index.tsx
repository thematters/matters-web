import gql from 'graphql-tag'

import { Comment, Translate } from '~/components'

import { REFETCH_RESPONSES, TEXT } from '~/common/enums'

import FeatureComments from './FeaturedComments'
import LatestResponses from './LatestResponses'
import ResponseCount from './ResponseCount'
import styles from './styles.css'

import { ResponsesArticle } from './__generated__/ResponsesArticle'

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
          <ResponseCount article={article} />
        </h2>

        <section>
          <Comment.Form
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
      author {
        id
        isBlocking
      }
      ...ResponseCountArticle
    }
    ${ResponseCount.fragments.article}
  `
}

export default Responses
