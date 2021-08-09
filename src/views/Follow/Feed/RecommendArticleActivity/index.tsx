import { Slides } from '~/components'

import FollowingRecommendArticle from '../FollowingRecommendArticle'
import FollowingRecommendHead from '../FollowingRecommendHead'
import { fragments } from './gql'

import { ArticleRecommendationActivitySource } from '@/__generated__/globalTypes'
import { RecommendArticleActivity_recommendArticles } from './__generated__/RecommendArticleActivity'

interface Props {
  articles: RecommendArticleActivity_recommendArticles[] | null
  source: ArticleRecommendationActivitySource | null
}

const RecommendArticleActivity = ({ articles, source }: Props) => {
  if (!articles || articles.length <= 0 || !source) {
    return null
  }

  const type = source === 'UserDonation' ? 'article' : 'recommend'

  return (
    <Slides
      bgColor="grey-lighter"
      header={<FollowingRecommendHead type={type} />}
    >
      {articles.map((article, index) => (
        <Slides.Item size="md" key={index}>
          <section>
            <FollowingRecommendArticle article={article} />
          </section>
        </Slides.Item>
      ))}
    </Slides>
  )
}

RecommendArticleActivity.fragments = fragments

export default RecommendArticleActivity
