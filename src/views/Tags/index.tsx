import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Button,
  EmptyTag,
  Head,
  Icon,
  InfiniteScroll,
  Layout,
  Spinner,
  Tag,
  TagDialog,
  TextIcon,
  Translate,
  ViewerContext
} from '~/components'
import { QueryError } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

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
  const canEdit = viewer.isAdmin && viewer.info.email === 'hi@matters.news'

  if (!canEdit) {
    return null
  }

  return (
    <TagDialog>
      {({ open }) => (
        <Button
          size={[null, '1.5rem']}
          spacing={[0, 'xtight']}
          bgActiveColor="green-lighter"
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
  const { data, loading, error, fetchMore } = useQuery<AllTags>(ALL_TAGS)

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
    analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
      type: FEED_TYPE.TAGS,
      location: edges.length
    })
    return fetchMore({
      variables: {
        after: pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
          dedupe: true
        })
    })
  }
  const leftEdges = edges.filter((_: any, i: number) => i % 2 === 0)
  const rightEdges = edges.filter((_: any, i: number) => i % 2 === 1)

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <section className="l-row full">
        <ul className="l-col-2 l-col-sm-4 l-col-lg-6">
          {leftEdges.map(({ node, cursor }, i) => (
            <li
              key={cursor}
              onClick={() =>
                analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                  type: FEED_TYPE.ALL_TAGS,
                  location: i * 2
                })
              }
            >
              <Tag tag={node} type="count-fixed" />
            </li>
          ))}
        </ul>
        <ul className="l-col-2 l-col-sm-4 l-col-lg-6">
          {rightEdges.map(({ node, cursor }, i) => (
            <li
              key={cursor}
              onClick={() =>
                analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                  type: FEED_TYPE.ALL_TAGS,
                  location: i * 2 + 1
                })
              }
            >
              <Tag tag={node} type="count-fixed" />
            </li>
          ))}
        </ul>
      </section>
    </InfiniteScroll>
  )
}

export default () => (
  <Layout>
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

    <Layout.Spacing>
      <Tags />
    </Layout.Spacing>
  </Layout>
)
