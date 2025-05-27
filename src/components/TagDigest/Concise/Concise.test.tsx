import mockRouter from 'next-router-mock'
import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { fireEvent, render, screen } from '~/common/utils/test'
import { TagDigest } from '~/components'
import { MOCK_TAG } from '~/stories/mocks'

describe('<TagDigest.Concise>', () => {
  it('should render a TagDigest.Concise', () => {
    render(<TagDigest.Concise tag={MOCK_TAG} showArticlesNum />)

    const $digest = screen.getByTestId(TEST_ID.DIGEST_TAG_CONCISE)
    expect($digest).toBeInTheDocument()

    const $name = screen.getByText(MOCK_TAG.content)
    expect($name).toBeInTheDocument()

    const $articleCount = screen.getByText(MOCK_TAG.numArticles)
    expect($articleCount).toBeInTheDocument()

    fireEvent.click($digest)
    expect(mockRouter.asPath).toContain(MOCK_TAG.slug)
  })

  it('should render a TagDigest.Concise without article count', () => {
    render(<TagDigest.Concise tag={MOCK_TAG} />)

    const $digest = screen.getByTestId(TEST_ID.DIGEST_TAG_CONCISE)
    expect($digest).toBeInTheDocument()

    const $name = screen.getByText(MOCK_TAG.content)
    expect($name).toBeInTheDocument()

    const $articleCount = screen.queryByText(MOCK_TAG.numArticles)
    expect($articleCount).not.toBeInTheDocument()
  })
})
