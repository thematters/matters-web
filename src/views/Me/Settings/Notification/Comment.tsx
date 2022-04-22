import { Form, Switch, Translate } from '~/components'

import { ViewerNotificationSettings_viewer_settings_notification } from './__generated__/ViewerNotificationSettings'

interface CommentProps {
  settings: ViewerNotificationSettings_viewer_settings_notification
  toggle: (
    type: keyof ViewerNotificationSettings_viewer_settings_notification
  ) => void
}

const Comment = ({ settings, toggle }: CommentProps) => (
  <Form.List
    groupName={<Translate zh_hant="評論" zh_hans="评论" en="Comment" />}
  >
    <Form.List.Item
      title={
        <Translate
          zh_hant="評論和回覆"
          zh_hans="评论和回复"
          en="Comments and replies"
        />
      }
      right={
        <Switch
          checked={settings.articleNewComment}
          onChange={() => toggle('articleNewComment')}
        />
      }
    />
    <Form.List.Item
      title={
        <Translate
          zh_hant="評論被置頂"
          zh_hans="评论被置顶"
          en="Pinned Comments"
        />
      }
      right={
        <Switch
          checked={settings.articleCommentPinned}
          onChange={() => toggle('articleCommentPinned')}
        />
      }
    />
  </Form.List>
)

export default Comment
