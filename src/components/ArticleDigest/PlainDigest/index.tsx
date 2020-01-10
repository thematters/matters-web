import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { Translate } from '~/components'

import { TEXT } from '~/common/enums'
import { toPath } from '~/common/utils'

import styles from './styles.css'

import { PlainDigestArticle } from './__generated__/PlainDigestArticle'

interface PlainDigestProps {
  article: PlainDigestArticle
  disabled?: boolean
}

const fragments = {
  article: gql`
    fragment PlainDigestArticle on Article {
      id
      title
      state
      slug
      author {
        id
        userName
      }
      mediaHash
    }
  `
}

const PlainDigest = ({ article, disabled }: PlainDigestProps) => {
  const { author, mediaHash, slug, state } = article

  if (!author || !author.userName || !mediaHash) {
    return null
  }

  const path = toPath({
    page: 'articleDetail',
    userName: author.userName,
    slug,
    mediaHash
  })
  const isBanned = state === 'banned'
  const title = isBanned ? (
    <Translate
      zh_hant={TEXT.zh_hant.articleBanned}
      zh_hans={TEXT.zh_hans.articleBanned}
    />
  ) : (
    article.title
  )
  const LinkWrapper: React.FC = ({ children }) =>
    isBanned ? (
      <span>{children}</span>
    ) : (
      <Link {...path}>
        <a>{children}</a>
      </Link>
    )

  const contentClasses = classNames({
    content: true,
    inactive: state !== 'active',
    disabled
  })

  return (
    <section className="container">
      <div className={contentClasses}>
        <LinkWrapper>
          <h2>{title}</h2>
        </LinkWrapper>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

PlainDigest.fragments = fragments

export default PlainDigest
