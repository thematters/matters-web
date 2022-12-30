import React from 'react'

import { stripHtml, toPath } from '~/common/utils'
import {
  Card,
  CardProps,
  LinkWrapper,
  ResponsiveImage,
  UserDigest,
} from '~/components'
import FollowButton from '~/components/ArticleDigest/Feed/FollowButton'
import {
  FollowingFeedRecommendArticlePrivateFragment,
  FollowingFeedRecommendArticlePublicFragment,
} from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.css'

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
      <section className="container">
        <section className="head">
          <section className="wrap">
            <p className="title">
              <LinkWrapper textActiveColor="green" {...path}>
                {title}
              </LinkWrapper>
            </p>

            <section className="author">
              <UserDigest.Mini
                user={author}
                avatarSize="xs"
                textSize="sm"
                hasAvatar
                hasDisplayName
              />

              <FollowButton user={author} />
            </section>
          </section>

          {cover && (
            <section className="cover">
              <ResponsiveImage url={cover} size="144w" />
            </section>
          )}
        </section>

        <section className="content">
          <p className="description">{cleanedSummary}</p>
        </section>
      </section>

      <style jsx>{styles}</style>
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
