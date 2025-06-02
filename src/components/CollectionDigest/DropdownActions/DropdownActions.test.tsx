import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { fireEvent, render, screen, waitFor } from '~/common/utils/test'
import { MOCK_COLLECTION } from '~/stories/mocks'

import DropdownActions from './'

describe('<CollectionDigest/DropdownActions>', () => {
  it('should render CollectionDigest/DropdownActions', async () => {
    render(<DropdownActions collection={MOCK_COLLECTION} />)

    const $moreButton = screen.getByLabelText('More Actions')
    expect($moreButton).toBeInTheDocument()
    fireEvent.click($moreButton)

    // delete button
    const $deleteButton = screen.getByRole('menuitem', {
      name: 'Delete collection',
    })
    expect($deleteButton).toBeInTheDocument()

    // pin button
    const $pinButton = screen.getByRole('menuitem', { name: 'Pin to profile' })
    expect($pinButton).toBeInTheDocument()

    // edit button
    const $editButton = screen.getByRole('menuitem', {
      name: 'Edit collection',
    })
    expect($editButton).toBeInTheDocument()
    fireEvent.click($editButton)
    const $editDialog = screen.getByTestId(TEST_ID.DIALOG_EDIT_COLLECTION)
    expect($editDialog).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    await waitFor(() => {
      expect(
        screen.queryByRole('button', { name: 'Close' })
      ).not.toBeInTheDocument()
    })
  })

  it('should not render CollectionDigest/DropdownActions if viewer is not collection author', async () => {
    render(
      <DropdownActions
        collection={{
          ...MOCK_COLLECTION,
          author: { ...MOCK_COLLECTION.author, id: 'not-me' },
        }}
      />
    )

    expect(screen.queryByLabelText('More Actions')).not.toBeInTheDocument()
  })
})
