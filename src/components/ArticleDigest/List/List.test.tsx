import mockRouter from 'next-router-mock'
import { describe, expect, it, vi } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { fireEvent, render, screen } from '~/common/utils/test'
import { ArticleDigestList } from '~/components'
import { MOCK_ARTILCE } from '~/stories/mocks'

describe('<ArticleDigest.List>', () => {
  it('should render an ArticleDigest.List', () => {
    const handleClickDigest = vi.fn()

    render(
      <ArticleDigestList article={MOCK_ARTILCE} onClick={handleClickDigest} />
    )

    const $digest = screen.getByTestId(TEST_ID.DIGEST_ARTICLE_LIST)
    expect($digest).toBeInTheDocument()

    const $title = screen.getByRole('heading', { name: MOCK_ARTILCE.title })
    expect($title).toBeInTheDocument()

    const $author = screen.getByText(MOCK_ARTILCE.author.displayName)
    expect($author).toBeInTheDocument()

    fireEvent.click($digest)
    expect(mockRouter.asPath).toContain(MOCK_ARTILCE.shortHash)
    expect(handleClickDigest).toHaveBeenCalled()
  })
})
