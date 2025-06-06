import mockRouter from 'next-router-mock'
import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { fireEvent, render, screen } from '~/common/utils/test'
import { MOCK_ARTILCE } from '~/stories/mocks'

import { ArticleDigestArchived } from './'

describe('<ArticleDigest.Archived>', () => {
  it('should render an ArticleDigest.Archived', () => {
    render(<ArticleDigestArchived article={MOCK_ARTILCE} />)

    const $digest = screen.getByTestId(TEST_ID.DIGEST_ARTICLE_ARCHIVED)
    expect($digest).toBeInTheDocument()

    const $title = screen.getByRole('heading', { name: MOCK_ARTILCE.title })
    expect($title).toBeInTheDocument()

    fireEvent.click($title)
    expect(mockRouter.asPath).toContain(MOCK_ARTILCE.shortHash)
  })
})
