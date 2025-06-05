import mockRouter from 'next-router-mock'
import { describe, expect, it, vi } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { fireEvent, render, screen } from '~/common/utils/test'
import { MOCK_ARTILCE } from '~/stories/mocks'

import { ArticleDigestCurated } from './'

describe('<ArticleDigest.Curated>', () => {
  it('should render an ArticleDigest.Curated', () => {
    const handleClickDigest = vi.fn()
    const handleClickAuthor = vi.fn()

    render(
      <ArticleDigestCurated
        article={MOCK_ARTILCE}
        onClick={handleClickDigest}
        onClickAuthor={handleClickAuthor}
      />
    )

    const $digest = screen.getByTestId(TEST_ID.DIGEST_ARTICLE_CURATED)
    expect($digest).toBeInTheDocument()

    const $cover = screen.getByTestId(TEST_ID.DIGEST_ARTICLE_FEED_COVER)
    expect($cover).toBeInTheDocument()

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
