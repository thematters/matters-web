import { Waypoint } from 'react-waypoint'

import { Spinner } from '~/components'

import EndOfResults from './EndOfResults'

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

  eof?: React.ReactNode
  eofSpacingTop?: 'base' | 'xLoose'
}

export const InfiniteScroll: React.FC<React.PropsWithChildren<Props>> = ({
  hasNextPage,
  loader = <Spinner />,
  loadMore,
  eof,
  eofSpacingTop,
  children,
}) => {
  return (
    <>
      {children}
      {hasNextPage && <Waypoint onEnter={loadMore} />}
      {hasNextPage && loader}
      {!hasNextPage && eof && (
        <EndOfResults message={eof} spacingTop={eofSpacingTop} />
      )}
    </>
  )
}
