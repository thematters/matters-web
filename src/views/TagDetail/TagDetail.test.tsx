import mockRouter from 'next-router-mock'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { render, screen, waitFor } from '~/common/utils/test'
import { ChannelsProvider } from '~/components'
import { TagFragmentFragment } from '~/gql/graphql'
import { MOCK_TAG } from '~/stories/mocks'

import { TagDetail } from '.'

const mockUsePublicQuery = vi.fn()

vi.mock('~/components', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>
  return {
    ...actual,
    usePublicQuery: (...args: unknown[]) => mockUsePublicQuery(...args),
  }
})

const makeTag = ({
  hottestCount = 1,
  numMoments = 3,
}: {
  hottestCount?: number
  numMoments?: number
} = {}) =>
  ({
    ...MOCK_TAG,
    numMoments,
    isFollower: false,
    hottestArticles: {
      __typename: 'ArticleConnection',
      totalCount: hottestCount,
    },
    selectedArticles: { __typename: 'ArticleConnection', totalCount: 0 },
    recommended: { __typename: 'TagConnection', edges: [] },
  }) as unknown as TagFragmentFragment

describe('src/views/TagDetail/TagDetail.test.tsx', () => {
  beforeEach(() => {
    mockUsePublicQuery.mockReturnValue({
      data: undefined,
      loading: true,
      error: undefined,
      fetchMore: vi.fn(),
      refetch: vi.fn(),
      client: { query: vi.fn() },
    })
    mockRouter.push('/tags/1-tag')
  })

  it('should show articles, trending and moments tabs in fixed order', () => {
    render(
      <ChannelsProvider channels={[]}>
        <TagDetail tag={makeTag({ hottestCount: 1 })} />
      </ChannelsProvider>
    )

    expect(screen.getByText('Articles')).toBeInTheDocument()
    expect(screen.getByText('Trending')).toBeInTheDocument()
    expect(screen.getByText('Moments')).toBeInTheDocument()

    // moment count is shown in the header
    expect(screen.getByText('moments')).toBeInTheDocument()
  })

  it('should hide trending tab when there is no hottest article', () => {
    render(
      <ChannelsProvider channels={[]}>
        <TagDetail tag={makeTag({ hottestCount: 0, numMoments: 0 })} />
      </ChannelsProvider>
    )

    expect(screen.getByText('Articles')).toBeInTheDocument()
    expect(screen.queryByText('Trending')).not.toBeInTheDocument()
    expect(screen.getByText('Moments')).toBeInTheDocument()

    // moment count stays visible even when numMoments is 0
    expect(screen.getByText('moments')).toBeInTheDocument()
  })

  it('should fall back to latest when visiting ?type=hottest without hottest articles', async () => {
    mockRouter.push('/tags/1-tag?type=hottest')

    render(
      <ChannelsProvider channels={[]}>
        <TagDetail tag={makeTag({ hottestCount: 0 })} />
      </ChannelsProvider>
    )

    // URL query is cleaned up
    await waitFor(() => {
      expect(mockRouter.query.type).toBeUndefined()
    })

    // latest feed is queried
    expect(
      mockUsePublicQuery.mock.calls.some(
        ([, options]) => options?.variables?.sortBy === 'byCreatedAtDesc'
      )
    ).toBe(true)
  })
})
