import _throttle from 'lodash/throttle'
import React from 'react'

/**
 *  Usage:
 * ```jsx
 *   <InfiniteScroll
 *     hasNextPage={pageInfo.hasNextPage}
 *     loadMore={loadMore}
 *     loading={loading}
 *     loader={
 *         <ArticleLoader />
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
   * Should show loading
   */
  loading: boolean

  /**
   * Callback to load more entities
   */
  loadMore: () => void

  /**
   * Scroll threshold
   */
  threshold: number

  /**
   * Throttle rate
   */
  throttle: number

  /** Children */
  children?: any

  /**
   * A React component to act as loader
   */
  loader?: any
}

export class InfiniteScroll extends React.Component<Props, {}> {
  public static defaultProps = {
    threshold: 100,
    throttle: 64
  }

  private scrollHandler: () => void
  private sentinel: HTMLDivElement | null

  constructor(props: Props) {
    super(props)
    this.scrollHandler = _throttle(this.checkWindowScroll, this.props.throttle)
    this.sentinel = null
  }

  public componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler)
    window.addEventListener('resize', this.scrollHandler)
    this.scrollHandler()
  }

  public componentDidUpdate() {
    this.scrollHandler()
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler)
    window.removeEventListener('resize', this.scrollHandler)
  }

  public checkWindowScroll = () => {
    const { loading, hasNextPage, threshold, loadMore } = this.props
    if (loading) {
      return
    }

    if (
      hasNextPage &&
      this.sentinel &&
      this.sentinel.getBoundingClientRect().top - window.innerHeight < threshold
    ) {
      loadMore()
    }
  }

  public render() {
    const { loader, hasNextPage } = this.props
    return (
      <div>
        {this.props.children}
        <div ref={i => (this.sentinel = i)} />
        {hasNextPage && loader}
      </div>
    )
  }
}
