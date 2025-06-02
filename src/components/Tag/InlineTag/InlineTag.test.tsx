import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { InlineTag } from '~/components'
import { MOCK_TAG } from '~/stories/mocks'

describe('<InlineTag>', () => {
  it('should render a Tag', () => {
    const handleClick = vi.fn()
    render(<InlineTag tag={MOCK_TAG} onClick={handleClick} />)

    const $name = screen.getByText(new RegExp(MOCK_TAG.content, 'i'))
    expect($name).toBeInTheDocument()

    fireEvent.click($name)
    expect(handleClick).toBeCalledTimes(1)
  })

  it('should render a InlineTag with remove button', () => {
    const onRemoveTag = vi.fn()
    render(<InlineTag tag={MOCK_TAG} onRemoveTag={onRemoveTag} />)

    const $remove = screen.getByRole('button', { name: 'Remove' })
    expect($remove).toBeInTheDocument()

    fireEvent.click($remove)
    expect(onRemoveTag).toHaveBeenCalled()
  })
})
