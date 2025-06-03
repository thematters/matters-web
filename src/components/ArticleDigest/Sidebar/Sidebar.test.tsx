import mockRouter from 'next-router-mock'
import { describe, expect, it, vi } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { fireEvent, render, screen } from '~/common/utils/test'
import { ArticleDigestSidebar } from '~/components'
import { MOCK_ARTILCE } from '~/stories/mocks'

describe('<ArticleDigest.Sidebar>', () => {
  it('should render an ArticleDigest.Sidebar', () => {
    const handleClickDigest = vi.fn()
    const handleClickAuthor = vi.fn()

    render(
      <ArticleDigestSidebar
        article={MOCK_ARTILCE}
        onClick={handleClickDigest}
        onClickAuthor={handleClickAuthor}
      />
    )

    const $digest = screen.getByTestId(TEST_ID.DIGEST_ARTICLE_SIDEBAR)
    expect($digest).toBeInTheDocument()

    const $title = screen.getByRole('heading', { name: MOCK_ARTILCE.title })
    expect($title).toBeInTheDocument()

    const $author = screen.getByText(MOCK_ARTILCE.author.displayName)
    expect($author).toBeInTheDocument()

    fireEvent.click($digest)
    expect(mockRouter.asPath).toContain(MOCK_ARTILCE.shortHash)
    expect(handleClickDigest).toHaveBeenCalled()

    fireEvent.click($author)
    expect(handleClickAuthor).toHaveBeenCalled()
  })
})
