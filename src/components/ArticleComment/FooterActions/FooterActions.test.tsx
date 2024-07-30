import { describe, expect, it } from 'vitest'

import { render, screen } from '~/common/utils/test'
import { MOCK_COMMENT } from '~/stories/mocks'

import FooterActions from './'

describe('<ArticleComment/FooterActions>', () => {
  it('should render a ArticleComment/FooterActions', () => {
    render(<FooterActions comment={MOCK_COMMENT} hasUpvote hasReply />)
    // reply
    const $reply = screen.getAllByRole('button', { name: 'Write a comment' })
    expect($reply).toHaveLength(2)
    expect($reply[0]).toBeInTheDocument()
    expect($reply[1]).toBeInTheDocument()

    // upvote
    const $upvote = screen.getByRole('button', { name: 'Upvote' })
    expect($upvote).toBeInTheDocument()
  })

  it('should render a ArticleComment/FooterActions without reply', () => {
    render(<FooterActions comment={MOCK_COMMENT} hasReply={false} hasUpvote />)

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
      />
    )

    // upvote
    const $upVote = screen.queryByRole('button', { name: 'Upvote' })
    expect($upVote).not.toBeInTheDocument()
  })
})
