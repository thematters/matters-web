import classNames from 'classnames'

import { Card } from '~/components'
import { UserDigest } from '~/components/UserDigest'

import { TEST_ID } from '~/common/enums'
import {
  countWordsLength,
  makeSummary,
  makeTitle,
  toPath,
} from '~/common/utils'

import { ArticleDigestTitle } from '../Title'
import { fragments } from './gql'
import styles from './styles.css'

import { ArticleDigestCardArticle } from './__generated__/ArticleDigestCardArticle'

export interface ArticleDigestCardProps {
  article: ArticleDigestCardArticle

  onClick?: () => any
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
  const title = makeTitle(article.title, 70)
  const cleanedSummary = isBanned
    ? ''
    : makeSummary(summary, countWordsLength(article.title) > 40 ? 50 : 70)
  const containerClasses = classNames({
    container: true,
    'has-cover': !!cover,
  })
  const path = toPath({
    page: 'articleDetail',
    article,
  })

  return (
    <Card
      {...path}
      spacing={[0, 0]}
      borderColor={cover ? undefined : 'grey-lighter'}
      bgActiveColor={cover ? undefined : 'grey-lighter'}
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
        <header>
          <ArticleDigestTitle
            article={{ ...article, title }}
            is="h3"
            textSize="md-s"
          />

          {!cover && <p className="summary">{cleanedSummary}</p>}
        </header>

        <footer>
          <UserDigest.Mini
            user={article.author}
            avatarSize="xs"
            nameColor={cover ? 'white' : undefined}
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

ArticleDigestCard.fragments = fragments
