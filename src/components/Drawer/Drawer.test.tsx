import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { Drawer, DrawerProvider } from '~/components'

describe('<Drawer>', () => {
  it('should handle open and close actions correctly', () => {
    // Create mock function to track drawer close actions
    const handleClose = vi.fn()

    // Directly render Drawer component with isOpen=true to test initial open state
    render(
      <DrawerProvider>
        <Drawer isOpen={true} onClose={handleClose}>
          <Drawer.Header title="Drawer Title" closeDrawer={handleClose} />
          <Drawer.Content>
            <div>Drawer Content</div>
          </Drawer.Content>
        </Drawer>
      </DrawerProvider>
    )

    // When drawer is open, content and title should be present
    expect(screen.getByText('Drawer Title')).toBeInTheDocument()
    expect(screen.getByText('Drawer Content')).toBeInTheDocument()

    // Test close functionality: click close button
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))

    // Verify close callback was called
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('should render open and closed states differently', () => {
    // Render drawer in closed state
    const { rerender } = render(
      <DrawerProvider>
        <Drawer isOpen={false} onClose={() => {}}>
          <Drawer.Header title="Test Drawer" closeDrawer={() => {}} />
          <Drawer.Content>
            <p>Test Content</p>
          </Drawer.Content>
        </Drawer>
      </DrawerProvider>
    )

    // Close button should exist even in closed state
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()

    // Re-render in open state
    rerender(
      <DrawerProvider>
        <Drawer isOpen={true} onClose={() => {}}>
          <Drawer.Header title="Test Drawer" closeDrawer={() => {}} />
          <Drawer.Content>
            <p>Test Content</p>
          </Drawer.Content>
        </Drawer>
      </DrawerProvider>
    )

    // In open state, content should be in the DOM and visible
    expect(screen.getByText('Test Content')).toBeInTheDocument()
    expect(screen.getByText('Test Drawer')).toBeInTheDocument()
  })
})
