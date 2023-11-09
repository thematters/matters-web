import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { render, screen } from '~/common/utils/test'
import { MOCK_CIRCLE } from '~/stories/mocks'

import CircleDigestPrice from './'

describe('<CircleDigest/Price>', () => {
  it('should render a CircleDigest/Price ', () => {
    render(<CircleDigestPrice circle={{ ...MOCK_CIRCLE, isMember: false }} />)

    const $cta = screen.getByTestId(TEST_ID.DIGEST_CIRCLE_PRICE)
    expect($cta.textContent).toContain(MOCK_CIRCLE.prices[0].amount)
  })

  it('should not render a CircleDigest/Price ', () => {
    render(<CircleDigestPrice circle={{ ...MOCK_CIRCLE, isMember: true }} />)

    const $cta = screen.getByText('Enter')
    expect($cta).toBeInTheDocument()
  })
})
