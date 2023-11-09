import mockRouter from 'next-router-mock'
import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { render, screen } from '~/common/utils/test'
import { TagDigest } from '~/components'
import { MOCK_TAG } from '~/stories/mocks'

describe('<TagDigest.Sidebar>', () => {
  it('should render an TagDigest.Sidebar', () => {
    render(<TagDigest.Sidebar tag={MOCK_TAG} />)

    const $digest = screen.getByTestId(TEST_ID.DIGEST_TAG_SIDEBAR)
    expect($digest).toBeInTheDocument()
    $digest.click()
    expect(mockRouter.asPath).toContain(MOCK_TAG.slug)

    const $name = screen.getByText(MOCK_TAG.content)
    expect($name).toBeInTheDocument()

    const $articleCount = screen.getByText(MOCK_TAG.numArticles)
    expect($articleCount).toBeInTheDocument()

    const $authorCount = screen.getByText(MOCK_TAG.numAuthors)
    expect($authorCount).toBeInTheDocument()

    const $cover = screen.getByTestId(TEST_ID.DIGEST_TAG_SIDEBAR_COVER)
    expect($cover).toBeInTheDocument()
    mockRouter.push('/')
    $cover.click()
    expect(mockRouter.asPath).toContain(MOCK_TAG.slug)
  })
})
