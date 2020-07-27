import { useContext, useEffect } from 'react'

import {
  Button,
  IconReload,
  List,
  Spinner,
  TextIcon,
  Translate,
  usePublicQuery,
  UserDigest,
  ViewerContext,
} from '~/components'
import { QueryError } from '~/components/GQL'

import { analytics } from '~/common/utils'

import SectionHeader from '../../SectionHeader'
import { SIDEBAR_AUTHORS_PRIVATE, SIDEBAR_AUTHORS_PUBLIC } from './gql'

import { SidebarAuthorsPublic } from './__generated__/SidebarAuthorsPublic'

const Authors = () => {
  const viewer = useContext(ViewerContext)

  /**
   * Data Fetching
   */
  // public data
  const {
    data,
    loading,
    error,
    refetch: refetchPublic,
    client,
  } = usePublicQuery<SidebarAuthorsPublic>(SIDEBAR_AUTHORS_PUBLIC, {
    notifyOnNetworkStatusChange: true,
  })
  const edges = data?.viewer?.recommendation.authors.edges

  // private data
  const loadPrivate = (publicData?: SidebarAuthorsPublic) => {
    if (!viewer.id || !publicData) {
      return
    }

    const publiceEdges = publicData?.viewer?.recommendation.authors.edges || []
    const publicIds = publiceEdges.map(({ node }) => node.id)

    client.query({
      query: SIDEBAR_AUTHORS_PRIVATE,
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

  // refetch
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

  return (
    <section>
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

      {loading && <Spinner />}

      {!loading && (
        <List hasBorder={false}>
          {edges.map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              <UserDigest.Rich
                user={node}
                spacing={['tight', 0]}
                bgColor="none"
                onClick={() =>
                  analytics.trackEvent('click_feed', {
                    type: 'authors',
                    contentType: 'user',
                    styleType: 'card',
                    location: i,
                  })
                }
                hasState={false}
              />
            </List.Item>
          ))}
        </List>
      )}
    </section>
  )
}

export default Authors
