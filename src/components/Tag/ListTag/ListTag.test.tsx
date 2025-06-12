import mockRouter from 'next-router-mock'
import { describe, expect, it, vi } from 'vitest'

import { cleanup, fireEvent, render, screen } from '~/common/utils/test'
import { ListTag } from '~/components'
import { MOCK_TAG } from '~/stories/mocks'

describe('<ListTag>', () => {
  it('should render a ListTag', () => {
    const handleClick = vi.fn()
    render(<ListTag tag={MOCK_TAG} onClick={handleClick} />)

    const $name = screen.getByText(new RegExp(MOCK_TAG.content, 'i'))
    expect($name).toBeInTheDocument()

    const $count = screen.getByText(MOCK_TAG.numArticles)
    expect($count).toBeInTheDocument()

    fireEvent.click($name)
    expect(mockRouter.asPath).toContain(MOCK_TAG.slug)
    expect(handleClick).toBeCalledTimes(1)

    // render as "span"
    cleanup()
    render(<ListTag tag={MOCK_TAG} is="span" onClick={handleClick} />)
    const $name2 = screen.getByText(new RegExp(MOCK_TAG.content, 'i'))
    expect($name2).toBeInTheDocument()
    mockRouter.push('/')
    fireEvent.click($name2)
    expect(mockRouter.asPath).toBe('/')
    expect(handleClick).toBeCalledTimes(2)
  })
})
