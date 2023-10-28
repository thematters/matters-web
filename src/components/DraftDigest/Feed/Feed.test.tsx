import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { act, render, screen } from '~/common/utils/test'
import { DraftDigest } from '~/components'
import { MOCK_DRAFT } from '~/stories/mocks'

beforeEach(() => {
  // Tests should run in serial for improved isolation
  // To prevent collision with global state, reset all toasts for each test
  vi.useFakeTimers()
})

afterEach((done) => {
  act(() => {
    vi.runAllTimers()
    vi.useRealTimers()
    // done();
  })
})

const waitTime = (time: number) => {
  act(() => {
    vi.advanceTimersByTime(time)
  })
}

describe('<DraftDigest.Feed>', () => {
  it('should render a DraftDigest.Feed', () => {
    render(<DraftDigest.Feed draft={MOCK_DRAFT} />)

    const $digest = screen.getByTestId(TEST_ID.DIGEST_DRAFT_FEED)
    expect($digest).toBeInTheDocument()

    const $title = screen.getByText(MOCK_DRAFT.title)
    expect($title).toBeInTheDocument()

    const $deleteButton = screen.getByRole('button', { name: 'Delete' })
    expect($deleteButton).toBeInTheDocument()
    $deleteButton.click()
    waitTime(1000)
    expect(screen.getByTestId(TEST_ID.DIALOG_DELETE_DRAFT)).toBeInTheDocument()
  })

  it('should render a DraftDigest.Feed with untitled', () => {
    render(<DraftDigest.Feed draft={{ ...MOCK_DRAFT, title: '' }} />)

    const $digest = screen.getByTestId(TEST_ID.DIGEST_DRAFT_FEED)
    expect($digest).toBeInTheDocument()

    const $title = screen.getByText('Untitled')
    expect($title).toBeInTheDocument()
  })
})
