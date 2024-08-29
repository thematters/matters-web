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
    const $content = screen.queryAllByTestId(TEST_ID.MOMENT_DIGEST_CONTENT)
    expect($content).length(2)

    // assets
    const $assets = screen.queryAllByTestId(TEST_ID.MOMENT_DIGEST_ASSETS)
    expect($assets).length(2)

    // commented followees
    const $commentedFollowees = screen.queryByTestId(
      TEST_ID.MOMENT_DIGEST_FOOTER_ACTIONS_COMMENTED_FOLLOWEES
    )
    expect($commentedFollowees).not.toBeInTheDocument()
  })

  it('should render MomentDigestFeed with CommentedFollowees', async () => {
    render(<MomentDigestFeed moment={MOCK_MOMENT} hasCommentedFollowees />)

    // commented followees
    const $commentedFollowees = screen.queryAllByTestId(
      TEST_ID.MOMENT_DIGEST_FOOTER_ACTIONS_COMMENTED_FOLLOWEES
    )
    expect($commentedFollowees).length(2)
  })

  it('should render MomentDigestFeed with author', async () => {
    render(<MomentDigestFeed moment={MOCK_MOMENT} hasAuthor />)

    // author
    const $author = screen.queryAllByTestId(TEST_ID.MOMENT_DIGEST_AUTHOR)
    expect($author).length(2)
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
