import { Form, Switch, Translate } from '~/components'

import { ViewerNotificationSettings_viewer_settings_notification } from './__generated__/ViewerNotificationSettings'

interface OtherProps {
  settings: ViewerNotificationSettings_viewer_settings_notification
  toggle: (type: any) => void
}

const Other = ({ settings, toggle }: OtherProps) => (
  <Form.List groupName={<Translate zh_hant="其他" zh_hans="其他" />}>
    <Form.List.Item
      title={<Translate zh_hant="官方公告" zh_hans="官方公告" />}
      right={
        <Switch
          checked={settings.officialNotice}
          onChange={() => toggle('officialNotice')}
        />
      }
    />
    <Form.List.Item
      title={<Translate zh_hant="檢舉反饋" zh_hans="检举反馈" />}
      right={
        <Switch
          checked={settings.reportFeedback}
          onChange={() => toggle('reportFeedback')}
        />
      }
    />
  </Form.List>
)

export default Other
