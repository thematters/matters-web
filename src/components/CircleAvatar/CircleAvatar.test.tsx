import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { render, screen } from '~/common/utils/test'
import { CircleAvatar } from '~/components'
import { MOCK_CIRCLE } from '~/stories/mocks'

describe('<CircleAvatar>', () => {
  it('should render a CicleAvatar', async () => {
    render(<CircleAvatar circle={MOCK_CIRCLE} />)
    const $avatar = screen.getByTestId(TEST_ID.CIRCLE_AVATAR)
    expect($avatar).toBeDefined()
  })
})
