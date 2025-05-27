import mockRouter from 'next-router-mock'
import { describe, expect, it, vi } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { fireEvent, render, screen } from '~/common/utils/test'
import { UserDigest } from '~/components'
import { MOCK_USER } from '~/stories/mocks'

describe('<UserDigest.Plain>', () => {
  it('should render an UserDigest.Plain', () => {
    const handleClick = vi.fn()

    render(<UserDigest.Plain user={MOCK_USER} onClick={handleClick} />)

    const $digest = screen.getByTestId(TEST_ID.DIGEST_USER_PLAIN)
    expect($digest).toBeInTheDocument()

    // display name
    const $displayName = screen.getByText(MOCK_USER.displayName)
    expect($displayName).toBeInTheDocument()

    fireEvent.click($displayName)
    expect(mockRouter.asPath).toContain(MOCK_USER.userName)
    expect(handleClick).toBeCalledTimes(1)
    mockRouter.push('/')

    fireEvent.click($digest)
    expect(mockRouter.asPath).toContain(MOCK_USER.userName)
    expect(handleClick).toBeCalledTimes(2)
  })

  it('should render a disabled UserDigest.Mini', () => {
    render(<UserDigest.Plain user={MOCK_USER} disabled />)

    // display name
    const $displayName = screen.getByText(MOCK_USER.displayName)
    expect($displayName).toBeInTheDocument()

    fireEvent.click($displayName)
    expect(mockRouter.asPath).not.toContain(MOCK_USER.userName)
  })
})
