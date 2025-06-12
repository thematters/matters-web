import { describe, expect, it } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { MOCK_MOMENT } from '~/stories/mocks'

import DropdownActions from '.'

describe('src/components/MomentDigest/DropdownActions/DropdownActions.test.tsx', () => {
  it('should render delete button', async () => {
    render(<DropdownActions moment={MOCK_MOMENT} />)

    // open menu and check if delete button is rendered
    const $button = screen.getByLabelText('More Actions')
    expect($button).toBeInTheDocument()
    fireEvent.click($button)
    const $deleteButton = screen.getByRole('menuitem', {
      name: 'Delete',
    })
    expect($deleteButton).toBeInTheDocument()
  })
})
