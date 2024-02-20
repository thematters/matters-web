import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '~/common/utils/test'
import { MOCK_COMMENT } from '~/stories/mocks'

import ReplyButton from './'

describe('<Comemnt/FooterActions/ReplyButton>', () => {
  it('should render a Comment/FooterActions/ReplyButton with custom onClick', () => {
    const onClick = vi.fn()

    render(
      <ReplyButton
        comment={MOCK_COMMENT}
        type="article"
        onClick={onClick}
        inCard
      />
    )

    const $button = screen.getByRole('button', { name: 'Write a comment' })
    expect($button).toBeInTheDocument()

    $button.click()
    expect(onClick).toHaveBeenCalled()
  })

  it('should render a disabled Comment/FooterActions/ReplyButton ', () => {
    const onClick = vi.fn()

    render(
      <ReplyButton
        comment={MOCK_COMMENT}
        type="article"
        onClick={onClick}
        disabled
        inCard
      />
    )

    const $button = screen.getByRole('button', { name: 'Write a comment' })
    expect($button).toBeInTheDocument()

    $button.click()
    expect(onClick).not.toHaveBeenCalled()
  })
})
