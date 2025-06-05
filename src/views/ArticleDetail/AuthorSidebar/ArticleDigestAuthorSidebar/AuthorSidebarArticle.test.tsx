import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { render, screen } from '~/common/utils/test'
import { MOCK_ARTILCE } from '~/stories/mocks'

import { ArticleDigestAuthorSidebar } from './'

describe('<ArticleDigestAuthorSidebar>', () => {
  it('should render an ArticleDigest.Sidebar', () => {
    render(<ArticleDigestAuthorSidebar article={MOCK_ARTILCE} />)

    const $digest = screen.getByTestId(TEST_ID.DIGEST_ARTICLE_AUTHOR_SIDEBAR)
    expect($digest).toBeInTheDocument()

    const $title = screen.getByRole('heading', { name: MOCK_ARTILCE.title })
    expect($title).toBeInTheDocument()
  })
})
