import mockRouter from 'next-router-mock'
import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { ArticleDigestTitle } from '~/components'
import { UserState } from '~/gql/graphql'
import { MOCK_ARTILCE } from '~/stories/mocks'

describe('<ArticleDigest.Title>', () => {
  it('should render an ArticleDigest.Title', () => {
    const handleClickDigest = vi.fn()

    render(
      <ArticleDigestTitle article={MOCK_ARTILCE} onClick={handleClickDigest} />
    )

    const $title = screen.getByRole('heading', {
      name: MOCK_ARTILCE.title,
    })
    expect($title).toBeInTheDocument()

    fireEvent.click($title)
    expect(mockRouter.asPath).toContain(MOCK_ARTILCE.shortHash)
    expect(handleClickDigest).toHaveBeenCalled()
  })

  it('should render an ArticleDigest.Title with custom tag', () => {
    // h2
    render(<ArticleDigestTitle article={MOCK_ARTILCE} is="h2" />)
    const $title = screen.getByRole('heading', {
      level: 2,
      name: MOCK_ARTILCE.title,
    })
    expect($title).toBeInTheDocument()

    // h3
    render(<ArticleDigestTitle article={MOCK_ARTILCE} is="h3" />)
    const $title3 = screen.getByRole('heading', {
      level: 3,
      name: MOCK_ARTILCE.title,
    })
    expect($title3).toBeInTheDocument()
  })

  it('should render an ArticleDigest.Title with disabled', () => {
    const handleClickDigest = vi.fn()

    render(
      <ArticleDigestTitle
        article={MOCK_ARTILCE}
        disabled
        onClick={handleClickDigest}
      />
    )
    const $title = screen.getByRole('heading', {
      name: MOCK_ARTILCE.title,
    })

    fireEvent.click($title)
    expect(mockRouter.asPath).not.toContain(MOCK_ARTILCE.shortHash)
    expect(handleClickDigest).not.toHaveBeenCalled()
  })

  it('should not link to articles by frozen authors', () => {
    mockRouter.setCurrentUrl('/')
    const handleClickDigest = vi.fn()
    const article = {
      ...MOCK_ARTILCE,
      author: {
        ...MOCK_ARTILCE.author,
        status: {
          ...MOCK_ARTILCE.author.status,
          state: UserState.Frozen,
        },
      },
    }

    render(<ArticleDigestTitle article={article} onClick={handleClickDigest} />)
    const $title = screen.getByRole('heading', {
      name: MOCK_ARTILCE.title,
    })

    fireEvent.click($title)
    expect(mockRouter.asPath).not.toContain(MOCK_ARTILCE.shortHash)
    expect(handleClickDigest).not.toHaveBeenCalled()
  })

  it('should render an ArticleDigest.Title with custom utm params', () => {
    render(<ArticleDigestTitle article={MOCK_ARTILCE} />)

    const $title = screen.getByRole('heading', {
      name: MOCK_ARTILCE.title,
    })
    expect($title).toBeInTheDocument()
  })
})
