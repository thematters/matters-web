import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { SpinnerBlock, Switch, TableView, useMutation } from '~/components'
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
          newComment
          newLike
          articleNewSubscription
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
          newComment
          newLike
          articleNewSubscription
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
      <TableView spacingX={0}>
        {/* New followers */}
        <TableView.Cell
          title={
            <FormattedMessage
              defaultMessage="New followers"
              id="JkWLg6"
              description="src/views/Me/Settings/Notifications/GeneralSettings/index.tsx"
            />
          }
          right={
            <Switch
              name="notification-new-followers"
              label={
                <FormattedMessage
                  defaultMessage="New followers"
                  id="JkWLg6"
                  description="src/views/Me/Settings/Notifications/GeneralSettings/index.tsx"
                />
              }
              onChange={() => toggle('userNewFollower')}
              checked={settings.userNewFollower}
            />
          }
        />

        {/* New likes */}
        <TableView.Cell
          title={
            <FormattedMessage
              defaultMessage="New likes"
              id="Opaa0R"
              description="src/views/Me/Settings/Notifications/GeneralSettings/index.tsx"
            />
          }
          right={
            <Switch
              name="notification-new-likes"
              label={
                <FormattedMessage
                  defaultMessage="New likes"
                  id="Opaa0R"
                  description="src/views/Me/Settings/Notifications/GeneralSettings/index.tsx"
                />
              }
              checked={settings.newLike}
              onChange={() => toggle('newLike')}
            />
          }
        />

        {/* Comments and replies */}
        <TableView.Cell
          title={
            <FormattedMessage
              defaultMessage="Comments and replies"
              id="dVbKzB"
              description="src/views/Me/Settings/Notifications/GeneralSettings/index.tsx"
            />
          }
          right={
            <Switch
              name="notification-new-comments-and-replies"
              label={
                <FormattedMessage
                  defaultMessage="Comments and replies"
                  id="dVbKzB"
                  description="src/views/Me/Settings/Notifications/GeneralSettings/index.tsx"
                />
              }
              checked={settings.newComment}
              onChange={() => toggle('newComment')}
            />
          }
        />

        {/* Mention me */}
        <TableView.Cell
          title={
            <FormattedMessage
              defaultMessage="Mention me"
              id="BMGZE2"
              description="src/views/Me/Settings/Notifications/GeneralSettings/index.tsx"
            />
          }
          right={
            <Switch
              name="notification-mention-me"
              label={
                <FormattedMessage
                  defaultMessage="Mention me"
                  id="BMGZE2"
                  description="src/views/Me/Settings/Notifications/GeneralSettings/index.tsx"
                />
              }
              checked={settings.mention}
              onChange={() => toggle('mention')}
            />
          }
        />

        {/* Articles has been bookmarked */}
        <TableView.Cell
          title={
            <FormattedMessage
              defaultMessage="Articles have been bookmarked"
              id="SIgm0x"
              description="src/views/Me/Settings/Notifications/GeneralSettings/index.tsx"
            />
          }
          right={
            <Switch
              name="notification-articles-bookmarked"
              label={
                <FormattedMessage
                  defaultMessage="Articles have been bookmarked"
                  id="SIgm0x"
                  description="src/views/Me/Settings/Notifications/GeneralSettings/index.tsx"
                />
              }
              checked={settings.articleNewSubscription}
              onChange={() => toggle('articleNewSubscription')}
            />
          }
        />

        {/* Articles have been collected */}
        <TableView.Cell
          title={
            <FormattedMessage
              defaultMessage="Articles have been collected"
              id="hgtWIO"
              description="src/views/Me/Settings/Notifications/GeneralSettings/index.tsx"
            />
          }
          right={
            <Switch
              name="notification-article-collected"
              label={
                <FormattedMessage
                  defaultMessage="Articles have been collected"
                  id="hgtWIO"
                  description="src/views/Me/Settings/Notifications/GeneralSettings/index.tsx"
                />
              }
              checked={settings.articleNewCollected}
              onChange={() => toggle('articleNewCollected')}
            />
          }
        />
      </TableView>

      <Email toggle={toggle} settings={settings} />

      {/* Entry: circle notifications */}
      <TableView
        groupName={
          <FormattedMessage
            defaultMessage="Circle"
            id="kPylKK"
            description="src/views/Me/Settings/Notifications/index.tsx"
          />
        }
        spacingX={0}
      >
        <TableView.Cell
          role="link"
          title={
            <FormattedMessage
              defaultMessage="Circle notifications"
              id="mp9SBo"
              description="src/views/Me/Settings/Notifications/index.tsx"
            />
          }
          href={PATHS.ME_SETTINGS_NOTIFICATIONS_CIRCLE}
        />
      </TableView>
    </>
  )
}

export default NotificationsGeneralSettings
