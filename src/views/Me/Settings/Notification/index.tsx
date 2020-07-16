import { useQuery, gql } from '@apollo/client'

import { Head, Layout, PullToRefresh, Spacer, Spinner } from '~/components'
import { useMutation } from '~/components/GQL'

import ArticleSettings from './Article'
import CommentSettings from './Comment'
import MeSettings from './Me'
import OtherSettings from './Other'
import PreferenceSettings from './Preference'

import { UpdateViewerNotification } from './__generated__/UpdateViewerNotification'
import { ViewerNotificationSettings } from './__generated__/ViewerNotificationSettings'

const VIEWER_NOTIFICATION_SETTINGS = gql`
  query ViewerNotificationSettings {
    viewer {
      id
      settings {
        language
        notification {
          enable
          email
          mention
          follow
          comment
          appreciation
          articleSubscription
          commentSubscribed
          downstream
          commentPinned
          officialNotice
          reportFeedback
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
          mention
          follow
          comment
          appreciation
          articleSubscription
          commentSubscribed
          downstream
          commentPinned
          officialNotice
          reportFeedback
        }
      }
    }
  }
`

const NotificationSettings = () => {
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
      variables: {
        type,
        enabled: !settings[type],
      },
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
      <MeSettings toggle={toggle} settings={settings} />
      <ArticleSettings toggle={toggle} settings={settings} />
      <CommentSettings toggle={toggle} settings={settings} />
      <OtherSettings toggle={toggle} settings={settings} />
    </PullToRefresh>
  )
}

export default () => (
  <Layout.Main bgColor="grey-lighter">
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="settingsNotification" />}
    />

    <Head title={{ id: 'settingsNotification' }} />

    <NotificationSettings />

    <Spacer size="xxxloose" />
  </Layout.Main>
)
