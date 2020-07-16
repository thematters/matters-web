import { useQuery, gql } from '@apollo/client'

import { Slides, Spinner } from '~/components'
import { QueryError } from '~/components/GQL'

import { analytics } from '~/common/utils'

import SectionHeader from '../../SectionHeader'
import TagFeedDigest from './TagFeedDigest'

import { FeedTags } from './__generated__/FeedTags'

const FEED_TAGS = gql`
  query FeedTags {
    viewer {
      id
      recommendation {
        tags(input: { first: 5 }) {
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
  const { data, loading, error } = useQuery<FeedTags>(FEED_TAGS)
  const edges = data?.viewer?.recommendation.tags.edges

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0) {
    return null
  }

  return (
    <Slides bgColor="grey-lighter" header={<SectionHeader type="tags" />}>
      {loading && (
        <Slides.Item>
          <Spinner />
        </Slides.Item>
      )}

      {edges.map(({ node, cursor }, i) => (
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
