import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { render, screen } from '~/common/utils/test'
import { MOCK_CIRCLE } from '~/stories/mocks'

import CircleDigestCounts from './'

describe('<CircleDigest/Counts>', () => {
  it('should render an CircleDigest/Counts ', () => {
    render(<CircleDigestCounts circle={{ ...MOCK_CIRCLE }} />)

    const $countMember = screen.getByTestId(TEST_ID.DIGEST_CIRCLE_MEMBER_COUNT)
    expect($countMember.textContent).toContain(MOCK_CIRCLE.members.totalCount)

    const $countArticle = screen.getByTestId(
      TEST_ID.DIGEST_CIRCLE_ARTICLE_COUNT
    )
    expect($countArticle.textContent).toContain(MOCK_CIRCLE.works.totalCount)
  })
})
