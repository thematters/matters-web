import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { MOCK_COMMENT } from '~/stories/mocks'

import DownvoteButton from './'

describe('<Comemnt/FooterActions/DownvoteButton>', () => {
  it('should render a CircleComment/FooterActions/DownvoteButton', () => {
    render(<DownvoteButton comment={MOCK_COMMENT} inCard />)

    const $button = screen.getByRole('button', { name: 'Downvote' })
    expect($button).toBeInTheDocument()

    // downvote count is hidden
    expect(screen.queryByText(MOCK_COMMENT.downvotes)).not.toBeInTheDocument()
  })

  it('should render a CircleComment/FooterActions/DownvoteButton with custom onClick', () => {
    const onClick = vi.fn()

    render(<DownvoteButton comment={MOCK_COMMENT} onClick={onClick} inCard />)

    const $button = screen.getByRole('button', { name: 'Downvote' })
    expect($button).toBeInTheDocument()

    fireEvent.click($button)
    expect(onClick).toHaveBeenCalled()
  })

  it('should render a disabled CircleComment/FooterActions/DownvoteButton ', () => {
    const onClick = vi.fn()

    render(
      <DownvoteButton
        comment={MOCK_COMMENT}
        onClick={onClick}
        disabled
        inCard
      />
    )

    const $button = screen.getByRole('button', { name: 'Downvote' })
    expect($button).toBeInTheDocument()

    fireEvent.click($button)
    expect(onClick).not.toHaveBeenCalled()
  })
})
