import React from 'react'

import { makeSummary, toPath } from '~/common/utils'
import {
  Card,
  CardProps,
  LinkWrapper,
  ResponsiveImage,
  UserDigest,
} from '~/components'
import { FollowingFeedRecommendArticlePublicFragment } from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

type Props = {
  article: FollowingFeedRecommendArticlePublicFragment
} & CardProps

const RecommendArticle = ({ article, ...cardProps }: Props) => {
  const { author, summary, title } = article
  const isBanned = article.recommendArticleState === 'banned'
  const cover = !isBanned ? article.cover : null
  const cleanedSummary = isBanned ? '' : makeSummary(summary)
  const path = toPath({
    page: 'articleDetail',
    article,
  })

  return (
    <Card
      bgActiveColor="none"
      borderRadius="xtight"
      spacing={[16, 16]}
      {...path}
      {...cardProps}
    >
      <section className={styles.container}>
        <section className={styles.head}>
          <section className={styles.wrap}>
            <p className={styles.title}>
              <LinkWrapper textActiveColor="green" {...path}>
                {title}
              </LinkWrapper>
            </p>

            <section className={styles.author}>
              <UserDigest.Mini
                user={author}
                avatarSize={16}
                textSize={14}
                hasAvatar
                hasDisplayName
              />
            </section>
          </section>

          {cover && (
            <section className={styles.cover}>
              <ResponsiveImage
                url={cover}
                width={144}
                height={144}
                disableAnimation={true}
              />
            </section>
          )}
        </section>

        <section className={styles.content}>
          <p className={styles.description}>{cleanedSummary}</p>
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
    return prevArticle.recommendArticleState === article.recommendArticleState
  }
) as MemoizedRecommendArticleType

MemoizedRecommendArticle.fragments = fragments

export default MemoizedRecommendArticle
