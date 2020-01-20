import classNames from 'classnames'
import gql from 'graphql-tag'

import { Card } from '~/components'
import { UserDigest } from '~/components/UserDigest'

import { toPath } from '~/common/utils'

import ArticleTitleDigest, { TitleDigestTextSize } from '../TitleDigest'
import styles from './styles.css'

import { SidebarDigestArticle } from './__generated__/SidebarDigestArticle'

interface CardDigestProps {
  article: SidebarDigestArticle

  titleTextSize?: TitleDigestTextSize
  hasBackground?: boolean
  hasCover?: boolean
  onClick?: () => any
}

const fragments = {
  article: gql`
    fragment SidebarDigestArticle on Article {
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
      ...TitleDigestArticle
    }
    ${UserDigest.Mini.fragments.user}
    ${ArticleTitleDigest.fragments.article}
  `
}

const CardDigest = ({
  article,

  titleTextSize = 'md-s',
  hasBackground,
  hasCover,
  onClick
}: CardDigestProps) => {
  const { title, articleState: state } = article
  const isBanned = state === 'banned'
  const cover = !isBanned && hasCover ? article.cover : null
  const containerClass = classNames({
    container: true,
    'has-cover': !!cover,
    'has-background': !!hasBackground
  })
  const path = toPath({
    page: 'articleDetail',
    article
  })

  return (
    <Card
      {...path}
      spacing={hasBackground ? ['tight', 'tight'] : [0, 0]}
      borderRadius={hasBackground ? 'xtight' : undefined}
      bgColor={hasBackground ? 'grey-lighter' : undefined}
      onClick={onClick}
    >
      <section className={containerClass}>
        <header>
          <ArticleTitleDigest
            article={{ ...article, title }}
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

CardDigest.fragments = fragments

export default CardDigest
