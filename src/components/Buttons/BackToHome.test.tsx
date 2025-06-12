import mockRouter from 'next-router-mock'
import { describe, expect, it } from 'vitest'

import { PATHS } from '~/common/enums'
import { fireEvent, render, screen } from '~/common/utils/test'
import { BackToHomeButton } from '~/components'

describe('<BackToHomeButton>', () => {
  it('should navigate to the homepage when clicked', () => {
    render(<BackToHomeButton />)

    const button = screen.getByText('Back to discovery')
    fireEvent.click(button)

    expect(mockRouter.asPath).toEqual(PATHS.HOME)
  })
})
