import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { Icon, Title } from '~/components'
import { Fingerprint } from '~/components/Fingerprint'
import { Translate } from '~/components/Language'
import { TextIcon } from '~/components/TextIcon'
import { UserDigest } from '~/components/UserDigest'

import { TEXT, UrlFragments } from '~/common/enums'
import { stripHtml, toPath } from '~/common/utils'

import DropdownActions from '../DropdownActions'
import FooterActions from '../FooterActions'
import styles from './styles.css'

import { FeedDigestArticle } from './__generated__/FeedDigestArticle'

const fragments = {
  article: gql`
    fragment FeedDigestArticle on Article {
      id
      title
      articleState: state
      slug
      cover
      summary
      mediaHash
      live
      author {
        id
        userName
        ...UserDigestMiniUser
      }
      ...FooterActionsArticle
      ...FingerprintArticle
      ...DropdownActionsArticle
    }
    ${UserDigest.Mini.fragments.user}
    ${FooterActions.fragments.article}
    ${Fingerprint.fragments.article}
    ${DropdownActions.fragments.article}
  `
}

const FeedDigest = ({
  article,
  hasFingerprint,
  hasMoreButton,
  hasSticky,
  inFolloweeFeed,
  inTagDetail = false
}: { article: FeedDigestArticle } & {
  hasFingerprint?: boolean
  hasMoreButton?: boolean
  hasSticky?: boolean
  inFolloweeFeed?: boolean
  inTagDetail?: boolean
}) => {
  const { author, slug, mediaHash, summary, live, sticky } = article

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
  const isBanned = article.articleState === 'banned'
  const cover = !isBanned ? article.cover : null
  const title = isBanned ? (
    <Translate
      zh_hant={TEXT.zh_hant.articleBanned}
      zh_hans={TEXT.zh_hans.articleBanned}
    />
  ) : (
    article.title
  )
  const cleanedSummary = isBanned ? '' : stripHtml(summary)
  const contentClasses = classNames({
    content: true,
    'no-cover': !cover
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
    <section className="container">
      {hasSticky && sticky && (
        <div className="sticky">
          <TextIcon icon={<Icon.Sticky />} size="sm" color="grey" weight="md">
            <Translate zh_hant="置頂作品" zh_hans="置顶作品" />
          </TextIcon>
        </div>
      )}
      <div className="header">
        <div className="info">
          <UserDigest.Mini
            user={author}
            avatarSize="sm"
            hasAvatar
            hasDisplayName
          />

          {inFolloweeFeed && (
            <>
              <span className="published-description">
                <Translate zh_hant="發佈了作品" zh_hans="发布了作品" />
              </span>
            </>
          )}
        </div>
        <div>
          {!hasFingerprint && live && <Icon.Live />}
          {hasFingerprint && <Fingerprint article={article} />}
          {hasMoreButton && (
            <DropdownActions article={article} inTagDetail={inTagDetail} />
          )}
        </div>
      </div>

      <div className={contentClasses}>
        <div className="title">
          <LinkWrapper>
            <Title type="feed" is="h2">
              {title}
            </Title>
          </LinkWrapper>
        </div>
        <div className="description">
          <LinkWrapper>
            <p>{cleanedSummary}</p>
          </LinkWrapper>

          <FooterActions article={article} />
        </div>

        {cover && (
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

FeedDigest.fragments = fragments

export default FeedDigest
