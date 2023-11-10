import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { render, screen } from '~/common/utils/test'
import { UniversalAuthButton } from '~/components'

describe('<UniversalAuthButton>', () => {
  it('should render an UniversalAuthButton', () => {
    render(<UniversalAuthButton />)

    const $button = screen.getByText('Enter')
    expect($button).toBeDefined()

    $button.click()
    const $authDialog = screen.getByTestId(TEST_ID.DIALOG_AUTH)
    expect($authDialog).toBeDefined()
  })
})
