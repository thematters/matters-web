import { describe, expect, it } from 'vitest'

import { render, screen } from '~/common/utils/test'
import { MOCK_COMMENT } from '~/stories/mocks'

import FooterActions from './'

describe('<Comemnt/FooterActions>', () => {
  it('should render a Comment/FooterActions', () => {
    render(
      <FooterActions comment={MOCK_COMMENT} hasUpvote hasReply type="article" />
    )

    // reply
    const $reply = screen.getByRole('button', { name: 'Write a comment' })
    expect($reply).toBeInTheDocument()

    // upvote
    const $upvote = screen.getByRole('button', { name: 'Upvote' })
    expect($upvote).toBeInTheDocument()
  })

  it('should render a Comment/FooterActions without reply', () => {
    render(
      <FooterActions
        comment={MOCK_COMMENT}
        hasReply={false}
        hasUpvote
        type="article"
      />
    )

    // reply
    const $reply = screen.queryByRole('button', { name: 'Write a comment' })
    expect($reply).not.toBeInTheDocument()
  })

  it('should render a Comment/FooterActions without votes', () => {
    render(
      <FooterActions
        comment={MOCK_COMMENT}
        hasReply={false}
        hasUpvote={false}
        type="article"
      />
    )

    // upvote
    const $upVote = screen.queryByRole('button', { name: 'Upvote' })
    expect($upVote).not.toBeInTheDocument()
  })
})
