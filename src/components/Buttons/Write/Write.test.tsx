import mockRouter from 'next-router-mock'
import { describe, expect, it } from 'vitest'

import { PATHS, TEST_ID } from '~/common/enums'
import { render, screen } from '~/common/utils/test'
import { WriteButton } from '~/components'

describe('<WriteButton>', () => {
  it('should navigate to the write page when clicked', () => {
    render(<WriteButton allowed authed forbidden={false} />)

    const button = screen.getByRole('link', { name: 'Create' })
    button.click()

    expect(mockRouter.asPath).toEqual(PATHS.ME_DRAFT_NEW)
  })

  it('should open auth dialog when clicked', () => {
    render(<WriteButton allowed authed={false} forbidden={false} />)

    const button = screen.getByRole('button', { name: 'Create' })
    button.click()

    expect(screen.getByTestId(TEST_ID.DIALOG_AUTH)).toBeInTheDocument()
  })

  it('should open LikeCoin dialog when clicked', () => {
    render(<WriteButton allowed={false} authed forbidden={false} />)

    const button = screen.getByRole('button', { name: 'Create' })
    button.click()

    expect(screen.getByTestId(TEST_ID.DIALOG_LIKECOIN)).toBeInTheDocument()
  })
})
