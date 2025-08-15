import { Media } from '~/components'
import {
  ArticleDigestFeedArticlePrivateFragment,
  ArticleDigestFeedArticlePublicFragment,
} from '~/gql/graphql'

import Authors from '../Feed/Authors'
import Billboard from '../Feed/Billboard'
import Tags from '../Feed/Tags'

export type MixedFeedArticleEdge =
  | {
      __typename?: 'ArticleEdge'
      cursor: string
      node: ArticleDigestFeedArticlePublicFragment &
        Partial<ArticleDigestFeedArticlePrivateFragment>
    }
  | {
      __typename: 'ChannelArticleEdge'
      cursor: string
      pinned: boolean
      node: ArticleDigestFeedArticlePublicFragment &
        Partial<ArticleDigestFeedArticlePrivateFragment>
    }
  | {
      __typename: 'HorizontalFeed'
      Feed: React.FC
    }

const horizontalFeeds: Record<number, React.FC> = {
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
  edges: MixedFeedArticleEdge[],
  shouldMix: boolean = true
) => {
  if (!edges || edges.length === 0 || !shouldMix) {
    return edges || []
  }

  // get copy
  const mixFeed = JSON.parse(JSON.stringify(edges)) as MixedFeedArticleEdge[]

  // get insert entries
  const locs = Object.keys(horizontalFeeds).map((loc) => parseInt(loc, 10))
  locs.sort((a, b) => a - b)

  // insert feed
  locs.forEach((loc) => {
    if (mixFeed.length >= loc) {
      mixFeed.splice(loc, 0, {
        Feed: horizontalFeeds[loc as keyof typeof horizontalFeeds],
        __typename: 'HorizontalFeed',
      })
    }
  })

  return mixFeed
}
