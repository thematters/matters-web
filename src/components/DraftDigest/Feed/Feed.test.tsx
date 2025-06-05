import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { fireEvent, render, screen, waitFor } from '~/common/utils/test'
import { DraftDigest } from '~/components'
import { MOCK_DRAFT } from '~/stories/mocks'

describe('<DraftDigest.Feed>', () => {
  it('should render a DraftDigest.Feed', async () => {
    render(<DraftDigest.Feed draft={MOCK_DRAFT} />)

    const $digest = screen.getByTestId(TEST_ID.DIGEST_DRAFT_FEED)
    expect($digest).toBeInTheDocument()

    const $title = screen.getByText(MOCK_DRAFT.title)
    expect($title).toBeInTheDocument()

    const $deleteButton = screen.getByRole('button', { name: 'Delete' })
    expect($deleteButton).toBeInTheDocument()
    fireEvent.click($deleteButton)

    await waitFor(() => {
      expect(
        screen.getByTestId(TEST_ID.DIALOG_DELETE_DRAFT)
      ).toBeInTheDocument()
    })
  })

  it('should render a DraftDigest.Feed with untitled', () => {
    render(<DraftDigest.Feed draft={{ ...MOCK_DRAFT, title: '' }} />)

    const $digest = screen.getByTestId(TEST_ID.DIGEST_DRAFT_FEED)
    expect($digest).toBeInTheDocument()

    const $title = screen.getByText('Untitled')
    expect($title).toBeInTheDocument()
  })
})
