import { Form, Switch, Translate } from '~/components'

import { ViewerNotificationSettings_viewer_settings_notification } from './__generated__/ViewerNotificationSettings'

interface CircleProps {
  settings: ViewerNotificationSettings_viewer_settings_notification
  toggle: (
    type: keyof ViewerNotificationSettings_viewer_settings_notification
  ) => void
}

const Circle = ({ settings, toggle }: CircleProps) => (
  <Form.List
    groupName={<Translate zh_hant="圍爐" zh_hans="围炉" en="Circle" />}
  >
    <Form.List.Item
      title={<Translate zh_hant="眾聊回覆" zh_hans="众聊回复" en="Replies" />}
      right={
        <Switch
          checked={settings.circleNewDiscussion}
          onChange={() => toggle('circleNewDiscussion')}
        />
      }
    />
  </Form.List>
)

export default Circle
