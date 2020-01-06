import gql from 'graphql-tag'
import _get from 'lodash/get'
import Link from 'next/link'

import { Icon, TextIcon } from '~/components'

import { ANALYTICS_EVENTS, UrlFragments } from '~/common/enums'
import { analytics, numAbbr, responseStateIs, toPath } from '~/common/utils'

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
  `,
  response: gql`
    fragment ResponseCountArticle on Article {
      id
      slug
      articleState: state
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
  size = 'sm'
}: {
  article: ResponseCountArticle
  size?: 'sm' | 'xs'
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
  const isBanned = responseStateIs(article, 'banned')
  const LinkWrapper: React.FC = ({ children }) =>
    isBanned ? (
      <span className="response-count">
        {children}
        <style jsx>{styles}</style>
      </span>
    ) : (
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
          {children}
          <style jsx>{styles}</style>
        </a>
      </Link>
    )

  return (
    <LinkWrapper>
      <TextIcon
        icon={<Icon.CommentSmall size={size === 'xs' ? 'xs' : undefined} />}
        color="grey"
        weight="md"
        text={numAbbr(article.responseCount || 0)}
        size={size}
        spacing="xxtight"
      />

      <style jsx>{styles}</style>
    </LinkWrapper>
  )
}

ResponseCount.fragments = fragments

export default ResponseCount
