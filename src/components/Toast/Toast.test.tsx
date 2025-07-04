import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { act, fireEvent, render, screen } from '~/common/utils/test'
import { toast } from '~/components'

beforeEach(() => {
  // Tests should run in serial for improved isolation
  // To prevent collision with global state, reset all toasts for each test
  vi.useFakeTimers()
})

afterEach(() => {
  act(() => {
    vi.runAllTimers()
    vi.useRealTimers()
  })
})

const waitTime = (time: number) => {
  act(() => {
    vi.advanceTimersByTime(time)
  })
}

describe('<Toast>', () => {
  it('should render a toast message', async () => {
    const message = 'Hello, world!'
    const duration = 1000
    const AnyToast = () => {
      const showToast = () => {
        toast.info({
          message,
          duration,
          hasClose: true,
          actions: [],
        })
      }

      return (
        <button type="button" onClick={showToast}>
          Notify
        </button>
      )
    }

    render(<AnyToast />)

    // show toast
    fireEvent.click(screen.getByRole('button', { name: /Notify/i }))
    const $toast = screen.getByRole('alert')
    expect($toast).toBeInTheDocument()
    expect($toast).toHaveTextContent(message)

    // dismiss toast
    fireEvent.click(screen.getByRole('button', { name: /Close/i }))
    waitTime(duration)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('should render a toast message with actions', async () => {
    const message = 'Hello, world!'
    const handleActionClick = vi.fn()
    const link = 'https://github.com'

    const AnyToast = () => {
      const showToast = () => {
        toast.info({
          message,
          actions: [
            { content: 'Action', onClick: handleActionClick },
            { content: 'Link', htmlHref: link, htmlTarget: '_blank' },
          ],
        })
      }

      return (
        <button type="button" onClick={showToast}>
          Notify
        </button>
      )
    }

    render(<AnyToast />)

    // show toast
    fireEvent.click(screen.getByRole('button', { name: /Notify/i }))
    const $toast = screen.getByRole('alert')
    expect($toast).toBeInTheDocument()
    expect($toast).toHaveTextContent(message)

    // action button
    fireEvent.click(screen.getByRole('button', { name: /Action/i }))
    expect(handleActionClick).toHaveBeenCalled()

    // link button
    const $link = screen.getByRole('link')
    expect($link).toHaveAttribute('href', link)
    expect($link).toHaveAttribute('target', '_blank')
  })
})
