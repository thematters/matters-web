import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { render, screen } from '~/common/utils/test'
import { UniversalAuthButton } from '~/components'

describe('<UniversalAuthButton>', () => {
  it('should render an UniversalAuthButton', () => {
    render(<UniversalAuthButton />)

    const $buttons = screen.getAllByText('Enter')
    const $button = $buttons[0]
    expect($button).toBeDefined()

    $button.click()
    const $authDialog = screen.getByTestId(TEST_ID.DIALOG_AUTH)
    expect($authDialog).toBeDefined()
  })
})
