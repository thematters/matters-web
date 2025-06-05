import { describe, expect, it } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { MOCK_COMMENT } from '~/stories/mocks'

import CommentCollapsed from './Collapsed'

describe('<Comemnt.Content/Collapsed>', () => {
  it('should render a Comment.Content/Collapsed', () => {
    const collapsedContent = 'Collapsed'

    render(
      <CommentCollapsed
        content={MOCK_COMMENT.content}
        collapsedContent={collapsedContent}
        className="test-class"
      />
    )

    // collapsed
    expect(screen.getByText(collapsedContent)).toBeInTheDocument()

    // expanded
    const $expandBtn = screen.getByRole('button', { name: 'Expand' })
    fireEvent.click($expandBtn)
    expect(screen.getByText(MOCK_COMMENT.content)).toBeInTheDocument()
  })
})
