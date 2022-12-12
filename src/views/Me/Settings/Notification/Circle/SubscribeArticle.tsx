import { useContext } from 'react'

import { Form, LanguageContext, Switch, Translate } from '~/components'

import { translate } from '~/common/utils'

import { ViewerNotificationCircleSettings_viewer_settings_notification } from './__generated__/ViewerNotificationCircleSettings'

interface SubscribeArticleProps {
  settings: ViewerNotificationCircleSettings_viewer_settings_notification
  toggle: (
    type: keyof ViewerNotificationCircleSettings_viewer_settings_notification
  ) => void
}

const SubscribeArticle = ({ settings, toggle }: SubscribeArticleProps) => {
  const { lang } = useContext(LanguageContext)
  const label = translate({
    zh_hant: '圍爐有新作品',
    zh_hans: '围炉有新作品',
    en: 'New articles',
    lang,
  })

  return (
    <Form.List
      groupName={<Translate zh_hant="作品" zh_hans="作品" en="Article" />}
    >
      <Form.List.Item
        title={label}
        right={
          <Switch
            name="nofitication-circle-article"
            label={label}
            checked={settings.inCircleNewArticle}
            onChange={() => toggle('inCircleNewArticle')}
          />
        }
      />
    </Form.List>
  )
}

export default SubscribeArticle
