import { Form, Switch, Translate } from '~/components'

import { ViewerNotificationSettings_viewer_settings_notification } from './__generated__/ViewerNotificationSettings'

interface ArticleProps {
  settings: ViewerNotificationSettings_viewer_settings_notification
  toggle: (type: any) => void
}

const Article = ({ settings, toggle }: ArticleProps) => (
  <Form.List groupName={<Translate zh_hant="作品" zh_hans="作品" />}>
    <Form.List.Item
      title={<Translate zh_hant="作品被贊賞" zh_hans="作品被赞赏" />}
      right={
        <Switch
          checked={settings.appreciation}
          onChange={() => toggle('appreciation')}
        />
      }
    />
    <Form.List.Item
      title={<Translate zh_hant="作品被收藏" zh_hans="作品被收藏" />}
      right={
        <Switch
          checked={settings.articleSubscription}
          onChange={() => toggle('articleSubscription')}
        />
      }
    />
    <Form.List.Item
      title={
        <Translate zh_hant="收藏的作品有新評論" zh_hans="收藏的作品有新评论" />
      }
      right={
        <Switch
          checked={settings.commentSubscribed}
          onChange={() => toggle('commentSubscribed')}
        />
      }
    />
  </Form.List>
)

export default Article
