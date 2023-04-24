import { useContext } from 'react'

import { translate } from '~/common/utils'
import { Form, LanguageContext, Switch, Translate } from '~/components'
import { ViewerNotificationCircleSettingsQuery } from '~/gql/graphql'

type NotificationType = NonNullable<
  NonNullable<
    ViewerNotificationCircleSettingsQuery['viewer']
  >['settings']['notification']
>

interface SubscribeArticleProps {
  settings: NotificationType
  toggle: (type: keyof NotificationType) => void
  spacingX: 0 | 'base'
}

const SubscribeArticle = ({
  settings,
  toggle,
  spacingX,
}: SubscribeArticleProps) => {
  const { lang } = useContext(LanguageContext)
  const label = translate({
    zh_hant: '圍爐有新作品',
    zh_hans: '围炉有新作品',
    en: 'New articles',
    lang,
  })

  return (
    <Form.List
      groupName={<Translate zh_hant="作品" zh_hans="作品" en="Article" />}
      spacingX={spacingX}
    >
      <Form.List.Item
        title={label}
        right={
          <Switch
            name="nofitication-circle-article"
            label={label}
            checked={settings.inCircleNewArticle}
            onChange={() => toggle('inCircleNewArticle')}
          />
        }
      />
    </Form.List>
  )
}

export default SubscribeArticle
