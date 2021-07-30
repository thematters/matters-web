import classNames from 'classnames'

import { LinkWrapper } from '~/components'

import { toPath } from '~/common/utils'

import { fragments } from './gql'
import styles from './styles.css'

import { UserDigestPlainUser } from './__generated__/UserDigestPlainUser'

export type UserDigestPlainProps = {
  user: UserDigestPlainUser

  disabled?: boolean
  onClick?: () => void
}

const Plain = ({ user, disabled, onClick }: UserDigestPlainProps) => {
  const path = toPath({
    page: 'userProfile',
    userName: user.userName || '',
  })

  const containerClasses = classNames({
    container: true,
    disabled,
  })

  return (
    <LinkWrapper {...path} disabled={disabled} onClick={onClick}>
      <section className={containerClasses}>
        <span className="name">{user.displayName}</span>

        <style jsx>{styles}</style>
      </section>
    </LinkWrapper>
  )
}

Plain.fragments = fragments

export default Plain
