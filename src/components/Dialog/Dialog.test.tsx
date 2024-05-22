import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen, waitFor } from '~/common/utils/test'
import { Dialog, useDialogSwitch } from '~/components'

const AnyDialog = ({
  defaultShow,
  onClickConfirm,
  dismissOnClickOutside,
}: {
  defaultShow: boolean
  onClickConfirm: () => void
  dismissOnClickOutside?: boolean
}) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(defaultShow)

  return (
    <>
      <button type="button" onClick={openDialog}>
        Open
      </button>

      <Dialog
        isOpen={show}
        onDismiss={closeDialog}
        dismissOnClickOutside={dismissOnClickOutside}
      >
        <Dialog.Header title={<span>Header</span>} closeDialog={closeDialog} />
        <Dialog.Content>Content</Dialog.Content>
        <Dialog.Footer
          smUpBtns={
            <Dialog.RoundedButton
              text={<span>Confirm</span>}
              onClick={onClickConfirm}
            />
          }
        />
      </Dialog>
    </>
  )
}

describe('<Dialog>', () => {
  it('should render, open and close a dialog', async () => {
    const onClickConfirm = vi.fn()

    render(<AnyDialog defaultShow={false} onClickConfirm={onClickConfirm} />)

    expect(screen.queryByText('Header')).not.toBeInTheDocument()
    expect(screen.queryByText('Content')).not.toBeInTheDocument()

    // open dialog
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getAllByText('Header')[0]).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()

    // click confirm
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }))
    expect(onClickConfirm).toHaveBeenCalledTimes(1)

    // close dialog
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    await waitFor(() => {
      expect(screen.queryByText('Content')).not.toBeInTheDocument()
    })
  })

  it('should render a dialog and close when click outside', async () => {
    render(
      <AnyDialog
        defaultShow={true}
        onClickConfirm={vi.fn()}
        dismissOnClickOutside={true}
      />
    )

    expect(screen.getAllByText('Header')).toHaveLength(2)
    expect(screen.getByText('Content')).toBeInTheDocument()

    // click outside
    fireEvent.mouseDown(document.body)
    await waitFor(() => {
      expect(screen.queryByText('Content')).not.toBeInTheDocument()
    })
  })

  // FIXME: ESC still not working
  // it('should render a dialog and close when hit ESC', async () => {
  //   const { container } = render(
  //     <AnyDialog
  //       defaultShow={true}
  //       onClickConfirm={vi.fn()}
  //       dismissOnClickOutside={true}
  //     />
  //   )

  //   expect(screen.getAllByText('Header')).toHaveLength(2)
  //   expect(screen.getByText('Content')).toBeInTheDocument()

  //   // hit ESC
  //   fireEvent.keyDown(container, { key: 'Escape' })
  //   await waitFor(() => {
  //     expect(screen.queryByText('Content')).not.toBeInTheDocument()
  //   })
  // })
})
