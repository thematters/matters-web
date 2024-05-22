import mockRouter from 'next-router-mock'
import { describe, expect, it } from 'vitest'

import { render, screen } from '~/common/utils/test'
import { MOCK_COMMENT } from '~/stories/mocks'

import CreatedAt from './'

describe('<Comemnt/CreatedAt>', () => {
  it('should render a Comment/CreatedAt', () => {
    render(<CreatedAt comment={MOCK_COMMENT} hasLink />)
    const $time = screen.getByRole('link')
    expect($time).toBeInTheDocument()

    $time.click()
    expect(mockRouter.asPath).toContain(MOCK_COMMENT.id)
  })

  it('should render a Comment/CreatedAt without link', () => {
    render(<CreatedAt comment={MOCK_COMMENT} hasLink={false} />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
