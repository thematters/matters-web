import { describe, expect, it } from 'vitest'

import { render, screen, within } from '~/common/utils/test'
import { Error } from '~/components'

describe('<Error>', () => {
  it('should render Error', async () => {
    render(<Error />)

    const $error = screen.getByRole('alert')
    expect($error).toBeInTheDocument()

    const $message = within($error).getByText(
      'Connection error, please come back later'
    )
    expect($message).toBeInTheDocument()
  })

  it('should render Error with 404 message', async () => {
    render(<Error type="not_found" />)

    const $error = screen.getByRole('alert')
    expect($error).toBeInTheDocument()

    const $message = within($error).getByText(
      "It seems you've come to an unknown space, please go back and retry"
    )
    expect($message).toBeInTheDocument()
  })

  it('should render Error with custom message', async () => {
    const message = 'Custom message'

    render(<Error message={message} />)

    const $error = screen.getByRole('alert')
    expect($error).toBeInTheDocument()

    const $message = within($error).getByText(message)
    expect($message).toBeInTheDocument()
  })
})
