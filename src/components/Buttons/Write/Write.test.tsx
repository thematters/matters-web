import mockRouter from 'next-router-mock'
import { describe, expect, it } from 'vitest'

import { ERROR_CODES, ERROR_MESSAGES, PATHS, TEST_ID } from '~/common/enums'
import { render, screen } from '~/common/utils/test'
import { WriteButton } from '~/components'

describe('<WriteButton>', () => {
  it('should navigate to the write page when clicked', () => {
    render(<WriteButton authed forbidden={false} />)

    const button = screen.getByRole('link', { name: 'Create' })
    button.click()

    expect(mockRouter.asPath).toEqual(PATHS.ME_DRAFT_NEW)
  })

  it('should open auth dialog when clicked', () => {
    render(<WriteButton authed={false} forbidden={false} />)

    const button = screen.getByRole('button', { name: 'Create' })
    button.click()

    expect(screen.getByTestId(TEST_ID.DIALOG_AUTH)).toBeInTheDocument()
  })

  it('should show toast when forbidden', () => {
    render(<WriteButton authed forbidden />)

    const button = screen.getByRole('button', { name: 'Create' })
    button.click()

    const $toast = screen.getByRole('alert')
    expect($toast).toBeInTheDocument()
    expect($toast).toHaveTextContent(
      ERROR_MESSAGES[ERROR_CODES.FORBIDDEN_BY_STATE]?.defaultMessage as string
    )
  })
})
