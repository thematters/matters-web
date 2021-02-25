import { Form, Switch, Translate } from '~/components'

import { ViewerNotificationSettings_viewer_settings_notification } from './__generated__/ViewerNotificationSettings'

interface ArticleProps {
  settings: ViewerNotificationSettings_viewer_settings_notification
  toggle: (
    type: keyof ViewerNotificationSettings_viewer_settings_notification
  ) => void
}

const Article = ({ settings, toggle }: ArticleProps) => (
  <Form.List
    groupName={<Translate zh_hant="作品" zh_hans="作品" en="Article" />}
  >
    <Form.List.Item
      title={
        <Translate
          zh_hant="作品被贊賞"
          zh_hans="作品被赞赏"
          en="Appreciations"
        />
      }
      right={
        <Switch
          checked={settings.articleNewAppreciation}
          onChange={() => toggle('articleNewAppreciation')}
        />
      }
    />
    <Form.List.Item
      title={
        <Translate zh_hant="作品被收藏" zh_hans="作品被收藏" en="Bookmarks" />
      }
      right={
        <Switch
          checked={settings.articleNewSubscription}
          onChange={() => toggle('articleNewSubscription')}
        />
      }
    />
    <Form.List.Item
      title={
        <Translate
          zh_hant="收藏的作品有新評論"
          zh_hans="收藏的作品有新评论"
          en="Comments on bookmarked articles"
        />
      }
      right={
        <Switch
          checked={settings.articleSubscribedNewComment}
          onChange={() => toggle('articleSubscribedNewComment')}
        />
      }
    />
  </Form.List>
)

export default Article
