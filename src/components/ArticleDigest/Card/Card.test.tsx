import mockRouter from 'next-router-mock'
import { describe, expect, it, vi } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { render, screen } from '~/common/utils/test'
import { ArticleDigestCard } from '~/components'
import { MOCK_ARTILCE } from '~/stories/mocks'

describe('<ArticleDigest.Card>', () => {
  it('should render an ArticleDigest.Card', () => {
    const handleClickDigest = vi.fn()
    const handleClickAuthor = vi.fn()

    render(
      <ArticleDigestCard
        article={MOCK_ARTILCE}
        onClick={handleClickDigest}
        onClickAuthor={handleClickAuthor}
      />
    )

    const $digest = screen.getByTestId(TEST_ID.DIGEST_ARTICLE_CARD)
    expect($digest).toBeInTheDocument()

    const $title = screen.getByRole('heading', { name: MOCK_ARTILCE.title })
    expect($title).toBeInTheDocument()

    const $author = screen.getByText(MOCK_ARTILCE.author.displayName)
    expect($author).toBeInTheDocument()

    $digest.click()
    expect(mockRouter.asPath).toContain(MOCK_ARTILCE.shortHash)
    expect(handleClickDigest).toHaveBeenCalled()

    $author.click()
    expect(handleClickAuthor).toHaveBeenCalled()
  })
})
