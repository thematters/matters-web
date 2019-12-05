import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { Title } from '~/components'
import { Fingerprint } from '~/components/Fingerprint'
import { Icon } from '~/components/Icon'
import IconLive from '~/components/Icon/Live'
import { Translate } from '~/components/Language'
import { TextIcon } from '~/components/TextIcon'
import { UserDigest } from '~/components/UserDigest'

import { TEXT, UrlFragments } from '~/common/enums'
import { stripHtml, toPath } from '~/common/utils'
import ICON_STICKY from '~/static/icons/sticky.svg?sprite'

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
  const {
    cover,
    author,
    slug,
    mediaHash,
    title,
    summary,
    live,
    sticky
  } = article

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
  const contentClasses = classNames({
    content: true,
    'no-cover': !cover
  })
  const cleanedSummary = stripHtml(summary)

  return (
    <section className="container">
      {hasSticky && sticky && (
        <div className="sticky">
          <TextIcon
            icon={
              <Icon
                id={ICON_STICKY.id}
                viewBox={ICON_STICKY.viewBox}
                size="small"
              />
            }
            size="sm"
            color="grey"
            weight="medium"
          >
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
          {!hasFingerprint && live && <IconLive />}
          {hasFingerprint && <Fingerprint article={article} />}
          {hasMoreButton && (
            <DropdownActions article={article} inTagDetail={inTagDetail} />
          )}
        </div>
      </div>

      <div className={contentClasses}>
        <div className="title">
          <Link {...path}>
            <a>
              <Title type="feed" is="h2">
                {title}
              </Title>
            </a>
          </Link>
        </div>
        <div className="description">
          <Link {...path}>
            <a>
              <p>{cleanedSummary}</p>
            </a>
          </Link>

          <Actions article={article} type="feed" {...actionControls} />
        </div>

        {cover && (
          <Link {...path}>
            <a>
              <div
                className="cover"
                style={{
                  backgroundImage: `url(${cover})`
                }}
              />
            </a>
          </Link>
        )}
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

FeedDigest.fragments = fragments

export default FeedDigest
