import { Form, Switch, Translate } from '~/components'

import { ViewerNotificationGeneralSettings_viewer_settings_notification } from './__generated__/ViewerNotificationGeneralSettings'

interface CommentProps {
  settings: ViewerNotificationGeneralSettings_viewer_settings_notification
  toggle: (
    type: keyof ViewerNotificationGeneralSettings_viewer_settings_notification
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
          en="New comments and replies"
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
          zh_hant="評論被作者精選"
          zh_hans="评论被作者精选"
          en="Comments has been pinned"
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
