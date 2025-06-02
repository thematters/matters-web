import classNames from 'classnames'
import gql from 'graphql-tag'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Card, CardProps, ResponsiveImage } from '~/components'
import { UserDigest } from '~/components/UserDigest'
import { ArticleDigestSidebarArticleFragment, AssetType } from '~/gql/graphql'

import { ArticleDigestTitle, ArticleDigestTitleTextSize } from '../Title'
import styles from './styles.module.css'

export type ArticleDigestSidebarProps = {
  article: ArticleDigestSidebarArticleFragment

  titleTextSize?: ArticleDigestTitleTextSize
  hasBackground?: boolean
  hasCover?: boolean
  onClick?: () => void
  onClickAuthor?: () => void
} & CardProps

const fragments = {
  article: gql`
    fragment ArticleDigestSidebarArticle on Article {
      id
      articleState: state
      title
      slug
      shortHash
      cover
      assets {
        id
        type
        path
      }
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

export const ArticleDigestSidebar = ({
  article,

  titleTextSize = 15,
  hasBackground,
  hasCover = true,
  onClick,
  onClickAuthor,

  ...cardProps
}: ArticleDigestSidebarProps) => {
  const { articleState: state } = article
  const isBanned = state === 'banned'
  const assets = article.assets || []
  const embed = assets.find((asset) => asset.type === AssetType.Embed)
  const cover = !isBanned && hasCover ? article.cover || embed?.path : null
  const containerClasses = classNames({
    [styles.container]: true,
    [styles.hasCover]: !!cover,
    [styles.hasBackground]: !!hasBackground,
  })
  const path = toPath({
    page: 'articleDetail',
    article,
  })

  return (
    <Card
      {...path}
      spacing={[12, 12]}
      borderRadius="xtight"
      bgColor={hasBackground ? 'greyLighter' : 'none'}
      onClick={onClick}
      testId={TEST_ID.DIGEST_ARTICLE_SIDEBAR}
      {...cardProps}
    >
      <section className={containerClasses}>
        <header>
          <ArticleDigestTitle
            article={article}
            textSize={titleTextSize}
            is="h3"
          />
        </header>

        {cover && (
          <aside className={styles.cover}>
            <ResponsiveImage
              url={cover}
              width={hasBackground ? 336 : 144}
              height={hasBackground ? undefined : 144}
            />
          </aside>
        )}

        <footer className={styles.footer}>
          <UserDigest.Mini
            user={article.author}
            avatarSize={16}
            textSize={13}
            nameColor="greyDarker"
            hasAvatar
            hasDisplayName
            onClick={onClickAuthor}
          />
        </footer>
      </section>
    </Card>
  )
}

ArticleDigestSidebar.fragments = fragments
