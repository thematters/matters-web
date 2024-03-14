import { describe, expect, it } from 'vitest'

import { fireEvent, render, screen, waitFor } from '~/common/utils/test'
import { Drawer, useDialogSwitch } from '~/components'

type AnyDrawerProps = {
  children: React.ReactNode
  defaultOpen: boolean
  title: string
}

const AnyDrawer = ({ defaultOpen, title, children }: AnyDrawerProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(defaultOpen)

  return (
    <>
      <button type="button" onClick={openDialog}>
        Open
      </button>
      <Drawer isOpen={show} onClose={closeDialog}>
        <Drawer.Header title={title} closeDrawer={closeDialog} />
        {children}
      </Drawer>
    </>
  )
}

describe('<Drawer>', () => {
  it('should render, open and close a Drawer', async () => {
    const title = 'drawer title'

    render(
      <AnyDrawer defaultOpen={false} title={title}>
        <Drawer.Content>
          <section>hello drawer</section>
        </Drawer.Content>
      </AnyDrawer>
    )

    expect(screen.queryByText(title)).not.toBeInTheDocument()

    // open drawer
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByText(title)).toBeInTheDocument()

    // close drawer
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    await waitFor(() => {
      expect(screen.queryByText(title)).not.toBeInTheDocument()
    })
  })
})
