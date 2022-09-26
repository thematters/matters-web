import { Form, Switch, Translate } from '~/components'

import { ViewerNotificationCircleSettings_viewer_settings_notification } from './__generated__/ViewerNotificationCircleSettings'

interface MyDiscussionProps {
  settings: ViewerNotificationCircleSettings_viewer_settings_notification
  toggle: (
    type: keyof ViewerNotificationCircleSettings_viewer_settings_notification
  ) => void
}

const MyDiscussion = ({ settings, toggle }: MyDiscussionProps) => (
  <Form.List
    groupName={<Translate zh_hant="眾聊" zh_hans="众聊" en="Discussion" />}
  >
    <Form.List.Item
      title={
        <Translate
          zh_hant="眾聊有新話題"
          zh_hans="众聊有新话题"
          en="New discussions"
        />
      }
      subtitle={
        <Translate
          zh_hant="成員添加新話題時通知"
          zh_hans="成员添加新话题时通知"
          en="Notify when members start new discussions"
        />
      }
      right={
        <Switch
          checked={settings.circleMemberNewDiscussion}
          onChange={() => toggle('circleMemberNewDiscussion')}
        />
      }
    />
    <Form.List.Item
      title={
        <Translate
          zh_hant="話題回覆"
          zh_hans="话题回复"
          en="New replies to discussions"
        />
      }
      subtitle={
        <Translate
          zh_hant="成員回覆話題時通知"
          zh_hans="成员回复话题时通知"
          en="Notify when members reply to discussions"
        />
      }
      right={
        <Switch
          checked={settings.circleMemberNewDiscussionReply}
          onChange={() => toggle('circleMemberNewDiscussionReply')}
        />
      }
    />
  </Form.List>
)

export default MyDiscussion
