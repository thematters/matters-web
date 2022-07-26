import { Form, Switch, Translate } from '~/components'

import { ViewerNotificationCircleSettings_viewer_settings_notification } from './__generated__/ViewerNotificationCircleSettings'

interface SubscribeBroadcastProps {
  settings: ViewerNotificationCircleSettings_viewer_settings_notification
  toggle: (
    type: keyof ViewerNotificationCircleSettings_viewer_settings_notification
  ) => void
}

const SubscribeBroadcast = ({ settings, toggle }: SubscribeBroadcastProps) => (
  <Form.List
    groupName={<Translate zh_hant="廣播" zh_hans="广播" en="Broadcast" />}
  >
    <Form.List.Item
      title={<Translate zh_hant="圍爐有新廣播" zh_hans="围炉有新广播" en="" />}
      right={
        <Switch
          checked={settings.inCircleNewBroadcast}
          onChange={() => toggle('inCircleNewBroadcast')}
        />
      }
    />
    <Form.List.Item
      title={<Translate zh_hant="廣播留言" zh_hans="广播留言" en="" />}
      subtitle={
        <Translate
          zh_hant="成員於廣播留言時通知"
          zh_hans="成员于广播留言时通知"
          en=""
        />
      }
      right={
        <Switch
          checked={settings.inCircleNewBroadcastReply}
          onChange={() => toggle('inCircleNewBroadcastReply')}
        />
      }
    />
  </Form.List>
)

export default SubscribeBroadcast
