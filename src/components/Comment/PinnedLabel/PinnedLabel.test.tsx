import { describe, expect, it } from 'vitest'

import { render, screen } from '~/common/utils/test'
import { MOCK_COMMENT } from '~/stories/mocks'

import PinnedLabel from './'

describe('<Comemnt/PinnedLabel>', () => {
  it('should render a Comment/PinnedLabel', () => {
    // not pinned
    render(<PinnedLabel comment={{ ...MOCK_COMMENT, pinned: false }} />)
    expect(screen.queryByText('Pinned')).not.toBeInTheDocument()
    expect(screen.queryByText('Featured')).not.toBeInTheDocument()

    // pinned (article comment)
    render(<PinnedLabel comment={{ ...MOCK_COMMENT, pinned: true }} />)
    expect(screen.getByText('Featured')).toBeInTheDocument()

    // pinned (circle comment)
    render(
      <PinnedLabel
        comment={{
          ...MOCK_COMMENT,
          node: { ...MOCK_COMMENT.node, __typename: 'Circle' },
          pinned: true,
        }}
      />
    )
    expect(screen.getByText('Pinned')).toBeInTheDocument()
  })
})
