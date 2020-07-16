import { useQuery } from '@apollo/client'
import { useState } from 'react'

import { Form, Switch, Translate } from '~/components'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

import { subscribePush, unsubscribePush } from '~/common/utils'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import { ViewerNotificationSettings_viewer_settings_notification } from './__generated__/ViewerNotificationSettings'

interface PreferenceProps {
  settings: ViewerNotificationSettings_viewer_settings_notification
  toggle: (type: any) => void
}

const PushSwitch = () => {
  const [loading, setLoading] = useState(false)
  const { data } = useQuery<ClientPreference>(CLIENT_PREFERENCE, {
    variables: { id: 'local' },
  })
  const push = data?.clientPreference.push

  if (!push || !push.supported) {
    return null
  }

  const onClick = async () => {
    setLoading(true)
    if (push.enabled) {
      await unsubscribePush()
    } else {
      await subscribePush()
    }
    setLoading(false)
  }

  return (
    <Form.List.Item
      title={<Translate zh_hant="推送通知" zh_hans="推送通知" />}
      subtitle={
        <Translate
          zh_hant="實時收到你關心的站內動態"
          zh_hans="实时收到你关心的站内动态"
        />
      }
      right={
        <Switch checked={push.enabled} loading={loading} onChange={onClick} />
      }
    />
  )
}

const Preference = ({ settings, toggle }: PreferenceProps) => (
  <Form.List groupName={<Translate zh_hant="偏好" zh_hans="偏好" />}>
    <PushSwitch />

    <Form.List.Item
      title={<Translate zh_hant="電子信箱通知" zh_hans="邮箱通知" />}
      subtitle={
        <Translate
          zh_hant="精選過去 24 小時與你有關的消息"
          zh_hans="精选过去 24 小时与你有关的消息"
        />
      }
      right={
        <Switch checked={settings.email} onChange={() => toggle('email')} />
      }
    />
  </Form.List>
)

export default Preference
