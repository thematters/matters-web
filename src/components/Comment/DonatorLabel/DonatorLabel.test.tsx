import { describe, expect, it } from 'vitest'

import { render, screen } from '~/common/utils/test'
import { MOCK_COMMENT } from '~/stories/mocks'

import DonatorLabel from './'

describe('<Comemnt/DonatorLabel>', () => {
  it('should render a Comment/DonatorLabel', () => {
    // not from donator
    render(<DonatorLabel comment={{ ...MOCK_COMMENT, fromDonator: false }} />)
    expect(screen.queryByText('Supporter')).not.toBeInTheDocument()

    // from donator
    render(<DonatorLabel comment={{ ...MOCK_COMMENT, fromDonator: true }} />)
    expect(screen.getByText('Supporter')).toBeInTheDocument()
  })
})
