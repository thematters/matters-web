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

import { UrlFragments } from '~/common/enums'
import { stripHtml, toPath } from '~/common/utils'
import ICON_STICKY from '~/static/icons/sticky.svg?sprite'

import Actions, { ActionsControls } from '../Actions'
import DropdownActions from '../DropdownActions'
import { FeedDigestArticle } from './__generated__/FeedDigestArticle'
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
  `
}

const FeedDigest = ({
  article,
  hasFingerprint,
  hasMoreButton,
  hasSticky,
  refetch,
  ...actionControls
}: { article: FeedDigestArticle } & {
  hasFingerprint?: boolean
  hasMoreButton?: boolean
  hasSticky?: boolean
  refetch?: () => void
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
            <Translate zh_hant="置頂文章" zh_hans="置顶文章" />
          </TextIcon>
        </div>
      )}
      <div className="header">
        <UserDigest.Mini user={author} />
        <div>
          {!hasFingerprint && live && <IconLive />}
          {hasFingerprint && <Fingerprint article={article} />}
          {hasMoreButton && (
            <DropdownActions article={article} refetch={refetch} />
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
