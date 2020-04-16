import { Form, Switch, Translate } from '~/components'

import { ViewerNotificationSettings_viewer_settings_notification } from './__generated__/ViewerNotificationSettings'

interface MeProps {
  settings: ViewerNotificationSettings_viewer_settings_notification
  toggle: (type: any) => void
}

const Me = ({ settings, toggle }: MeProps) => (
  <Form.List groupName={<Translate zh_hant="與我有關" zh_hans="与我有关" />}>
    <Form.List.Item
      title={<Translate zh_hant="提及我" zh_hans="提及我" />}
      right={
        <Switch checked={settings.mention} onChange={() => toggle('mention')} />
      }
    />

    <Form.List.Item
      title={<Translate zh_hant="追蹤我" zh_hans="追踪我" />}
      right={
        <Switch checked={settings.follow} onChange={() => toggle('follow')} />
      }
    />
  </Form.List>
)

export default Me
