import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '~/common/utils/test'
import { TitleTag } from '~/components'
import { MOCK_TAG } from '~/stories/mocks'

describe('<TitleTag>', () => {
  it('should render a TitleTag with remove button', () => {
    const onRemoveTag = vi.fn()
    render(<TitleTag tag={MOCK_TAG} onRemoveTag={onRemoveTag} />)

    const $remove = screen.getByRole('button', { name: 'Remove' })
    expect($remove).toBeInTheDocument()

    $remove.click()
    expect(onRemoveTag).toHaveBeenCalled()
  })
})
