import gql from 'graphql-tag'
import _random from 'lodash/random'
import { useContext, useEffect } from 'react'

import {
  ShuffleButton,
  Slides,
  Spinner,
  usePublicQuery,
  ViewerContext,
} from '~/components'
import { QueryError } from '~/components/GQL'

import { analytics } from '~/common/utils'

import SectionHeader from '../../SectionHeader'
import TagFeedDigest from './TagFeedDigest'

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
  const { data, loading, error, refetch } = usePublicQuery<FeedTagsPublic>(
    FEED_TAGS,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        random: 0,
      },
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
    if (viewer.isAuthed) {
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
