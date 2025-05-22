import { fireEvent } from '@testing-library/react'
import { useRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '~/common/utils/test'

import { useOutsideClick } from './useOutsideClick'

describe('components/Hook/useOutsideClick', () => {
  it('does not call the action when the click is inside the component', () => {
    const action = vi.fn()
    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null)
      useOutsideClick<MouseEvent>(ref as React.RefObject<HTMLElement>, action)
      return <div ref={ref}>Test</div>
    }

    render(<TestComponent />)
    fireEvent.click(screen.getByText('Test'))
    expect(action).not.toHaveBeenCalled()
  })

  it('calls the action when the click is outside the component', () => {
    const action = vi.fn()
    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null)
      useOutsideClick<MouseEvent>(ref as React.RefObject<HTMLElement>, action)
      return <div ref={ref}>Test</div>
    }

    render(<TestComponent />)
    fireEvent.mouseDown(document)
    expect(action).toHaveBeenCalled()
  })
})
