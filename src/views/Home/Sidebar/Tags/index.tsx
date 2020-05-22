import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Card, List, Spinner, Tag } from '~/components'
import { QueryError } from '~/components/GQL'

import { analytics, toPath } from '~/common/utils'

import SectionHeader from '../../SectionHeader'

import { SidebarTags } from './__generated__/SidebarTags'

const SIDEBAR_TAGS = gql`
  query SidebarTags {
    viewer {
      id
      recommendation {
        tags(input: { first: 5 }) {
          edges {
            cursor
            node {
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
  const { data, loading, error } = useQuery<SidebarTags>(SIDEBAR_TAGS)
  const edges = data?.viewer?.recommendation.tags.edges

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0) {
    return null
  }

  return (
    <section>
      <SectionHeader type="tags" />

      {loading && <Spinner />}

      <List>
        {edges.map(
          ({ node, cursor }, i) =>
            node.__typename === 'Tag' && (
              <List.Item key={cursor}>
                <Card
                  {...toPath({
                    page: 'tagDetail',
                    id: node.id,
                  })}
                  bgColor="none"
                  onClick={() =>
                    analytics.trackEvent('click_feed', {
                      type: 'tags',
                      contentType: 'tag',
                      styleType: 'title',
                      location: i,
                    })
                  }
                >
                  <Tag tag={node} type="list" textSize="sm" />
                </Card>
              </List.Item>
            )
        )}
      </List>
    </section>
  )
}

export default Tags
