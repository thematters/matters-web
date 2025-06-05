import mockRouter from 'next-router-mock'
import { describe, expect, it, vi } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { fireEvent, render, screen } from '~/common/utils/test'
import { CircleDigest } from '~/components'
import { MOCK_CIRCLE } from '~/stories/mocks'

describe('<CircleDigest.Rich>', () => {
  it('should render a CircleDigest.Rich', () => {
    const handleClick = vi.fn()

    render(
      <CircleDigest.Rich
        circle={MOCK_CIRCLE}
        onClick={handleClick}
        hasDescription
        hasFooter
        hasOwner
        hasPrice
      />
    )

    const $digest = screen.getByTestId(TEST_ID.DIGEST_CIRCLE_RICH)
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

    // description
    const $description = screen.getByText(MOCK_CIRCLE.description)
    expect($description).toBeInTheDocument()

    // author
    const $author = screen.getByTestId(TEST_ID.DIGEST_USER_MINI)
    expect($author).toBeInTheDocument()

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

    // CTA button
    const $cta = screen.getByText('Enter')
    expect($cta).toBeInTheDocument()
  })

  it('should render a disabled CircleDigest.Rich', () => {
    const handleClick = vi.fn()

    render(
      <CircleDigest.Rich
        circle={MOCK_CIRCLE}
        onClick={handleClick}
        hasDescription
        hasFooter
        hasOwner
        hasPrice
        disabled
      />
    )

    const $digest = screen.getByTestId(TEST_ID.DIGEST_CIRCLE_RICH)
    expect($digest).toBeInTheDocument()
    fireEvent.click($digest)
    expect(mockRouter.asPath).not.toContain(MOCK_CIRCLE.name)
    expect(handleClick).toBeCalledTimes(0)

    // displayName
    const $displayName = screen.getByText(MOCK_CIRCLE.displayName)
    expect($displayName).toBeInTheDocument()
    mockRouter.push('/')
    fireEvent.click($displayName)
    expect(mockRouter.asPath).not.toContain(MOCK_CIRCLE.name)
    expect(handleClick).toBeCalledTimes(0)
  })

  it('should render a CircleDigest.Rich without description', () => {
    render(<CircleDigest.Rich circle={MOCK_CIRCLE} hasDescription={false} />)

    const $description = screen.queryByText(MOCK_CIRCLE.description)
    expect($description).not.toBeInTheDocument()
  })

  it('should render a CircleDigest.Rich without owner', () => {
    render(<CircleDigest.Rich circle={MOCK_CIRCLE} hasOwner={false} />)

    const $author = screen.queryByTestId(TEST_ID.DIGEST_USER_MINI)
    expect($author).not.toBeInTheDocument()
  })

  it('should render a CircleDigest.Rich without footer', () => {
    render(<CircleDigest.Rich circle={MOCK_CIRCLE} hasFooter={false} />)

    const $countMember = screen.queryByTestId(
      TEST_ID.DIGEST_CIRCLE_MEMBER_COUNT
    )
    expect($countMember).not.toBeInTheDocument()
    const $countArticle = screen.queryByTestId(
      TEST_ID.DIGEST_CIRCLE_ARTICLE_COUNT
    )
    expect($countArticle).not.toBeInTheDocument()
  })

  it('should render a CircleDigest.Rich with price', () => {
    render(
      <CircleDigest.Rich
        circle={{ ...MOCK_CIRCLE, isMember: false }}
        hasPrice
        hasFooter
      />
    )

    const $cta = screen.getByTestId(TEST_ID.DIGEST_CIRCLE_PRICE)
    expect($cta).toHaveTextContent(String(MOCK_CIRCLE.prices[0].amount))
  })
})
