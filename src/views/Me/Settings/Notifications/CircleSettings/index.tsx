import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  Head,
  Layout,
  Spacer,
  SpinnerBlock,
  Switch,
  TableView,
  useMutation,
} from '~/components'
import {
  UpdateViewerNotificationsCircleMutation,
  ViewerNotificationsCircleSettingsQuery,
} from '~/gql/graphql'

import styles from '../../styles.module.css'

const VIEWER_NOTIFICATIONS_CIRCLE_SETTINGS = gql`
  query ViewerNotificationsCircleSettings {
    viewer {
      id
      settings {
        language
        notification {
          circleNewSubscriber
          circleNewFollower
          circleNewUnsubscriber
          circleMemberNewBroadcastReply
          circleMemberNewDiscussion
          circleMemberNewDiscussionReply
          inCircleNewArticle
          inCircleNewBroadcast
          inCircleNewBroadcastReply
          inCircleNewDiscussion
          inCircleNewDiscussionReply
        }
      }
    }
  }
`

const UPDATE_VIEWER_NOTIFICATIONS_CIRCLE = gql`
  mutation UpdateViewerNotificationsCircle(
    $type: NotificationSettingType!
    $enabled: Boolean!
  ) {
    updateNotificationSetting(input: { type: $type, enabled: $enabled }) {
      id
      settings {
        notification {
          circleNewSubscriber
          circleNewFollower
          circleNewUnsubscriber
          circleMemberNewBroadcastReply
          circleMemberNewDiscussion
          circleMemberNewDiscussionReply
          inCircleNewArticle
          inCircleNewBroadcast
          inCircleNewBroadcastReply
          inCircleNewDiscussion
          inCircleNewDiscussionReply
        }
      }
    }
  }
`

