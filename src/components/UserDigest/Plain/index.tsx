import classNames from 'classnames'

import { LinkWrapper } from '~/components'

import { makeTitle, toPath } from '~/common/utils'

import { fragments } from './gql'
import styles from './styles.css'

import { UserDigestPlainUser } from './__generated__/UserDigestPlainUser'

export type UserDigestPlainProps = {
  user: UserDigestPlainUser

  disabled?: boolean
  hasUnderline?: boolean
  subStringDisplayNameIndex?: number
  onClick?: () => void
}

const Plain = ({
  user,
  disabled,
  onClick,
  hasUnderline,
  subStringDisplayNameIndex,
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
          {subStringDisplayNameIndex &&
            makeTitle(user.displayName!, subStringDisplayNameIndex)}
          {!subStringDisplayNameIndex && user.displayName}
        </span>
        <style jsx>{styles}</style>
      </section>
    </LinkWrapper>
  )
}

Plain.fragments = fragments

export default Plain
