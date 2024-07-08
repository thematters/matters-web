import { describe, expect, it } from 'vitest'

import { render, screen } from '~/common/utils/test'
import { MOCK_MOMENT } from '~/stories/mocks'

import LikeButton from '.'

describe('src/components/MomentDigest/FooterActions/LikeButton/LikeButton.test.tsx', () => {
  it('should render like button', async () => {
    render(<LikeButton moment={{ ...MOCK_MOMENT, liked: false }} />)

    expect(
      screen.getByRole('button', { name: 'Like moment' })
    ).toBeInTheDocument()
  })

  it('should render liked button', async () => {
    render(<LikeButton moment={{ ...MOCK_MOMENT, liked: true }} />)

    expect(
      screen.getByRole('button', { name: 'Unlike moment' })
    ).toBeInTheDocument()
  })
})
