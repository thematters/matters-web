import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { cleanup, render, screen } from '~/common/utils/test'
import { CircleCommentFeed } from '~/components'
import { MOCK_COMMENT } from '~/stories/mocks'

describe('<CircleCommentFeed>', () => {
  it('should render a Comment.Feed', () => {
    render(<CircleCommentFeed comment={MOCK_COMMENT} type="circleBroadcast" />)

    const $digest = screen.getByTestId(TEST_ID.CIRCLE_COMMENT_FEED)
    expect($digest).toBeInTheDocument()

    // author
    const $author = screen.getByText(MOCK_COMMENT.author.displayName)
    expect($author).toBeInTheDocument()

    // content
    const $content = screen.getAllByText(MOCK_COMMENT.content)
    expect($content[0]).toBeInTheDocument()
  })

  it('should render a Comment.Feed with replyTo', () => {
    render(
      <CircleCommentFeed
        comment={{
          ...MOCK_COMMENT,
          replyTo: {
            ...MOCK_COMMENT,
            id: 'another-comment-id',
          },
          parentComment: null,
        }}
        type="circleBroadcast"
      />
    )

    const $digest = screen.getByTestId(TEST_ID.CIRCLE_COMMENT_FEED)
    expect($digest).toBeInTheDocument()

    // replyTo
    const $replyTo = screen.getByTestId(TEST_ID.COMMENT_REPLY_TO)
    expect($replyTo).toBeInTheDocument()
  })

  it('should render a Comment.Feed without replyTo', () => {
    // not a replyTo
    render(
      <CircleCommentFeed
        comment={{
          ...MOCK_COMMENT,
          replyTo: null,
          parentComment: null,
        }}
        type="circleBroadcast"
      />
    )
    const $digest = screen.getByTestId(TEST_ID.CIRCLE_COMMENT_FEED)
    expect($digest).toBeInTheDocument()
    const $replyTo = screen.queryByTestId(TEST_ID.COMMENT_REPLY_TO)
    expect($replyTo).not.toBeInTheDocument()

    // has parentComment
    cleanup()
    render(
      <CircleCommentFeed
        comment={{
          ...MOCK_COMMENT,
          replyTo: null,
          parentComment: MOCK_COMMENT,
        }}
        type="circleBroadcast"
      />
    )
    const $digest2 = screen.getByTestId(TEST_ID.CIRCLE_COMMENT_FEED)
    expect($digest2).toBeInTheDocument()
    const $replyTo2 = screen.queryByTestId(TEST_ID.COMMENT_REPLY_TO)
    expect($replyTo2).not.toBeInTheDocument()
  })
})
