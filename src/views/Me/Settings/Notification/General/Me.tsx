import { Form, Switch, Translate } from '~/components'

import { ViewerNotificationGeneralSettings_viewer_settings_notification } from './__generated__/ViewerNotificationGeneralSettings'

interface MeProps {
  settings: ViewerNotificationGeneralSettings_viewer_settings_notification
  toggle: (
    type: keyof ViewerNotificationGeneralSettings_viewer_settings_notification
  ) => void
}

const Me = ({ settings, toggle }: MeProps) => (
  <Form.List
    groupName={
      <Translate zh_hant="與我有關" zh_hans="与我有关" en="Related to me" />
    }
  >
    <Form.List.Item
      title={
        <Translate
          zh_hant="作品或評論提及我"
          zh_hans="作品或评论提及我"
          en="Mentions"
        />
      }
      right={
        <Switch checked={settings.mention} onChange={() => toggle('mention')} />
      }
    />

    <Form.List.Item
      title={<Translate zh_hant="追蹤我" zh_hans="追踪我" en="Followers" />}
      right={
        <Switch
          checked={settings.userNewFollower}
          onChange={() => toggle('userNewFollower')}
        />
      }
    />

    {/* <Form.List.Item
      title={
        <Translate
          zh_hant="追蹤我的圍爐"
          zh_hans="追踪我的围炉"
          en="Circle followers"
        />
      }
      right={
        <Switch
          checked={settings.circleNewFollower}
          onChange={() => toggle('circleNewFollower')}
        />
      }
    /> */}
  </Form.List>
)

export default Me
