import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { Translate } from '~/components/Language'
import { Tooltip } from '~/components/Popper'

import { toPath } from '~/common/utils'

import { PlainDigestArticle } from './__generated__/PlainDigestArticle'
import styles from './styles.css'

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
  const { author, mediaHash, slug, title, state } = article

  if (!author || !author.userName || !mediaHash) {
    return null
  }

  const path = toPath({
    page: 'articleDetail',
    userName: author.userName,
    slug,
    mediaHash
  })
  const contentClasses = classNames({
    content: true,
    inactive: state !== 'active',
    disabled
  })

  return (
    <section className="container">
      <div className={contentClasses}>
        <Link {...path}>
          <a>
            <h2>{title}</h2>
          </a>
        </Link>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

const PlainDigestWrapper = ({
  hasArchivedTooltip,
  article,
  ...props
}: { hasArchivedTooltip?: boolean } & PlainDigestProps) => {
  const isInactive = article.state !== 'active'

  if (hasArchivedTooltip && isInactive) {
    return (
      <Tooltip
        content={
          <Translate
            zh_hant="該作品已從站內隱藏"
            zh_hans="该作品已从站内隐藏"
          />
        }
        placement="left"
      >
        <div>
          <PlainDigest article={article} {...props} />
        </div>
      </Tooltip>
    )
  }

  return <PlainDigest article={article} {...props} />
}

PlainDigestWrapper.fragments = fragments

export default PlainDigestWrapper
