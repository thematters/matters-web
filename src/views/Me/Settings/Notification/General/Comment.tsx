import { Form, Switch, Translate } from '~/components'

import { ViewerNotificationGeneralSettings_viewer_settings_notification } from './__generated__/ViewerNotificationGeneralSettings'

interface CommentProps {
  settings: ViewerNotificationGeneralSettings_viewer_settings_notification
  toggle: (
    type: keyof ViewerNotificationGeneralSettings_viewer_settings_notification
  ) => void
}

const NewArticleCommentText = () => (
  <Translate
    zh_hant="評論和回覆"
    zh_hans="评论和回复"
    en="New comments and replies"
  />
)

const NewArticlePinnedText = () => (
  <Translate
    zh_hant="評論被作者精選"
    zh_hans="评论被作者精选"
    en="Comments has been pinned"
  />
)

const Comment = ({ settings, toggle }: CommentProps) => (
  <Form.List
    groupName={<Translate zh_hant="評論" zh_hans="评论" en="Comment" />}
  >
    <Form.List.Item
      title={<NewArticleCommentText />}
      right={
        <Switch
          name="nofitication-article-comment"
          label={<NewArticleCommentText />}
          checked={settings.articleNewComment}
          onChange={() => toggle('articleNewComment')}
        />
      }
    />
    <Form.List.Item
      title={<NewArticlePinnedText />}
      right={
        <Switch
          name="nofitication-article-pinned"
          label={<NewArticlePinnedText />}
          checked={settings.articleCommentPinned}
          onChange={() => toggle('articleCommentPinned')}
        />
      }
    />
  </Form.List>
)

export default Comment