const BaseNotificationSettings = () => {
  const [update] = useMutation<UpdateViewerNotificationsCircleMutation>(
    UPDATE_VIEWER_NOTIFICATIONS_CIRCLE
  )
  const { data, loading } = useQuery<ViewerNotificationsCircleSettingsQuery>(
    VIEWER_NOTIFICATIONS_CIRCLE_SETTINGS
  )
  const settings = data?.viewer?.settings.notification
  const id = data?.viewer?.id

  if (loading) {
    return <SpinnerBlock />
  }

  if (!id || !settings) {
    return null
  }

  const toggle = (type: keyof typeof settings) => {
    update({
      variables: { type, enabled: !settings[type] },
      optimisticResponse: {
        updateNotificationSetting: {
          id,
          settings: {
            notification: {
              ...settings,
              [type]: !settings[type],
              __typename: 'NotificationSetting',
            },
            __typename: 'UserSettings',
          },
          __typename: 'User',
        },
      },
    })
  }

  return (
    <>
      {/* My circle */}
      <TableView
        groupName={
          <FormattedMessage
            defaultMessage="My circle"
            id="u+cgOo"
            description="src/views/Me/Settings/Notifications/Circle/index.tsx"
          />
        }
        spacingX={0}
      >
        {/* New subscribers */}
        <TableView.Cell
          title={
            <FormattedMessage
              defaultMessage="New subscribers"
              id="m4KtjK"
              description="src/views/Me/Settings/Notifications/Circle/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-circle-new-subscribers"
              label={
                <FormattedMessage
                  defaultMessage="New subscribers"
                  id="m4KtjK"
                  description="src/views/Me/Settings/Notifications/Circle/index.tsx"
                />
              }
              checked={settings.circleNewSubscriber}
              onChange={() => toggle('circleNewSubscriber')}
            />
          }
        />

        {/* New followers */}
        <TableView.Cell
          title={
            <FormattedMessage
              defaultMessage="New followers"
              id="h7sMQs"
              description="src/views/Me/Settings/Notifications/Circle/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-circle-new-followers"
              label={
                <FormattedMessage
                  defaultMessage="New followers"
                  id="h7sMQs"
                  description="src/views/Me/Settings/Notifications/Circle/index.tsx"
                />
              }
              checked={settings.circleNewFollower}
              onChange={() => toggle('circleNewFollower')}
            />
          }
        />

        {/* Subscription cancellations */}
        <TableView.Cell
          title={
            <FormattedMessage
              defaultMessage="Subscription cancellations"
              id="GhogWq"
              description="src/views/Me/Settings/Notifications/Circle/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-circle-subscription-cancellations"
              label={
                <FormattedMessage
                  defaultMessage="Subscription cancellations"
                  id="GhogWq"
                  description="src/views/Me/Settings/Notifications/Circle/index.tsx"
                />
              }
              checked={settings.circleNewUnsubscriber}
              onChange={() => toggle('circleNewUnsubscriber')}
            />
          }
        />

        {/* New replies to broadcast */}
        <TableView.Cell
          title={
            <FormattedMessage
              defaultMessage="New replies to broadcast"
              id="A0KB7s"
              description="src/views/Me/Settings/Notifications/Circle/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-circle-new-replies-to-broadcast"
              label={
                <FormattedMessage
                  defaultMessage="New replies to broadcast"
                  id="A0KB7s"
                  description="src/views/Me/Settings/Notifications/Circle/index.tsx"
                />
              }
              checked={settings.circleMemberNewBroadcastReply}
              onChange={() => toggle('circleMemberNewBroadcastReply')}
            />
          }
        />

        {/* New discussions */}
        <TableView.Cell
          title={
            <FormattedMessage
              defaultMessage="New discussions"
              id="xafreT"
              description="src/views/Me/Settings/Notifications/Circle/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-circle-new-discussions"
              label={
                <FormattedMessage
                  defaultMessage="New discussions"
                  id="xafreT"
                  description="src/views/Me/Settings/Notifications/Circle/index.tsx"
                />
              }
              checked={settings.circleMemberNewDiscussion}
              onChange={() => toggle('circleMemberNewDiscussion')}
            />
          }
        />

        {/* New replies to discussions */}
        <TableView.Cell
          title={
            <FormattedMessage
              defaultMessage="New replies to discussions"
              id="2vpUYs"
              description="src/views/Me/Settings/Notifications/Circle/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-circle-new-replies-to-discussions"
              label={
                <FormattedMessage
                  defaultMessage="New replies to discussions"
                  id="2vpUYs"
                  description="src/views/Me/Settings/Notifications/Circle/index.tsx"
                />
              }
              checked={settings.circleMemberNewDiscussionReply}
              onChange={() => toggle('circleMemberNewDiscussionReply')}
            />
          }
        />
      </TableView>

      {/* Following circles */}
      <TableView
        groupName={
          <FormattedMessage
            defaultMessage="Following circles"
            id="d1mBsg"
            description="src/views/Me/Settings/Notifications/Circle/index.tsx"
          />
        }
        spacingX={0}
      >
        {/* New articles */}
        <TableView.Cell
          title={
            <FormattedMessage
              defaultMessage="New articles"
              id="ctl5tq"
              description="src/views/Me/Settings/Notifications/Circle/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-in-circle-new-articles"
              label={
                <FormattedMessage
                  defaultMessage="New articles"
                  id="ctl5tq"
                  description="src/views/Me/Settings/Notifications/Circle/index.tsx"
                />
              }
              checked={settings.inCircleNewArticle}
              onChange={() => toggle('inCircleNewArticle')}
            />
          }
        />

        {/* New broadcasts */}
        <TableView.Cell
          title={
            <FormattedMessage
              defaultMessage="New broadcasts"
              id="viMrzF"
              description="src/views/Me/Settings/Notifications/Circle/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-in-circle-new-broadcasts"
              label={
                <FormattedMessage
                  defaultMessage="New broadcasts"
                  id="viMrzF"
                  description="src/views/Me/Settings/Notifications/Circle/index.tsx"
                />
              }
              checked={settings.inCircleNewBroadcast}
              onChange={() => toggle('inCircleNewBroadcast')}
            />
          }
        />

        {/* New replies to broadcast */}
        <TableView.Cell
          title={
            <FormattedMessage
              defaultMessage="New replies to broadcast"
              id="A0KB7s"
              description="src/views/Me/Settings/Notifications/Circle/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-in-circle-new-replies-to-broadcast"
              label={
                <FormattedMessage
                  defaultMessage="New replies to broadcast"
                  id="A0KB7s"
                  description="src/views/Me/Settings/Notifications/Circle/index.tsx"
                />
              }
              checked={settings.inCircleNewBroadcastReply}
              onChange={() => toggle('inCircleNewBroadcastReply')}
            />
          }
        />

        {/* New discussions */}
        <TableView.Cell
          title={
            <FormattedMessage
              defaultMessage="New discussions"
              id="xafreT"
              description="src/views/Me/Settings/Notifications/Circle/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-in-circle-new-discussions"
              label={
                <FormattedMessage
                  defaultMessage="New discussions"
                  id="xafreT"
                  description="src/views/Me/Settings/Notifications/Circle/index.tsx"
                />
              }
              checked={settings.inCircleNewDiscussion}
              onChange={() => toggle('inCircleNewDiscussion')}
            />
          }
        />

        {/* New replies to discussions */}
        <TableView.Cell
          title={
            <FormattedMessage
              defaultMessage="New replies to discussions"
              id="2vpUYs"
              description="src/views/Me/Settings/Notifications/Circle/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-in-circle-new-replies-to-discussions"
              label={
                <FormattedMessage
                  defaultMessage="New replies to discussions"
                  id="2vpUYs"
                  description="src/views/Me/Settings/Notifications/Circle/index.tsx"
                />
              }
              checked={settings.inCircleNewDiscussionReply}
              onChange={() => toggle('inCircleNewDiscussionReply')}
            />
          }
        />
      </TableView>
    </>
  )
}

const NotificationsCircleSettings = () => {
  const intl = useIntl()

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage
              defaultMessage="Circle notifications"
              id="mp9SBo"
              description="src/views/Me/Settings/Notifications/index.tsx"
            />
          </Layout.Header.Title>
        }
      />

      <Head
        title={intl.formatMessage({
          defaultMessage: 'Settings',
          id: 'D3idYv',
        })}
      />

      <section className={styles.container}>
        <BaseNotificationSettings />
      </section>

      <Spacer size="sp32" />
    </Layout.Main>
  )
}

export default NotificationsCircleSettings
