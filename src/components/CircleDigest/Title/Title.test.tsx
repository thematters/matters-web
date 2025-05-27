import mockRouter from 'next-router-mock'
import { describe, expect, it, vi } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { fireEvent, render, screen } from '~/common/utils/test'
import { CircleDigest } from '~/components'
import { MOCK_CIRCLE } from '~/stories/mocks'

describe('<CircleDigest.Title>', () => {
  it('should render a CircleDigest.Title', async () => {
    const handleClick = vi.fn()

    render(<CircleDigest.Title circle={MOCK_CIRCLE} onClick={handleClick} />)

    const $digest = screen.getByTestId(TEST_ID.DIGEST_CIRCLE_TITLE)
    expect($digest).toBeInTheDocument()

    const $displayName = screen.getByRole('heading', {
      name: MOCK_CIRCLE.displayName,
    })
    expect($displayName).toBeInTheDocument()

    fireEvent.click($digest)
    expect(mockRouter.asPath).toContain(MOCK_CIRCLE.name)
    expect(handleClick).toBeCalledTimes(1)
  })

  it('should render a disabled CircleDigest.Title', async () => {
    const handleClick = vi.fn()

    render(
      <CircleDigest.Title
        circle={MOCK_CIRCLE}
        disabled
        onClick={handleClick}
        is="span"
      />
    )

    const $displayName = screen.getByText(MOCK_CIRCLE.displayName)
    expect($displayName.tagName).toBe('SPAN')
    expect($displayName).toBeInTheDocument()

    fireEvent.click($displayName)
    expect(mockRouter.asPath).not.toContain(MOCK_CIRCLE.name)
    expect(handleClick).not.toBeCalled()
  })
})
