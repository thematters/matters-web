import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  Head,
  Layout,
  PullToRefresh,
  Spacer,
  Spinner,
  useMutation,
} from '~/components'

import ArticleSettings from './Article'
import CommentSettings from './Comment'
import MeSettings from './Me'

import { UpdateViewerNotificationGeneral } from './__generated__/UpdateViewerNotificationGeneral'
import { ViewerNotificationGeneralSettings } from './__generated__/ViewerNotificationGeneralSettings'

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
  const [update] = useMutation<UpdateViewerNotificationGeneral>(
    UPDATE_VIEWER_NOTIFICATION_GENERAL
  )
  const { data, loading, refetch } =
    useQuery<ViewerNotificationGeneralSettings>(
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
    <PullToRefresh refresh={refetch}>
      <MeSettings toggle={toggle} settings={settings} />
      <ArticleSettings toggle={toggle} settings={settings} />
      <CommentSettings toggle={toggle} settings={settings} />
    </PullToRefresh>
  )
}

const NotificationGeneralSettings = () => (
  <Layout.Main smBgColor="grey-lighter">
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="settingsNotificationGeneral" />}
    />

    <Head title={{ id: 'settingsNotificationGeneral' }} />

    <BaseNotificationSettings />

    <Spacer size="xxxloose" />
  </Layout.Main>
)

export default NotificationGeneralSettings
