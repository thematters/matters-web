import { useContext } from 'react'

import { translate } from '~/common/utils'
import { Form, LanguageContext, Switch, Translate } from '~/components'
import { ViewerNotificationCircleSettingsQuery } from '~/gql/graphql'

type NotificationType = NonNullable<
  NonNullable<
    ViewerNotificationCircleSettingsQuery['viewer']
  >['settings']['notification']
>

interface MyDiscussionProps {
  settings: NotificationType
  toggle: (type: keyof NotificationType) => void
  spacingX: 0 | 'base'
}

const MyDiscussion = ({ settings, toggle, spacingX }: MyDiscussionProps) => {
  const { lang } = useContext(LanguageContext)
  const discussionLabel = translate({
    zh_hant: '眾聊有新話題',
    zh_hans: '众聊有新话题',
    en: 'New discussions',
    lang,
  })
  const discussionReplyLabel = translate({
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
        title={discussionLabel}
        subtitle={
          <Translate
            zh_hant="成員添加新話題時通知"
            zh_hans="成员添加新话题时通知"
            en="Notify when members start new discussions"
          />
        }
        right={
          <Switch
            name="nofitication-member-discussion"
            label={discussionLabel}
            checked={settings.circleMemberNewDiscussion}
            onChange={() => toggle('circleMemberNewDiscussion')}
          />
        }
      />
      <Form.List.Item
        title={discussionReplyLabel}
        subtitle={
          <Translate
            zh_hant="成員回覆話題時通知"
            zh_hans="成员回复话题时通知"
            en="Notify when members reply to discussions"
          />
        }
        right={
          <Switch
            name="nofitication-member-discussion-reply"
            label={discussionReplyLabel}
            checked={settings.circleMemberNewDiscussionReply}
            onChange={() => toggle('circleMemberNewDiscussionReply')}
          />
        }
      />
    </Form.List>
  )
}

export default MyDiscussion
