import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { Dropdown, hidePopperOnClick } from '~/components'

describe('<Dropdown>', () => {
  it('should render a dropdown and hide when click outside', () => {
    const handleClick = vi.fn()

    render(
      <Dropdown
        content={
          <button type="button" onClick={handleClick}>
            Opened
          </button>
        }
      >
        {({ openDropdown, ref }) => (
          <button onClick={openDropdown} ref={ref}>
            Open
          </button>
        )}
      </Dropdown>
    )

    // show dropdown
    const $openBtn = screen.getByRole('button', { name: 'Open' })
    fireEvent.click($openBtn)
    const $openedBtn = screen.getByRole('button', { name: 'Opened' })
    expect($openedBtn).toBeInTheDocument()

    // click dropdown content
    fireEvent.click($openedBtn)
    expect(handleClick).toHaveBeenCalled()

    // click outside to hide dropdown
    fireEvent.click(document.body)
    expect(
      screen.queryByRole('button', { name: 'Opened' })
    ).not.toBeInTheDocument()
  })

  it('should render a dropdown and hide when click the content', () => {
    const handleClick = vi.fn()

    render(
      <Dropdown
        content={
          <button type="button" onClick={handleClick}>
            Opened
          </button>
        }
        onShown={hidePopperOnClick}
      >
        {({ openDropdown, ref }) => (
          <button onClick={openDropdown} ref={ref}>
            Open
          </button>
        )}
      </Dropdown>
    )

    // open dropdown
    const $openBtn = screen.getByRole('button', { name: 'Open' })
    fireEvent.click($openBtn)
    const $openedBtn = screen.getByRole('button', { name: 'Opened' })
    expect($openedBtn).toBeInTheDocument()

    // click content and hide dropdown
    fireEvent.click($openedBtn)
    expect(handleClick).toHaveBeenCalled()
    expect(
      screen.queryByRole('button', { name: 'Opened' })
    ).not.toBeInTheDocument()
  })
})
