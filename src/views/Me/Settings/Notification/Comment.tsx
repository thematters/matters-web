import { Form, Switch, Translate } from '~/components'

import { ViewerNotificationSettings_viewer_settings_notification } from './__generated__/ViewerNotificationSettings'

interface CommentProps {
  settings: ViewerNotificationSettings_viewer_settings_notification
  toggle: (type: any) => void
}

const Comment = ({ settings, toggle }: CommentProps) => (
  <Form.List
    groupName={<Translate zh_hant="評論" zh_hans="评论" en="comment" />}
  >
    <Form.List.Item
      title={
        <Translate
          zh_hant="評論和回覆"
          zh_hans="评论和回复"
          en="comments and replies"
        />
      }
      right={
        <Switch checked={settings.comment} onChange={() => toggle('comment')} />
      }
    />
    <Form.List.Item
      title={
        <Translate
          zh_hant="評論被置頂"
          zh_hans="评论被置顶"
          en="comment pinned"
        />
      }
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
