import mockRouter from 'next-router-mock'
import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { fireEvent, render, screen } from '~/common/utils/test'
import { ArticleDigestNotice } from '~/components'
import { MOCK_ARTILCE } from '~/stories/mocks'

describe('<ArticleDigest.Notice>', () => {
  it('should render an ArticleDigest.Notice', () => {
    render(<ArticleDigestNotice article={MOCK_ARTILCE} />)

    const $digest = screen.getByTestId(TEST_ID.DIGEST_ARTICLE_NOTICE)
    expect($digest).toBeInTheDocument()

    const $title = screen.getByRole('heading', { name: MOCK_ARTILCE.title })
    expect($title).toBeInTheDocument()

    const $summary = screen.getByText(MOCK_ARTILCE.summary)
    expect($summary).toBeInTheDocument()

    fireEvent.click($digest)
    expect(mockRouter.asPath).toContain(MOCK_ARTILCE.shortHash)
  })
})
