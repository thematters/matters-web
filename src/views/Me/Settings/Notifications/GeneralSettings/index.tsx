import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { Form, Spinner, Switch, useMutation } from '~/components'
import {
  UpdateViewerNotificationsGeneralMutation,
  ViewerNotificationsGeneralSettingsQuery,
} from '~/gql/graphql'

import Email from './Email'

const VIEWER_NOTIFICATIONS_GENERAL_SETTINGS = gql`
  query ViewerNotificationsGeneralSettings {
    viewer {
      id
      settings {
        language
        notification {
          email
          mention
          userNewFollower
          articleNewComment
          articleNewAppreciation
          articleNewSubscription
          articleCommentPinned
          articleNewCollected
        }
      }
    }
  }
`

const UPDATE_VIEWER_NOTIFICATIONS_GENERAL = gql`
  mutation UpdateViewerNotificationsGeneral(
    $type: NotificationSettingType!
    $enabled: Boolean!
  ) {
    updateNotificationSetting(input: { type: $type, enabled: $enabled }) {
      id
      settings {
        notification {
          email
          mention
          userNewFollower
          articleNewComment
          articleNewAppreciation
          articleNewSubscription
          articleCommentPinned
          articleNewCollected
        }
      }
    }
  }
`

const NotificationsGeneralSettings = () => {
  const [update] = useMutation<UpdateViewerNotificationsGeneralMutation>(
    UPDATE_VIEWER_NOTIFICATIONS_GENERAL
  )
  const { data, loading } = useQuery<ViewerNotificationsGeneralSettingsQuery>(
    VIEWER_NOTIFICATIONS_GENERAL_SETTINGS
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
    <>
      <Form.List spacingX={0}>
        {/* New followers */}
        <Form.List.Item
          title={
            <FormattedMessage
              defaultMessage="New followers"
              description="src/views/Me/Settings/Notifications/GeneralSettings/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-new-followers"
              label={
                <FormattedMessage
                  defaultMessage="New followers"
                  description="src/views/Me/Settings/Notifications/GeneralSettings/index.tsx"
                />
              }
              checked={settings.userNewFollower}
              onChange={() => toggle('userNewFollower')}
            />
          }
        />

        {/* New likes */}
        <Form.List.Item
          title={
            <FormattedMessage
              defaultMessage="New likes"
              description="src/views/Me/Settings/Notifications/GeneralSettings/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-new-likes"
              label={
                <FormattedMessage
                  defaultMessage="New likes"
                  description="src/views/Me/Settings/Notifications/GeneralSettings/index.tsx"
                />
              }
              checked={settings.articleNewAppreciation}
              onChange={() => toggle('articleNewAppreciation')}
            />
          }
        />

        {/* Comments and replies */}
        <Form.List.Item
          title={
            <FormattedMessage
              defaultMessage="Comments and replies"
              description="src/views/Me/Settings/Notifications/GeneralSettings/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-new-comments-and-replies"
              label={
                <FormattedMessage
                  defaultMessage="Comments and replies"
                  description="src/views/Me/Settings/Notifications/GeneralSettings/index.tsx"
                />
              }
              checked={settings.articleNewComment}
              onChange={() => toggle('articleNewComment')}
            />
          }
        />

        {/* Mention me */}
        <Form.List.Item
          title={
            <FormattedMessage
              defaultMessage="Mention me"
              description="src/views/Me/Settings/Notifications/GeneralSettings/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-meniton-me"
              label={
                <FormattedMessage
                  defaultMessage="Mention me"
                  description="src/views/Me/Settings/Notifications/GeneralSettings/index.tsx"
                />
              }
              checked={settings.mention}
              onChange={() => toggle('mention')}
            />
          }
        />

        {/* Articles has been bookmarked */}
        <Form.List.Item
          title={
            <FormattedMessage
              defaultMessage="Articles has been bookmarked"
              description="src/views/Me/Settings/Notifications/GeneralSettings/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-articles-bookmarked"
              label={
                <FormattedMessage
                  defaultMessage="Articles has been bookmarked"
                  description="src/views/Me/Settings/Notifications/GeneralSettings/index.tsx"
                />
              }
              checked={settings.articleNewSubscription}
              onChange={() => toggle('articleNewSubscription')}
            />
          }
        />

        {/* Articles has been collected */}
        <Form.List.Item
          title={
            <FormattedMessage
              defaultMessage="Articles has been collected"
              description="src/views/Me/Settings/Notifications/GeneralSettings/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-article-collected"
              label={
                <FormattedMessage
                  defaultMessage="Articles has been collected"
                  description="src/views/Me/Settings/Notifications/GeneralSettings/index.tsx"
                />
              }
              checked={settings.articleNewCollected}
              onChange={() => toggle('articleNewCollected')}
            />
          }
        />

        {/* Comments has been pinned */}
        <Form.List.Item
          title={
            <FormattedMessage
              defaultMessage="Comments has been pinned"
              description="src/views/Me/Settings/Notifications/GeneralSettings/index.tsx"
            />
          }
          right={
            <Switch
              name="nofitication-comment-pinned"
              label={
                <FormattedMessage
                  defaultMessage="Comments has been pinned"
                  description="src/views/Me/Settings/Notifications/GeneralSettings/index.tsx"
                />
              }
              checked={settings.articleCommentPinned}
              onChange={() => toggle('articleCommentPinned')}
            />
          }
        />
      </Form.List>

      <Email toggle={toggle} settings={settings} />
    </>
  )
}

export default NotificationsGeneralSettings
