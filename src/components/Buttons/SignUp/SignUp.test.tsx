import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { fireEvent, render, screen } from '~/common/utils/test'
import { SignUpButton } from '~/components'

describe('<SignUpButton>', () => {
  it('should render a SignUpButton', () => {
    render(<SignUpButton />)

    const button = screen.getByText('Register')
    expect(button).toBeDefined()

    fireEvent.click(button)
    const $authDialog = screen.getByTestId(TEST_ID.DIALOG_AUTH)
    expect($authDialog).toBeDefined()
  })

  it('should render a SignUpButton with custom children', () => {
    render(<SignUpButton isPlain>Click Me to Register</SignUpButton>)

    const $button = screen.getByText('Click Me to Register')
    expect($button).toBeDefined()

    fireEvent.click($button)
    const $authDialog = screen.getByTestId(TEST_ID.DIALOG_AUTH)
    expect($authDialog).toBeDefined()
  })
})
