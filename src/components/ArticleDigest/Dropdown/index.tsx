import classNames from 'classnames'
import gql from 'graphql-tag'

import { toPath } from '~/common/utils'
import { Card, CardProps } from '~/components'
import { UserDigest } from '~/components/UserDigest'
import { ArticleDigestDropdownArticleFragment } from '~/gql/graphql'

import { ArticleDigestTitle, ArticleDigestTitleTextSize } from '../Title'
import styles from './styles.module.css'

export type ArticleDigestDropdownProps = {
  article: ArticleDigestDropdownArticleFragment

  titleTextSize?: ArticleDigestTitleTextSize
  disabled?: boolean
  extraButton?: React.ReactNode
  lineClamp?: boolean
} & Pick<
  CardProps,
  'spacing' | 'bgColor' | 'bgActiveColor' | 'borderRadius' | 'onClick'
>

const fragments = {
  article: gql`
    fragment ArticleDigestDropdownArticle on Article {
      id
      title
      articleState: state
      slug
      mediaHash
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

export const ArticleDigestDropdown = ({
  article,

  titleTextSize,
  disabled,
  extraButton,
  lineClamp,

  // Card Props
  ...cardProps
}: ArticleDigestDropdownProps) => {
  const { articleState: state } = article
  const isBanned = state === 'banned'
  const containerClasses = classNames({
    container: true,
    'has-extra-button': !!extraButton,
  })
  const path = toPath({
    page: 'articleDetail',
    article,
  })
  const cardDisabled = isBanned || disabled

  return (
    <Card href={cardDisabled ? undefined : path.href} {...cardProps}>
      <section className={containerClasses}>
        <header>
          <ArticleDigestTitle
            article={article}
            textSize={titleTextSize}
            disabled={cardDisabled}
            is="h3"
            lineClamp={lineClamp}
          />

          <section className="extra-button">{!isBanned && extraButton}</section>
        </header>

        <footer>
          <UserDigest.Mini
            user={article.author}
            avatarSize="xs"
            textSize="sm-s"
            hasAvatar
            hasUserName
            hasDisplayName
            disabled={cardDisabled}
          />
        </footer>
      </section>
    </Card>
  )
}

ArticleDigestDropdown.fragments = fragments
