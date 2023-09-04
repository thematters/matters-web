import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { FormattedMessage, useIntl } from 'react-intl'

import { Form, Head, Layout, Spinner, Switch, useMutation } from '~/components'
import {
  UpdateViewerNotificationsCircleMutation,
  ViewerNotificationsCircleSettingsQuery,
} from '~/gql/graphql'

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
    return <Spinner />
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
    <Layout.Main.Spacing>
      {/* My cirlce */}
      <Form.List
        groupName={
          <FormattedMessage
            defaultMessage="My circle"
            description="src/views/Me/Settings/Notifications/Circle/index.tsx"
          />
        }
        spacingX={0}
      >
        {/* New subscribers */}
        <Form.List.Item
          title={
            <FormattedMessage
              defaultMessage="New subscribers"
              description="src/views/Me/Settings/Notifications/Circle/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-circle-new-subscribers"
              label={
                <FormattedMessage
                  defaultMessage="New subscribers"
                  description="src/views/Me/Settings/Notifications/Circle/index.tsx"
                />
              }
              checked={settings.circleNewSubscriber}
              onChange={() => toggle('circleNewSubscriber')}
            />
          }
        />

        {/* New followers */}
        <Form.List.Item
          title={
            <FormattedMessage
              defaultMessage="New followers"
              description="src/views/Me/Settings/Notifications/Circle/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-circle-new-followers"
              label={
                <FormattedMessage
                  defaultMessage="New followers"
                  description="src/views/Me/Settings/Notifications/Circle/index.tsx"
                />
              }
              checked={settings.circleNewFollower}
              onChange={() => toggle('circleNewFollower')}
            />
          }
        />

        {/* Subscription cancellations */}
        <Form.List.Item
          title={
            <FormattedMessage
              defaultMessage="Subscription cancellations"
              description="src/views/Me/Settings/Notifications/Circle/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-circle-subscription-cancellations"
              label={
                <FormattedMessage
                  defaultMessage="Subscription cancellations"
                  description="src/views/Me/Settings/Notifications/Circle/index.tsx"
                />
              }
              checked={settings.circleNewUnsubscriber}
              onChange={() => toggle('circleNewUnsubscriber')}
            />
          }
        />

        {/* New replies to broadcast */}
        <Form.List.Item
          title={
            <FormattedMessage
              defaultMessage="New replies to broadcast"
              description="src/views/Me/Settings/Notifications/Circle/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-circle-new-replies-to-broadcast"
              label={
                <FormattedMessage
                  defaultMessage="New replies to broadcast"
                  description="src/views/Me/Settings/Notifications/Circle/index.tsx"
                />
              }
              checked={settings.circleMemberNewBroadcastReply}
              onChange={() => toggle('circleMemberNewBroadcastReply')}
            />
          }
        />

        {/* New discussions */}
        <Form.List.Item
          title={
            <FormattedMessage
              defaultMessage="New discussions"
              description="src/views/Me/Settings/Notifications/Circle/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-circle-new-discussions"
              label={
                <FormattedMessage
                  defaultMessage="New discussions"
                  description="src/views/Me/Settings/Notifications/Circle/index.tsx"
                />
              }
              checked={settings.circleMemberNewDiscussion}
              onChange={() => toggle('circleMemberNewDiscussion')}
            />
          }
        />

        {/* New replies to discussions */}
        <Form.List.Item
          title={
            <FormattedMessage
              defaultMessage="New replies to discussions"
              description="src/views/Me/Settings/Notifications/Circle/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-circle-new-replies-to-discussions"
              label={
                <FormattedMessage
                  defaultMessage="New replies to discussions"
                  description="src/views/Me/Settings/Notifications/Circle/index.tsx"
                />
              }
              checked={settings.circleMemberNewDiscussionReply}
              onChange={() => toggle('circleMemberNewDiscussionReply')}
            />
          }
        />
      </Form.List>

      {/* Following circles */}
      <Form.List
        groupName={
          <FormattedMessage
            defaultMessage="Following circles"
            description="src/views/Me/Settings/Notifications/Circle/index.tsx"
          />
        }
        spacingX={0}
      >
        {/* New articles */}
        <Form.List.Item
          title={
            <FormattedMessage
              defaultMessage="New articles"
              description="src/views/Me/Settings/Notifications/Circle/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-in-circle-new-articles"
              label={
                <FormattedMessage
                  defaultMessage="New articles"
                  description="src/views/Me/Settings/Notifications/Circle/index.tsx"
                />
              }
              checked={settings.inCircleNewArticle}
              onChange={() => toggle('inCircleNewArticle')}
            />
          }
        />

        {/* New broadcasts */}
        <Form.List.Item
          title={
            <FormattedMessage
              defaultMessage="New broadcasts"
              description="src/views/Me/Settings/Notifications/Circle/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-in-circle-new-broadcasts"
              label={
                <FormattedMessage
                  defaultMessage="New broadcasts"
                  description="src/views/Me/Settings/Notifications/Circle/index.tsx"
                />
              }
              checked={settings.inCircleNewBroadcast}
              onChange={() => toggle('inCircleNewBroadcast')}
            />
          }
        />

        {/* New replies to broadcast */}
        <Form.List.Item
          title={
            <FormattedMessage
              defaultMessage="New replies to broadcast"
              description="src/views/Me/Settings/Notifications/Circle/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-in-circle-new-replies-to-broadcast"
              label={
                <FormattedMessage
                  defaultMessage="New replies to broadcast"
                  description="src/views/Me/Settings/Notifications/Circle/index.tsx"
                />
              }
              checked={settings.inCircleNewBroadcastReply}
              onChange={() => toggle('inCircleNewBroadcastReply')}
            />
          }
        />

        {/* New discussions */}
        <Form.List.Item
          title={
            <FormattedMessage
              defaultMessage="New discussions"
              description="src/views/Me/Settings/Notifications/Circle/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-in-circle-new-discussions"
              label={
                <FormattedMessage
                  defaultMessage="New discussions"
                  description="src/views/Me/Settings/Notifications/Circle/index.tsx"
                />
              }
              checked={settings.inCircleNewDiscussion}
              onChange={() => toggle('inCircleNewDiscussion')}
            />
          }
        />

        {/* New replies to discussions */}
        <Form.List.Item
          title={
            <FormattedMessage
              defaultMessage="New replies to discussions"
              description="src/views/Me/Settings/Notifications/Circle/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-in-circle-new-replies-to-discussions"
              label={
                <FormattedMessage
                  defaultMessage="New replies to discussions"
                  description="src/views/Me/Settings/Notifications/Circle/index.tsx"
                />
              }
              checked={settings.inCircleNewDiscussionReply}
              onChange={() => toggle('inCircleNewDiscussionReply')}
            />
          }
        />
      </Form.List>
    </Layout.Main.Spacing>
  )
}

const NotificationsCircleSettings = () => {
  const intl = useIntl()
  const title = intl.formatMessage({
    defaultMessage: 'Settings - Circle notifications',
    description: 'src/views/Me/Settings/Notifications/Circle/index.tsx',
  })

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage
              defaultMessage="Circle notifications"
              description="src/views/Me/Settings/Notifications/index.tsx"
            />
          </Layout.Header.Title>
        }
      />

      <Head title={title} />

      <BaseNotificationSettings />
    </Layout.Main>
  )
}

export default NotificationsCircleSettings
