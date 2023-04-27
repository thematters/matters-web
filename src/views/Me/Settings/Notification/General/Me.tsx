import { useContext } from 'react'

import { translate } from '~/common/utils'
import { Form, LanguageContext, Switch, Translate } from '~/components'
import { ViewerNotificationGeneralSettingsQuery } from '~/gql/graphql'

type NotificationType = NonNullable<
  NonNullable<
    ViewerNotificationGeneralSettingsQuery['viewer']
  >['settings']['notification']
>

interface MeProps {
  settings: NotificationType
  toggle: (type: keyof NotificationType) => void
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
      spacingX={0}
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
