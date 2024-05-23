import mockRouter from 'next-router-mock'
import { describe, expect, it, vi } from 'vitest'

import { cleanup, render, screen } from '~/common/utils/test'
import { InlineTag } from '~/components'
import { MOCK_TAG } from '~/stories/mocks'

describe('<InlineTag>', () => {
  it('should render a Tag', () => {
    const handleClick = vi.fn()
    render(<InlineTag tag={MOCK_TAG} onClick={handleClick} />)

    const $name = screen.getByText(new RegExp(MOCK_TAG.content, 'i'))
    expect($name).toBeInTheDocument()

    $name.click()
    expect(mockRouter.asPath).toContain(MOCK_TAG.slug)
    expect(handleClick).toBeCalledTimes(1)

    // render as "span"
    cleanup()
    render(<InlineTag tag={MOCK_TAG} is="span" onClick={handleClick} />)
    const $name2 = screen.getByText(new RegExp(MOCK_TAG.content, 'i'))
    expect($name2).toBeInTheDocument()
    mockRouter.push('/')
    $name2.click()
    expect(mockRouter.asPath).toBe('/')
    expect(handleClick).toBeCalledTimes(2)
  })

  it('should render a InlineTag with remove button', () => {
    const onRemoveTag = vi.fn()
    render(<InlineTag tag={MOCK_TAG} onRemoveTag={onRemoveTag} />)

    const $remove = screen.getByRole('button', { name: 'Remove' })
    expect($remove).toBeInTheDocument()

    $remove.click()
    expect(onRemoveTag).toHaveBeenCalled()
  })
})
