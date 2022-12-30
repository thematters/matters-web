import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { PATHS } from '~/common/enums'
import {
  Form,
  Head,
  Layout,
  PullToRefresh,
  Spacer,
  Spinner,
  Translate,
  useMutation,
} from '~/components'

import { UpdateViewerNotification } from './__generated__/UpdateViewerNotification'
import { ViewerNotificationSettings } from './__generated__/ViewerNotificationSettings'
import PreferenceSettings from './Preference'

const VIEWER_NOTIFICATION_SETTINGS = gql`
  query ViewerNotificationSettings {
    viewer {
      id
      settings {
        language
        notification {
          enable
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
          enable
          email
        }
      }
    }
  }
`

const BaseNotificationSettings = () => {
  const [update] = useMutation<UpdateViewerNotification>(
    UPDATE_VIEWER_NOTIFICATION
  )
  const { data, loading, refetch } = useQuery<ViewerNotificationSettings>(
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
    <PullToRefresh refresh={refetch}>
      <PreferenceSettings toggle={toggle} settings={settings} />
      <Form.List
        groupName={
          <Translate zh_hant="站內通知" zh_hans="站内通知" en="Site" />
        }
      >
        <Form.List.Item
          role="link"
          title={<Translate id="settingsNotificationGeneral" />}
          href={PATHS.ME_SETTINGS_NOTIFICATION_GENERAL}
        />
        <Form.List.Item
          role="link"
          title={<Translate id="settingsNotificationCircle" />}
          href={PATHS.ME_SETTINGS_NOTIFICATION_CIRCLE}
        />
      </Form.List>
    </PullToRefresh>
  )
}

const NotificationSettings = () => (
  <Layout.Main smBgColor="grey-lighter">
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="settingsNotification" />}
    />

    <Head title={{ id: 'settingsNotification' }} />

    <BaseNotificationSettings />

    <Spacer size="xxxloose" />
  </Layout.Main>
)

export default NotificationSettings
