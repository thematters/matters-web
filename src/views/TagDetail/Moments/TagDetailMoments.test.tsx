import { describe, expect, it, vi } from 'vitest'

import { TEST_ID } from '~/common/enums'
import { render, screen } from '~/common/utils/test'
import { TagFragmentFragment } from '~/gql/graphql'
import { MOCK_MOMENT, MOCK_TAG } from '~/stories/mocks'

import TagDetailMoments from '.'

const mockUsePublicQuery = vi.fn()

vi.mock('~/components', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>
  return {
    ...actual,
    usePublicQuery: (...args: unknown[]) => mockUsePublicQuery(...args),
  }
})

const TAG = MOCK_TAG as unknown as TagFragmentFragment

const makeQueryResult = (edges: unknown[]) => ({
  data: {
    node: {
      __typename: 'Tag',
      id: MOCK_TAG.id,
      moments: {
        __typename: 'MomentConnection',
        pageInfo: {
          __typename: 'PageInfo',
          startCursor: null,
          endCursor: null,
          hasNextPage: false,
        },
        edges,
      },
    },
  },
  loading: false,
  error: undefined,
  fetchMore: vi.fn(),
  client: { query: vi.fn() },
})

describe('src/views/TagDetail/Moments/TagDetailMoments.test.tsx', () => {
  it('should render moment cards without tags (hasTag=false)', () => {
    mockUsePublicQuery.mockReturnValue(
      makeQueryResult([
        { __typename: 'MomentEdge', cursor: 'c1', node: MOCK_MOMENT },
      ])
    )

    render(<TagDetailMoments tag={TAG} />)

    // moment content is rendered
    const $content = screen.queryAllByTestId(TEST_ID.MOMENT_DIGEST_CONTENT)
    expect($content.length).toBeGreaterThan(0)

    // MOCK_MOMENT has momentTags, but the tag section is hidden
    const $tags = screen.queryByTestId(TEST_ID.MOMENT_DIGEST_TAGS)
    expect($tags).not.toBeInTheDocument()
  })

  it('should render empty state when there is no moment', () => {
    mockUsePublicQuery.mockReturnValue(makeQueryResult([]))

    render(<TagDetailMoments tag={TAG} />)

    expect(screen.getByText('No moments yet')).toBeInTheDocument()
  })
})
