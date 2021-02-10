import { UserDigest } from '~/components'

import { fragments } from './gql'
import styles from './styles.css'

import { AuthorWidgetCircle } from './__generated__/AuthorWidgetCircle'

type AuthorWidgetProps = {
  circle: AuthorWidgetCircle
}

const AuthorWidget = ({ circle }: AuthorWidgetProps) => {
  return (
    <section className="author-widget">
      <UserDigest.Rich
        user={circle.owner}
        hasFollow={false}
        bgColor="grey-lighter"
        borderRadius="base"
        spacing={['base', 'base']}
      />

      <style jsx>{styles}</style>
    </section>
  )
}

AuthorWidget.fragments = fragments

export default AuthorWidget
