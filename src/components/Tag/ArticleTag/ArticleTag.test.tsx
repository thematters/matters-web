import mockRouter from 'next-router-mock'
import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '~/common/utils/test'
import { ArticleTag } from '~/components'
import { MOCK_TAG } from '~/stories/mocks'

describe('<ArticleTag>', () => {
  it('should render a ArticleTag', () => {
    const handleClick = vi.fn()
    render(<ArticleTag tag={MOCK_TAG} onClick={handleClick} />)

    const $name = screen.getByText(new RegExp(MOCK_TAG.content, 'i'))
    expect($name).toBeInTheDocument()

    const $count = screen.getByText(MOCK_TAG.numArticles)
    expect($count).toBeInTheDocument()

    $name.click()
    expect(mockRouter.asPath).toContain(MOCK_TAG.slug)
    expect(handleClick).toBeCalledTimes(1)
  })
})
