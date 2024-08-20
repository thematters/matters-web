import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { render, screen } from '~/common/utils/test'
import { MOCK_MOMENT } from '~/stories/mocks'

import FooterActions from '.'

describe('src/components/MomentDigest/FooterActions/FooterActions.test.tsx', () => {
  it('should render MomentDigest.FooterActions without CommentedFollowees', async () => {
    render(<FooterActions moment={MOCK_MOMENT} />)

    // reply
    const $reply = screen.getByTestId(
      TEST_ID.MOMENT_DIGEST_FOOTER_ACTIONS_REPLY_BUTTON
    )
    expect($reply).toBeInTheDocument()

    // like
    const $like = screen.getByRole('button', { name: 'Like moment' })
    expect($like).toBeInTheDocument()

    // commented followees
    const $commentedFollowees = screen.queryByTestId(
      TEST_ID.MOMENT_DIGEST_FOOTER_ACTIONS_COMMENTED_FOLLOWEES
    )
    expect($commentedFollowees).not.toBeInTheDocument()
  })

  it('should render MomentDigest.FooterActions with CommentedFollowees', async () => {
    render(<FooterActions moment={MOCK_MOMENT} hasCommentedFollowees />)

    // commented followees
    const $commentedFollowees = screen.getByTestId(
      TEST_ID.MOMENT_DIGEST_FOOTER_ACTIONS_COMMENTED_FOLLOWEES
    )
    expect($commentedFollowees).toBeInTheDocument()
  })
})
