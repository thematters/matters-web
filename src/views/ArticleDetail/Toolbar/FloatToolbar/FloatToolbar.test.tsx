import { afterEach, describe, expect, it, vi } from 'vitest'

import { render, screen } from '~/common/utils/test'
import { ArticleDetailPublicQuery } from '~/gql/graphql'

import FloatToolbar from '.'

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
    <FloatToolbar
      show
      articleDetails={article}
      privateFetched={false}
      lock={false}
      toggleCommentDrawer={vi.fn()}
      toggleDonationDrawer={vi.fn()}
    />
  )

describe('<FloatToolbar>', () => {
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
