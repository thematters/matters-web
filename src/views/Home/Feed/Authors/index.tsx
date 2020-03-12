import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _chunk from 'lodash/chunk'

import {
  Button,
  Icon,
  Slides,
  Spinner,
  TextIcon,
  Translate,
  UserDigest
} from '~/components'
import { QueryError } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

import SectionHeader from '../../SectionHeader'
import styles from './styles.css'

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
              ...UserDigestRichUser
            }
          }
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user}
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
          bgActiveColor="green-lighter"
          onClick={() => refetch()}
        >
          <TextIcon
            icon={<Icon.Reload size="xs" />}
            color="grey-dark"
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
            <section className="col">
              {chunks.map(({ node, cursor }, nodeIndex) => (
                <UserDigest.Rich
                  key={cursor}
                  user={node}
                  spacing={['tight', 0]}
                  bgActiveColor={undefined}
                  onClick={() =>
                    analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                      type: FEED_TYPE.AUTHORS,
                      location: (edgeIndex + 1) * (nodeIndex + 1) - 1
                    })
                  }
                />
              ))}

              <style jsx>{styles}</style>
            </section>
          </Slides.Item>
        ))}
    </Slides>
  )
}

export default FeedAuthors
