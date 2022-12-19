import { useContext } from 'react'

import { Form, LanguageContext, Switch, Translate } from '~/components'

import { translate } from '~/common/utils'

import { ViewerNotificationGeneralSettings_viewer_settings_notification } from './__generated__/ViewerNotificationGeneralSettings'

interface ArticleProps {
  settings: ViewerNotificationGeneralSettings_viewer_settings_notification
  toggle: (
    type: keyof ViewerNotificationGeneralSettings_viewer_settings_notification
  ) => void
}

const Article = ({ settings, toggle }: ArticleProps) => {
  const { lang } = useContext(LanguageContext)
  const newAppreciationLabel = translate({
    zh_hant: '作品被贊賞',
    zh_hans: '作品被赞赏',
    en: 'New appreciations',
    lang,
  })
  const newBookmarkedLabel = translate({
    zh_hant: '作品被收藏',
    zh_hans: '作品被收藏',
    en: 'Articles has been bookmarked',
    lang,
  })
  const newCollectedLabel = translate({
    zh_hant: '作品被關聯',
    zh_hans: '作品被关联',
    en: 'Articles has been collected',
    lang,
  })

  return (
    <Form.List
      groupName={<Translate zh_hant="作品" zh_hans="作品" en="Article" />}
    >
      <Form.List.Item
        title={newAppreciationLabel}
        right={
          <Switch
            name="nofitication-appreciation"
            label={newAppreciationLabel}
            checked={settings.articleNewAppreciation}
            onChange={() => toggle('articleNewAppreciation')}
          />
        }
      />
      <Form.List.Item
        title={newBookmarkedLabel}
        right={
          <Switch
            name="nofitication-bookmarked"
            label={newBookmarkedLabel}
            checked={settings.articleNewSubscription}
            onChange={() => toggle('articleNewSubscription')}
          />
        }
      />
      <Form.List.Item
        title={newCollectedLabel}
        right={
          <Switch
            name="nofitication-article-collected"
            label={newCollectedLabel}
            checked={settings.articleNewCollected}
            onChange={() => toggle('articleNewCollected')}
          />
        }
      />
    </Form.List>
  )
}

export default Article
