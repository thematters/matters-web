import { describe, expect, it } from 'vitest'

import { render, screen } from '~/common/utils/test'
import { ErrorBoundary } from '~/components'

const WrongComp = () => {
  throw new Error('Oh no')
}

describe('<ErrorBoundary>', () => {
  it('should render ErrorBoundary with error', async () => {
    render(
      <ErrorBoundary>
        <WrongComp />
      </ErrorBoundary>
    )

    const $error = screen.getByRole('alert')
    expect($error).toBeInTheDocument()
  })

  it('should render ErrorBoundary w/o error', async () => {
    render(
      <ErrorBoundary>
        <span />
      </ErrorBoundary>
    )

    const $error = screen.queryByRole('alert')
    expect($error).not.toBeInTheDocument()
  })
})
