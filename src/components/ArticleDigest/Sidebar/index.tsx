import classNames from 'classnames'
import gql from 'graphql-tag'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Card, CardProps, ResponsiveImage } from '~/components'
import { UserDigest } from '~/components/UserDigest'
import { ArticleDigestSidebarArticleFragment } from '~/gql/graphql'

import { ArticleDigestTitle, ArticleDigestTitleTextSize } from '../Title'
import styles from './styles.css'

export type ArticleDigestSidebarProps = {
  article: ArticleDigestSidebarArticleFragment

  titleTextSize?: ArticleDigestTitleTextSize
  hasBackground?: boolean
  hasCover?: boolean
  onClick?: () => any
  onClickAuthor?: () => void
} & CardProps

const fragments = {
  article: gql`
    fragment ArticleDigestSidebarArticle on Article {
      id
      articleState: state
      title
      slug
      mediaHash
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

export const ArticleDigestSidebar = ({
  article,

  titleTextSize = 'md-s',
  hasBackground,
  hasCover,
  onClick,
  onClickAuthor,

  ...cardProps
}: ArticleDigestSidebarProps) => {
  const { articleState: state } = article
  const isBanned = state === 'banned'
  const cover = !isBanned && hasCover ? article.cover : null
  const containerClasses = classNames({
    container: true,
    'has-cover': !!cover,
    'has-background': !!hasBackground,
  })
  const path = toPath({
    page: 'articleDetail',
    article,
  })

  return (
    <Card
      {...path}
      spacing={['tight', 'tight']}
      borderRadius="xtight"
      bgColor={hasBackground ? 'grey-lighter' : 'none'}
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
          <aside className="cover">
            <ResponsiveImage url={cover} size="144w" />
          </aside>
        )}

        <footer>
          <UserDigest.Mini
            user={article.author}
            avatarSize="xs"
            textSize="sm-s"
            nameColor="grey-darker"
            hasAvatar
            hasDisplayName
            onClick={onClickAuthor}
          />
        </footer>

        <style jsx>{styles}</style>
      </section>
    </Card>
  )
}

ArticleDigestSidebar.fragments = fragments
