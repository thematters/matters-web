import classNames from 'classnames'
import gql from 'graphql-tag'

import { Card } from '~/components'
import { UserDigest } from '~/components/UserDigest'

import {
  countWordsLength,
  makeSummary,
  makeTitle,
  toPath
} from '~/common/utils'

import ArticleTitleDigest from '../TitleDigest'
import styles from './styles.css'

import { CardDigestArticle } from './__generated__/CardDigestArticle'

interface CardDigestProps {
  article: CardDigestArticle

  onClick?: () => any
}

const fragments = {
  article: gql`
    fragment CardDigestArticle on Article {
      id
      state
      title
      slug
      mediaHash
      cover
      summary
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

const CardDigest = ({ article, onClick }: CardDigestProps) => {
  const { summary, state } = article
  const isBanned = state === 'banned'
  const cover = !isBanned ? article.cover : null
  const title = makeTitle(article.title, 70)
  const cleanedSummary = isBanned
    ? ''
    : makeSummary(summary, countWordsLength(article.title) > 40 ? 50 : 70)
  const containerClass = classNames({
    container: true,
    'has-cover': !!cover
  })
  const path = toPath({
    page: 'articleDetail',
    article
  })

  return (
    <Card
      {...path}
      spacing={[0, 0]}
      borderColor={cover ? undefined : 'grey-lighter'}
      borderRadius="xtight"
      onClick={onClick}
    >
      <section
        className={containerClass}
        style={
          cover && {
            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.16) 0%, rgba(0, 0, 0, 0.64) 100%), url("${cover}")`
          }
        }
      >
        <header>
          <ArticleTitleDigest
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
          />
        </footer>

        <style jsx>{styles}</style>
      </section>
    </Card>
  )
}

CardDigest.fragments = fragments

export default CardDigest
