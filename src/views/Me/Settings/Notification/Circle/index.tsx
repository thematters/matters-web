import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  Head,
  Layout,
  PullToRefresh,
  Spacer,
  Spinner,
  Translate,
  useMutation,
} from '~/components'

import styles from '../styles.css'
import MyBroadcastSettings from './MyBroadcast'
import MyDiscussionSettings from './MyDiscussion'
import MyManageSettings from './MyManage'
import SubscribeArticleSettings from './SubscribeArticle'
import SubscribeBroadcastSettings from './SubscribeBroadcast'
import SubscribeDiscussionSettings from './SubscribeDiscussion'

import { UpdateViewerNotificationCircle } from './__generated__/UpdateViewerNotificationCircle'
import { ViewerNotificationCircleSettings } from './__generated__/ViewerNotificationCircleSettings'

const VIEWER_NOTIFICATION_CIRCLE_SETTINGS = gql`
  query ViewerNotificationCircleSettings {
    viewer {
      id
      settings {
        language
        notification {
          enable
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

const UPDATE_VIEWER_NOTIFICATION_CIRCLE = gql`
  mutation UpdateViewerNotificationCircle(
    $type: NotificationSettingType!
    $enabled: Boolean!
  ) {
    updateNotificationSetting(input: { type: $type, enabled: $enabled }) {
      id
      settings {
        notification {
          enable
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
  const [update] = useMutation<UpdateViewerNotificationCircle>(
    UPDATE_VIEWER_NOTIFICATION_CIRCLE
  )
  const { data, loading, refetch } = useQuery<ViewerNotificationCircleSettings>(
    VIEWER_NOTIFICATION_CIRCLE_SETTINGS
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
      <div className="title">
        <h2>
          {' '}
          <Translate
            zh_hans="我的围炉"
            zh_hant="我的圍爐"
            en="My Circle"
          />{' '}
        </h2>
        <p>
          <Translate
            zh_hans="此处设定将套用至你所开设的围炉"
            zh_hant="此處設定將套用至你所開設的圍爐"
            en="The following settings apply to the Circle you owned"
          />{' '}
        </p>
      </div>
      <MyManageSettings toggle={toggle} settings={settings} />
      <MyBroadcastSettings toggle={toggle} settings={settings} />
      <MyDiscussionSettings toggle={toggle} settings={settings} />
      <div className="title">
        <h2>
          <Translate
            zh_hans="订阅围炉"
            zh_hant="訂閱圍爐"
            en="Subscribed or following Circles"
          />
        </h2>
        <p>
          {' '}
          <Translate
            zh_hans="此处设定将套用至你所有参加或追踪的围炉"
            zh_hant="此處設定將套用至你所有參加或追蹤的圍爐"
            en="The following settings apply to the Circle you following or subscribed to"
          />
        </p>
      </div>
      <SubscribeArticleSettings toggle={toggle} settings={settings} />
      <SubscribeBroadcastSettings toggle={toggle} settings={settings} />
      <SubscribeDiscussionSettings toggle={toggle} settings={settings} />
      <style jsx>{styles}</style>
    </PullToRefresh>
  )
}

const NotificationCircleSettings = () => (
  <Layout.Main smBgColor="grey-lighter">
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="settingsNotificationCircle" />}
    />

    <Head title={{ id: 'settingsNotificationCircle' }} />

    <BaseNotificationSettings />

    <Spacer size="xxxloose" />
  </Layout.Main>
)

export default NotificationCircleSettings
