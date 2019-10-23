import { useQuery } from 'react-apollo'

import { Translate } from '~/components'
import CommentForm from '~/components/Form/CommentForm'
import { ArticleResponseCount } from '~/components/GQL/queries/__generated__/ArticleResponseCount'
import ARTICLE_RESPONSE_COUNT from '~/components/GQL/queries/articleResponseCount'

import { REFETCH_RESPONSES, TEXT } from '~/common/enums'

import FeatureComments from './FeaturedComments'
import LatestResponses from './LatestResponses'
import styles from './styles.css'

const ResponseCount = ({ mediaHash }: { mediaHash: string }) => {
  const { data } = useQuery<ArticleResponseCount>(ARTICLE_RESPONSE_COUNT, {
    variables: { mediaHash }
  })
  const count = (data && data.article && data.article.responseCount) || 0

  return (
    <span className="count">
      {count}

      <style jsx>{styles}</style>
    </span>
  )
}

const Responses = ({
  articleId,
  mediaHash
}: {
  articleId: string
  mediaHash: string
}) => {
  const refetchResponses = () => {
    window.dispatchEvent(new CustomEvent(REFETCH_RESPONSES, {}))
  }

  return (
    <section className="responses" id="comments">
      <header>
        <h2>
          <Translate
            zh_hant={TEXT.zh_hant.response}
            zh_hans={TEXT.zh_hans.response}
          />
          <ResponseCount mediaHash={mediaHash} />
        </h2>

        <section>
          <CommentForm
            articleId={articleId}
            submitCallback={refetchResponses}
          />
        </section>
      </header>

      <FeatureComments />
      <LatestResponses />

      <style jsx>{styles}</style>
    </section>
  )
}

export default Responses
