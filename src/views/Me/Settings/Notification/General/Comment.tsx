import { useContext } from 'react'

import { translate } from '~/common/utils'
import { Form, LanguageContext, Switch, Translate } from '~/components'
import { ViewerNotificationGeneralSettingsQuery } from '~/gql/graphql'

type NotificationType = NonNullable<
  NonNullable<
    ViewerNotificationGeneralSettingsQuery['viewer']
  >['settings']['notification']
>

interface CommentProps {
  settings: NotificationType
  toggle: (type: keyof NotificationType) => void
}

const Comment = ({ settings, toggle }: CommentProps) => {
  const { lang } = useContext(LanguageContext)
  const newComment = translate({
    zh_hant: '評論和回覆',
    zh_hans: '评论和回复',
    en: 'New comments and replies',
    lang,
  })
  const newPinned = translate({
    zh_hant: '評論被作者精選',
    zh_hans: '评论被作者精选',
    en: 'Comments has been pinned',
    lang,
  })

  return (
    <Form.List
      groupName={<Translate zh_hant="評論" zh_hans="评论" en="Comment" />}
      spacingX={0}
    >
      <Form.List.Item
        title={newComment}
        right={
          <Switch
            name="nofitication-article-comment"
            label={newComment}
            checked={settings.articleNewComment}
            onChange={() => toggle('articleNewComment')}
          />
        }
      />
      <Form.List.Item
        title={newPinned}
        right={
          <Switch
            name="nofitication-article-pinned"
            label={newPinned}
            checked={settings.articleCommentPinned}
            onChange={() => toggle('articleCommentPinned')}
          />
        }
      />
    </Form.List>
  )
}

export default Comment
