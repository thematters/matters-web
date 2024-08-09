import { describe, expect, it, vi } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { render, screen } from '~/common/utils/test'
import { MOCK_MOMENT } from '~/stories/mocks'

import { MomentDigestDetail } from '.'

describe('src/components/MomentDigest/Detail/MomentDigestDetail.test.tsx', () => {
  it('should render MomentDigestDetail', async () => {
    const handleClickDigest = vi.fn()
    render(
      <MomentDigestDetail moment={MOCK_MOMENT} onClose={handleClickDigest} />
    )

    // author
    const $author = screen.queryByTestId(TEST_ID.MOMENT_DIGEST_AUTHOR)
    expect($author).toBeInTheDocument()

    // content
    const $content = screen.queryByTestId(TEST_ID.MOMENT_DIGEST_CONTENT)
    expect($content).toBeInTheDocument()

    // assets
    const $assets = screen.queryByTestId(TEST_ID.MOMENT_DIGEST_ASSETS)
    expect($assets).toBeInTheDocument()
  })

  it('should render MomentDigestDetail without content', async () => {
    const handleClickDigest = vi.fn()
    render(
      <MomentDigestDetail
        moment={{
          ...MOCK_MOMENT,
          content: null,
        }}
        onClose={handleClickDigest}
      />
    )

    // content
    const $content = screen.queryByTestId(TEST_ID.MOMENT_DIGEST_CONTENT)
    expect($content).not.toBeInTheDocument()
  })

  it('should render MomentDigestDetail without assets', async () => {
    const handleClickDigest = vi.fn()
    render(
      <MomentDigestDetail
        moment={{
          ...MOCK_MOMENT,
          assets: [],
        }}
        onClose={handleClickDigest}
      />
    )

    // assets
    const $assets = screen.queryByTestId(TEST_ID.MOMENT_DIGEST_ASSETS)
    expect($assets).not.toBeInTheDocument()
  })
})
