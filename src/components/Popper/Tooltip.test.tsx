import { describe, expect, it, vi } from 'vitest'

import { act, fireEvent, render, screen } from '~/common/utils/test'
import { Tooltip } from '~/components'

describe('<Tooltip>', () => {
  it('should render a tooltip and show when hover on it', () => {
    const content = 'Hello, world!'

    render(
      <Tooltip content={content}>
        <span>Hover Me</span>
      </Tooltip>
    )

    const $hoverMe = screen.getByText('Hover Me')
    expect($hoverMe).toBeInTheDocument()

    fireEvent.mouseEnter($hoverMe)
    const $tooltip = screen.getByText(content)
    expect($tooltip).toBeInTheDocument()
  })

  it('should render a disabled tooltip', () => {
    const content = 'Hello, world!'

    render(
      <Tooltip content={content} disabled>
        <span>Hover Me</span>
      </Tooltip>
    )

    const $hoverMe = screen.getByText('Hover Me')
    expect($hoverMe).toBeInTheDocument()

    fireEvent.mouseEnter($hoverMe)
    expect(screen.queryByText(content)).not.toBeInTheDocument()
  })

  it('should render a delayed tooltip', () => {
    vi.useFakeTimers()

    const content = 'Hello, world!'
    const delay = 1000

    render(
      <Tooltip content={content} delay={[delay, null]}>
        <span>Hover Me</span>
      </Tooltip>
    )

    const $hoverMe = screen.getByText('Hover Me')
    expect($hoverMe).toBeInTheDocument()

    // content should not be shown before delay
    fireEvent.mouseEnter($hoverMe)
    expect(screen.queryByText(content)).not.toBeInTheDocument()

    // content should be shown after delay
    act(() => {
      vi.advanceTimersByTime(delay)
    })
    const $tooltip = screen.queryByText(content)
    expect($tooltip).toBeInTheDocument()

    vi.runAllTimers()
    vi.useRealTimers()
  })
})
