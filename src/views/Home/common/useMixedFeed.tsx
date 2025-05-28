import { Media } from '~/components'

import Authors from '../Feed/Authors'
import Billboard from '../Feed/Billboard'
import Tags from '../Feed/Tags'

export const defaultHorizontalFeeds: Record<
  number,
  React.FC<{ after?: string; first?: number }>
> = {
  3: () => (
    <Media lessThan="lg">
      <Billboard />
    </Media>
  ),
  11: () => (
    <Media lessThan="lg">
      <Authors />
    </Media>
  ),
  17: () => (
    <Media lessThan="lg">
      <Tags />
    </Media>
  ),
}

export const useMixedFeed = (
  edges: any[],
  shouldMix: boolean = true,
  customHorizontalFeeds?: Record<
    number,
    React.FC<{ after?: string; first?: number }>
  >
) => {
  if (!edges || edges.length === 0 || !shouldMix) {
    return edges || []
  }

  let mixFeed = JSON.parse(JSON.stringify(edges))

  const horizontalFeeds = customHorizontalFeeds || defaultHorizontalFeeds
  const locs = Object.keys(horizontalFeeds).map((loc) => parseInt(loc, 10))
  locs.sort((a, b) => a - b)

  locs.forEach((loc) => {
    if (mixFeed.length >= loc) {
      mixFeed.splice(loc, 0, {
        Feed: horizontalFeeds[loc],
        __typename: 'HorizontalFeed',
      })
    }
  })

  return mixFeed
}

// For backward compatibility
export const horizontalFeeds = defaultHorizontalFeeds
