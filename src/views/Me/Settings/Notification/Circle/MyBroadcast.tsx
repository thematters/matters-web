import { useContext } from 'react'

import { translate } from '~/common/utils'
import { Form, LanguageContext, Switch, Translate } from '~/components'
import { ViewerNotificationCircleSettingsQuery } from '~/gql/graphql'

type NotificationType = NonNullable<
  NonNullable<
    ViewerNotificationCircleSettingsQuery['viewer']
  >['settings']['notification']
>

interface MyBroadcastProps {
  settings: NotificationType
  toggle: (type: keyof NotificationType) => void
  spacingX: 0 | 'base'
}

const MyBroadcast = ({ settings, toggle, spacingX }: MyBroadcastProps) => {
  const { lang } = useContext(LanguageContext)
  const label = translate({
    zh_hant: '廣播留言',
    zh_hans: '广播留言',
    en: 'New replies to broadcast',
    lang,
  })

  return (
    <Form.List
      groupName={<Translate zh_hant="廣播" zh_hans="广播" en="Broadcast" />}
      spacingX={spacingX}
    >
      <Form.List.Item
        title={label}
        subtitle={
          <Translate
            zh_hant="成員於廣播留言時通知"
            zh_hans="成员于广播留言时通知"
            en="Notify when members reply to broadcasts"
          />
        }
        right={
          <Switch
            name="nofitication-member-broadcast-reply"
            label={label}
            checked={settings.circleMemberNewBroadcastReply}
            onChange={() => toggle('circleMemberNewBroadcastReply')}
          />
        }
      />
    </Form.List>
  )
}

export default MyBroadcast
