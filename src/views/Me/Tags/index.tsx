import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  Card,
  EmptyTag,
  Head,
  InfiniteScroll,
  Layout,
  List,
  QueryError,
  Spinner,
  Tag,
  Translate,
} from '~/components'

import { mergeConnections, toPath } from '~/common/utils'

import styles from './styles.css'

import { MeTagsFeed } from './__generated__/MeTagsFeed'

const ME_TAGS_FEED = gql`
  query MeTagsFeed($after: String) {
    viewer {
      id
      tags(input: { first: 20, after: $after }) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ...DigestTag
          }
        }
      }
    }
  }
  ${Tag.fragments.tag}
`

const BaseMeTags = () => {
  const { data, loading, error, fetchMore } = useQuery<MeTagsFeed>(ME_TAGS_FEED)

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.tags'
  const { edges, pageInfo } = data?.viewer?.tags || {}

  const loadMore = () =>
    fetchMore({
      variables: { after: pageInfo?.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <EmptyTag
        description={
          <Translate
            zh_hant="還沒有主理與協作標籤喔"
            zh_hans="还没有主理与协作标签喔"
            en="There is no maintaining and collabrating tags yet"
          />
        }
      />
    )
  }

  return (
    <section className="container">
      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <List>
          {edges.map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              <Card
                spacing={['base', 'base']}
                {...toPath({
                  page: 'tagDetail',
                  id: node.id,
                })}
              >
                <Tag tag={node} type="list" />
              </Card>
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>

      <style jsx>{styles}</style>
    </section>
  )
}

const MeTags = () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="myTags" />}
    />

    <Head title={{ id: 'myTags' }} />

    <BaseMeTags />
  </Layout.Main>
)

export default MeTags
