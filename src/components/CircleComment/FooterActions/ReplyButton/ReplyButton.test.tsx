import { describe, expect, it, vi } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { fireEvent, render, screen } from '~/common/utils/test'
import { MOCK_COMMENT } from '~/stories/mocks'

import ReplyButton from './'

describe('<Comemnt/FooterActions/ReplyButton>', () => {
  it('should render a CircleComment/FooterActions/ReplyButton', () => {
    render(<ReplyButton comment={MOCK_COMMENT} type="circleBroadcast" inCard />)

    const $button = screen.getByRole('button', { name: 'Write a comment' })
    expect($button).toBeInTheDocument()

    // open dialog
    fireEvent.click($button)
    expect(screen.getByTestId(TEST_ID.DIALOG_COMMENT_FORM)).toBeInTheDocument()
  })

  it('should render a CircleComment/FooterActions/ReplyButton with custom onClick', () => {
    const onClick = vi.fn()

    render(
      <ReplyButton
        comment={MOCK_COMMENT}
        type="circleBroadcast"
        onClick={onClick}
        inCard
      />
    )

    const $button = screen.getByRole('button', { name: 'Write a comment' })
    expect($button).toBeInTheDocument()

    fireEvent.click($button)
    expect(onClick).toHaveBeenCalled()
  })

  it('should render a disabled CircleComment/FooterActions/ReplyButton ', () => {
    const onClick = vi.fn()

    render(
      <ReplyButton
        comment={MOCK_COMMENT}
        type="circleBroadcast"
        onClick={onClick}
        disabled
        inCard
      />
    )

    const $button = screen.getByRole('button', { name: 'Write a comment' })
    expect($button).toBeInTheDocument()

    fireEvent.click($button)
    expect(onClick).not.toHaveBeenCalled()
  })
})
