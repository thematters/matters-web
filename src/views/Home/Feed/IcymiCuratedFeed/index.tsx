import React from 'react'

import { analytics } from '~/common/utils'
import { ArticleDigestCurated, Media } from '~/components'
import { IcymiCuratedFeedRecommendationFragment } from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

type IcymiCuratedFeed = {
  recommendation: IcymiCuratedFeedRecommendationFragment
}

export const IcymiCuratedFeed = ({ recommendation }: IcymiCuratedFeed) => {
  if (!recommendation.icymiTopic) {
    return null
  }

  const { articles, pinAmount, note } = recommendation.icymiTopic

  const cardArticles = articles.slice(0, pinAmount)
  // const listArticles = articles.slice(pinAmount)

  return (
    <section className={styles.container}>
      {note && (
        <section className={styles.description}>
          <span aria-hidden>/</span>
          <p>{note}</p>
          <span aria-hidden>/</span>
        </section>
      )}

      <section className={styles.cards}>
        {cardArticles.map((article, i) => {
          const cardProps = {
            article,
            onClick: () => {
              analytics.trackEvent('click_feed', {
                type: 'icymi_curated',
                contentType: 'article',
                location: i,
                id: article.id,
              })
            },
            onClickAuthor: () => {
              analytics.trackEvent('click_feed', {
                type: 'icymi_curated',
                contentType: 'user',
                location: i,
                id: article.author.id,
              })
            },
          }

          return (
            <React.Fragment key={article.id}>
              <Media at="sm">
                <ArticleDigestCurated {...cardProps} titleLineClamp={3} />
              </Media>
              <Media greaterThan="sm">
                <ArticleDigestCurated {...cardProps} titleLineClamp={2} />
              </Media>
            </React.Fragment>
          )
        })}
      </section>

      {/* {listArticles.length > 0 && (
        <section className={styles.list}>
          {listArticles.map((article) => (
            <ArticleDigestFeed article={article} key={article.id} />
          ))}
        </section>
      )} */}
    </section>
  )
}

IcymiCuratedFeed.fragments = fragments
