import { useQuery } from '@apollo/react-hooks'
import { FormattedMessage, useIntl } from 'react-intl'

import { mergeConnections } from '~/common/utils'
import {
  DraftDigest,
  EmptyDraft,
  Head,
  InfiniteScroll,
  Layout,
  List,
  QueryError,
  Spinner,
} from '~/components'
import { MeDraftFeedQuery } from '~/gql/graphql'

import { ME_DRAFTS_FEED } from './gql'

export const BaseMeDrafts = () => {
  const { data, loading, error, fetchMore } =
    useQuery<MeDraftFeedQuery>(ME_DRAFTS_FEED)

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.drafts'
  const { edges, pageInfo } = data?.viewer?.drafts || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyDraft />
  }

  const loadMore = () =>
    fetchMore({
      variables: { after: pageInfo.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore} eof>
      <List>
        {edges.map(({ node, cursor }) => (
          <List.Item key={cursor}>
            <DraftDigest.Feed draft={node} />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

const MeDrafts = () => {
  const intl = useIntl()

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage
              defaultMessage="Drafts"
              id="GYAos5"
              description="src/views/Me/Drafts/index.tsx"
            />
          </Layout.Header.Title>
        }
      />

      <Head
        title={intl.formatMessage({
          defaultMessage: 'Drafts',
          id: 'GYAos5',
          description: 'src/views/Me/Drafts/index.tsx',
        })}
      />

      <Layout.Main.Spacing hasVertical={false}>
        <BaseMeDrafts />
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default MeDrafts
