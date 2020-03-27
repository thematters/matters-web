import classNames from 'classnames'
import gql from 'graphql-tag'

import { Card } from '~/components'
import { UserDigest } from '~/components/UserDigest'

import { toPath } from '~/common/utils'

import { ArticleDigestTitle, ArticleDigestTitleTextSize } from '../Title'
import styles from './styles.css'

import { ArticleDigestSidebarArticle } from './__generated__/ArticleDigestSidebarArticle'

interface ArticleDigestSidebarProps {
  article: ArticleDigestSidebarArticle

  titleTextSize?: ArticleDigestTitleTextSize
  hasBackground?: boolean
  hasCover?: boolean
  onClick?: () => any
}

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
}: ArticleDigestSidebarProps) => {
  const { articleState: state } = article
  const isBanned = state === 'banned'
  const cover = !isBanned && hasCover ? article.cover : null
  const containerClass = classNames({
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
      spacing={hasBackground ? ['tight', 'tight'] : [0, 0]}
      borderRadius={hasBackground ? 'xtight' : undefined}
      bgColor={hasBackground ? 'grey-lighter' : 'none'}
      onClick={onClick}
    >
      <section className={containerClass}>
        <header>
          <ArticleDigestTitle
            article={article}
            textSize={titleTextSize}
            is="h3"
          />
        </header>

        {cover && (
          <aside
            className="cover"
            style={{ backgroundImage: `url("${cover}")` }}
          />
        )}

        <footer>
          <UserDigest.Mini
            user={article.author}
            avatarSize="xs"
            textSize="sm-s"
            nameColor="grey-darker"
            hasAvatar
            hasDisplayName
          />
        </footer>

        <style jsx>{styles}</style>
      </section>
    </Card>
  )
}

ArticleDigestSidebar.fragments = fragments
