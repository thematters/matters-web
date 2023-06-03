import { toPath } from '~/common/utils'
import { Card, IconBroadcast24, UserDigest } from '~/components'
import CommentContent from '~/components/Comment/Content'
import { AuthorWidgetCircleFragment } from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

type AuthorWidgetProps = {
  circle: AuthorWidgetCircleFragment
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
          bgColor="transparent"
          bgActiveColor="transparent"
        />

        {pinnedBroadcast && (
          <section className="pinnedBroadcast">
            <span className="icon">
              <IconBroadcast24 size="md" />
            </span>

            <CommentContent
              comment={pinnedBroadcast}
              type="circleBroadcast"
              limit={2}
              textIndent={true}
              isRichShow={false}
            />
          </section>
        )}
      </Card>
    </section>
  )
}

AuthorWidget.fragments = fragments

export default AuthorWidget
