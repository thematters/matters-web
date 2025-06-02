import { useQuery } from '@apollo/client'
import { FormattedMessage, useIntl } from 'react-intl'

import IconPlus from '@/public/static/icons/24px/plus.svg'
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
    window.open(PATHS.ME_DRAFT_NEW, '_blank')
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
        {edges.map(({ node }) => (
          <List.Item key={node.id}>
            <DraftDigest.Feed draft={node} />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

const MeWorksDrafts = () => {
  const intl = useIntl()

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage defaultMessage="My Works" id="ai7kS4" />
          </Layout.Header.Title>
        }
      />

      <Head
        title={intl.formatMessage({
          defaultMessage: 'My Works',
          id: 'ai7kS4',
        })}
      />

      <WorksTabs />

      <BaseMeWorksDrafts />
    </Layout.Main>
  )
}

export default MeWorksDrafts
