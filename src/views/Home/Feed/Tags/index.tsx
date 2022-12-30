import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _chunk from 'lodash/chunk'
import { useContext, useEffect } from 'react'

import { PATHS } from '~/common/enums'
import { analytics } from '~/common/utils'
import {
  QueryError,
  ShuffleButton,
  Slides,
  Spinner,
  TagDigest,
  Translate,
  usePublicQuery,
  ViewerContext,
  ViewMoreCard,
} from '~/components'
import FETCH_RECORD from '~/components/GQL/queries/lastFetchRandom'
import { FeedTagsPublicQuery, LastFetchRandomQuery } from '~/gql/graphql'

import SectionHeader from '../../SectionHeader'
import styles from './styles.css'

const FEED_TAGS = gql`
  query FeedTagsPublic($random: random_Int_min_0_max_49) {
    viewer @connection(key: "viewerFeedTags") {
      id
      recommendation {
        tags(input: { first: 10, filter: { random: $random } }) {
          totalCount
          edges {
            cursor
            node {
              ...TagDigestSidebarTag
            }
          }
        }
      }
    }
  }
  ${TagDigest.Sidebar.fragments.tag}
`

const TagsFeed = () => {
  const viewer = useContext(ViewerContext)

  const { data: lastFetchRandom, client } = useQuery<LastFetchRandomQuery>(
    FETCH_RECORD,
    { variables: { id: 'local' } }
  )
  const lastRandom = lastFetchRandom?.lastFetchRandom.feedTags
  const randomMaxSize = 50

  const { data, loading, error, refetch } = usePublicQuery<FeedTagsPublicQuery>(
    FEED_TAGS,
    {
      notifyOnNetworkStatusChange: true,
      variables: { random: lastRandom || 0 },
    },
    { publicQuery: !viewer.isAuthed }
  )
  const size = Math.round(
    (data?.viewer?.recommendation.tags.totalCount || randomMaxSize) / 5
  )
  const edges = data?.viewer?.recommendation.tags.edges

  const shuffle = () => {
    // const random = _random(0, Math.min(randomMaxSize, size))
    const random = Math.floor(Math.min(randomMaxSize, size) * Math.random()) // in range [0..50) not including 50
    refetch({ random })

    client.writeData({
      id: 'LastFetchRandom:local',
      data: { feedTags: random },
    })
  }

  useEffect(() => {
    if (
      viewer.isAuthed &&
      lastRandom == null // null or undefined
    ) {
      shuffle()
    }
  }, [viewer.isAuthed])

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0) {
    return null
  }

  const SlideHeader = (
    <SectionHeader
      type="tags"
      rightButton={<ShuffleButton onClick={shuffle} />}
      viewAll={false}
    />
  )

  return (
    <section className="tags">
      <Slides header={SlideHeader}>
        {loading && (
          <Slides.Item>
            <Spinner />
          </Slides.Item>
        )}

        {!loading &&
          _chunk(edges, 5).map((chunks, edgeIndex) => (
            <Slides.Item size="md" key={edgeIndex}>
              <section>
                {chunks.map(({ node, cursor }, nodeIndex) => (
                  <TagDigest.Sidebar
                    key={cursor}
                    tag={node}
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
            </Slides.Item>
          ))}
      </Slides>

      <section className="backToAll">
        <ViewMoreCard
          spacing={['tight', 'tight']}
          href={PATHS.TAGS}
          iconProps={{ size: 'sm' }}
          textIconProps={{ size: 'sm', weight: 'md', spacing: 'xxtight' }}
          textAlign="center"
        >
          <Translate id="viewAll" />
        </ViewMoreCard>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

export default TagsFeed
