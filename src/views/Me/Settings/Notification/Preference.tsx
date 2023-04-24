import { useContext } from 'react'

import { translate } from '~/common/utils'
import { Form, LanguageContext, Switch, Translate } from '~/components'
import { ViewerNotificationSettingsQuery } from '~/gql/graphql'

type NotificationType = NonNullable<
  NonNullable<
    ViewerNotificationSettingsQuery['viewer']
  >['settings']['notification']
>

interface PreferenceProps {
  settings: NotificationType
  toggle: (type: keyof NotificationType) => void
}

const Preference = ({ settings, toggle }: PreferenceProps) => {
  const { lang } = useContext(LanguageContext)
  const label = translate({
    zh_hant: 'Matters 日報通知',
    zh_hans: 'Matters 日報通知',
    en: 'Email Notification',
    lang,
  })

  return (
    <Form.List
      groupName={<Translate zh_hant="郵件通知" zh_hans="邮件通知" en="Email" />}
      spacingX={0}
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
