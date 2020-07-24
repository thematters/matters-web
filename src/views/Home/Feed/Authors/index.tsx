import { useQuery } from '@apollo/react-hooks'
import _chunk from 'lodash/chunk'
import { useContext, useEffect } from 'react'

import {
  Button,
  IconReload,
  Slides,
  Spinner,
  TextIcon,
  Translate,
  UserDigest,
  ViewerContext,
} from '~/components'
import { QueryError } from '~/components/GQL'

import { analytics } from '~/common/utils'

import SectionHeader from '../../SectionHeader'
import { FEED_AUTHORS_PRIVATE, FEED_AUTHORS_PUBLIC } from './gql'

import { FeedAuthorsPublic } from './__generated__/FeedAuthorsPublic'

const FeedAuthors = () => {
  const viewer = useContext(ViewerContext)

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, error, refetch: refetchPublic, client } = useQuery<
    FeedAuthorsPublic
  >(FEED_AUTHORS_PUBLIC, { notifyOnNetworkStatusChange: true })

  const edges = data?.viewer?.recommendation.authors.edges

  // private data
  const loadPrivate = (publicData?: FeedAuthorsPublic) => {
    if (!viewer.id || !publicData) {
      return
    }

    const publiceEdges = publicData?.viewer?.recommendation.authors.edges || []
    const publicIds = publiceEdges.map(({ node }) => node.id)

    client.query({
      query: FEED_AUTHORS_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { ids: publicIds },
    })
  }

  // fetch private data for first page
  useEffect(() => {
    if (loading || !edges) {
      return
    }

    loadPrivate(data)
  }, [!!edges, viewer.id])

  // refetch & pull to refresh
  const refetch = async () => {
    const { data: newData } = await refetchPublic()
    loadPrivate(newData)
  }

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
          onClick={refetch}
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
