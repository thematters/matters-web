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
} from '~/components'
import Placeholder from '~/components/Book/Placeholder'
import { MeWorksDraftFeedQuery } from '~/gql/graphql'

import WorksTabs from '../WorksTabs'
import { ME_WORKS_DRAFTS_FEED } from './gql'

export const BaseMeWorksDrafts = () => {
  const { data, loading, error, fetchMore } =
    useQuery<MeWorksDraftFeedQuery>(ME_WORKS_DRAFTS_FEED)

  if (loading) {
    return <Placeholder />
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

const MeWorksDrafts = () => {
  const init = useIntl()
  const title = init.formatMessage({
    defaultMessage: 'My Works - Drafts',
    description: 'src/views/Me/Works/Drafts/index.tsx',
    id: 'tDqnVf',
  })

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage defaultMessage="My Works" id="ai7kS4" />
          </Layout.Header.Title>
        }
      />

      <Head title={title} />

      <WorksTabs />

      <BaseMeWorksDrafts />
    </Layout.Main>
  )
}

export default MeWorksDrafts
