import gql from 'graphql-tag'
import _get from 'lodash/get'
import Link from 'next/link'

import { Icon, TextIcon } from '~/components'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics, numAbbr, toPath } from '~/common/utils'
import ICON_COMMENT_SM from '~/static/icons/comment-small.svg?sprite'

import { CommentCountArticle } from './__generated__/CommentCountArticle'

const fragments = {
  article: gql`
    fragment CommentCountArticle on Article {
      id
      slug
      mediaHash
      commentCount
      author {
        userName
      }
    }
  `
}

const CommentCount = ({
  article,
  size = 'default'
}: {
  article: CommentCountArticle
  size?: 'small' | 'default'
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
    fragment: 'comments'
  })

  return (
    <Link {...path}>
      <a
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
              size={size === 'default' ? 'small' : 'xsmall'}
              id={ICON_COMMENT_SM.id}
              viewBox={ICON_COMMENT_SM.viewBox}
            />
          }
          color="grey"
          weight="medium"
          text={numAbbr(_get(article, 'commentCount', 0))}
          size={size === 'default' ? 'sm' : 'xs'}
          spacing="xxtight"
        />
      </a>
    </Link>
  )
}

CommentCount.fragments = fragments

export default CommentCount
