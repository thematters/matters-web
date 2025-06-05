import { useState } from 'react'
import { describe, expect, it } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { SegmentedTabs } from '~/components'

type FeedType = 'alice' | 'bob'
const AnyTabs = () => {
  const [tab, setTab] = useState<FeedType>('alice')

  return (
    <SegmentedTabs>
      <SegmentedTabs.Tab
        onClick={() => setTab('alice')}
        selected={tab === 'alice'}
      >
        alice
      </SegmentedTabs.Tab>

      <SegmentedTabs.Tab onClick={() => setTab('bob')} selected={tab === 'bob'}>
        bob
      </SegmentedTabs.Tab>
    </SegmentedTabs>
  )
}

describe('<SegmentedTabs>', () => {
  it('should allow to select a tab', async () => {
    render(<AnyTabs />)

    const $tabs = screen.getAllByRole('tab')
    const $firstTab = $tabs[0]
    const $secondTab = $tabs[1]

    // initial selected tab
    expect(screen.getByRole('tab', { selected: true }).innerText).toBe(
      $firstTab.innerText
    )

    // switch to second tab
    fireEvent.click($secondTab)
    expect(screen.getByRole('tab', { selected: true }).innerText).toBe(
      $secondTab.innerText
    )

    // switch to first tab
    fireEvent.click($firstTab)
    expect(screen.getByRole('tab', { selected: true }).innerText).toBe(
      $firstTab.innerText
    )
  })

  it('should allow to be disabled', async () => {
    render(
      <SegmentedTabs>
        <SegmentedTabs.Tab disabled selected>
          alice
        </SegmentedTabs.Tab>
        <SegmentedTabs.Tab disabled>bob</SegmentedTabs.Tab>
      </SegmentedTabs>
    )

    const $tabs = screen.getAllByRole('tab')
    const $firstTab = $tabs[0]
    const $secondTab = $tabs[1]

    // initial selected tab
    expect(screen.getByRole('tab', { selected: true }).innerText).toBe(
      $firstTab.innerText
    )

    // switch to second tab
    fireEvent.click($secondTab)
    expect(screen.getByRole('tab', { selected: true }).innerText).toBe(
      $firstTab.innerText
    )
  })

  it('should allow to have a side', async () => {
    render(
      <SegmentedTabs side={<div>side</div>}>
        <SegmentedTabs.Tab selected>alice</SegmentedTabs.Tab>
        <SegmentedTabs.Tab>bob</SegmentedTabs.Tab>
      </SegmentedTabs>
    )

    expect(screen.getByText('side')).toBeInTheDocument()
  })
})
