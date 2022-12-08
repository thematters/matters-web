import classNames from 'classnames'

import { LinkWrapper } from '~/components'

import { subString, toPath } from '~/common/utils'

import { fragments } from './gql'
import styles from './styles.css'

import { UserDigestPlainUser } from './__generated__/UserDigestPlainUser'

export type UserDigestPlainProps = {
  user: UserDigestPlainUser

  disabled?: boolean
  hasUnderline?: boolean
  displayNameLimit?: number
  onClick?: () => void
}

const Plain = ({
  user,
  disabled,
  onClick,
  hasUnderline,
  displayNameLimit,
}: UserDigestPlainProps) => {
  const path = toPath({
    page: 'userProfile',
    userName: user.userName || '',
  })

  const containerClasses = classNames({
    container: true,
    disabled,
  })

  const displayNameClasses = classNames({
    name: true,
    hasUnderline,
  })

  return (
    <LinkWrapper {...path} disabled={disabled} onClick={onClick}>
      <section className={containerClasses}>
        <span className={displayNameClasses}>
          {displayNameLimit && subString(user.displayName!, displayNameLimit)}
          {!displayNameLimit && user.displayName}
        </span>
        <style jsx>{styles}</style>
      </section>
    </LinkWrapper>
  )
}

Plain.fragments = fragments

export default Plain
