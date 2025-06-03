import classNames from 'classnames'

import { TEST_ID } from '~/common/enums'
import {
  countChars,
  makeSummary,
  normalizeArticleTitle,
  toPath,
} from '~/common/utils'
import { Card } from '~/components'
import { UserDigest } from '~/components/UserDigest'
import { ArticleDigestCardArticleFragment } from '~/gql/graphql'

import { ArticleDigestTitle } from '../Title'
import { fragments } from './gql'
import styles from './styles.module.css'

export interface ArticleDigestCardProps {
  article: ArticleDigestCardArticleFragment

  onClick?: () => void
  onClickAuthor?: () => void
}

export const ArticleDigestCard = ({
  article,
  onClick,
  onClickAuthor,
}: ArticleDigestCardProps) => {
  const { summary, state } = article
  const isBanned = state === 'banned'
  const cover = !isBanned ? article.cover : null
  const title = normalizeArticleTitle(article.title, 70)
  const cleanedSummary = isBanned
    ? ''
    : makeSummary(summary, countChars(article.title) > 40 ? 50 : 70)
  const containerClasses = classNames({
    [styles.container]: true,
    [styles.hasCover]: !!cover,
  })
  const path = toPath({
    page: 'articleDetail',
    article,
  })

  return (
    <Card
      {...path}
      spacing={[0, 0]}
      borderColor={cover ? undefined : 'greyLighter'}
      bgActiveColor={cover ? undefined : 'greyLighter'}
      borderRadius="xtight"
      onClick={onClick}
      testId={TEST_ID.DIGEST_ARTICLE_CARD}
    >
      <section
        className={containerClasses}
        style={
          cover
            ? {
                backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.16) 0%, rgba(0, 0, 0, 0.64) 100%), url("${cover}")`,
              }
            : undefined
        }
      >
        <header className={styles.header}>
          <ArticleDigestTitle
            article={{ ...article, title }}
            is="h3"
            textSize={15}
          />

          {!cover && <p className={styles.summary}>{cleanedSummary}</p>}
        </header>

        <footer className={styles.footer}>
          <UserDigest.Mini
            user={article.author}
            avatarSize={16}
            nameColor={cover ? 'white' : undefined}
            hasAvatar
            hasDisplayName
            onClick={onClickAuthor}
          />
        </footer>
      </section>
    </Card>
  )
}

ArticleDigestCard.fragments = fragments
