import gql from 'graphql-tag'
import React from 'react'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Card } from '~/components'
import { UserDigest } from '~/components/UserDigest'
import { UserDigestMiniProps } from '~/components/UserDigest/Mini'
import {
  ArticleDigestListArticleFragment,
  UserDigestMiniUserFragment,
} from '~/gql/graphql'

import { ArticleDigestTitle } from '../Title'
import styles from './styles.module.css'

export type ArticleDigestListProps = {
  article: ArticleDigestListArticleFragment
  user?: UserDigestMiniUserFragment

  onClick?: () => void
  onClickAuthor?: () => void

  userPlacement?: 'top' | 'bottom'
  right?: React.ReactNode
}

const fragments = {
  article: gql`
    fragment ArticleDigestListArticle on Article {
      id
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

export const ArticleDigestList = ({
  article,
  user,
  onClick,
  onClickAuthor,
  userPlacement = 'top',
  right,
}: ArticleDigestListProps) => {
  const { author } = article

  const path = toPath({
    page: 'articleDetail',
    article,
  })

  const userProps: UserDigestMiniProps = {
    user: user || author,
    avatarSize: 20,
    textSize: 12,
    hasAvatar: true,
    hasDisplayName: true,
    onClick: onClickAuthor,
  }

  return (
    <Card
      {...path}
      spacing={[0, 0]}
      bgActiveColor="none"
      onClick={onClick}
      testId={TEST_ID.DIGEST_ARTICLE_LIST}
    >
      <section className={styles.container}>
        <section className={styles.left}>
          {userPlacement === 'top' && (
            <header className={styles.user}>
              <UserDigest.Mini {...userProps} />
            </header>
          )}

          <section>
            <ArticleDigestTitle
              article={article}
              is="h2"
              textSize={14}
              textWeight="normal"
              lineClamp={1}
            />
          </section>

          {userPlacement === 'bottom' && (
            <footer className={styles.user}>
              <UserDigest.Mini {...userProps} />
            </footer>
          )}
        </section>

        {right && <section className={styles.right}>{right}</section>}
      </section>
    </Card>
  )
}

ArticleDigestList.fragments = fragments
