import mockRouter from 'next-router-mock'
import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { render, screen } from '~/common/utils/test'
import { TagDigest } from '~/components'
import { MOCK_TAG } from '~/stories/mocks'

describe('<TagDigest.Feed>', () => {
  it('should render an TagDigest.Feed', () => {
    render(<TagDigest.Feed tag={MOCK_TAG} />)

    const $digest = screen.getByTestId(TEST_ID.DIGEST_TAG_FEED)
    expect($digest).toBeInTheDocument()
    $digest.click()
    expect(mockRouter.asPath).toContain(MOCK_TAG.slug)

    const $name = screen.getByText(MOCK_TAG.content)
    expect($name).toBeInTheDocument()

    const $articleCount = screen.getByText(MOCK_TAG.numArticles)
    expect($articleCount).toBeInTheDocument()

    const $authorCount = screen.getByText(MOCK_TAG.numAuthors)
    expect($authorCount).toBeInTheDocument()

    const $cover = screen.getByTestId(TEST_ID.DIGEST_TAG_FEED_COVER)
    expect($cover).toBeInTheDocument()
    mockRouter.push('/')
    $cover.click()
    expect(mockRouter.asPath).toContain(MOCK_TAG.slug)

    const $articleList = screen.getByRole('list')
    expect($articleList).toBeInTheDocument()
    const $articleListItems = screen.getAllByRole('listitem')
    expect($articleListItems.length).toBe(4)
    mockRouter.push('/')
    $articleListItems[0].click()
    expect(mockRouter.asPath).toContain(MOCK_TAG.articles.edges[0].node.slug)
  })
})
