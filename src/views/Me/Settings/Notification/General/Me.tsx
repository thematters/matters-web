import { useContext } from 'react'

import { Form, LanguageContext, Switch, Translate } from '~/components'

import { translate } from '~/common/utils'

import { ViewerNotificationGeneralSettings_viewer_settings_notification } from './__generated__/ViewerNotificationGeneralSettings'

interface MeProps {
  settings: ViewerNotificationGeneralSettings_viewer_settings_notification
  toggle: (
    type: keyof ViewerNotificationGeneralSettings_viewer_settings_notification
  ) => void
}

const Me = ({ settings, toggle }: MeProps) => {
  const { lang } = useContext(LanguageContext)
  const newMention = translate({
    zh_hant: '作品或評論提及我',
    zh_hans: '作品或评论提及我',
    en: 'Mention me',
    lang,
  })
  const newFollower = translate({
    zh_hant: '追蹤我',
    zh_hans: '追踪我',
    en: 'New followers',
    lang,
  })

  return (
    <Form.List
      groupName={
        <Translate zh_hant="與我有關" zh_hans="与我有关" en="Related to me" />
      }
    >
      <Form.List.Item
        title={newMention}
        right={
          <Switch
            name="nofitication-mention"
            label={newMention}
            checked={settings.mention}
            onChange={() => toggle('mention')}
          />
        }
      />

      <Form.List.Item
        title={newFollower}
        right={
          <Switch
            name="nofitication-follower"
            label={newFollower}
            checked={settings.userNewFollower}
            onChange={() => toggle('userNewFollower')}
          />
        }
      />
    </Form.List>
  )
}

export default Me
