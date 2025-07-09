import { useApolloClient } from '@apollo/client'
import React, { useContext, useEffect } from 'react'

import { analytics } from '~/common/utils'
import {
  ArticleDigestFeed,
  CardExposureTracker,
  List,
  Media,
  ViewerContext,
} from '~/components'
import { IcymiCuratedFeedRecommendationFragment } from '~/gql/graphql'

import { ArticleDigestCurated } from '../ArticleDigestCurated'
import { FEED_ARTICLES_PRIVATE } from '../gql'
import { fragments } from './gql'
import styles from './styles.module.css'

type IcymiCuratedFeed = {
  recommendation: IcymiCuratedFeedRecommendationFragment
}

export const IcymiCuratedFeed = ({ recommendation }: IcymiCuratedFeed) => {
  const viewer = useContext(ViewerContext)
  const client = useApolloClient()

  const { id: rootId, articles, pinAmount } = recommendation.icymiTopic || {}
  const cardArticles = articles?.slice(0, pinAmount) || []
  const cardArticleNum = cardArticles.length
  const listArticles = articles?.slice(pinAmount) || []

  const loadPrivate = () => {
    if (!viewer.isAuthed || listArticles.length <= 0) {
      return
    }

    const publicIds = listArticles.map((article) => article.id)

    client.query({
      query: FEED_ARTICLES_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { ids: publicIds },
    })
  }

  useEffect(() => {
    loadPrivate()
  }, [])

  if (!recommendation.icymiTopic) {
    return null
  }

  const onClickArticle = (
    contentType: 'article' | 'user',
    location: number,
    id: string
  ) => {
    analytics.trackEvent('click_feed', {
      type: 'icymi_curated',
      contentType,
      location,
      id,
      rootId,
    })
  }

  return (
    <>
      <section className={styles.container}>
        <section className={styles.cards}>
          {cardArticles.map((article, i) => (
            <React.Fragment key={article.id}>
              <Media at="xs">
                <ArticleDigestCurated
                  article={article}
                  titleLineClamp={3}
                  onClick={() => onClickArticle('article', i, article.id)}
                  onClickAuthor={() =>
                    onClickArticle('user', i, article.author.id)
                  }
                />
              </Media>
              <Media greaterThan="xs">
                <ArticleDigestCurated
                  article={article}
                  titleLineClamp={2}
                  onClick={() => onClickArticle('article', i, article.id)}
                  onClickAuthor={() =>
                    onClickArticle('user', i, article.author.id)
                  }
                />
              </Media>
            </React.Fragment>
          ))}
        </section>
      </section>

      {listArticles.length > 0 && (
        <List>
          {listArticles.map((article, i) => (
            <List.Item key={article.id}>
              <ArticleDigestFeed
                article={article}
                hasBookmark={false}
                includesMetaData={false}
                excludesTimeStamp
                onClick={() =>
                  onClickArticle('article', cardArticleNum + i, article.id)
                }
                onClickAuthor={() =>
                  onClickArticle('user', cardArticleNum + i, article.author.id)
                }
              />
              <CardExposureTracker
                contentType="article"
                feedType="icymi_curated"
                location={cardArticleNum + i}
                id={article.id}
              />
            </List.Item>
          ))}
        </List>
      )}
    </>
  )
}

IcymiCuratedFeed.fragments = fragments
