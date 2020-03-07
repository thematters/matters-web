import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import gql from 'graphql-tag'

import {
  ArticleDigestCard,
  ArticleDigestSidebar,
  List,
  Spinner,
  useResponsive
} from '~/components'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

import FeedHeader from './FeedHeader'
import styles from './styles.css'

import { IcymiFeed } from './__generated__/IcymiFeed'

export const ICYMI_FEED = gql`
  query IcymiFeed($first: Int, $after: String) {
    viewer {
      id
      recommendation {
        icymi(input: { first: $first, after: $after }) {
          edges {
            cursor
            node {
              ...ArticleDigestSidebarArticle
              ...ArticleDigestCardArticle
            }
          }
        }
      }
    }
  }
  ${ArticleDigestSidebar.fragments.article}
  ${ArticleDigestCard.fragments.article}
`

const Icymi = ({ first = 5, after }: { first?: number; after?: string }) => {
  const isMediumUp = useResponsive('md-up')

  const feedClass = classNames({
    'horizontal-feed': !isMediumUp
  })

  const { data, loading } = useQuery<IcymiFeed>(ICYMI_FEED, {
    variables: {
      first,
      after
    }
  })
  const edges = data?.viewer?.recommendation.icymi.edges

  if (loading) {
    return <Spinner />
  }

  if (!edges || edges.length <= 0) {
    return null
  }

  const tranckClick = (i: number) => () =>
    analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
      type: FEED_TYPE.ICYMI,
      location: i
    })

  return (
    <section className={feedClass}>
      <FeedHeader type="icymi" />
      {isMediumUp ? (
        <List spacing={['loose', 0]}>
          {edges.map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              <ArticleDigestSidebar
                article={node}
                titleTextSize="sm"
                hasCover
                onClick={tranckClick(i)}
              />
            </List.Item>
          ))}
        </List>
      ) : (
        <ul>
          {edges.map(({ node, cursor }, i) => (
            <li key={cursor}>
              {<ArticleDigestCard article={node} onClick={tranckClick(i)} />}
            </li>
          ))}
        </ul>
      )}
      <style jsx>{styles}</style>
    </section>
  )
}

export default Icymi
