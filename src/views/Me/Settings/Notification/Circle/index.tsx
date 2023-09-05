import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  Head,
  Layout,
  Spacer,
  Spinner,
  Translate,
  useMutation,
} from '~/components'
import {
  UpdateViewerNotificationCircleMutation,
  ViewerNotificationCircleSettingsQuery,
} from '~/gql/graphql'

import styles from '../styles.module.css'
import MyBroadcastSettings from './MyBroadcast'
import MyDiscussionSettings from './MyDiscussion'
import MyManageSettings from './MyManage'
import SubscribeArticleSettings from './SubscribeArticle'
import SubscribeBroadcastSettings from './SubscribeBroadcast'
import SubscribeDiscussionSettings from './SubscribeDiscussion'

const VIEWER_NOTIFICATION_CIRCLE_SETTINGS = gql`
  query ViewerNotificationCircleSettings {
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

const UPDATE_VIEWER_NOTIFICATION_CIRCLE = gql`
  mutation UpdateViewerNotificationCircle(
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

const BaseNotificationSettings = ({
  spacingX = 'base',
}: {
  spacingX?: 0 | 'base'
}) => {
  const [update] = useMutation<UpdateViewerNotificationCircleMutation>(
    UPDATE_VIEWER_NOTIFICATION_CIRCLE
  )
  const { data, loading } = useQuery<ViewerNotificationCircleSettingsQuery>(
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
    <Layout.Main.Spacing>
      <div className={styles.title}>
        <h2>
          {' '}
          <Translate
            zh_hans="我的围炉"
            zh_hant="我的圍爐"
            en="My Circle"
          />{' '}
        </h2>
      </div>
      <MyManageSettings
        toggle={toggle}
        settings={settings}
        spacingX={spacingX}
      />
      <MyBroadcastSettings
        toggle={toggle}
        settings={settings}
        spacingX={spacingX}
      />
      <MyDiscussionSettings
        toggle={toggle}
        settings={settings}
        spacingX={spacingX}
      />
      <div className={styles.title}>
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
      <SubscribeArticleSettings
        toggle={toggle}
        settings={settings}
        spacingX={spacingX}
      />
      <SubscribeBroadcastSettings
        toggle={toggle}
        settings={settings}
        spacingX={spacingX}
      />
      <SubscribeDiscussionSettings
        toggle={toggle}
        settings={settings}
        spacingX={spacingX}
      />
    </Layout.Main.Spacing>
  )
}

const NotificationCircleSettings = () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.Title id="settingsNotificationCircle" />}
    />

    <Head title={{ id: 'settingsNotificationCircle' }} />

    <BaseNotificationSettings spacingX={0} />

    <Spacer size="xxxloose" />
  </Layout.Main>
)

export default NotificationCircleSettings
