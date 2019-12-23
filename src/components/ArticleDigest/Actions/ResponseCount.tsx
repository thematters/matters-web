import gql from 'graphql-tag'
import _get from 'lodash/get'
import Link from 'next/link'

import { Icon, TextIcon } from '~/components'

import { ANALYTICS_EVENTS, UrlFragments } from '~/common/enums'
import { analytics, numAbbr, toPath } from '~/common/utils'
import ICON_COMMENT_SM from '~/static/icons/comment-small.svg?sprite'

import { ResponseCountArticle } from './__generated__/ResponseCountArticle'
import styles from './styles.css'

const fragments = {
  article: gql`
    fragment ResponseCountArticle on Article {
      id
      slug
      state
      mediaHash
      responseCount
      author {
        userName
      }
    }
  `
}

const ResponseCount = ({
  article,
  size = 'small'
}: {
  article: ResponseCountArticle
  size?: 'small' | 'xsmall'
}) => {
  const { slug, mediaHash, author, state } = article

  if (!author || !author.userName || !slug || !mediaHash) {
    return null
  }

  const path = toPath({
    page: 'articleDetail',
    userName: author.userName,
    slug,
    mediaHash,
    fragment: UrlFragments.COMMENTS
  })

  const isBanned = state === 'banned'
  const LinkWrapper: React.FC = ({ children }) =>
    isBanned ? (
      <span>{children}</span>
    ) : (
      <Link {...path}>
        <a
          onClick={() => {
            analytics.trackEvent(ANALYTICS_EVENTS.OPEN_COMMENTS, {
              entrance: article.id,
              type: 'article-digest'
            })
          }}
        >
          {children}
        </a>
      </Link>
    )

  return (
    <LinkWrapper>
      <TextIcon
        icon={
          <Icon
            size={size}
            id={ICON_COMMENT_SM.id}
            viewBox={ICON_COMMENT_SM.viewBox}
          />
        }
        color="grey"
        weight="medium"
        text={numAbbr(article.responseCount || 0)}
        size={size === 'small' ? 'sm' : 'xs'}
        spacing="xxtight"
      />

      <style jsx>{styles}</style>
    </LinkWrapper>
  )
}

ResponseCount.fragments = fragments

export default ResponseCount
