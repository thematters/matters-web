import { describe, expect, it } from 'vitest'

import { render, screen } from '~/common/utils/test'
import { CommentState } from '~/gql/graphql'
import { MOCK_COMMENT } from '~/stories/mocks'

import { CircleCommentContent } from './'

describe('<CircleComemnt.Content>', () => {
  it('should render a CircleComemnt.Content', () => {
    render(
      <CircleCommentContent comment={MOCK_COMMENT} type="circleBroadcast" />
    )

    const $content = screen.getByText(MOCK_COMMENT.content)
    expect($content).toBeInTheDocument()
  })

  it('should render a collapsed CircleComemnt.Content', () => {
    // collapsed by author
    render(
      <CircleCommentContent
        comment={{
          ...MOCK_COMMENT,
          state: CommentState.Collapsed,
          author: { ...MOCK_COMMENT.author, isBlocked: false },
        }}
        type="circleBroadcast"
      />
    )
    expect(
      screen.getByText('This broadcast has been collapsed by the author')
    ).toBeInTheDocument()

    // blocked by user
    render(
      <CircleCommentContent
        comment={{
          ...MOCK_COMMENT,
          state: CommentState.Active,
          author: { ...MOCK_COMMENT.author, isBlocked: true },
        }}
        type="circleBroadcast"
      />
    )
    expect(screen.getByText('You have blocked that user')).toBeInTheDocument()
  })

  it('should render a banned CircleComemnt.Content', () => {
    render(
      <CircleCommentContent
        comment={{
          ...MOCK_COMMENT,
          state: CommentState.Banned,
        }}
        type="circleBroadcast"
      />
    )
    expect(
      screen.getByText(
        'This broadcast has been archived due to a violation of the user agreement'
      )
    ).toBeInTheDocument()
  })

  it('should render an archived CircleComemnt.Content', () => {
    render(
      <CircleCommentContent
        comment={{
          ...MOCK_COMMENT,
          state: CommentState.Archived,
        }}
        type="circleBroadcast"
      />
    )
    expect(
      screen.getByText('This broadcast has been deleted by the author')
    ).toBeInTheDocument()
  })
})
