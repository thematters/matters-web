import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Head, Layout, Spacer, Spinner, useMutation } from '~/components'
import {
  UpdateViewerNotificationGeneralMutation,
  ViewerNotificationGeneralSettingsQuery,
} from '~/gql/graphql'

import ArticleSettings from './Article'
import CommentSettings from './Comment'
import MeSettings from './Me'

const VIEWER_NOTIFICATION_GENERAL_SETTINGS = gql`
  query ViewerNotificationGeneralSettings {
    viewer {
      id
      settings {
        language
        notification {
          enable
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

const UPDATE_VIEWER_NOTIFICATION_GENERAL = gql`
  mutation UpdateViewerNotificationGeneral(
    $type: NotificationSettingType!
    $enabled: Boolean!
  ) {
    updateNotificationSetting(input: { type: $type, enabled: $enabled }) {
      id
      settings {
        notification {
          enable
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

const BaseNotificationSettings = () => {
  const [update] = useMutation<UpdateViewerNotificationGeneralMutation>(
    UPDATE_VIEWER_NOTIFICATION_GENERAL
  )
  const { data, loading } = useQuery<ViewerNotificationGeneralSettingsQuery>(
    VIEWER_NOTIFICATION_GENERAL_SETTINGS
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
      <MeSettings toggle={toggle} settings={settings} />
      <ArticleSettings toggle={toggle} settings={settings} />
      <CommentSettings toggle={toggle} settings={settings} />
    </Layout.Main.Spacing>
  )
}

const NotificationGeneralSettings = () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.Title id="settingsNotificationGeneral" />}
    />

    <Head title={{ id: 'settingsNotificationGeneral' }} />

    <BaseNotificationSettings />

    <Spacer size="xxxloose" />
  </Layout.Main>
)

export default NotificationGeneralSettings
