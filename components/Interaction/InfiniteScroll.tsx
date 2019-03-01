import { Waypoint } from '@matters/react-waypoint'

import { Spinner } from '~/components/Spinner'

/**
 *  Usage:
 * ```jsx
 *   <InfiniteScroll
 *     hasNextPage={pageInfo.hasNextPage}
 *     loadMore={loadMore}
 *     loading={loading}
 *     loader={
 *         <Spinner />
 *     }
 *   >
 *     {edges.map(el => (
 *         <Article
 *             item={el.node}
 *             key={`article-item-${el.cursor}`}
 *         />
 *     ))}
 * </InfiniteScroll>
 * ```
 */

interface Props {
  /**
   * Does the resource have more entities
   */
  hasNextPage: boolean

  /**
   * Callback to load more entities
   */
  loadMore: () => void

  /**
   * A React component to act as loader
   */
  loader?: React.ReactNode
}

export const InfiniteScroll: React.FC<Props> = ({
  children,
  loader = <Spinner />,
  hasNextPage,
  loadMore
}) => {
  return (
    <div>
      {children}
      <Waypoint
        onEnter={() => {
          if (hasNextPage) {
            loadMore()
          }
        }}
      />
      {hasNextPage && loader}
    </div>
  )
}
