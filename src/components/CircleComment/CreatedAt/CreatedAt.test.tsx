import mockRouter from 'next-router-mock'
import { describe, expect, it } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { MOCK_CIRCLE_COMMENT } from '~/stories/mocks'

import CreatedAt from './'

describe('<Comemnt/CreatedAt>', () => {
  it('should render a CircleComment/CreatedAt', () => {
    render(<CreatedAt comment={MOCK_CIRCLE_COMMENT} hasLink />)
    const $time = screen.getByRole('link')
    expect($time).toBeInTheDocument()

    fireEvent.click($time)
    expect(mockRouter.asPath).toContain(MOCK_CIRCLE_COMMENT.id)
  })

  it('should render a CircleComment/CreatedAt without link', () => {
    render(<CreatedAt comment={MOCK_CIRCLE_COMMENT} hasLink={false} />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
