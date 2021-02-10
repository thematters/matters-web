import { Card, Expandable, IconBroadcast24, UserDigest } from '~/components'
import CommentContent from '~/components/Comment/Content'

import { toPath } from '~/common/utils'

import { fragments } from './gql'
import styles from './styles.css'

import { AuthorWidgetCircle } from './__generated__/AuthorWidgetCircle'

type AuthorWidgetProps = {
  circle: AuthorWidgetCircle
}

const AuthorWidget = ({ circle }: AuthorWidgetProps) => {
  const pinnedBroadcast = circle.pinnedBroadcast && circle.pinnedBroadcast[0]
  const path = toPath({
    page: 'userProfile',
    userName: circle.owner.userName || '',
  })

  return (
    <section className="author-widget">
      <Card
        bgColor="grey-lighter"
        spacing={['base', 'base']}
        borderColor="grey-lighter"
        borderRadius="base"
        {...path}
      >
        <UserDigest.Rich
          user={circle.owner}
          hasFollow={false}
          spacing={[0, 0]}
          bgColor="none"
        />

        {pinnedBroadcast && (
          <section className="pinnedBroadcast">
            <span className="icon">
              <IconBroadcast24 size="md" />
            </span>

            <Expandable>
              <CommentContent comment={pinnedBroadcast} />
            </Expandable>
          </section>
        )}
      </Card>
      <style jsx>{styles}</style>
    </section>
  )
}

AuthorWidget.fragments = fragments

export default AuthorWidget
