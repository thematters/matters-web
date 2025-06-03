import mockRouter from 'next-router-mock'
import { describe, expect, it, vi } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { fireEvent, render, screen } from '~/common/utils/test'
import { ArticleDigestFeed } from '~/components'
import { ArticleState } from '~/gql/graphql'
import { MOCK_ARTILCE } from '~/stories/mocks'

describe('<ArticleDigest.Feed>', () => {
  it('should render an ArticleDigest.Feed', () => {
    const handleClickDigest = vi.fn()

    render(
      <ArticleDigestFeed article={MOCK_ARTILCE} onClick={handleClickDigest} />
    )

    const $digest = screen.getByTestId(TEST_ID.DIGEST_ARTICLE_FEED)
    expect($digest).toBeInTheDocument()

    const $author = screen.getByText(MOCK_ARTILCE.author.displayName)
    expect($author).toBeInTheDocument()

    // click title to navigate to article detail page
    const $title = screen.getByRole('heading', { name: MOCK_ARTILCE.title })
    expect($title).toBeInTheDocument()
    fireEvent.click($title)
    expect(mockRouter.asPath).toContain(MOCK_ARTILCE.shortHash)
    expect(handleClickDigest).toBeCalledTimes(1)

    mockRouter.back()

    // click summary to navigate to article detail page
    const $summary = screen.getByText(MOCK_ARTILCE.summary)
    expect($summary).toBeInTheDocument()
    fireEvent.click($summary)
    expect(mockRouter.asPath).toContain(MOCK_ARTILCE.shortHash)
    expect(handleClickDigest).toBeCalledTimes(2)

    mockRouter.back()

    // click cover to navigate to article detail page
    const $cover = screen.getByTestId(TEST_ID.DIGEST_ARTICLE_FEED_COVER)
    expect($cover).toBeInTheDocument()
    fireEvent.click($cover)
    expect(handleClickDigest).toBeCalledTimes(3)
  })

  it('should render an ArticleDigest.Feed without author', () => {
    render(<ArticleDigestFeed article={MOCK_ARTILCE} hasAuthor={false} />)

    const $author = screen.queryByText(MOCK_ARTILCE.author.displayName)
    expect($author).not.toBeInTheDocument()
  })

  it('should render an ArticleDigest.Feed without header', () => {
    render(<ArticleDigestFeed article={MOCK_ARTILCE} hasHeader={false} />)

    const $author = screen.queryByText(MOCK_ARTILCE.author.displayName)
    expect($author).not.toBeInTheDocument()
  })

  it('should render an ArticleDigest.Feed without cover', () => {
    render(
      <ArticleDigestFeed
        article={{ ...MOCK_ARTILCE, articleState: ArticleState.Banned }}
      />
    )

    const $cover = screen.queryByTestId(TEST_ID.DIGEST_ARTICLE_FEED_COVER)
    expect($cover).not.toBeInTheDocument()
  })
})
