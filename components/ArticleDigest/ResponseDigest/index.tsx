import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import IconLive from '~/components/Icon/Live'
import { Translate } from '~/components/Language'
import { Title } from '~/components/Title'
import { UserDigest } from '~/components/UserDigest'

import { TEXT, UrlFragments } from '~/common/enums'
import { toPath } from '~/common/utils'

import Actions, { ActionsControls } from '../Actions'
import { Fingerprint } from '../Fingerprint'
import { ResponseDigestArticle } from './__generated__/ResponseDigestArticle'
import styles from './styles.css'

const fragments = {
  response: gql`
    fragment ResponseDigestArticle on Article {
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
    }
    ${UserDigest.Mini.fragments.user}
    ${Actions.fragments.response}
    ${Fingerprint.fragments.article}
  `
}

const ResponseDigest = ({
  article,
  hasFingerprint,
  ...actionControls
}: { article: ResponseDigestArticle } & {
  hasFingerprint?: boolean
} & ActionsControls) => {
  const { author, cover, slug, mediaHash, title, live } = article

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
    'has-cover': !!cover
  })

  return (
    <section className="container">
      <div className="header">
        <div className="avatar">
          <UserDigest.Mini
            user={author}
            avatarSize="small"
            textWeight="medium"
          />
          <span className="collected">
            <Translate
              zh_hant={TEXT.zh_hant.collected}
              zh_hans={TEXT.zh_hans.collected}
            />
          </span>
        </div>
        {!hasFingerprint && live && <IconLive />}
      </div>

      <div className="digest-wrap">
        <div className={contentClasses}>
          <div className="left">
            <Link {...path}>
              <a>
                <Title type="sidebar" is="h2">
                  {title}
                </Title>
              </a>
            </Link>
            <Actions article={article} type="sidebar" {...actionControls} />
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
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

ResponseDigest.fragments = fragments

export default ResponseDigest
