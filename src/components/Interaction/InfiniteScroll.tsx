import { ApolloQueryResult } from 'apollo-client';
import { forwardRef, Ref } from 'react';
import { Waypoint } from 'react-waypoint';

import { Spinner } from '~/components';

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
  hasNextPage: boolean;

  /**
   * Callback to load more entities
   */
  loadMore: () => Promise<ApolloQueryResult<any>>;

  /**
   * A React component to act as loader
   */
  loader?: React.ReactNode;
}

export const InfiniteScroll: React.FC<Props> = ({
  children,
  loader = <Spinner />,
  hasNextPage,
  loadMore,
}) => {
  const Loader = ({ innerRef }: { innerRef: Ref<HTMLDivElement> }) => (
    <div ref={innerRef}>{loader || <Spinner />}</div>
  );
  const LoaderWithRef = forwardRef((props, ref: Ref<HTMLDivElement>) => (
    <Loader innerRef={ref} />
  ));
  return (
    <div>
      {children}
      {hasNextPage && (
        <Waypoint bottomOffset="-100%" onEnter={() => loadMore()}>
          <LoaderWithRef />
        </Waypoint>
      )}
    </div>
  );
};
