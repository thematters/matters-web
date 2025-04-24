import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import _chunk from 'lodash/chunk'
import { useContext } from 'react'

import { analytics } from '~/common/utils'
import {
  QueryError,
  TagDigest,
  usePublicQuery,
  ViewerContext,
} from '~/components'
import FETCH_RECORD from '~/components/GQL/queries/lastFetchRandom'
import { FeedTagsPublicQuery, LastFetchRandomQuery } from '~/gql/graphql'

import SectionHeader from '../../SectionHeader'
import styles from './styles.module.css'

const FEED_TAGS_PUBLIC = gql`
  query FeedTagsPublic(
    $random: random_Int_min_0_max_49
    $first: first_Int_min_0
  ) {
    viewer {
      id
      recommendation {
        tags(input: { first: $first, filter: { random: $random } }) {
          totalCount
          edges {
            cursor
            node {
              ...TagDigestConciseTag
            }
          }
        }
      }
    }
  }
  ${TagDigest.Concise.fragments.tag}
`

const TagsFeed = () => {
  const viewer = useContext(ViewerContext)

  const { data: lastFetchRandom } = useQuery<LastFetchRandomQuery>(
    FETCH_RECORD,
    { variables: { id: 'local' } }
  )
  const lastRandom = lastFetchRandom?.lastFetchRandom.feedTags

  const perPage = 6
  const perColumn = 2
  const { data, error } = usePublicQuery<FeedTagsPublicQuery>(
    FEED_TAGS_PUBLIC,
    {
      variables: { random: lastRandom || 0, first: perPage },
    },
    { publicQuery: !viewer.isAuthed }
  )
  const edges = data?.viewer?.recommendation.tags.edges

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0) {
    return null
  }

  return (
    <section className={styles.tags}>
      <SectionHeader type="tags" viewAll={true} />
      {_chunk(edges, perColumn).map((chunks, edgeIndex) => (
        <section key={edgeIndex} className={styles.tagSection}>
          {chunks.map(({ node, cursor }, nodeIndex) => (
            <TagDigest.Concise
              key={node.id}
              tag={node}
              iconSize={20}
              textSize={16}
              textLineClamp={true}
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'tags',
                  contentType: 'tag',
                  location: (edgeIndex + 1) * (nodeIndex + 1) - 1,
                  id: node.id,
                })
              }
            />
          ))}
        </section>
      ))}
    </section>
  )
}

export default TagsFeed
