import mockRouter from 'next-router-mock'
import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { ArticleTag } from '~/components'
import { MOCK_TAG } from '~/stories/mocks'

describe('<ArticleTag>', () => {
  it('should render an ArticleTag', () => {
    const handleClick = vi.fn()
    render(<ArticleTag tag={MOCK_TAG} onClick={handleClick} />)

    const $name = screen.getByText(new RegExp(MOCK_TAG.content, 'i'))
    expect($name).toBeInTheDocument()

    fireEvent.click($name)
    expect(mockRouter.asPath).toContain(MOCK_TAG.slug)
    expect(handleClick).toBeCalledTimes(1)
  })
})
