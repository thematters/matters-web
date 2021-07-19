import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _random from 'lodash/random'
import { useContext, useEffect } from 'react'

import {
  QueryError,
  ShuffleButton,
  Slides,
  Spinner,
  usePublicQuery,
  ViewerContext,
} from '~/components'
import FETCH_RECORD from '~/components/GQL/queries/lastFetchRandom'

import { analytics } from '~/common/utils'

import SectionHeader from '../../SectionHeader'
import TagFeedDigest from './TagFeedDigest'

import { LastFetchRandom } from '~/components/GQL/queries/__generated__/LastFetchRandom'
import { FeedTagsPublic } from './__generated__/FeedTagsPublic'

const FEED_TAGS = gql`
  query FeedTagsPublic($random: random_Int_min_0_max_49) {
    viewer @connection(key: "viewerFeedTags") {
      id
      recommendation {
        tags(input: { first: 5, filter: { random: $random } }) {
          totalCount
          edges {
            cursor
            node {
              ...TagFeedDigestTag
            }
          }
        }
      }
    }
  }
  ${TagFeedDigest.fragments.tag}
`

const TagsFeed = () => {
  const viewer = useContext(ViewerContext)

  const { data: lastFetchRandom, client } = useQuery<LastFetchRandom>(
    FETCH_RECORD,
    { variables: { id: 'local' } }
  )
  const lastRandom = lastFetchRandom?.lastFetchRandom.feedTags

  const { data, loading, error, refetch } = usePublicQuery<FeedTagsPublic>(
    FEED_TAGS,
    {
      notifyOnNetworkStatusChange: true,
      variables: { random: lastRandom || 0 },
    },
    { publicQuery: !viewer.isAuthed }
  )
  const randomMaxSize = 50
  const size = Math.round(
    (data?.viewer?.recommendation.tags.totalCount || randomMaxSize) / 5
  )
  const edges = data?.viewer?.recommendation.tags.edges

  const shuffle = () => {
    const random = _random(0, Math.min(randomMaxSize, size))
    refetch({ random })

    client.writeData({
      id: 'LastFetchRandom:local',
      data: { feedTags: random },
    })
  }

  useEffect(() => {
    if (viewer.isAuthed && lastRandom === null) {
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
    />
  )

  return (
    <Slides bgColor="grey-lighter" header={SlideHeader}>
      {loading && (
        <Slides.Item>
          <Spinner />
        </Slides.Item>
      )}

      {!loading &&
        edges.map(({ node, cursor }, i) => (
          <Slides.Item key={cursor}>
            <TagFeedDigest
              tag={node}
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'tags',
                  contentType: 'tag',
                  styleType: 'article',
                  location: i,
                })
              }
            />
          </Slides.Item>
        ))}
    </Slides>
  )
}

export default TagsFeed
