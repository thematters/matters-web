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
          userNewFollower
          articleNewComment
          articleNewAppreciation
          articleNewSubscription
          articleSubscribedNewComment
          articleCommentPinned
          circleNewFollower
          circleNewDiscussion
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
          userNewFollower
          articleNewComment
          articleNewAppreciation
          articleNewSubscription
          articleSubscribedNewComment
          articleCommentPinned
          circleNewFollower
          circleNewDiscussion
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
    </PullToRefresh>
  )
}

const NotificationSettings = () => (
  <Layout.Main bgColor="grey-lighter">
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
