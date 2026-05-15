import { MockedProvider } from '@apollo/client/testing'
import { render, screen, waitFor } from '@testing-library/react'
import { useContext } from 'react'
import { describe, expect, it } from 'vitest'

import { UserFeatureFlagType } from '~/gql/graphql'
import { MOCK_USER } from '~/stories/mocks'

import {
  processViewer,
  VIEWER_FEATURE_FLAGS,
  ViewerContext,
  ViewerProvider,
} from './'

const ViewerProbe = () => {
  const viewer = useContext(ViewerContext)

  return <div>{viewer.isCommunityWatch ? 'yes' : 'no'}</div>
}

describe('Viewer', () => {
  it('treats missing OSS feature flags as not Community Watch', () => {
    const viewer = { ...MOCK_USER, oss: undefined }

    expect(processViewer(viewer).isCommunityWatch).toBe(false)
  })

  it('detects Community Watch from optional OSS feature flags', () => {
    expect(
      processViewer({
        ...MOCK_USER,
        oss: {
          ...MOCK_USER.oss,
          featureFlags: [
            {
              __typename: 'UserFeatureFlag',
              type: UserFeatureFlagType.CommunityWatch,
            },
          ],
        },
      }).isCommunityWatch
    ).toBe(true)
  })

  it('loads Community Watch feature flags outside the root query', async () => {
    const viewer = { ...MOCK_USER, oss: undefined }

    render(
      <MockedProvider
        mocks={[
          {
            request: { query: VIEWER_FEATURE_FLAGS },
            result: {
              data: {
                viewer: {
                  __typename: 'User',
                  id: viewer.id,
                  oss: {
                    __typename: 'UserOSS',
                    featureFlags: [
                      {
                        __typename: 'UserFeatureFlag',
                        type: UserFeatureFlagType.CommunityWatch,
                      },
                    ],
                  },
                },
              },
            },
          },
        ]}
      >
        <ViewerProvider viewer={viewer as never}>
          <ViewerProbe />
        </ViewerProvider>
      </MockedProvider>
    )

    expect(screen.getByText('no')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('yes')).toBeInTheDocument()
    })
  })
})
