import mockRouter from 'next-router-mock'
import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { abbr } from '~/common/utils/number/abbr'
import { fireEvent, render, screen } from '~/common/utils/test'
import { TagDigest } from '~/components'
import { MOCK_TAG } from '~/stories/mocks'

describe('<TagDigest.Feed>', () => {
  it('should render a TagDigest.Feed', () => {
    render(<TagDigest.Feed tag={MOCK_TAG} />)

    const $digest = screen.getByTestId(TEST_ID.DIGEST_TAG_FEED)
    expect($digest).toBeInTheDocument()
    fireEvent.click($digest)
    expect(mockRouter.asPath).toContain(MOCK_TAG.slug)

    const $name = screen.getAllByText(MOCK_TAG.content)[0] // duplicated items in the mock
    expect($name).toBeInTheDocument()

    const $numArticles = screen.getByTestId(
      TEST_ID.DIGEST_TAG_FEED_NUM_ARTICLES
    )
    expect($numArticles).toBeInTheDocument()
    expect($numArticles).toHaveTextContent(`(${abbr(MOCK_TAG.numArticles, 2)})`)
  })
})
