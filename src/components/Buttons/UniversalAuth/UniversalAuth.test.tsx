import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { UNIVERSAL_AUTH_TRIGGER } from '~/common/enums'
import { fireEvent, render, screen } from '~/common/utils/test'
import { UniversalAuthButton } from '~/components'

// Create a mock properly with vi.hoisted to avoid hoisting issues
const mockTrackEvent = vi.hoisted(() => vi.fn())

// Mock ~/common/utils
vi.mock('~/common/utils', async () => {
  const actual = await vi.importActual('~/common/utils')
  return {
    ...(actual as any),
    analytics: {
      ...((actual as any).analytics || {}),
      trackEvent: mockTrackEvent,
    },
  }
})

describe('UniversalAuthButton', () => {
  // Mock window.dispatchEvent
  let originalDispatchEvent: typeof window.dispatchEvent

  beforeEach(() => {
    // Store original and create mock
    originalDispatchEvent = window.dispatchEvent
    window.dispatchEvent = vi.fn()

    // Reset mocks
    vi.clearAllMocks()
  })

  afterEach(() => {
    // Restore original
    window.dispatchEvent = originalDispatchEvent
  })

  describe('Rendering', () => {
    it('should render buttons with "Enter" text', () => {
      render(<UniversalAuthButton />)

      // Check both mobile and desktop buttons
      const buttons = screen.getAllByText('Enter')
      expect(buttons.length).toBe(2)
      expect(buttons[0]).toBeInTheDocument()
      expect(buttons[1]).toBeInTheDocument()
    })
  })

  describe('Trigger Context', () => {
    it('should include nav trigger when resideIn is "nav"', () => {
      render(<UniversalAuthButton resideIn="nav" />)

      // Click the button
      const buttons = screen.getAllByText('Enter')
      fireEvent.click(buttons[0])

      // Verify correct trigger is included
      expect(window.dispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: {
            trigger: UNIVERSAL_AUTH_TRIGGER.nav,
          },
        })
      )
    })

    it('should include sideNav trigger when resideIn is "sideNav"', () => {
      render(<UniversalAuthButton resideIn="sideNav" />)

      // Click the button
      const buttons = screen.getAllByText('Enter')
      fireEvent.click(buttons[0])

      // Verify correct trigger is included
      expect(window.dispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: {
            trigger: UNIVERSAL_AUTH_TRIGGER.sideNav,
          },
        })
      )
    })
  })
})
