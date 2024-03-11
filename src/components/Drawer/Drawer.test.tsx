import { describe, expect, it } from 'vitest'

import { fireEvent, render, screen, waitFor } from '~/common/utils/test'
import { Drawer, useDialogSwitch } from '~/components'

type AnyDrawerProps = {
  children: React.ReactNode
  defaultOpen: boolean
}

const AnyDrawer = ({ defaultOpen, children }: AnyDrawerProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(defaultOpen)

  return (
    <>
      <button type="button" onClick={openDialog}>
        Open
      </button>
      <Drawer isOpen={show} onClose={closeDialog}>
        {children}
      </Drawer>
    </>
  )
}

describe('<Drawer>', () => {
  it('should render, open and close a Drawer', async () => {
    render(
      <AnyDrawer defaultOpen={false}>
        <Drawer.Header title="drawer title" />
        <Drawer.Content>
          <section>hello drawer</section>
        </Drawer.Content>
      </AnyDrawer>
    )

    expect(screen.queryByText('drawer title')).not.toBeInTheDocument()

    // open drawer
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByText('drawer title')).toBeInTheDocument()

    // close drawer
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    await waitFor(() => {
      expect(screen.queryByText('drawer title')).not.toBeInTheDocument()
    })
  })
})
