import { describe, expect, it } from 'vitest'

import { cleanup, render, screen } from '~/common/utils/test'
import { MOCK_COMMENT } from '~/stories/mocks'

import DonatorLabel from './'

describe('<ArticleComemnt/DonatorLabel>', () => {
  it('should render a ArticleComment/DonatorLabel', () => {
    // from article author
    render(
      <DonatorLabel
        comment={{
          ...MOCK_COMMENT,
        }}
      />
    )
    const $author = screen.getByText('Author')
    expect($author).toBeInTheDocument()

    cleanup()
    // not from donator and not from article author
    render(
      <DonatorLabel
        comment={{
          ...MOCK_COMMENT,
          fromDonator: false,
          author: { ...MOCK_COMMENT.author, id: 'matty' },
        }}
      />
    )
    expect(screen.queryByText('Author')).not.toBeInTheDocument()
    expect(screen.queryByText('Supporter')).not.toBeInTheDocument()

    // from donator and not from article author
    render(
      <DonatorLabel
        comment={{
          ...MOCK_COMMENT,
          fromDonator: true,
          author: { ...MOCK_COMMENT.author, id: 'matty' },
        }}
      />
    )
    expect(screen.getByText('Supporter')).toBeInTheDocument()
  })
})
