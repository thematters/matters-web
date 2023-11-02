import mockRouter from 'next-router-mock'
import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { render, screen } from '~/common/utils/test'
import { TagDigest } from '~/components'
import { MOCK_TAG } from '~/stories/mocks'

describe('<TagDigest.Rich>', () => {
  it('should render a TagDigest.Rich', () => {
    render(<TagDigest.Rich tag={MOCK_TAG} hasDesc hasFollow />)

    const $digest = screen.getByTestId(TEST_ID.DIGEST_TAG_RICH)
    expect($digest).toBeInTheDocument()
    $digest.click()
    expect(mockRouter.asPath).toContain(MOCK_TAG.slug)

    const $name = screen.getByText(MOCK_TAG.content)
    expect($name).toBeInTheDocument()

    const $followButton = screen.getByText('Follow')
    expect($followButton).toBeInTheDocument()

    const $description = screen.getByText(MOCK_TAG.description)
    expect($description).toBeInTheDocument()
  })

  it('should render a TagDigest.Rich without description', () => {
    render(<TagDigest.Rich tag={MOCK_TAG} hasFollow />)

    const $digest = screen.getByTestId(TEST_ID.DIGEST_TAG_RICH)
    expect($digest).toBeInTheDocument()

    const $description = screen.queryByText(MOCK_TAG.description)
    expect($description).not.toBeInTheDocument()
  })

  it('should render a TagDigest.Rich without follow button', () => {
    render(<TagDigest.Rich tag={MOCK_TAG} hasFollow={false} />)

    const $digest = screen.getByTestId(TEST_ID.DIGEST_TAG_RICH)
    expect($digest).toBeInTheDocument()

    const $followButton = screen.queryByText('Follow')
    expect($followButton).not.toBeInTheDocument()
  })
})
