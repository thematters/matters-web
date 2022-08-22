import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useContext, useEffect } from 'react'

import {
  List,
  QueryError,
  ShuffleButton,
  Spinner,
  Tag,
  TagDigest,
  usePublicQuery,
  ViewerContext,
} from '~/components'
import FETCH_RECORD from '~/components/GQL/queries/lastFetchRandom'

import { analytics } from '~/common/utils'

import SectionHeader from '../../SectionHeader'
import styles from './styles.css'

import { LastFetchRandom } from '~/components/GQL/queries/__generated__/LastFetchRandom'
import { SidebarTagsPublic } from './__generated__/SidebarTagsPublic'

const SIDEBAR_TAGS = gql`
  query SidebarTagsPublic($random: random_Int_min_0_max_49) {
    viewer @connection(key: "viewerSidebarTags") {
      id
      recommendation {
        tags(input: { first: 6, filter: { random: $random } }) {
          totalCount
          edges {
            cursor
            node {
              cover
              description
              ...DigestTag
            }
          }
        }
      }
    }
  }
  ${Tag.fragments.tag}
`

const Tags = () => {
  const viewer = useContext(ViewerContext)

  const { data: lastFetchRandom, client } = useQuery<LastFetchRandom>(
    FETCH_RECORD,
    { variables: { id: 'local' } }
  )
  const lastRandom = lastFetchRandom?.lastFetchRandom.sidebarTags // last Random
  const randomMaxSize = 50

  const { data, loading, error, refetch } = usePublicQuery<SidebarTagsPublic>(
    SIDEBAR_TAGS,
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
    const random = Math.floor(Math.min(randomMaxSize, size) * Math.random()) // in range [0..50) not including 50
    refetch({ random })

    client.writeData({
      id: 'LastFetchRandom:local',
      data: { sidebarTags: random },
    })
  }

  useEffect(() => {
    if (viewer.isAuthed && lastRandom == null) {
      shuffle()
    }
  }, [viewer.isAuthed])

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0) {
    return null
  }

  return (
    <section className="container">
      <SectionHeader
        type="tags"
        rightButton={<ShuffleButton onClick={shuffle} />}
      />

      {loading && <Spinner />}

      {!loading && (
        <List hasBorder={false}>
          {edges.map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              <TagDigest.Sidebar
                tag={node}
                onClick={() =>
                  analytics.trackEvent('click_feed', {
                    type: 'tags',
                    contentType: 'tag',
                    location: i,
                    id: node.id,
                  })
                }
              />
            </List.Item>
          ))}
        </List>
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

export default Tags
