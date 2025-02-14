import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _chunk from 'lodash/chunk'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { analytics } from '~/common/utils'
import {
  Media,
  QueryError,
  ShuffleButton,
  Slides,
  SpinnerBlock,
  TagDigest,
  usePublicQuery,
  ViewerContext,
  ViewMoreCard,
} from '~/components'
import FETCH_RECORD from '~/components/GQL/queries/lastFetchRandom'
import { FeedTagsPublicQuery, LastFetchRandomQuery } from '~/gql/graphql'

import SectionHeader from '../../SectionHeader'
import styles from './styles.module.css'

const FEED_TAGS = gql`
  query FeedTagsPublic(
    $random: random_Int_min_0_max_49
    $first: first_Int_min_0
  ) {
    viewer @connection(key: "viewerFeedTags") {
      id
      recommendation {
        tags(input: { first: $first, filter: { random: $random } }) {
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

  const perPage = 6
  const perColumn = 3
  const randomMaxSize = 50
  const { data, loading, error, refetch } = usePublicQuery<FeedTagsPublicQuery>(
    FEED_TAGS,
    {
      notifyOnNetworkStatusChange: true,
      variables: { random: lastRandom || 0, first: perPage },
    },
    { publicQuery: !viewer.isAuthed }
  )
  const edges = data?.viewer?.recommendation.tags.edges

  const shuffle = () => {
    const size = Math.round(
      (data?.viewer?.recommendation.tags.totalCount || randomMaxSize) / perPage
    )
    const random = Math.floor(Math.min(randomMaxSize, size) * Math.random()) // in range [0..50) not including 50
    refetch({ random })

    client.writeData({
      id: 'LastFetchRandom:local',
      data: { feedTags: random },
    })
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0) {
    return null
  }

  const SlideHeader = (
    <>
      <Media lessThan="md">
        <SectionHeader
          type="tags"
          rightButton={<ShuffleButton onClick={shuffle} />}
          viewAll={false}
        />
      </Media>
      <Media greaterThanOrEqual="md">
        <SectionHeader
          type="tags"
          rightButton={<ShuffleButton onClick={shuffle} />}
          viewAll={true}
        />
      </Media>
    </>
  )

  return (
    <section className={styles.tags}>
      <Slides header={SlideHeader}>
        {loading && (
          <Slides.Item>
            <SpinnerBlock />
          </Slides.Item>
        )}

        {!loading &&
          _chunk(edges, perColumn).map((chunks, edgeIndex) => (
            <Slides.Item size="md" key={edgeIndex}>
              <section>
                {chunks.map(({ node, cursor }, nodeIndex) => (
                  <TagDigest.Concise
                    key={node.id}
                    tag={node}
                    iconSize={20}
                    textSize={16}
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
      <Media lessThan="md">
        <section className={styles.backToAll}>
          <ViewMoreCard
            spacing={[12, 12]}
            href={PATHS.TAGS}
            textIconProps={{
              size: 16,
              weight: 'semibold',
              spacing: 4,
            }}
            textAlign="center"
          >
            <FormattedMessage defaultMessage="View All" id="wbcwKd" />
          </ViewMoreCard>
        </section>
      </Media>
    </section>
  )
}

export default TagsFeed
