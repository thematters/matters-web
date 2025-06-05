import classNames from 'classnames'
import gql from 'graphql-tag'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Card, CardProps } from '~/components'
import { UserDigest } from '~/components/UserDigest'
import { ArticleDigestDropdownArticleFragment } from '~/gql/graphql'

import {
  ArticleDigestTitle,
  ArticleDigestTitleColor,
  ArticleDigestTitleIs,
  ArticleDigestTitleTextSize,
  ArticleDigestTitleTextWeight,
} from '../Title'
import styles from './styles.module.css'

export type ArticleDigestDropdownProps = {
  article: ArticleDigestDropdownArticleFragment

  nameColor?: 'grey' | 'black'
  relatedNode?: React.ReactNode
  titleTextSize?: ArticleDigestTitleTextSize
  titleIs?: ArticleDigestTitleIs
  titleTextWeight?: ArticleDigestTitleTextWeight
  titleColor?: ArticleDigestTitleColor
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
      shortHash
      state
      author {
        id
        userName
        isBlocking
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
  nameColor,
  relatedNode,
  titleTextSize,
  titleIs,
  titleTextWeight,
  titleColor,
  disabled,
  extraButton,
  lineClamp,

  // Card Props
  ...cardProps
}: ArticleDigestDropdownProps) => {
  const { articleState: state } = article
  const isBanned = state === 'banned'
  const containerClasses = classNames({
    [styles.container]: true,
    [styles.hasExtraButton]: !!extraButton,
  })
  const path = toPath({
    page: 'articleDetail',
    article,
  })
  const cardDisabled = isBanned || disabled

  return (
    <Card
      {...cardProps}
      href={cardDisabled ? undefined : path.href}
      onClick={cardDisabled ? undefined : cardProps.onClick}
      testId={TEST_ID.DIGEST_ARTICLE_DROPDOWN}
    >
      <section className={containerClasses}>
        <header>
          <ArticleDigestTitle
            article={article}
            textSize={titleTextSize}
            disabled={cardDisabled}
            is={titleIs}
            textWeight={titleTextWeight}
            lineClamp={lineClamp}
            textColor={titleColor}
          />

          <section className={styles.extraButton}>
            {!isBanned && extraButton}
          </section>
          {relatedNode}
        </header>

        <footer className={styles.footer}>
          <UserDigest.Mini
            user={article.author}
            avatarSize={16}
            textSize={13}
            nameColor={nameColor}
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
