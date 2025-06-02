import mockRouter from 'next-router-mock'
import { describe, expect, it, vi } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { fireEvent, render, screen } from '~/common/utils/test'
import { ArticleDigestDropdown } from '~/components'
import { MOCK_ARTILCE } from '~/stories/mocks'

describe('<ArticleDigest.Dropdown>', () => {
  it('should render an ArticleDigest.Dropdown', () => {
    const handleClickDigest = vi.fn()

    render(
      <ArticleDigestDropdown
        article={MOCK_ARTILCE}
        onClick={handleClickDigest}
      />
    )

    const $digest = screen.getByTestId(TEST_ID.DIGEST_ARTICLE_DROPDOWN)
    expect($digest).toBeInTheDocument()

    const $title = screen.getByRole('heading', { name: MOCK_ARTILCE.title })
    expect($title).toBeInTheDocument()

    const $author = screen.getByText(MOCK_ARTILCE.author.displayName)
    expect($author).toBeInTheDocument()

    fireEvent.click($digest)
    expect(mockRouter.asPath).toContain(MOCK_ARTILCE.shortHash)
    expect(handleClickDigest).toHaveBeenCalled()
  })

  it('should render a disabled ArticleDigest.Dropdown', () => {
    const handleClickDigest = vi.fn()

    render(
      <ArticleDigestDropdown
        article={MOCK_ARTILCE}
        onClick={handleClickDigest}
        disabled
      />
    )

    const $digest = screen.getByTestId(TEST_ID.DIGEST_ARTICLE_DROPDOWN)
    expect($digest).toBeInTheDocument()

    const $title = screen.getByRole('heading', { name: MOCK_ARTILCE.title })
    expect($title).toBeInTheDocument()

    const $author = screen.getByText(MOCK_ARTILCE.author.displayName)
    expect($author).toBeInTheDocument()

    fireEvent.click($digest)
    expect(mockRouter.asPath).not.toContain(MOCK_ARTILCE.shortHash)
    expect(handleClickDigest).not.toHaveBeenCalled()
  })
})
