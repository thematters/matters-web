import { Form, Switch, Translate } from '~/components'

import { ViewerNotificationSettings_viewer_settings_notification } from './__generated__/ViewerNotificationSettings'

interface CommentProps {
  settings: ViewerNotificationSettings_viewer_settings_notification
  toggle: (type: any) => void
}

const Comment = ({ settings, toggle }: CommentProps) => (
  <Form.List groupName={<Translate zh_hant="評論" zh_hans="评论" />}>
    <Form.List.Item
      title={<Translate zh_hant="評論和回覆" zh_hans="评论和回复" />}
      right={
        <Switch checked={settings.comment} onChange={() => toggle('comment')} />
      }
    />
    <Form.List.Item
      title={<Translate zh_hant="評論被置頂" zh_hans="评论被置顶" />}
      right={
        <Switch
          checked={settings.commentPinned}
          onChange={() => toggle('commentPinned')}
        />
      }
    />
  </Form.List>
)

export default Comment
