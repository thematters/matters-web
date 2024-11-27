import { FormattedMessage } from 'react-intl'

import { analytics } from '~/common/utils'
import { InfiniteScroll, TagDigest } from '~/components'

import styles from './styles.module.css'

interface Props {
  edges: Array<{ node: any; cursor?: string }>
  pageInfo: {
    hasNextPage: boolean
    endCursor?: string | null
  }
  loadMore: () => Promise<any>
  trackingType: 'search_tag' | 'all_tags' | 'all_tags_recommended'
  searchKey?: string
  maxResults?: number
  showEOFMessage?: boolean
}

const InfiniteTagList = ({
  edges,
  pageInfo,
  loadMore,
  trackingType,
  searchKey,
  maxResults = Infinity,
  showEOFMessage = true,
}: Props) => {
  return (
    <InfiniteScroll
      hasNextPage={pageInfo.hasNextPage && edges.length < maxResults}
      loadMore={loadMore}
      eof={
        showEOFMessage && (
          <FormattedMessage defaultMessage="End of the results" id="ui1+QC" />
        )
      }
    >
      <ul className={styles.tagList}>
        {edges.map(({ node, cursor }, i) =>
          node.__typename === 'Tag' ? (
            <li key={cursor || node.id} className={styles.tagListItem}>
              <TagDigest.Feed
                tag={node}
                onClick={() =>
                  analytics.trackEvent('click_feed', {
                    type: trackingType,
                    contentType: 'tag',
                    location: i,
                    id: node.id,
                    ...(searchKey && { searchKey }),
                  })
                }
              />
            </li>
          ) : null
        )}
      </ul>
    </InfiniteScroll>
  )
}

export default InfiniteTagList
