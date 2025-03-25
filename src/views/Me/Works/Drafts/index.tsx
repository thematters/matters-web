import { useQuery } from '@apollo/client'
import router from 'next/router'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconPlus } from '@/public/static/icons/24px/plus.svg'
import { PATHS } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'
import {
  DraftDigest,
  EmptyDraft,
  Head,
  Icon,
  InfiniteScroll,
  Layout,
  List,
  QueryError,
  TextIcon,
} from '~/components'
import { MeWorksDraftFeedQuery } from '~/gql/graphql'

import Placeholder from '../Placeholder'
import WorksTabs from '../WorksTabs'
import { ME_WORKS_DRAFTS_FEED } from './gql'
import styles from './styles.module.css'

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

  const addDraft = () => {
    analytics.trackEvent('click_button', { type: 'write' })
    router.push(PATHS.ME_DRAFT_NEW)
  }

  return (
    <InfiniteScroll
      hasNextPage={pageInfo.hasNextPage}
      loadMore={loadMore}
      loader={<Placeholder />}
      eof
    >
      <section className={styles.addDraft} onClick={addDraft} role="button">
        <TextIcon icon={<Icon icon={IconPlus} size={20} />}>
          <FormattedMessage defaultMessage="Write" id="k2veDA" />
        </TextIcon>
      </section>
      <List>
        {edges.map(({ node, cursor }) => (
          <List.Item key={node.id}>
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
