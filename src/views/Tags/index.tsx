import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Button,
  Card,
  EmptyTag,
  Head,
  Icon,
  InfiniteScroll,
  Layout,
  List,
  Spinner,
  Tag,
  TagDialog,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'
import { QueryError } from '~/components/GQL'

import { analytics, mergeConnections, toPath } from '~/common/utils'

import { AllTags } from './__generated__/AllTags'

const ALL_TAGS = gql`
  query AllTags($after: String) {
    viewer {
      id
      recommendation {
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
  }
  ${Tag.fragments.tag}
`

const CreateTagButton = () => {
  const viewer = useContext(ViewerContext)

  // temporarily safety check
  const canEdit = viewer.info.email === 'hi@matters.news'

  if (!canEdit) {
    return null
  }

  return (
    <TagDialog>
      {({ open }) => (
        <Button
          size={[null, '1.5rem']}
          spacing={[0, 'xtight']}
          bgActiveColor="grey-lighter"
          onClick={open}
        >
          <TextIcon icon={<Icon.Add color="green" size="xs" />} color="green">
            <Translate id="createTag" />
          </TextIcon>
        </Button>
      )}
    </TagDialog>
  )
}

const Tags = () => {
  const { data, loading, error, fetchMore, refetch } = useQuery<AllTags>(
    ALL_TAGS
  )

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.recommendation.tags'
  const { edges, pageInfo } = data?.viewer?.recommendation.tags || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyTag />
  }

  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'all_tags',
      location: edges.length,
    })
    return fetchMore({
      variables: {
        after: pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
          dedupe: true,
        }),
    })
  }

  return (
    <InfiniteScroll
      hasNextPage={pageInfo.hasNextPage}
      loadMore={loadMore}
      pullToRefresh={refetch}
    >
      <List>
        {edges.map(
          ({ node, cursor }, i) =>
            node.__typename === 'Tag' && (
              <List.Item key={cursor}>
                <Card
                  spacing={['base', 'base']}
                  {...toPath({
                    page: 'tagDetail',
                    id: node.id,
                  })}
                  onClick={() =>
                    analytics.trackEvent('click_feed', {
                      type: 'all_tags',
                      contentType: 'tag',
                      styleType: 'title',
                      location: i,
                    })
                  }
                >
                  <Tag tag={node} type="list" />
                </Card>
              </List.Item>
            )
        )}
      </List>
    </InfiniteScroll>
  )
}

export default () => (
  <Layout.Main>
    <Head title={{ id: 'allTags' }} />

    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={
        <>
          <Layout.Header.Title id="allTags" />
          <CreateTagButton />
        </>
      }
    />

    <Tags />
  </Layout.Main>
)
