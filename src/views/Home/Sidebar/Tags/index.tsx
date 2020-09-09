import gql from 'graphql-tag'
import _random from 'lodash/random'
import { useContext, useEffect } from 'react'

import {
  Card,
  Img,
  List,
  ShuffleButton,
  Spinner,
  Tag,
  usePublicQuery,
  ViewerContext,
} from '~/components'
import { QueryError } from '~/components/GQL'

import { analytics, toPath } from '~/common/utils'

import SectionHeader from '../../SectionHeader'
import styles from './styles.css'

import { SidebarTagsPublic } from './__generated__/SidebarTagsPublic'

const SIDEBAR_TAGS = gql`
  query SidebarTagsPublic($random: NonNegativeInt) {
    viewer @connection(key: "viewerSidebarTags") {
      id
      recommendation {
        tags(input: { first: 5, filter: { random: $random } }) {
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
  const { data, loading, error, refetch } = usePublicQuery<SidebarTagsPublic>(
    SIDEBAR_TAGS,
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
  const edges = data?.viewer?.recommendation.tags.edges

  const shuffle = () => {
    refetch({ random: _random(0, 50) })
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

  return (
    <section className="container">
      <SectionHeader
        type="tags"
        rightButton={<ShuffleButton onClick={shuffle} />}
      />

      {loading && <Spinner />}

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
                  styleType: 'title',
                  location: i,
                })
              }
            >
              <Tag tag={node} type="inline" textSize="sm" active={true} />

              {node.description && (
                <section className="content">
                  <p>{node.description}</p>

                  {node.cover && (
                    <div className="cover">
                      <Img url={node.cover} size="144w" />
                    </div>
                  )}
                </section>
              )}
            </Card>
          </List.Item>
        ))}
      </List>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Tags
