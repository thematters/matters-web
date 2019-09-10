import gql from 'graphql-tag'

import { Translate } from '~/components'
import CommentForm from '~/components/Form/CommentForm'

import { TEXT } from '~/common/enums'

import { ResponsesArticle } from './__generated__/ResponsesArticle'
import FeatureComments from './FeaturedComments'
import LatestResponses from './LatestResponses'
import styles from './styles.css'

const fragments = {
  article: gql`
    fragment ResponsesArticle on Article {
      id
      responseCount
    }
  `
}

const Responses = ({ article }: { article: ResponsesArticle }) => {
  return (
    <section className="responses" id="comments">
      <header>
        <h2>
          <Translate
            zh_hant={TEXT.zh_hant.response}
            zh_hans={TEXT.zh_hans.response}
          />
          <span className="count">{article.responseCount}</span>
        </h2>

        <section>
          <CommentForm
            articleId={article.id}
            // submitCallback={refetch}
          />
        </section>
      </header>

      <FeatureComments />
      <LatestResponses />

      <style jsx>{styles}</style>
    </section>
  )
}

Responses.fragments = fragments

export default Responses
