import { Form, Switch, Translate } from '~/components'

import { ViewerNotificationCircleSettings_viewer_settings_notification } from './__generated__/ViewerNotificationCircleSettings'

interface MyManageProps {
  settings: ViewerNotificationCircleSettings_viewer_settings_notification
  toggle: (
    type: keyof ViewerNotificationCircleSettings_viewer_settings_notification
  ) => void
}

const MyManage = ({ settings, toggle }: MyManageProps) => (
  <Form.List
    groupName={<Translate zh_hant="管理" zh_hans="管理" en="Manage" />}
  >
    <Form.List.Item
      title={<Translate zh_hant="有新訂閱者" zh_hans="有新订阅者" en="" />}
      right={
        <Switch
          checked={settings.circleNewSubscriber}
          onChange={() => toggle('circleNewSubscriber')}
        />
      }
    />
    <Form.List.Item
      title={<Translate zh_hant="有新追蹤者" zh_hans="有新追踪者" en="" />}
      right={
        <Switch
          checked={settings.circleNewFollower}
          onChange={() => toggle('circleNewFollower')}
        />
      }
    />
    <Form.List.Item
      title={<Translate zh_hant="訂閱者退訂" zh_hans="订阅者退订" en="" />}
      right={
        <Switch
          checked={settings.circleNewUnsubscriber}
          onChange={() => toggle('circleNewUnsubscriber')}
        />
      }
    />
  </Form.List>
)

export default MyManage
