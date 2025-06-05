import mockRouter from 'next-router-mock'
import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { fireEvent, render, screen } from '~/common/utils/test'
import { ArticleDigestPublished } from '~/components'
import { MOCK_ARTILCE } from '~/stories/mocks'

describe('<ArticleDigest.Published>', () => {
  it('should render an ArticleDigest.Published', () => {
    render(<ArticleDigestPublished article={MOCK_ARTILCE} />)

    const $digest = screen.getByTestId(TEST_ID.DIGEST_ARTICLE_PUBLISHED)
    expect($digest).toBeInTheDocument()

    const readerCount = screen.getByTestId(
      TEST_ID.DIGEST_ARTICLE_PUBLISHED_READER_COUNT
    )
    expect(readerCount).toBeInTheDocument()

    const appreciationsReceivedTotal = screen.getByTestId(
      TEST_ID.DIGEST_ARTICLE_PUBLISHED_APPRECIATIONS_RECEIVED_TOTAL
    )
    expect(appreciationsReceivedTotal).toBeInTheDocument()

    const commentCount = screen.getByTestId(
      TEST_ID.DIGEST_ARTICLE_PUBLISHED_COMMENT_COUNT
    )
    expect(commentCount).toBeInTheDocument()

    const donationCount = screen.getByTestId(
      TEST_ID.DIGEST_ARTICLE_PUBLISHED_DONATION_COUNT
    )
    expect(donationCount).toBeInTheDocument()

    // click title to navigate to article detail page
    const $title = screen.getByRole('heading', { name: MOCK_ARTILCE.title })
    expect($title).toBeInTheDocument()
    fireEvent.click($title)
    expect(mockRouter.asPath).toContain(MOCK_ARTILCE.shortHash)

    mockRouter.back()
  })
})
