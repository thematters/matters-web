import { useEffect } from 'react'

import { SpinnerBlock, useIntersectionObserver } from '~/components'

import EndOfResults from '../EndOfResults'

/**
 *  Usage:
 * ```jsx
 *   <InfiniteScroll
 *     hasNextPage={pageInfo.hasNextPage}
 *     loadMore={loadMore}
 *     loading={loading}
 *     Loader={
 *         <SpinnerBlock />
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
  loadMore: () => Promise<unknown>

  /**
   * A React component to act as loader
   */
  loader?: React.ReactNode

  eof?: React.ReactNode
  eofSpacingTop?: 'base' | 'xLoose'
  // scrollableAncestor?: any
}

export const InfiniteScroll: React.FC<React.PropsWithChildren<Props>> = ({
  hasNextPage,
  loader = <SpinnerBlock />,
  loadMore,
  eof,
  eofSpacingTop,
  // scrollableAncestor,
  children,
}) => {
  const { isIntersecting, ref } = useIntersectionObserver()

  useEffect(() => {
    if (isIntersecting) {
      loadMore()
    }
  }, [isIntersecting])

  return (
    <>
      {children}
      {hasNextPage && <span ref={ref} />}
      {hasNextPage && loader}
      {!hasNextPage && eof && (
        <EndOfResults message={eof} spacingTop={eofSpacingTop} />
      )}
    </>
  )
}
