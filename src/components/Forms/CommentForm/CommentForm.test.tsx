import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '~/common/utils/test'

import { CommentForm } from './'

describe('<Forms/CommentForm>', () => {
  it('should render a CommentForm', async () => {
    const placeholder = 'Test placeholder'
    const handleSubmit = vi.fn()

    const { container } = render(
      <CommentForm
        type="article"
        submitCallback={handleSubmit}
        placeholder={placeholder}
      />
    )

    // eslint-disable-next-line
    const $editor = container.querySelector('.ProseMirror')!
    expect($editor).toBeInTheDocument()

    // eslint-disable-next-line
    const $placeholder = container.querySelector('[data-placeholder]')!
    expect($placeholder).toHaveAttribute('data-placeholder', placeholder)

    const comment = 'Test comment'
    await userEvent.type($editor, comment)
    expect($editor).toHaveTextContent(comment)

    // submit & loading
    const $submit = screen.getByRole('button', { name: 'Send' })
    expect($submit).toBeInTheDocument()
    $submit.click()
    expect(
      screen.queryByRole('button', { name: 'Send' })
    ).not.toBeInTheDocument()
  })
})
