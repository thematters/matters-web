import { Form, Switch, Translate } from '~/components'

import { ViewerNotificationCircleSettings_viewer_settings_notification } from './__generated__/ViewerNotificationCircleSettings'

interface SubscribeArticleProps {
  settings: ViewerNotificationCircleSettings_viewer_settings_notification
  toggle: (
    type: keyof ViewerNotificationCircleSettings_viewer_settings_notification
  ) => void
}

const SubscribeArticle = ({ settings, toggle }: SubscribeArticleProps) => (
  <Form.List
    groupName={<Translate zh_hant="作品" zh_hans="作品" en="Article" />}
  >
    <Form.List.Item
      title={<Translate zh_hant="圍爐有新作品" zh_hans="围炉有新作品" en="" />}
      right={
        <Switch
          checked={settings.inCircleNewArticle}
          onChange={() => toggle('inCircleNewArticle')}
        />
      }
    />
  </Form.List>
)

export default SubscribeArticle
