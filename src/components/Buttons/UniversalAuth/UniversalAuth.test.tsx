import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { fireEvent, render, screen } from '~/common/utils/test'
import { UniversalAuthButton } from '~/components'

describe('<UniversalAuthButton>', () => {
  it('should render an UniversalAuthButton', () => {
    render(<UniversalAuthButton />)

    const $button = screen.getByText('Enter')
    expect($button).toBeDefined()

    fireEvent.click($button)
    const $authDialog = screen.getByTestId(TEST_ID.DIALOG_AUTH)
    expect($authDialog).toBeDefined()
  })
})
