import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { render, screen } from '~/common/utils/test'
import { ArticleCommentFeed } from '~/components'
import { MOCK_COMMENT } from '~/stories/mocks'

describe('<Comemnt.Feed>', () => {
  it('should render a Comment.Feed', () => {
    render(<ArticleCommentFeed comment={MOCK_COMMENT} />)

    const $digest = screen.getByTestId(TEST_ID.ARTICLE_COMMENT_FEED)
    expect($digest).toBeInTheDocument()

    // author
    const $author = screen.getByText(MOCK_COMMENT.author.displayName)
    expect($author).toBeInTheDocument()

    // content
    const $content = screen.getAllByText(MOCK_COMMENT.content)
    expect($content[0]).toBeInTheDocument()
  })
})
