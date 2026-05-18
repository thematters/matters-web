import { render, screen } from '@testing-library/react'
import { useContext } from 'react'
import { describe, expect, it } from 'vitest'

import { BadgeType } from '~/gql/graphql'
import { MOCK_USER } from '~/stories/mocks'

import { processViewer, ViewerContext, ViewerProvider } from './'

const ViewerProbe = () => {
  const viewer = useContext(ViewerContext)

  return <div>{viewer.isCommunityWatch ? 'yes' : 'no'}</div>
}

describe('Viewer', () => {
  it('treats missing Community Watch badge as not Community Watch', () => {
    expect(processViewer(MOCK_USER).isCommunityWatch).toBe(false)
  })

  it('detects Community Watch from the public user badge', () => {
    expect(
      processViewer({
        ...MOCK_USER,
        info: {
          ...MOCK_USER.info,
          badges: [{ __typename: 'Badge', type: BadgeType.CommunityWatch }],
        },
      }).isCommunityWatch
    ).toBe(true)
  })

  it('provides Community Watch state without an extra OSS query', () => {
    render(
      <ViewerProvider
        viewer={
          {
            ...MOCK_USER,
            info: {
              ...MOCK_USER.info,
              badges: [{ __typename: 'Badge', type: BadgeType.CommunityWatch }],
            },
          } as never
        }
      >
        <ViewerProbe />
      </ViewerProvider>
    )

    expect(screen.getByText('yes')).toBeInTheDocument()
  })
})
