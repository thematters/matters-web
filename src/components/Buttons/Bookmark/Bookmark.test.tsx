import { describe, expect, it } from 'vitest'

import { render, screen } from '~/common/utils/test'
import { BookmarkButton } from '~/components'
import { MOCK_ARTILCE } from '~/stories/mocks'

describe('<BookmarkButton>', () => {
  it('should render a bookmark button', () => {
    render(<BookmarkButton article={{ ...MOCK_ARTILCE, subscribed: false }} />)
    const $button = screen.getByRole('button', { name: 'Bookmark' })
    expect($button).toBeInTheDocument()
  })

  it('should render a remove bookmark button', () => {
    render(<BookmarkButton article={{ ...MOCK_ARTILCE, subscribed: true }} />)
    const $button = screen.getByRole('button', { name: 'Remove bookmark' })
    expect($button).toBeInTheDocument()
  })
})
