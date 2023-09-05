import { useContext } from 'react'

import { translate } from '~/common/utils'
import { Form, LanguageContext, Switch, Translate } from '~/components'
import { ViewerNotificationCircleSettingsQuery } from '~/gql/graphql'

type NotificationType = NonNullable<
  NonNullable<
    ViewerNotificationCircleSettingsQuery['viewer']
  >['settings']['notification']
>

interface SubscribeDiscussionProps {
  settings: NotificationType
  toggle: (type: keyof NotificationType) => void
  spacingX: 0 | 'base'
}

const SubscribeDiscussion = ({
  settings,
  toggle,
  spacingX,
}: SubscribeDiscussionProps) => {
  const { lang } = useContext(LanguageContext)
  const newDiscussionLabel = translate({
    zh_hant: '眾聊有新話題',
    zh_hans: '众聊有新话题',
    en: 'New discussions',
    lang,
  })
  const newDiscussionReplyLabel = translate({
    zh_hant: '話題回覆',
    zh_hans: '话题回复',
    en: 'New replies to discussions',
    lang,
  })

  return (
    <Form.List
      groupName={<Translate zh_hant="眾聊" zh_hans="众聊" en="Discussion" />}
      spacingX={spacingX}
    >
      <Form.List.Item
        title={newDiscussionLabel}
        subtitle={
          <Translate
            zh_hant="成員添加新話題時通知"
            zh_hans="成员添加新话题时通知"
            en="Notify when members start new discussions"
          />
        }
        right={
          <Switch
            name="notification-discussion"
            label={newDiscussionLabel}
            checked={settings.inCircleNewDiscussion}
            onChange={() => toggle('inCircleNewDiscussion')}
          />
        }
      />
      <Form.List.Item
        title={newDiscussionReplyLabel}
        subtitle={
          <Translate
            zh_hant="成員回覆話題時通知"
            zh_hans="成员回复话题时通知"
            en="Notify when members reply to discussions"
          />
        }
        right={
          <Switch
            name="notification-discussion-reply"
            label={newDiscussionReplyLabel}
            checked={settings.inCircleNewDiscussionReply}
            onChange={() => toggle('inCircleNewDiscussionReply')}
          />
        }
      />
    </Form.List>
  )
}

export default SubscribeDiscussion
