import React from 'react'

import { stripHtml, toPath } from '~/common/utils'
import {
  Card,
  CardProps,
  LinkWrapper,
  ResponsiveImage,
  UserDigest,
} from '~/components'
import {
  FollowingFeedRecommendArticlePrivateFragment,
  FollowingFeedRecommendArticlePublicFragment,
} from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

type Props = {
  article: FollowingFeedRecommendArticlePublicFragment &
    Partial<FollowingFeedRecommendArticlePrivateFragment>
} & CardProps

const RecommendArticle = ({ article, ...cardProps }: Props) => {
  const { author, summary, title } = article
  const isBanned = article.recommendArticleState === 'banned'
  const cover = !isBanned ? article.cover : null
  const cleanedSummary = isBanned ? '' : stripHtml(summary)
  const path = toPath({
    page: 'articleDetail',
    article,
  })

  return (
    <Card
      bgActiveColor="none"
      borderRadius="xtight"
      spacing={['base', 'base']}
      {...path}
      {...cardProps}
    >
      <section className={styles['container']}>
        <section className={styles['head']}>
          <section className={styles['wrap']}>
            <p className={styles['title']}>
              <LinkWrapper textActiveColor="green" {...path}>
                {title}
              </LinkWrapper>
            </p>

            <section className={styles['author']}>
              <UserDigest.Mini
                user={author}
                avatarSize="xs"
                textSize="sm"
                hasAvatar
                hasDisplayName
              />
            </section>
          </section>

          {cover && (
            <section className={styles['cover']}>
              <ResponsiveImage url={cover} size="144w" />
            </section>
          )}
        </section>

        <section className={styles['content']}>
          <p className={styles['description']}>{cleanedSummary}</p>
        </section>
      </section>
    </Card>
  )
}

type MemoizedRecommendArticleType = React.MemoExoticComponent<
  React.FC<Props>
> & {
  fragments: typeof fragments
}

const MemoizedRecommendArticle = React.memo(
  RecommendArticle,
  ({ article: prevArticle }, { article }) => {
    return (
      prevArticle.recommendArticleState === article.recommendArticleState &&
      prevArticle.author.isFollowee === article.author.isFollowee
    )
  }
) as MemoizedRecommendArticleType

MemoizedRecommendArticle.fragments = fragments

export default MemoizedRecommendArticle
