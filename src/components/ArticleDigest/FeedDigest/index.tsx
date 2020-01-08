import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { Icon, Title } from '~/components'
import { Fingerprint } from '~/components/Fingerprint'
import { Translate } from '~/components/Language'
import { TextIcon } from '~/components/TextIcon'
import { UserDigest } from '~/components/UserDigest'

import { TEXT, UrlFragments } from '~/common/enums'
import { responseStateIs, stripHtml, toPath } from '~/common/utils'

import Actions, { ActionsControls } from '../Actions'
import DropdownActions from '../DropdownActions'
import { FeedDigestArticle } from './__generated__/FeedDigestArticle'
import { FolloweeFeedDigestArticle } from './__generated__/FolloweeFeedDigestArticle'
import styles from './styles.css'

const fragments = {
  article: gql`
    fragment FeedDigestArticle on Article {
      id
      title
      state
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
      ...DigestActionsArticle
      ...FingerprintArticle
      ...DropdownActionsArticle
    }
    ${UserDigest.Mini.fragments.user}
    ${Actions.fragments.article}
    ${Fingerprint.fragments.article}
    ${DropdownActions.fragments.article}
  `,
  followee: gql`
    fragment FolloweeFeedDigestArticle on Article {
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
      ...ResponseDigestActionsArticle
      ...FingerprintArticle
      ...FolloweeDropdownActionsArticle
    }
    ${UserDigest.Mini.fragments.user}
    ${Actions.fragments.response}
    ${Fingerprint.fragments.article}
    ${DropdownActions.fragments.followee}
  `
}

const FeedDigest = ({
  article,
  hasFingerprint,
  hasMoreButton,
  hasSticky,
  inFolloweeFeed,
  inTagDetail = false,
  ...actionControls
}: { article: FeedDigestArticle | FolloweeFeedDigestArticle } & {
  hasFingerprint?: boolean
  hasMoreButton?: boolean
  hasSticky?: boolean
  inFolloweeFeed?: boolean
  inTagDetail?: boolean
} & ActionsControls) => {
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
  const isBanned = responseStateIs(article, 'banned')
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
          <UserDigest.Mini user={author} />
          {inFolloweeFeed && (
            <>
              <span className="published-description">
                <Translate
                  zh_hant={TEXT.zh_hant.publishedDescription}
                  zh_hans={TEXT.zh_hans.publishedDescription}
                />
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

          <Actions article={article} type="feed" {...actionControls} />
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
