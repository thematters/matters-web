import mockRouter from 'next-router-mock'
import { describe, expect, it, vi } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { render, screen } from '~/common/utils/test'
import { CollectionDigestFeed } from '~/components'
import { MOCK_COLLECTON } from '~/stories/mocks'

describe('<CollectionDigestFeed>', () => {
  it('should render a CollectionDigestFeed', () => {
    const handleClick = vi.fn()

    render(
      <CollectionDigestFeed collection={MOCK_COLLECTON} onClick={handleClick} />
    )

    const $digest = screen.getByTestId(TEST_ID.DIGEST_COLLECTION_FEED)
    expect($digest).toBeInTheDocument()

    const $book = screen.getByTestId(TEST_ID.BOOK)
    expect($book).toBeInTheDocument()
    mockRouter.push('/')
    $book.click()
    expect(mockRouter.asPath).toContain(MOCK_COLLECTON.id)
    expect(handleClick).toBeCalledTimes(1)

    const $heading = screen.getByRole('link', { name: MOCK_COLLECTON.title })
    expect($heading).toBeInTheDocument()
    mockRouter.push('/')
    $heading.click()
    expect(mockRouter.asPath).toContain(MOCK_COLLECTON.id)
    expect(handleClick).toBeCalledTimes(2)

    const $description = screen.getByText(MOCK_COLLECTON.description)
    expect($description).toBeInTheDocument()
    mockRouter.push('/')
    $description.click()
    expect(mockRouter.asPath).toContain(MOCK_COLLECTON.id)
    expect(handleClick).toBeCalledTimes(3)

    const $articleCount = screen.getAllByText('1 article')
    expect($articleCount.length).toBeGreaterThanOrEqual(2)
  })
})
