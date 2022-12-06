import { Form, Switch, Translate } from '~/components'

import { ViewerNotificationGeneralSettings_viewer_settings_notification } from './__generated__/ViewerNotificationGeneralSettings'

interface ArticleProps {
  settings: ViewerNotificationGeneralSettings_viewer_settings_notification
  toggle: (
    type: keyof ViewerNotificationGeneralSettings_viewer_settings_notification
  ) => void
}

const NewAppreciationText = () => (
  <Translate zh_hant="作品被贊賞" zh_hans="作品被赞赏" en="New appreciations" />
)

const NewBookmarkedText = () => (
  <Translate
    zh_hant="作品被收藏"
    zh_hans="作品被收藏"
    en="Articles has been bookmarked"
  />
)

const NewCollectedText = () => (
  <Translate
    zh_hant="作品被關聯"
    zh_hans="作品被关联"
    en="Articles has been collected"
  />
)

const Article = ({ settings, toggle }: ArticleProps) => (
  <Form.List
    groupName={<Translate zh_hant="作品" zh_hans="作品" en="Article" />}
  >
    <Form.List.Item
      title={<NewAppreciationText />}
      right={
        <Switch
          name="nofitication-appreciation"
          label={<NewAppreciationText />}
          checked={settings.articleNewAppreciation}
          onChange={() => toggle('articleNewAppreciation')}
        />
      }
    />
    <Form.List.Item
      title={<NewBookmarkedText />}
      right={
        <Switch
          name="nofitication-bookmarked"
          label={NewBookmarkedText}
          checked={settings.articleNewSubscription}
          onChange={() => toggle('articleNewSubscription')}
        />
      }
    />
    <Form.List.Item
      title={<NewCollectedText />}
      right={
        <Switch
          name="nofitication-article-collected"
          label={<NewCollectedText />}
          checked={settings.articleNewCollected}
          onChange={() => toggle('articleNewCollected')}
        />
      }
    />
  </Form.List>
)

export default Article
