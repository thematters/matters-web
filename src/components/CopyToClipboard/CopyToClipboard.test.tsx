import { describe, expect, it } from 'vitest'

import { render, screen } from '~/common/utils/test'
import { CopyToClipboard } from '~/components'

describe('<CopyToClipboard>', () => {
  it('should render CopyToClipboard', async () => {
    const textToCopy = 'text to copy'
    render(
      <CopyToClipboard text={textToCopy}>
        <button type="button">Copy</button>
      </CopyToClipboard>
    )

    const $button = screen.getByRole('button', { name: 'Copy' })
    expect($button).toBeInTheDocument()

    $button.click()

    // FIXME: not support clipboard in jsdom yet
    const $toast = screen.getByRole('alert')
    expect($toast).toBeInTheDocument()
    expect($toast).toHaveTextContent('Failed to copy, please try again.')
  })
})
