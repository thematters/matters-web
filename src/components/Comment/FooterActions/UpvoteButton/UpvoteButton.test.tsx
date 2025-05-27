import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { MOCK_COMMENT } from '~/stories/mocks'

import UpvoteButton from './'

describe('<Comment/FooterActions/UpvoteButton>', () => {
  it('should render a Comment/FooterActions/UpvoteButton', () => {
    render(<UpvoteButton comment={MOCK_COMMENT} inCard />)

    const $button = screen.getByRole('button', { name: 'Upvote' })
    expect($button).toBeInTheDocument()

    // upvote count
    expect(screen.getByText(MOCK_COMMENT.upvotes)).toBeInTheDocument()
  })

  it('should render a Comment/FooterActions/UpvoteButton with custom onClick', () => {
    const onClick = vi.fn()

    render(<UpvoteButton comment={MOCK_COMMENT} onClick={onClick} inCard />)

    const $button = screen.getByRole('button', { name: 'Upvote' })
    expect($button).toBeInTheDocument()

    fireEvent.click($button)
    expect(onClick).toHaveBeenCalled()
  })

  it('should render a disabled Comment/FooterActions/UpvoteButton ', () => {
    const onClick = vi.fn()

    render(
      <UpvoteButton comment={MOCK_COMMENT} onClick={onClick} disabled inCard />
    )

    const $button = screen.getByRole('button', { name: 'Upvote' })
    expect($button).toBeInTheDocument()

    fireEvent.click($button)
    expect(onClick).not.toHaveBeenCalled()
  })
})
