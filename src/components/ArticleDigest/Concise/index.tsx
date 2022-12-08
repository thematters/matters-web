import { DateTime, ResponsiveImage, UserDigest } from '~/components'

import { stripHtml } from '~/common/utils'

import { ArticleDigestTitle } from '../Title'
import { fragments } from './gql'
import styles from './styles.css'

import { ArticleDigestConciseArticle } from './__generated__/ArticleDigestConciseArticle'

export type ConciseProps = {
  article: ArticleDigestConciseArticle
}

export const ArticleDigestConcise = ({ article }: ConciseProps) => {
  const { author, summary } = article
  const isBanned = article.articleState === 'banned'
  const cover = !isBanned ? article.cover : null
  const cleanedSummary = isBanned ? '' : stripHtml(summary)

  return (
    <section>
      <section className="content">
        <section className="head">
          <section className="title">
            <ArticleDigestTitle article={article} textSize="xm" />
          </section>

          <section className="author">
            <UserDigest.Mini
              user={author}
              avatarSize="sm"
              textSize="sm"
              hasAvatar
              hasDisplayName
            />
          </section>
        </section>

        <p className="description">{cleanedSummary}</p>

        {cover && (
          <div className="cover">
            <ResponsiveImage url={cover} size="144w" smUpSize="360w" />
          </div>
        )}
      </section>

      {/* <FooterActions article={article} inCard date={date} {...controls} /> */}
      <section>
        <DateTime date={article.createdAt} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

ArticleDigestConcise.fragments = fragments
