import gql from 'graphql-tag'
import _get from 'lodash/get'
import Link from 'next/link'

import { Icon, TextIcon } from '~/components'

import { ANALYTICS_EVENTS, UrlFragments } from '~/common/enums'
import { analytics, numAbbr, toPath } from '~/common/utils'

import styles from './styles.css'

import { ActionsResponseCountArticle } from './__generated__/ActionsResponseCountArticle'

const fragments = {
  article: gql`
    fragment ActionsResponseCountArticle on Article {
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
  article: ActionsResponseCountArticle
  size?: 'sm' | 'xs'
}) => {
  const { articleState: state } = article
  const path = toPath({
    page: 'articleDetail',
    article,
    fragment: UrlFragments.COMMENTS
  })
  const isBanned = state === 'banned'
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
