import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { render, screen } from '~/common/utils/test'
import { CopyToClipboard } from '~/components'

// setup function
function setup(ui: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(ui),
  }
}

describe('<CopyToClipboard>', () => {
  it('should render CopyToClipboard', async () => {
    const textToCopy = 'text to copy'
    const { user } = setup(
      <CopyToClipboard text={textToCopy}>
        {({ copyToClipboard }) => (
          <button type="button" onClick={copyToClipboard}>
            Copy
          </button>
        )}
      </CopyToClipboard>
    )

    const $button = screen.getByRole('button', { name: 'Copy' })
    expect($button).toBeInTheDocument()

    await user.click($button)

    // FIXME: not support clipboard in jsdom yet
    const $toast = screen.getByRole('alert')
    expect($toast).toBeInTheDocument()
    expect($toast).toHaveTextContent('Copied successful')
  })
})
