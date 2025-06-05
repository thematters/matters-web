import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { MOCK_COMMENT } from '~/stories/mocks'

import ReplyButton from './'

describe('<Comment/FooterActions/ReplyButton>', () => {
  it('should render a Comment/FooterActions/ReplyButton with custom onClick', () => {
    const onClick = vi.fn()

    render(<ReplyButton comment={MOCK_COMMENT} onClick={onClick} />)

    const $button = screen.getByRole('button', { name: 'Write a comment' })
    expect($button).toBeInTheDocument()

    fireEvent.click($button)
    expect(onClick).toHaveBeenCalled()
  })

  it('should render a disabled Comment/FooterActions/ReplyButton ', () => {
    const onClick = vi.fn()

    render(<ReplyButton comment={MOCK_COMMENT} onClick={onClick} disabled />)

    const $button = screen.getByRole('button', { name: 'Write a comment' })
    expect($button).toBeInTheDocument()

    fireEvent.click($button)
    expect(onClick).not.toHaveBeenCalled()
  })
})
