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
  const { slug, mediaHash, author } = article

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

  return (
    <Link {...path}>
      <a
        className="response-count"
        onClick={() => {
          analytics.trackEvent(ANALYTICS_EVENTS.OPEN_COMMENTS, {
            entrance: article.id,
            type: 'article-digest'
          })
        }}
      >
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
      </a>
    </Link>
  )
}

ResponseCount.fragments = fragments

export default ResponseCount
