import mockRouter from 'next-router-mock'
import { describe, expect, it, vi } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { cleanup, fireEvent, render, screen } from '~/common/utils/test'
import { UserDigest } from '~/components'
import { UserState } from '~/gql/graphql'
import { MOCK_USER } from '~/stories/mocks'

describe('<UserDigest.Rich>', () => {
  it('should render an UserDigest.Rich', () => {
    const handleClick = vi.fn()

    render(<UserDigest.Rich user={MOCK_USER} onClick={handleClick} />)

    const $digest = screen.getByTestId(TEST_ID.DIGEST_USER_RICH)
    expect($digest).toBeInTheDocument()

    // display name
    const $displayName = screen.getByTestId(
      TEST_ID.DIGEST_USER_RICH_DISPLAY_NAME
    )
    expect($displayName).toHaveTextContent(MOCK_USER.displayName)

    // avatar
    const $avatar = screen.getByTestId(TEST_ID.AVATAR)
    expect($avatar).toBeInTheDocument()

    // description
    const $description = screen.getByText(MOCK_USER.info.description)
    expect($description).toBeInTheDocument()

    fireEvent.click($displayName)
    expect(mockRouter.asPath).toContain(MOCK_USER.userName)
    expect(handleClick).toBeCalledTimes(1)
    mockRouter.push('/')

    fireEvent.click($digest)
    expect(mockRouter.asPath).toContain(MOCK_USER.userName)
    expect(handleClick).toBeCalledTimes(2)
  })

  it('should render a disabled UserDigest.Rich with archived user', () => {
    const handleClick = vi.fn()

    render(
      <UserDigest.Rich
        user={{
          ...MOCK_USER,
          status: { ...MOCK_USER.status, state: UserState.Archived },
        }}
        onClick={handleClick}
      />
    )

    const $digest = screen.getByTestId(TEST_ID.DIGEST_USER_RICH)
    expect($digest).toBeInTheDocument()

    // display name
    const $displayName = screen.getByTestId(
      TEST_ID.DIGEST_USER_RICH_DISPLAY_NAME
    )
    expect($displayName).toHaveTextContent('Account Archived')

    // avatar
    const $avatar = screen.getByTestId(TEST_ID.AVATAR)
    expect($avatar).toBeInTheDocument()

    // description
    const $description = screen.queryByText(MOCK_USER.info.description)
    expect($description).not.toBeInTheDocument()

    fireEvent.click($displayName)
    expect(mockRouter.asPath).not.toContain(MOCK_USER.userName)
    expect(handleClick).not.toBeCalled()
  })

  it('should render a UserDigest.Rich with or w/o follow buttons', () => {
    // hide follow button if viewer is the user
    render(<UserDigest.Rich user={MOCK_USER} hasFollow />)
    expect(
      screen.queryByRole('button', {
        name: 'Follow',
      })
    ).not.toBeInTheDocument()

    // show follow button if viewer is not the user
    cleanup()
    render(
      <UserDigest.Rich user={{ ...MOCK_USER, id: 'test10001' }} hasFollow />
    )
    expect(
      screen.getByRole('button', {
        name: 'Follow',
      })
    ).toBeInTheDocument()

    // hide follow button if user is archived
    cleanup()
    render(
      <UserDigest.Rich
        user={{
          ...MOCK_USER,
          status: { ...MOCK_USER.status, state: UserState.Archived },
        }}
        hasFollow
      />
    )
    expect(
      screen.queryByRole('button', {
        name: 'Follow',
      })
    ).not.toBeInTheDocument()

    // show unfollow button if user is followee
    cleanup()
    render(
      <UserDigest.Rich
        user={{
          ...MOCK_USER,
          id: 'test10001',
          isFollowee: true,
        }}
        hasFollow
      />
    )
    expect(
      screen.getByRole('button', {
        name: 'Followed',
      })
    ).toBeInTheDocument()
  })

  it('should render a UserDigest.Rich with or w/o state', () => {
    // follower
    render(
      <UserDigest.Rich
        user={{ ...MOCK_USER, isFollower: true, isFollowee: false }}
        hasState
      />
    )
    expect(screen.getByText('Followed You')).toBeInTheDocument()

    // followee
    cleanup()
    render(
      <UserDigest.Rich
        user={{ ...MOCK_USER, isFollower: true, isFollowee: true }}
        hasState
      />
    )
    expect(screen.getByText('Followed')).toBeInTheDocument()

    // no state if neither follower nor followee
    cleanup()
    render(
      <UserDigest.Rich
        user={{ ...MOCK_USER, isFollower: false, isFollowee: false }}
        hasState
      />
    )
    expect(screen.queryByText('Followed')).not.toBeInTheDocument()
    expect(screen.queryByText('Followed You')).not.toBeInTheDocument()
  })

  it('should render a UserDigest.Rich with extra button', () => {
    render(
      <UserDigest.Rich user={MOCK_USER} extraButton={<span>extra</span>} />
    )
    expect(screen.getByText('extra')).toBeInTheDocument()
  })

  it('should render a UserDigest.Rich with subtitle', () => {
    render(
      <UserDigest.Rich user={MOCK_USER} subtitle={<span>subtitle</span>} />
    )
    expect(screen.getByText('subtitle')).toBeInTheDocument()
  })

  it('should render a UserDigest.Rich with or w/o avatar badge', () => {
    render(
      <UserDigest.Rich
        user={MOCK_USER}
        avatarBadge={<span>avatar badge</span>}
      />
    )
    expect(screen.getByText('avatar badge')).toBeInTheDocument()
  })
})
