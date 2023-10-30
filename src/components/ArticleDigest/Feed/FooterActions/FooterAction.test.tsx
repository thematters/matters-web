import { describe, expect, it } from 'vitest'

import { render, screen } from '~/common/utils/test'
import { MOCK_ARTILCE } from '~/stories/mocks'

import FooterActions from '.'

describe('<ArticleDigest/Feed/FooterAction>', () => {
  it('should render read time', () => {
    render(<FooterActions article={MOCK_ARTILCE} hasReadTime />)
    expect(screen.getByLabelText('Accumulated read time')).toBeTruthy()
  })

  it('should render donation count', () => {
    render(<FooterActions article={MOCK_ARTILCE} hasDonationCount />)
    expect(screen.getByLabelText('Donation count')).toBeTruthy()
  })

  it('should render circle', () => {
    render(<FooterActions article={MOCK_ARTILCE} hasCircle />)
    expect(
      screen.getByText(MOCK_ARTILCE.access.circle.displayName)
    ).toBeTruthy()
  })
})
