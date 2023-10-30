import { describe, expect, it } from 'vitest'

import { render, screen } from '~/common/utils/test'
import { FollowUserButton } from '~/components'
import { UserState } from '~/gql/graphql'
import { MOCK_USER } from '~/stories/mocks'

describe('<FollowUserButton>', () => {
  it('should render a follow button', () => {
    render(<FollowUserButton user={{ ...MOCK_USER, id: 'another-user' }} />)
    const $button = screen.getByRole('button', { name: 'Follow' })
    expect($button).toBeInTheDocument()
  })

  it('should render a unfollow button', () => {
    render(
      <FollowUserButton
        user={{ ...MOCK_USER, id: 'another-user', isFollowee: true }}
      />
    )
    const $button = screen.getByRole('button', { name: 'Followed' })
    expect($button).toBeInTheDocument()
  })

  it('should not render follow buttons if user is archived', () => {
    render(
      <FollowUserButton
        user={{
          ...MOCK_USER,
          id: 'another-user',
          status: { ...MOCK_USER.status, state: UserState.Archived },
        }}
      />
    )
    expect(
      screen.queryByRole('button', { name: 'Follow' })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Followed' })
    ).not.toBeInTheDocument()
  })
})
