import { forwardRef, Ref } from 'react'
import { Waypoint } from 'react-waypoint'

import { PullToRefresh, Spinner } from '~/components'

/**
 *  Usage:
 * ```jsx
 *   <InfiniteScroll
 *     hasNextPage={pageInfo.hasNextPage}
 *     loadMore={loadMore}
 *     loading={loading}
 *     Loader={
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
  loadMore: () => Promise<any>

  /**
   * A React component to act as loader
   */
  loader?: React.ReactNode

  /**
   * Refetch function to be called by Pull to Refresh
   */
  pullToRefresh?: () => any
}

export const InfiniteScroll: React.FC<Props> = ({
  hasNextPage,
  loader = <Spinner />,
  loadMore,
  pullToRefresh,
  children,
}) => {
  const LoaderWithRef = forwardRef((props, ref: Ref<HTMLDivElement>) => (
    <div ref={ref}>{loader || <Spinner />}</div>
  ))

  const Inner = () => (
    <div>
      {children}
      {hasNextPage && (
        <Waypoint onEnter={loadMore}>
          <LoaderWithRef />
        </Waypoint>
      )}
    </div>
  )

  if (pullToRefresh) {
    return (
      <PullToRefresh refresh={pullToRefresh}>
        <Inner />
      </PullToRefresh>
    )
  }

  return <Inner />
}
