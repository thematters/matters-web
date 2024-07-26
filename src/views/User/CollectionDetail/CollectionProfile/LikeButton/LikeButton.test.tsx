import { describe, expect, it } from 'vitest'

import { render, screen } from '~/common/utils/test'
import { MOCK_COLLECTION } from '~/stories/mocks'

import LikeButton from '.'

describe('src/components/User/CollectionDetail/CollectionProfile/LikeButton', () => {
  it('should render like button', async () => {
    render(
      <LikeButton
        collection={{ ...MOCK_COLLECTION, liked: false, likeCount: 1 }}
      />
    )

    expect(
      screen.getByRole('button', { name: 'Like moment' })
    ).toBeInTheDocument()
  })

  it('should render liked button', async () => {
    render(
      <LikeButton
        collection={{ ...MOCK_COLLECTION, liked: true, likeCount: 1 }}
      />
    )

    expect(
      screen.getByRole('button', { name: 'Unlike moment' })
    ).toBeInTheDocument()
  })
})
