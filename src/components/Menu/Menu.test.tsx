import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { Menu } from '~/components'

describe('<Menu>', () => {
  it('should render menu with items', () => {
    const handleMenuAClick = vi.fn()
    const handleMenuBClick = vi.fn()

    render(
      <Menu>
        <Menu.Item text="Item A" onClick={handleMenuAClick} />
        <Menu.Item text="Item B" onClick={handleMenuBClick} />
      </Menu>
    )

    const $itemA = screen.getByText('Item A')
    expect($itemA).toBeInTheDocument()
    const $itemB = screen.getByText('Item B')
    expect($itemB).toBeInTheDocument()

    fireEvent.click($itemA)
    expect(handleMenuAClick).toHaveBeenCalled()
    fireEvent.click($itemB)
    expect(handleMenuBClick).toHaveBeenCalled()
  })
})
