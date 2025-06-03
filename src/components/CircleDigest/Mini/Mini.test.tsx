import mockRouter from 'next-router-mock'
import { describe, expect, it, vi } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { fireEvent, render, screen } from '~/common/utils/test'
import { CircleDigest } from '~/components'
import { MOCK_CIRCLE } from '~/stories/mocks'

describe('<CircleDigest.Mini>', () => {
  it('should render a CircleDigest.Mini', () => {
    const handleClick = vi.fn()

    render(<CircleDigest.Mini circle={MOCK_CIRCLE} onClick={handleClick} />)

    const $digest = screen.getByTestId(TEST_ID.DIGEST_CIRCLE_MINI)
    expect($digest).toBeInTheDocument()
    fireEvent.click($digest)
    expect(mockRouter.asPath).toContain(MOCK_CIRCLE.name)
    expect(handleClick).toBeCalledTimes(1)

    // displayName
    const $displayName = screen.getByTestId(TEST_ID.DIGEST_CIRCLE_DISPLAY_NAME)
    expect($displayName).toHaveTextContent(MOCK_CIRCLE.displayName)
    mockRouter.push('/')
    fireEvent.click($displayName)
    expect(mockRouter.asPath).toContain(MOCK_CIRCLE.name)
    expect(handleClick).toBeCalledTimes(2)

    // avatar
    const $avatar = screen.getByTestId(TEST_ID.CIRCLE_AVATAR)
    expect($avatar).toBeInTheDocument()
    mockRouter.push('/')
    fireEvent.click($avatar)
    expect(mockRouter.asPath).toContain(MOCK_CIRCLE.name)
    expect(handleClick).toBeCalledTimes(3)

    // counts
    const $countMember = screen.getByTestId(TEST_ID.DIGEST_CIRCLE_MEMBER_COUNT)
    expect($countMember).toHaveTextContent(
      String(MOCK_CIRCLE.members.totalCount)
    )
    const $countArticle = screen.getByTestId(
      TEST_ID.DIGEST_CIRCLE_ARTICLE_COUNT
    )
    expect($countArticle).toHaveTextContent(
      String(MOCK_CIRCLE.works.totalCount)
    )

    // description
    const $description = screen.getByText(MOCK_CIRCLE.description)
    expect($description).toBeInTheDocument()
  })
})
