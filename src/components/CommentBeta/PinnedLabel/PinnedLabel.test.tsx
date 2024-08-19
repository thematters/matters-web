import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { render, screen } from '~/common/utils/test'
import { MOCK_COMMENT } from '~/stories/mocks'

import PinnedLabel from './'

describe('<Comemnt/PinnedLabel>', () => {
  it('should render a Comment/PinnedLabel', () => {
    // not pinned
    render(<PinnedLabel comment={{ ...MOCK_COMMENT, pinned: false }} />)
    expect(
      screen.queryByTestId(TEST_ID.COMMENT_PINNED_LABEL)
    ).not.toBeInTheDocument()

    // pinned (article comment)
    render(<PinnedLabel comment={{ ...MOCK_COMMENT, pinned: true }} />)
    const $pinned = screen.getByTestId(TEST_ID.COMMENT_PINNED_LABEL)
    expect($pinned).toBeInTheDocument()
  })
})
