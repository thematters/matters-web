import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '~/common/utils/test'
import { MOCK_COMMENT } from '~/stories/mocks'

import ReplyButton from './'

describe('<ArticleComment/FooterActions/ReplyButton>', () => {
  it('should render a ArticleComment/FooterActions/ReplyButton with custom onClick', () => {
    const onClick = vi.fn()

    render(<ReplyButton comment={MOCK_COMMENT} onClick={onClick} inCard />)

    const $button = screen.getByRole('button', { name: 'Write a comment' })
    expect($button).toBeInTheDocument()

    $button.click()
    expect(onClick).toHaveBeenCalled()
  })

  it('should render a disabled ArticleComment/FooterActions/ReplyButton ', () => {
    const onClick = vi.fn()

    render(
      <ReplyButton comment={MOCK_COMMENT} onClick={onClick} disabled inCard />
    )

    const $button = screen.getByRole('button', { name: 'Write a comment' })
    expect($button).toBeInTheDocument()

    $button.click()
    expect(onClick).not.toHaveBeenCalled()
  })
})
