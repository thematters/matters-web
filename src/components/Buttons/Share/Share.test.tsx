import { describe, expect, it } from 'vitest'

import { PATHS, TEST_ID } from '~/common/enums'
import { render, screen } from '~/common/utils/test'
import { ShareButton } from '~/components'

describe('<ShareButton>', () => {
  it('should render the share button', () => {
    render(
      <ShareButton path={PATHS.HOME} inCard>
        Share
      </ShareButton>
    )

    const $button = screen.getByRole('button', { name: 'Share' })
    expect($button).toBeInTheDocument()

    $button.click()

    expect(screen.getByTestId(TEST_ID.DIALOG_SHARE)).toBeInTheDocument()
  })
})
