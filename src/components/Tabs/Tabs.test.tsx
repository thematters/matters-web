import { useState } from 'react'
import { describe, expect, it } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { Tabs } from '~/components'

type FeedType = 'alice' | 'bob'
const AnyTabs = () => {
  const [tab, setTab] = useState<FeedType>('alice')

  return (
    <Tabs>
      <Tabs.Tab onClick={() => setTab('alice')} selected={tab === 'alice'}>
        alice
      </Tabs.Tab>

      <Tabs.Tab onClick={() => setTab('bob')} selected={tab === 'bob'}>
        bob
      </Tabs.Tab>
    </Tabs>
  )
}

describe('<Tabs>', () => {
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

  it('should allow to be a link', async () => {
    render(<Tabs.Tab href="/about" />)
    const $link = screen.getByRole('link')
    expect($link).toHaveAttribute('href', '/about')
  })

  it('should allow to show count', async () => {
    render(<Tabs.Tab count={1001} />)
    expect(screen.getByText('1001')).toBeDefined()
  })
})
