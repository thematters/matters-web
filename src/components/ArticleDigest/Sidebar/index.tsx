import classNames from 'classnames'
import gql from 'graphql-tag'

import { Card, CardProps, Img } from '~/components'
import { UserDigest } from '~/components/UserDigest'

import { toPath } from '~/common/utils'

import { ArticleDigestTitle, ArticleDigestTitleTextSize } from '../Title'
import styles from './styles.css'

import { ArticleDigestSidebarArticle } from './__generated__/ArticleDigestSidebarArticle'

type ArticleDigestSidebarProps = {
  article: ArticleDigestSidebarArticle

  titleTextSize?: ArticleDigestTitleTextSize
  hasBackground?: boolean
  hasCover?: boolean
  onClick?: () => any
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
            <Img url={cover} size="144w" />
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
          />
        </footer>

        <style jsx>{styles}</style>
      </section>
    </Card>
  )
}

ArticleDigestSidebar.fragments = fragments
