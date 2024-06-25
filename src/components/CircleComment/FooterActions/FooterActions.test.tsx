import { describe, expect, it } from 'vitest'

import { render, screen } from '~/common/utils/test'
import { MOCK_COMMENT } from '~/stories/mocks'

import FooterActions from './'

describe('<Comemnt/FooterActions>', () => {
  it('should render a CircleComment/FooterActions', () => {
    render(
      <FooterActions
        comment={MOCK_COMMENT}
        hasDownvote
        hasUpvote
        hasReply
        hasCreatedAt
        type="circleBroadcast"
      />
    )

    // reply
    const $reply = screen.getByRole('button', { name: 'Write a comment' })
    expect($reply).toBeInTheDocument()

    // upvote
    const $upvote = screen.getByRole('button', { name: 'Upvote' })
    expect($upvote).toBeInTheDocument()

    // downvote
    const $downvote = screen.getByRole('button', { name: 'Downvote' })
    expect($downvote).toBeInTheDocument()
  })

  it('should render a CircleComment/FooterActions without reply', () => {
    render(
      <FooterActions
        comment={MOCK_COMMENT}
        hasReply={false}
        hasDownvote
        hasUpvote
        hasCreatedAt
        type="circleBroadcast"
      />
    )

    // reply
    const $reply = screen.queryByRole('button', { name: 'Write a comment' })
    expect($reply).not.toBeInTheDocument()
  })

  it('should render a CircleComment/FooterActions without votes', () => {
    render(
      <FooterActions
        comment={MOCK_COMMENT}
        hasReply={false}
        hasDownvote={false}
        hasUpvote={false}
        hasCreatedAt
        type="circleBroadcast"
      />
    )

    // upvote
    const $upVote = screen.queryByRole('button', { name: 'Upvote' })
    expect($upVote).not.toBeInTheDocument()

    // downvote
    const $downvote = screen.queryByRole('button', { name: 'Downvote' })
    expect($downvote).not.toBeInTheDocument()
  })
})
