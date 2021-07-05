import { LinkWrapper } from '~/components'

import { toPath } from '~/common/utils'

import { fragments } from './gql'

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

  return (
    <LinkWrapper
      {...path}
      textActiveColor={!disabled ? 'green' : undefined}
      disabled={disabled}
      onClick={onClick}
    >
      {user.displayName}
    </LinkWrapper>
  )
}

Plain.fragments = fragments

export default Plain
