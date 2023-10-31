import { describe, expect, it } from 'vitest'

import { render } from '~/common/utils/test'
import { DateTime } from '~/components'

describe('<DateTime>', () => {
  it('should render DateTime', async () => {
    const now = new Date()

    const { container } = render(<DateTime date={now} />)

    /* eslint-disable testing-library/no-container */
    const $date = container.querySelector('time')
    expect($date).toBeInTheDocument()
    expect($date?.getAttribute('datetime')).toBe(now.toISOString())
  })
})
