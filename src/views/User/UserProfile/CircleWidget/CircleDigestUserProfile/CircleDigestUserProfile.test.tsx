import mockRouter from 'next-router-mock'
import { describe, expect, it } from 'vitest'

import { fireEvent, render, screen } from '~/common/utils/test'
import { MOCK_CIRCLE } from '~/stories/mocks'

import CircleDigestUserProfile from './'

describe('<CircleDigest.UserProfile>', () => {
  it('should render a CircleDigest.UserProfile', async () => {
    render(
      <CircleDigestUserProfile circle={MOCK_CIRCLE} hasDescription hasFooter />
    )

    const $displayName = screen.getByRole('link', {
      name: MOCK_CIRCLE.displayName,
    })
    expect($displayName).toBeInTheDocument()
    fireEvent.click($displayName)
    expect(mockRouter.asPath).toContain(MOCK_CIRCLE.name)

    const $description = screen.getByText(MOCK_CIRCLE.description)
    expect($description).toBeInTheDocument()

    const $footer = screen.getByRole('link', {
      name: 'Enter Circle',
    })
    expect($footer).toBeInTheDocument()
    mockRouter.push('/')
    fireEvent.click($footer)
    expect(mockRouter.asPath).toContain(MOCK_CIRCLE.name)
  })

  it('should render a CircleDigest.UserProfile without description and footer', async () => {
    render(
      <CircleDigestUserProfile
        circle={MOCK_CIRCLE}
        hasDescription={false}
        hasFooter={false}
      />
    )

    const $displayName = screen.getByText(MOCK_CIRCLE.displayName)
    expect($displayName).toBeInTheDocument()
    fireEvent.click($displayName)
    expect(mockRouter.asPath).toContain(MOCK_CIRCLE.name)

    const $description = screen.queryByText(MOCK_CIRCLE.description)
    expect($description).not.toBeInTheDocument()

    const $footer = screen.queryByRole('link', {
      name: 'Enter Circle',
    })
    expect($footer).not.toBeInTheDocument()
  })
})
