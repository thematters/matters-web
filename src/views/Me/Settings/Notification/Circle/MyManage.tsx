import { useContext } from 'react'

import { translate } from '~/common/utils'
import { Form, LanguageContext, Switch, Translate } from '~/components'
import { ViewerNotificationCircleSettingsQuery } from '~/gql/graphql'

type NotificationType = NonNullable<
  NonNullable<
    ViewerNotificationCircleSettingsQuery['viewer']
  >['settings']['notification']
>

interface MyManageProps {
  settings: NotificationType
  toggle: (type: keyof NotificationType) => void
  spacingX: 0 | 'base'
}

const MyManage = ({ settings, toggle, spacingX }: MyManageProps) => {
  const { lang } = useContext(LanguageContext)
  const newSubscriberLabel = translate({
    zh_hant: '有新訂閱者',
    zh_hans: '有新订阅者',
    en: 'New subscribers',
    lang,
  })
  const newFollowerLabel = translate({
    zh_hant: '有新追蹤者',
    zh_hans: '有新追踪者',
    en: 'New followers',
    lang,
  })
  const newUnsubscriberLabel = translate({
    zh_hant: '訂閱者退訂',
    zh_hans: '订阅者退订',
    en: 'Subscription cancellations',
    lang,
  })

  return (
    <Form.List
      groupName={<Translate zh_hant="管理" zh_hans="管理" en="Management" />}
      spacingX={spacingX}
    >
      <Form.List.Item
        title={newSubscriberLabel}
        right={
          <Switch
            name="nofitication-subscriber"
            label={newSubscriberLabel}
            checked={settings.circleNewSubscriber}
            onChange={() => toggle('circleNewSubscriber')}
          />
        }
      />
      <Form.List.Item
        title={newFollowerLabel}
        right={
          <Switch
            name="nofitication-follower"
            label={newFollowerLabel}
            checked={settings.circleNewFollower}
            onChange={() => toggle('circleNewFollower')}
          />
        }
      />
      <Form.List.Item
        title={newUnsubscriberLabel}
        right={
          <Switch
            name="nofitication-unsubscriber"
            label={newUnsubscriberLabel}
            checked={settings.circleNewUnsubscriber}
            onChange={() => toggle('circleNewUnsubscriber')}
          />
        }
      />
    </Form.List>
  )
}

export default MyManage
