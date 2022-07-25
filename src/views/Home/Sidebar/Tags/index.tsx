import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
// import _random from 'lodash/random'
import { useContext, useEffect, useState } from 'react'

import {
  Card,
  List,
  QueryError,
  ResponsiveImage,
  ShuffleButton,
  Spinner,
  Tag,
  usePublicQuery,
  ViewerContext,
} from '~/components'
import FETCH_RECORD from '~/components/GQL/queries/lastFetchRandom'

import { analytics, toPath } from '~/common/utils'

import SectionHeader from '../../SectionHeader'
import styles from './styles.css'

import { LastFetchRandom } from '~/components/GQL/queries/__generated__/LastFetchRandom'
import { SidebarTagsPublic } from './__generated__/SidebarTagsPublic'

const SIDEBAR_TAGS = gql`
  query SidebarTagsPublic($random: random_Int_min_0_max_49) {
    viewer @connection(key: "viewerSidebarTags") {
      id
      recommendation {
        tags(input: { first: 5, filter: { random: $random } }) {
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
  const [initialRandNumber] = useState<number>(
    Math.floor(randomMaxSize * Math.random() * Math.random()) // default random [0..50) with leaning toward left
  )

  const { data, loading, error, refetch } = usePublicQuery<SidebarTagsPublic>(
    SIDEBAR_TAGS,
    {
      notifyOnNetworkStatusChange: true,
      variables: { random: lastRandom || initialRandNumber },
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
              <Card
                {...toPath({
                  page: 'tagDetail',
                  id: node.id,
                })}
                spacing={['xtight', 'xtight']}
                bgColor="none"
                bgActiveColor="grey-lighter"
                borderRadius="xtight"
                onClick={() =>
                  analytics.trackEvent('click_feed', {
                    type: 'tags',
                    contentType: 'tag',
                    location: i,
                    id: node.id,
                  })
                }
              >
                <Tag
                  tag={node}
                  type="inline"
                  textIconProps={{ size: 'sm' }}
                  active
                />

                {node.description && (
                  <section className="content">
                    <p>{node.description}</p>

                    {node.cover && (
                      <div className="cover">
                        <ResponsiveImage url={node.cover} size="144w" />
                      </div>
                    )}
                  </section>
                )}
              </Card>
            </List.Item>
          ))}
        </List>
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

export default Tags
