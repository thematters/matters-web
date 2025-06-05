import mockRouter from 'next-router-mock'
import { describe, expect, it, vi } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { fireEvent, render, screen } from '~/common/utils/test'
import { UserDigest } from '~/components'
import { MOCK_USER } from '~/stories/mocks'

describe('<UserDigest.Mini>', () => {
  it('should render an UserDigest.Mini', () => {
    const handleClick = vi.fn()

    render(
      <UserDigest.Mini
        user={MOCK_USER}
        hasAvatar
        hasDisplayName
        hasUserName
        onClick={handleClick}
      />
    )

    const $digest = screen.getByTestId(TEST_ID.DIGEST_USER_MINI)
    expect($digest).toBeInTheDocument()

    // avatar
    const $avatar = screen.getByTestId(TEST_ID.AVATAR)
    expect($avatar).toBeInTheDocument()

    // display name
    const $displayName = screen.getByText(MOCK_USER.displayName)
    expect($displayName).toBeInTheDocument()

    // user name
    const $userName = screen.getByText(`@${MOCK_USER.userName}`)
    expect($userName).toBeInTheDocument()

    fireEvent.click($avatar)
    expect(mockRouter.asPath).toContain(MOCK_USER.userName)
    expect(handleClick).toBeCalledTimes(1)
    mockRouter.push('/')

    fireEvent.click($digest)
    expect(mockRouter.asPath).toContain(MOCK_USER.userName)
    expect(handleClick).toBeCalledTimes(2)
  })

  it('should render a disabled UserDigest.Mini', () => {
    render(
      <UserDigest.Mini
        user={MOCK_USER}
        hasAvatar
        hasDisplayName
        hasUserName
        disabled
      />
    )

    const $avatar = screen.getByTestId(TEST_ID.AVATAR)
    expect($avatar).toBeInTheDocument()

    fireEvent.click($avatar)
    expect(mockRouter.asPath).not.toContain(MOCK_USER.userName)
  })

  it('should render a UserDigest.Mini w/o avatar', () => {
    render(
      <UserDigest.Mini
        user={MOCK_USER}
        hasAvatar={false}
        hasDisplayName
        hasUserName
      />
    )

    const $avatar = screen.queryByTestId(TEST_ID.AVATAR)
    expect($avatar).not.toBeInTheDocument()
  })

  it('should render a UserDigest.Mini w/o display name', () => {
    render(<UserDigest.Mini user={MOCK_USER} hasDisplayName={false} />)

    const $displayName = screen.queryByText(MOCK_USER.displayName)
    expect($displayName).not.toBeInTheDocument()
  })

  it('should render a UserDigest.Mini w/o user name', () => {
    render(<UserDigest.Mini user={MOCK_USER} hasUserName={false} />)

    const $userName = screen.queryByText(`@${MOCK_USER.userName}`)
    expect($userName).not.toBeInTheDocument()
  })
})
