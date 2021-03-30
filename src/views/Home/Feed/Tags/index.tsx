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
import FETCH_RECORD from '~/components/GQL/queries/fetchRecord'

import { analytics } from '~/common/utils'

import SectionHeader from '../../SectionHeader'
import TagFeedDigest from './TagFeedDigest'

import { FetchRecord } from '~/components/GQL/queries/__generated__/FetchRecord'
import { FeedTagsPublic } from './__generated__/FeedTagsPublic'

const FEED_TAGS = gql`
  query FeedTagsPublic($random: NonNegativeInt) {
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

  const { data: fetchRecord, client } = useQuery<FetchRecord>(FETCH_RECORD, {
    variables: { id: 'local' },
  })

  const { data, loading, error, refetch } = usePublicQuery<FeedTagsPublic>(
    FEED_TAGS,
    {
      notifyOnNetworkStatusChange: true,
      variables: { random: 0 },
    },
    {
      publicQuery: !viewer.isAuthed,
    }
  )
  const randomMaxSize = 50
  const size = Math.round(
    (data?.viewer?.recommendation.tags.totalCount || randomMaxSize) / 5
  )
  const edges = data?.viewer?.recommendation.tags.edges

  const shuffle = () => {
    refetch({ random: _random(0, Math.min(randomMaxSize, size)) })
  }

  useEffect(() => {
    const fetched = fetchRecord?.fetchRecord.feedTags

    if (viewer.isAuthed && !fetched) {
      shuffle()

      client.writeData({
        id: 'FetchRecord:local',
        data: { feedTags: true },
      })
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
