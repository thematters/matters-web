import { describe, expect, it, vi } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { render, screen } from '~/common/utils/test'
import { LoginButton } from '~/components'

describe('<LoginButton>', () => {
  it('should render a LoginButton', () => {
    const handleClick = vi.fn()

    render(<LoginButton onClick={handleClick} />)

    const $button = screen.getByText('Log in')
    expect($button).toBeDefined()

    $button.click()
    expect(handleClick).toHaveBeenCalled()
    const $authDialog = screen.getByTestId(TEST_ID.DIALOG_AUTH)
    expect($authDialog).toBeDefined()
  })
})
