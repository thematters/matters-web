import { describe, expect, it } from 'vitest'

import { cleanup, render, screen } from '~/common/utils/test'
import { PlainTag } from '~/components'
import { MOCK_TAG } from '~/stories/mocks'

describe('<PlainTag>', () => {
  it('should render a PlainTag without count', () => {
    // not "list" type
    cleanup()
    render(<PlainTag tag={MOCK_TAG} />)
    expect(screen.queryByText(MOCK_TAG.numArticles)).not.toBeInTheDocument()
  })
})
