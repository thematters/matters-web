import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { render, screen } from '~/common/utils/test'
import { MOCK_MOMENT } from '~/stories/mocks'

import { MomentDigestFeed } from '.'

describe('src/components/MomentDigest/MomentDigestFeed.test.tsx', () => {
  it('should render MomentDigestFeed', async () => {
    render(<MomentDigestFeed moment={MOCK_MOMENT} />)

    // author
    const $author = screen.queryByTestId(TEST_ID.MOMENT_DIGEST_AUTHOR)
    expect($author).not.toBeInTheDocument()

    // content
    const $content = screen.queryByTestId(TEST_ID.MOMENT_DIGEST_CONTENT)
    expect($content).toBeInTheDocument()

    // assets
    const $assets = screen.queryByTestId(TEST_ID.MOMENT_DIGEST_ASSETS)
    expect($assets).toBeInTheDocument()

    // commented followees
    const $commentedFollowees = screen.queryByTestId(
      TEST_ID.MOMENT_DIGEST_FOOTER_ACTIONS_COMMENTED_FOLLOWEES
    )
    expect($commentedFollowees).not.toBeInTheDocument()
  })

  it('should render MomentDigestFeed with CommentedFollowees', async () => {
    render(<MomentDigestFeed moment={MOCK_MOMENT} hasCommentedFollowees />)

    // commented followees
    const $commentedFollowees = screen.queryByTestId(
      TEST_ID.MOMENT_DIGEST_FOOTER_ACTIONS_COMMENTED_FOLLOWEES
    )
    expect($commentedFollowees).toBeInTheDocument()
  })

  it('should render MomentDigestFeed with author', async () => {
    render(<MomentDigestFeed moment={MOCK_MOMENT} hasAuthor />)

    // author
    const $author = screen.queryByTestId(TEST_ID.MOMENT_DIGEST_AUTHOR)
    expect($author).toBeInTheDocument()
  })

  it('should render MomentDigestFeed without assets', async () => {
    render(
      <MomentDigestFeed
        moment={{
          ...MOCK_MOMENT,
          assets: [],
        }}
      />
    )

    // assets
    const $assets = screen.queryByTestId(TEST_ID.MOMENT_DIGEST_ASSETS)
    expect($assets).not.toBeInTheDocument()
  })

  it('shoudl render MomentDigestFeed without content', async () => {
    render(
      <MomentDigestFeed
        moment={{
          ...MOCK_MOMENT,
          content: '',
        }}
      />
    )

    // content
    const $content = screen.queryByTestId(TEST_ID.MOMENT_DIGEST_CONTENT)
    expect($content).not.toBeInTheDocument()
  })
})
