import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { PATHS } from '~/common/enums'
import {
  Form,
  Head,
  Layout,
  Spinner,
  Translate,
  useMutation,
} from '~/components'
import {
  UpdateViewerNotificationMutation,
  ViewerNotificationSettingsQuery,
} from '~/gql/graphql'

import PreferenceSettings from './Preference'

const VIEWER_NOTIFICATION_SETTINGS = gql`
  query ViewerNotificationSettings {
    viewer {
      id
      settings {
        language
        notification {
          email
        }
      }
    }
  }
`

const UPDATE_VIEWER_NOTIFICATION = gql`
  mutation UpdateViewerNotification(
    $type: NotificationSettingType!
    $enabled: Boolean!
  ) {
    updateNotificationSetting(input: { type: $type, enabled: $enabled }) {
      id
      settings {
        notification {
          email
        }
      }
    }
  }
`

const BaseNotificationSettings = () => {
  const [update] = useMutation<UpdateViewerNotificationMutation>(
    UPDATE_VIEWER_NOTIFICATION
  )
  const { data, loading } = useQuery<ViewerNotificationSettingsQuery>(
    VIEWER_NOTIFICATION_SETTINGS
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
      <PreferenceSettings toggle={toggle} settings={settings} />

      <Form.List
        groupName={
          <Translate zh_hant="站內通知" zh_hans="站内通知" en="Site" />
        }
        spacingX={0}
      >
        <Form.List.Item
          role="link"
          title={<Translate id="settingsNotificationGeneral" />}
          href={PATHS.ME_SETTINGS_NOTIFICATIONS_GENERAL}
        />
        <Form.List.Item
          role="link"
          title={<Translate id="settingsNotificationCircle" />}
          href={PATHS.ME_SETTINGS_NOTIFICATIONS_CIRCLE}
        />
      </Form.List>
    </>
  )
}

const NotificationSettings = () => (
  <Layout.Main>
    <Layout.Header left={<Layout.Header.Title id="settingsNotification" />} />

    <Head title={{ id: 'settingsNotification' }} />

    <Layout.Main.Spacing>
      <BaseNotificationSettings />
    </Layout.Main.Spacing>
  </Layout.Main>
)

export default NotificationSettings
