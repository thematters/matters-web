import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Card, Img, List, Spinner, Tag } from '~/components'
import { QueryError } from '~/components/GQL'

import { analytics, toPath } from '~/common/utils'

import SectionHeader from '../../SectionHeader'
import styles from './styles.css'

import { SidebarTagsPublic } from './__generated__/SidebarTagsPublic'

const SIDEBAR_TAGS = gql`
  query SidebarTagsPublic {
    viewer @connection(key: "viewerSidebarTags") {
      id
      recommendation {
        tags(input: { first: 5 }) {
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
  const { data, loading, error } = useQuery<SidebarTagsPublic>(SIDEBAR_TAGS)
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
                  <Tag tag={node} type="inline" textSize="sm" active={true} />
                  <section className="content">
                    <p>{node.description}</p>
                    {node.cover && (
                      <div className="cover">
                        <Img url={node.cover} size="144w" />
                      </div>
                    )}
                  </section>
                </Card>
              </List.Item>
            )
        )}
      </List>
      <style jsx>{styles}</style>
    </section>
  )
}

export default Tags
