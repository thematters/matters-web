import mockRouter from 'next-router-mock'
import { describe, expect, it, vi } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { fireEvent, render, screen } from '~/common/utils/test'
import { ArticleDigestList } from '~/components'
import { UserState } from '~/gql/graphql'
import { MOCK_ARTILCE } from '~/stories/mocks'

const MOCK_FROZEN_AUTHOR_ARTICLE = {
  ...MOCK_ARTILCE,
  author: {
    ...MOCK_ARTILCE.author,
    status: {
      ...MOCK_ARTILCE.author.status,
      state: UserState.Frozen,
    },
  },
}

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

  it('should not link to articles by frozen authors', () => {
    mockRouter.setCurrentUrl('/')
    const handleClickDigest = vi.fn()

    render(
      <ArticleDigestList
        article={MOCK_FROZEN_AUTHOR_ARTICLE}
        onClick={handleClickDigest}
      />
    )

    const $digest = screen.getByTestId(TEST_ID.DIGEST_ARTICLE_LIST)
    fireEvent.click($digest)

    expect(mockRouter.asPath).not.toContain(MOCK_ARTILCE.shortHash)
    expect(handleClickDigest).not.toHaveBeenCalled()
  })
})
