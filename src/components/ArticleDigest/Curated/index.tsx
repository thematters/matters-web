import gql from 'graphql-tag'

import IMAGE_DEFAULT_CURATED from '@/public/static/images/default-curated.svg?url'
import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Card, CardProps, LinkWrapper, ResponsiveImage } from '~/components'
import { UserDigest } from '~/components/UserDigest'
import { ArticleDigestCuratedArticleFragment } from '~/gql/graphql'

import { ArticleDigestTitle } from '../Title'
import styles from './styles.module.css'

export type ArticleDigestCuratedProps = {
  article: ArticleDigestCuratedArticleFragment

  titleLineClamp?: 2 | 3

  onClick?: () => any
  onClickAuthor?: () => void
} & CardProps

const fragments = {
  article: gql`
    fragment ArticleDigestCuratedArticle on Article {
      id
      articleState: state
      title
      slug
      shortHash
      cover
      author {
        id
        userName
        ...UserDigestMiniUser
      }
      ...ArticleDigestTitleArticle
    }
    ${UserDigest.Mini.fragments.user}
    ${ArticleDigestTitle.fragments.article}
  `,
}

export const ArticleDigestCurated = ({
  article,

  titleLineClamp,

  onClick,
  onClickAuthor,

  ...cardProps
}: ArticleDigestCuratedProps) => {
  const isBanned = article.articleState === 'banned'
  const cover = !isBanned ? article.cover : null
  const path = toPath({
    page: 'articleDetail',
    article,
  })

  return (
    <Card
      {...path}
      spacing={[0, 0]}
      bgColor="none"
      onClick={onClick}
      testId={TEST_ID.DIGEST_ARTICLE_CURATED}
      {...cardProps}
    >
      <section
        className={styles.cover}
        data-test-id={TEST_ID.DIGEST_ARTICLE_FEED_COVER}
      >
        <LinkWrapper {...path} onClick={onClick}>
          <ResponsiveImage
            url={cover || IMAGE_DEFAULT_CURATED}
            width={404}
            height={404}
          />
        </LinkWrapper>
      </section>

      <section className={styles.author}>
        <UserDigest.Mini
          user={article.author}
          avatarSize={20}
          textSize={13}
          nameColor="black"
          spacing={4}
          hasAvatar
          hasDisplayName
          onClick={onClickAuthor}
        />
      </section>

      <section className={styles.title}>
        <ArticleDigestTitle
          article={article}
          textSize={16}
          lineClamp={titleLineClamp}
        />
      </section>
    </Card>
  )
}

ArticleDigestCurated.fragments = fragments
