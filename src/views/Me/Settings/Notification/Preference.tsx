import { useContext } from 'react'

import { Form, LanguageContext, Switch, Translate } from '~/components'

import { translate } from '~/common/utils'

import { ViewerNotificationSettings_viewer_settings_notification } from './__generated__/ViewerNotificationSettings'

interface PreferenceProps {
  settings: ViewerNotificationSettings_viewer_settings_notification
  toggle: (
    type: keyof ViewerNotificationSettings_viewer_settings_notification
  ) => void
}

const Preference = ({ settings, toggle }: PreferenceProps) => {
  const { lang } = useContext(LanguageContext)
  const label = translate({
    zh_hant: '電子信箱通知',
    zh_hans: '邮箱通知',
    en: 'Email Notification',
    lang,
  })

  return (
    <Form.List
      groupName={<Translate zh_hant="郵件通知" zh_hans="邮件通知" en="Email" />}
    >
      <Form.List.Item
        title={label}
        subtitle={
          <Translate
            zh_hant="精選過去 24 小時與你有關的消息"
            zh_hans="精选过去 24 小时与你有关的消息"
            en="Selected activities related to you in the past 24 hours"
          />
        }
        right={
          <Switch
            name="notification-email"
            label={label}
            checked={settings.email}
            onChange={() => toggle('email')}
          />
        }
      />
    </Form.List>
  )
}

export default Preference
