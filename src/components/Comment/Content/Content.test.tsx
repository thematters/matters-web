import { describe, expect, it } from 'vitest'

import { cleanup, render, screen } from '~/common/utils/test'
import { CommentState } from '~/gql/graphql'
import { MOCK_COMMENT } from '~/stories/mocks'

import { CommentContent } from './'

describe('<Comemnt.Content>', () => {
  it('should render a Comment.Content', () => {
    render(<CommentContent comment={MOCK_COMMENT} />)

    const $content = screen.getByText(MOCK_COMMENT.content)
    expect($content).toBeInTheDocument()
  })

  it('should render a collapsed Comment.Content', () => {
    // collapsed by author
    render(
      <CommentContent
        comment={{
          ...MOCK_COMMENT,
          state: CommentState.Collapsed,
          author: { ...MOCK_COMMENT.author, isBlocked: false },
        }}
      />
    )
    expect(screen.getByText('Comment has been hidden')).toBeInTheDocument()

    // blocked by user
    cleanup()
    render(
      <CommentContent
        comment={{
          ...MOCK_COMMENT,
          state: CommentState.Active,
          author: { ...MOCK_COMMENT.author, isBlocked: true },
        }}
      />
    )
    expect(screen.getByText('Comment has been hidden')).toBeInTheDocument()

    // banned by user
    cleanup()
    render(
      <CommentContent
        comment={{
          ...MOCK_COMMENT,
          state: CommentState.Banned,
        }}
      />
    )
    expect(
      screen.getByText('The comment has been forcibly hidden')
    ).toBeInTheDocument()
  })

  it('should render an archived Comment.Content', () => {
    render(
      <CommentContent
        comment={{
          ...MOCK_COMMENT,
          state: CommentState.Archived,
        }}
      />
    )
    expect(
      screen.getByText('This comment has been deleted by the author')
    ).toBeInTheDocument()
  })
})
