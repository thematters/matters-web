import { Form, Switch, Translate } from '~/components'

import { ViewerNotificationCircleSettings_viewer_settings_notification } from './__generated__/ViewerNotificationCircleSettings'

interface MyManageProps {
  settings: ViewerNotificationCircleSettings_viewer_settings_notification
  toggle: (
    type: keyof ViewerNotificationCircleSettings_viewer_settings_notification
  ) => void
}

const NewSubscriberText = () => (
  <Translate zh_hant="有新訂閱者" zh_hans="有新订阅者" en="New subscribers" />
)

const NewFollowerText = () => (
  <Translate zh_hant="有新追蹤者" zh_hans="有新追踪者" en="New followers" />
)

const NewUnsubscriberText = () => (
  <Translate
    zh_hant="訂閱者退訂"
    zh_hans="订阅者退订"
    en="Subscription cancellations"
  />
)

const MyManage = ({ settings, toggle }: MyManageProps) => (
  <Form.List
    groupName={<Translate zh_hant="管理" zh_hans="管理" en="Management" />}
  >
    <Form.List.Item
      title={<NewSubscriberText />}
      right={
        <Switch
          name="nofitication-subscriber"
          label={<NewSubscriberText />}
          checked={settings.circleNewSubscriber}
          onChange={() => toggle('circleNewSubscriber')}
        />
      }
    />
    <Form.List.Item
      title={<NewFollowerText />}
      right={
        <Switch
          name="nofitication-follower"
          label={<NewFollowerText />}
          checked={settings.circleNewFollower}
          onChange={() => toggle('circleNewFollower')}
        />
      }
    />
    <Form.List.Item
      title={<NewUnsubscriberText />}
      right={
        <Switch
          name="nofitication-unsubscriber"
          label={<NewUnsubscriberText />}
          checked={settings.circleNewUnsubscriber}
          onChange={() => toggle('circleNewUnsubscriber')}
        />
      }
    />
  </Form.List>
)

export default MyManage
