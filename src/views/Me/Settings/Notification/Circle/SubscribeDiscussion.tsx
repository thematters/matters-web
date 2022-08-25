import { Form, Switch, Translate } from '~/components'

import { ViewerNotificationCircleSettings_viewer_settings_notification } from './__generated__/ViewerNotificationCircleSettings'

interface SubscribeDiscussionProps {
  settings: ViewerNotificationCircleSettings_viewer_settings_notification
  toggle: (
    type: keyof ViewerNotificationCircleSettings_viewer_settings_notification
  ) => void
}

const SubscribeDiscussion = ({
  settings,
  toggle,
}: SubscribeDiscussionProps) => (
  <Form.List
    groupName={<Translate zh_hant="眾聊" zh_hans="众聊" en="Discussion" />}
  >
    <Form.List.Item
      title={<Translate zh_hant="眾聊有新話題" zh_hans="众聊有新话题" en="" />}
      subtitle={
        <Translate
          zh_hant="成員添加新話題時通知"
          zh_hans="成员添加新话题时通知"
          en=""
        />
      }
      right={
        <Switch
          checked={settings.inCircleNewDiscussion}
          onChange={() => toggle('inCircleNewDiscussion')}
        />
      }
    />
    <Form.List.Item
      title={<Translate zh_hant="話題回覆" zh_hans="话题回复" en="Replies" />}
      subtitle={
        <Translate
          zh_hant="成員回覆話題時通知"
          zh_hans="成员回复话题时通知"
          en=""
        />
      }
      right={
        <Switch
          checked={settings.inCircleNewDiscussionReply}
          onChange={() => toggle('inCircleNewDiscussionReply')}
        />
      }
    />
  </Form.List>
)

export default SubscribeDiscussion
