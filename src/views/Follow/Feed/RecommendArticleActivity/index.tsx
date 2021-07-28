import { ArticleDigestFeed, Tag, Translate } from '~/components'

import FeedHead from '../FollowingFeedHead'
import { fragments } from './gql'

import { RecommendArticleActivity as Activity } from './__generated__/RecommendArticleActivity'

const RecommendArticleActivity = ({ article }: { article: Activity }) => {
  const tag = article.tags && article.tags[0]

  return (
    <ArticleDigestFeed
      header={
        tag && (
          <FeedHead>
            <span>
              <Translate zh_hant="發布於" zh_hans="发布于" en="published on" />
            </span>
            <Tag type="plain" tag={tag} textSize="sm-s" iconSize="sm-s" />
          </FeedHead>
        )
      }
      hasFollow
      article={article}
      date={false}
    />
  )
}

RecommendArticleActivity.fragments = fragments

export default RecommendArticleActivity
