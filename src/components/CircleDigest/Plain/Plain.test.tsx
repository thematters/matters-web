import mockRouter from 'next-router-mock'
import { describe, expect, it, vi } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { fireEvent, render, screen } from '~/common/utils/test'
import { CircleDigest } from '~/components'
import { MOCK_CIRCLE } from '~/stories/mocks'

describe('<CircleDigest.Plain>', () => {
  it('should render a CircleDigest.Plain', () => {
    const handleClick = vi.fn()

    render(<CircleDigest.Plain circle={MOCK_CIRCLE} onClick={handleClick} />)

    const $digest = screen.getByTestId(TEST_ID.DIGRET_CIRCLE_PLAIN)
    expect($digest).toBeInTheDocument()

    const $displayName = screen.getByText(MOCK_CIRCLE.displayName)
    expect($displayName).toBeInTheDocument()

    fireEvent.click($digest)
    expect(mockRouter.asPath).toContain(MOCK_CIRCLE.name)
    expect(handleClick).toHaveBeenCalled()
  })
})
