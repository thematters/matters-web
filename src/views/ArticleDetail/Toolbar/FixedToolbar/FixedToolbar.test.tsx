import { afterEach, describe, expect, it, vi } from 'vitest'

import { render, screen } from '~/common/utils/test'
import { ArticleDetailPublicQuery } from '~/gql/graphql'

import FixedToolbar from '.'

const { mockFeatures } = vi.hoisted(() => ({
  mockFeatures: { payment: true },
}))

vi.mock('~/components/Hook/useFeatures', () => ({
  useFeatures: () => mockFeatures,
}))

vi.mock('../../AppreciationButton', () => ({
  default: () => <span data-test-id="appreciation-button" />,
}))

vi.mock('../Button/CommentButton', () => ({
  default: () => <span data-test-id="comment-button" />,
}))

vi.mock('../Button/DonationButton', () => ({
  default: () => <span data-test-id="donation-button" />,
}))

vi.mock('~/components/ArticleDigest/DropdownActions', async (importActual) => {
  const actual =
    await importActual<
      typeof import('~/components/ArticleDigest/DropdownActions')
    >()
  return {
    ...actual,
    default: Object.assign(() => null, { fragments: actual.default.fragments }),
  }
})

const article = {
  id: 'article-id',
  slug: 'slug',
  shortHash: 'hash',
  canComment: true,
  commentCount: 0,
  title: 'Title',
  author: { id: 'author-id', userName: 'author', displayName: 'Author' },
} as unknown as NonNullable<ArticleDetailPublicQuery['article']>

const renderToolbar = () =>
  render(
    <FixedToolbar
      articleDetails={article}
      translated={false}
      privateFetched={false}
      lock={false}
      showCommentToolbar={false}
    />
  )

describe('<FixedToolbar>', () => {
  afterEach(() => {
    mockFeatures.payment = true
  })

  it('should render donation button when payment is enabled', () => {
    renderToolbar()
    expect(screen.getByTestId('donation-button')).toBeInTheDocument()
  })

  it('should hide donation button when payment is disabled', () => {
    mockFeatures.payment = false
    renderToolbar()
    expect(screen.queryByTestId('donation-button')).not.toBeInTheDocument()
    expect(screen.getByTestId('appreciation-button')).toBeInTheDocument()
  })
})
