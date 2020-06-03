import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _chunk from 'lodash/chunk'

import {
  Button,
  IconReload,
  Slides,
  Spinner,
  TextIcon,
  Translate,
  UserDigest,
} from '~/components'
import { QueryError } from '~/components/GQL'

import { analytics } from '~/common/utils'

import SectionHeader from '../../SectionHeader'

import { FeedAuthors as FeedAuthorsType } from './__generated__/FeedAuthors'

const FEED_AUTHORS = gql`
  query FeedAuthors {
    viewer {
      id
      recommendation {
        authors(
          input: { first: 9, filter: { random: true, followed: false } }
        ) {
          edges {
            cursor
            node {
              ...UserDigestRichUserPublic
            }
          }
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user.public}
`

const FeedAuthors = () => {
  const { data, loading, error, refetch } = useQuery<FeedAuthorsType>(
    FEED_AUTHORS,
    { notifyOnNetworkStatusChange: true }
  )
  const edges = data?.viewer?.recommendation.authors.edges

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0) {
    return null
  }

  const SlidesHeader = (
    <SectionHeader
      type="authors"
      rightButton={
        <Button
          size={[null, '1.25rem']}
          spacing={[0, 'xtight']}
          bgActiveColor="grey-lighter"
          onClick={() => refetch()}
        >
          <TextIcon
            icon={<IconReload size="xs" />}
            color="grey"
            size="xs"
            weight="md"
          >
            <Translate id="shuffle" />
          </TextIcon>
        </Button>
      }
    />
  )

  return (
    <Slides bgColor="yellow-lighter" header={SlidesHeader}>
      {loading && (
        <Slides.Item size="md">
          <Spinner />
        </Slides.Item>
      )}

      {!loading &&
        _chunk(edges, 3).map((chunks, edgeIndex) => (
          <Slides.Item size="md" key={edgeIndex}>
            <section>
              {chunks.map(({ node, cursor }, nodeIndex) => (
                <UserDigest.Rich
                  key={cursor}
                  user={node}
                  spacing={['tight', 0]}
                  bgColor="none"
                  onClick={() =>
                    analytics.trackEvent('click_feed', {
                      type: 'authors',
                      contentType: 'user',
                      styleType: 'card',
                      location: (edgeIndex + 1) * (nodeIndex + 1) - 1,
                    })
                  }
                />
              ))}
            </section>
          </Slides.Item>
        ))}
    </Slides>
  )
}

export default FeedAuthors
