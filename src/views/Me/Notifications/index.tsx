import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { useContext, useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { PATHS } from '~/common/enums'
import { mergeConnections, shouldRenderNode } from '~/common/utils'
import {
  Button,
  EmptyNotice,
  Head,
  InfiniteScroll,
  Layout,
  List,
  Media,
  Notice,
  Spacer,
  SpinnerBlock,
  useMutation,
  ViewerContext,
} from '~/components'
import CampaignArticleNotice from '~/components/Notice/CampaignArticleNotice'
import CollectionNotice from '~/components/Notice/CollectionNotice'
import MomentNotice from '~/components/Notice/MomentNotice'
import {
  MarkAllNoticesAsReadMutation,
  MeNotificationsQuery,
} from '~/gql/graphql'

import styles from './styles.module.css'

const renderableTypes = new Set([
  'ArticleArticleNotice',
  'CircleNotice',
  'ArticleNotice',
  'CollectionNotice',
  'CommentCommentNotice',
  'CommentNotice',
  'OfficialAnnouncementNotice',
  'TransactionNotice',
  'MomentNotice',
  'UserNotice',
  'CampaignArticleNotice',
])

const ME_NOTIFICATIONS = gql`
  query MeNotifications($after: String) {
    viewer {
      id
      notices(input: { first: 20, after: $after }) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            createdAt
            ...DigestNotice
            # FIXME: why CollectionNotice, CampaignArticleNotice and MomentNotice is not included in DigestNotice?
            ...CollectionNotice
            ...MomentNotice
            ...CampaignArticleNotice
          }
        }
      }
    }
  }
  ${Notice.fragments.notice}
  ${CollectionNotice.fragments.notice}
  ${MomentNotice.fragments.notice}
  ${CampaignArticleNotice.fragments.notice}
`
// FIXME: remove CollectionNotice fragment from ME_NOTIFICATIONS

const MARK_ALL_NOTICES_AS_READ = gql`
  mutation MarkAllNoticesAsRead {
    markAllNoticesAsRead
  }
`

const FEDIVERSE_NOTIFICATIONS = gql`
  query FediverseNotificationsDigest {
    viewerFediverse {
      unreadNotificationsCount
      notifications {
        id
        category
        headline
        preview
        eventCount
        unreadCount
        publishedAt
      }
    }
  }
`

const MARK_FEDIVERSE_NOTIFICATIONS_READ = gql`
  mutation MarkFediverseNotificationsRead($input: FediverseActionInput!) {
    actFediverse(input: $input) {
      status
    }
  }
`

const BaseNotifications = () => {
  const viewer = useContext(ViewerContext)
  const federationEnabled = viewer.federationSetting?.state === 'enabled'

  const [markAllNoticesAsRead] = useMutation<MarkAllNoticesAsReadMutation>(
    MARK_ALL_NOTICES_AS_READ,
    {
      update: (cache) => {
        cache.modify({
          id: cache.identify(viewer),
          fields: {
            status: (existingStatus) => ({
              ...existingStatus,
              unreadNoticeCount: 0,
            }),
          },
        })
      },
    }
  )
  const { data, loading, fetchMore } = useQuery<
    MeNotificationsQuery,
    { first: number; after?: number }
  >(ME_NOTIFICATIONS, {
    fetchPolicy: 'network-only',
  })
  const { data: federationData } = useQuery<{
    viewerFediverse: {
      unreadNotificationsCount: number
      notifications: Array<{
        id: string
        category: string
        headline?: string | null
        preview?: string | null
        eventCount: number
        unreadCount: number
      }>
    }
  }>(FEDIVERSE_NOTIFICATIONS, {
    errorPolicy: 'ignore',
    fetchPolicy: 'network-only',
    skip: !federationEnabled,
  })
  const [markFediverseNotificationsRead] = useMutation(
    MARK_FEDIVERSE_NOTIFICATIONS_READ
  )

  useEffect(() => {
    markAllNoticesAsRead()
  }, [])

  useEffect(() => {
    const ids =
      federationData?.viewerFediverse.notifications
        .filter((notification) => notification.unreadCount > 0)
        .map((notification) => notification.id) ?? []
    if (ids.length > 0) {
      markFediverseNotificationsRead({
        variables: {
          input: {
            action: 'mark_read',
            notificationIds: ids,
          },
        },
      })
    }
  }, [federationData?.viewerFediverse.notifications])

  const connectionPath = 'viewer.notices'
  const { edges, pageInfo } = data?.viewer?.notices || {}

  if (loading) {
    return <SpinnerBlock />
  }

  const federationNotifications =
    federationData?.viewerFediverse.notifications ?? []

  if (
    (!edges || edges.length <= 0 || !pageInfo) &&
    federationNotifications.length === 0
  ) {
    return <EmptyNotice />
  }

  const loadMore = () => {
    if (!pageInfo) {
      return Promise.resolve()
    }
    return fetchMore({
      variables: { first: 20, after: pageInfo.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

  return (
    <>
      {federationNotifications.length > 0 && (
        <section className={styles.fediverse}>
          <header>
            <div>
              <h2>
                <FormattedMessage defaultMessage="聯邦通知" id="glsBoL" />
              </h2>
              <p>
                <FormattedMessage
                  defaultMessage="來自其他 Fediverse 站台的互動"
                  id="4GmeZE"
                />
              </p>
            </div>
            <Button href={PATHS.ME_FEDIVERSE} textColor="green">
              <FormattedMessage defaultMessage="查看全部" id="t0kvjC" />
            </Button>
          </header>
          {federationNotifications.slice(0, 5).map((notification) => (
            <div className={styles.fediverseItem} key={notification.id}>
              <div>
                <strong>
                  {notification.headline || notification.category}
                </strong>
                {notification.preview && <p>{notification.preview}</p>}
              </div>
              <span>{notification.eventCount}</span>
            </div>
          ))}
        </section>
      )}
      {edges && pageInfo && (
        <InfiniteScroll
          hasNextPage={pageInfo.hasNextPage}
          loadMore={loadMore}
          eof
        >
          <List spacing={['xxxloose', 0]} hasBorder={false}>
            {edges.map(
              ({ node }) =>
                shouldRenderNode(node, renderableTypes) && (
                  <List.Item key={node.id}>
                    <Notice notice={node} />
                  </List.Item>
                )
            )}
          </List>
        </InfiniteScroll>
      )}
    </>
  )
}

const Notifications = () => {
  const intl = useIntl()

  return (
    <Layout.Main>
      <Head
        title={intl.formatMessage({
          defaultMessage: 'Notifications',
          id: 'NAidKb',
        })}
      />
      <Media lessThan="md">
        <Layout.Header
          left={
            <Layout.Header.Title>
              <FormattedMessage defaultMessage="Notifications" id="NAidKb" />
            </Layout.Header.Title>
          }
        />
        <Spacer size="sp16" />
      </Media>
      <Media greaterThanOrEqual="md">
        <Spacer size="sp32" />
      </Media>

      <Layout.Main.Spacing hasVertical={false}>
        <BaseNotifications />
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default Notifications
