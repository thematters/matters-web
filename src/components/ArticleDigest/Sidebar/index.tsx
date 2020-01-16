import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { Title, Translate } from '~/components'

import { TEXT, UrlFragments } from '~/common/enums'
import { toPath } from '~/common/utils'

import FooterActions from '../FooterActions'
import styles from './styles.css'

import { SidebarDigestArticle } from './__generated__/SidebarDigestArticle'

interface SidebarDigestProps {
  type?: 'collection'
  article: SidebarDigestArticle
  hasCover?: boolean
  disabled?: boolean
  extraContainerClass?: string
}

const fragments = {
  article: gql`
    fragment SidebarDigestArticle on Article {
      id
      title
      slug
      live
      cover
      author {
        id
        userName
      }
      mediaHash
      ...FooterActionsArticle
    }
    ${FooterActions.fragments.article}
  `
}

const SidebarDigest = ({
  type,
  article,
  hasCover,
  disabled,
  extraContainerClass
}: SidebarDigestProps) => {
  const { author, slug, mediaHash, live, articleState: state } = article

  if (!author || !author.userName || !slug || !mediaHash) {
    return null
  }

  const path = toPath({
    page: 'articleDetail',
    userName: author.userName,
    slug,
    mediaHash,
    fragment: live ? UrlFragments.COMMENTS : ''
  })
  const containerClasses = classNames({
    container: true,
    ...(extraContainerClass
      ? { [extraContainerClass]: extraContainerClass }
      : {})
  })
  const isBanned = state === 'banned'
  const cover = 'cover' in article && !isBanned ? article.cover : null
  const title = isBanned ? (
    <Translate
      zh_hant={TEXT.zh_hant.articleBanned}
      zh_hans={TEXT.zh_hans.articleBanned}
    />
  ) : (
    article.title
  )
  const contentClasses = classNames({
    content: true,
    'no-cover': !cover,
    'type-collection': type === 'collection',
    inactive: state !== 'active',
    disabled
  })

  const LinkWrapper: React.FC = ({ children }) =>
    isBanned ? (
      <span>{children}</span>
    ) : (
      <Link {...path}>
        <a>{children}</a>
      </Link>
    )

  return (
    <section className={containerClasses}>
      <div className={contentClasses}>
        <div className="left">
          <LinkWrapper>
            <Title type="sidebar" is="h2">
              {title}
            </Title>
          </LinkWrapper>
          <FooterActions article={article} />
        </div>

        {hasCover && cover && (
          <LinkWrapper>
            <div
              className="cover"
              style={{
                backgroundImage: `url(${cover})`
              }}
            />
          </LinkWrapper>
        )}
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

SidebarDigest.fragments = fragments

export default SidebarDigest
