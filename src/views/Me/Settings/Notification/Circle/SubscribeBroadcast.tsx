import { useContext } from 'react'

import { Form, LanguageContext, Switch, Translate } from '~/components'

import { translate } from '~/common/utils'

import { ViewerNotificationCircleSettings_viewer_settings_notification } from './__generated__/ViewerNotificationCircleSettings'

interface SubscribeBroadcastProps {
  settings: ViewerNotificationCircleSettings_viewer_settings_notification
  toggle: (
    type: keyof ViewerNotificationCircleSettings_viewer_settings_notification
  ) => void
}

const SubscribeBroadcast = ({ settings, toggle }: SubscribeBroadcastProps) => {
  const { lang } = useContext(LanguageContext)
  const newBroadcastLabel = translate({
    zh_hant: '圍爐有新廣播',
    zh_hans: '围炉有新广播',
    en: 'New broadcasts',
    lang,
  })
  const newBroadcastReplyLabel = translate({
    zh_hant: '廣播留言',
    zh_hans: '广播留言',
    en: 'New replies to broadcasts',
    lang,
  })

  return (
    <Form.List
      groupName={<Translate zh_hant="廣播" zh_hans="广播" en="Broadcast" />}
    >
      <Form.List.Item
        title={newBroadcastLabel}
        right={
          <Switch
            name="nofitication-broadcast"
            label={newBroadcastLabel}
            checked={settings.inCircleNewBroadcast}
            onChange={() => toggle('inCircleNewBroadcast')}
          />
        }
      />
      <Form.List.Item
        title={newBroadcastReplyLabel}
        subtitle={
          <Translate
            zh_hant="成員於廣播留言時通知"
            zh_hans="成员于广播留言时通知"
            en="Notify when members reply to broadcasts"
          />
        }
        right={
          <Switch
            name="nofitication-broadcast-reply"
            label={newBroadcastReplyLabel}
            checked={settings.inCircleNewBroadcastReply}
            onChange={() => toggle('inCircleNewBroadcastReply')}
          />
        }
      />
    </Form.List>
  )
}

export default SubscribeBroadcast
