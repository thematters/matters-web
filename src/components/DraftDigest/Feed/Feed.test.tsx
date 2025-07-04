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

    // Click on the more actions button to open the dropdown
    const $moreActionsButton = screen.getByRole('button', {
      name: 'More Actions',
    })
    expect($moreActionsButton).toBeInTheDocument()
    fireEvent.click($moreActionsButton)

    // Find the delete draft menu item and click it
    const $deleteMenuItem = screen.getByText('Delete draft')
    expect($deleteMenuItem).toBeInTheDocument()
    fireEvent.click($deleteMenuItem)

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

  it('should render a scheduled draft with cancel schedule button', () => {
    const scheduledDraft = {
      ...MOCK_DRAFT,
      publishAt: '2024-12-25T10:00:00.000Z',
    }

    render(<DraftDigest.Feed draft={scheduledDraft} />)

    const $digest = screen.getByTestId(TEST_ID.DIGEST_DRAFT_FEED)
    expect($digest).toBeInTheDocument()

    // For scheduled drafts, the title should not be clickable
    const $title = screen.getByText(MOCK_DRAFT.title)
    expect($title).toBeInTheDocument()

    // Should show scheduled time instead of updated time
    expect(screen.getByText(/Scheduled for/)).toBeInTheDocument()

    // Should have cancel schedule button instead of dropdown actions
    const $cancelButton = screen.getByRole('button', {
      name: 'Cancel schedule',
    })
    expect($cancelButton).toBeInTheDocument()
  })
})
