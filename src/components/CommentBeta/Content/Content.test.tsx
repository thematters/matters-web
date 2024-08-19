import { describe, expect, it } from 'vitest'

import { cleanup, render, screen } from '~/common/utils/test'
import { CommentState } from '~/gql/graphql'
import { MOCK_COMMENT } from '~/stories/mocks'

import CommentContent from './'

describe('<Comemnt.Content>', () => {
  it('should render a Comment.Content', () => {
    render(<CommentContent comment={MOCK_COMMENT} type="article" />)

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
        type="article"
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
        type="article"
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
        type="article"
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
        type="article"
      />
    )
    expect(
      screen.getByText('This comment has been deleted by the author')
    ).toBeInTheDocument()
  })
})
