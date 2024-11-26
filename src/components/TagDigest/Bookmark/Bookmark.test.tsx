import { MockedProvider } from '@apollo/react-testing'
import { render, screen } from '@testing-library/react'
import { IntlProvider } from 'react-intl'
import { describe, expect, it } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { TagDigest } from '~/components'
import { MOCK_TAG } from '~/stories/mocks'

describe('<TagDigest.Bookmark>', () => {
  it('should render a TagDigest.Bookmark', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <IntlProvider locale="en">
          <TagDigest.Bookmark tag={MOCK_TAG} />
        </IntlProvider>
      </MockedProvider>
    )

    const $bookmark = screen.getByTestId(TEST_ID.DIGEST_TAG_BOOKMARK)
    expect($bookmark).toBeInTheDocument()

    const $name = screen.getByText(MOCK_TAG.content)
    expect($name).toBeInTheDocument()

    const $bookmarkButton = screen.getByRole('button', {
      name: 'Bookmark',
    })
    expect($bookmarkButton).toBeInTheDocument()
  })

  it('should render a TagDigest.Bookmark with isFollower', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <IntlProvider locale="en">
          <TagDigest.Bookmark
            tag={{
              ...MOCK_TAG,
              isFollower: true,
            }}
          />
        </IntlProvider>
      </MockedProvider>
    )

    const $bookmarkButton = screen.getByRole('button', {
      name: 'Remove bookmark',
    })
    expect($bookmarkButton).toBeInTheDocument()
  })
})
