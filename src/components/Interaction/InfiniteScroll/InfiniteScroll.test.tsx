import React from 'react'
import { describe, expect, it } from 'vitest'

import { render, screen } from '~/common/utils/test'
import { InfiniteScroll } from '~/components'

describe('<InfiniteScroll>', () => {
  it('should render the children and loader', () => {
    render(
      <InfiniteScroll
        hasNextPage
        loadMore={async () => {}}
        loader={<span>Loading</span>}
        eof="No more results"
      >
        <div>Child 1</div>
        <div>Child 2</div>
      </InfiniteScroll>
    )

    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
    expect(screen.getByText('Loading')).toBeInTheDocument()
    expect(screen.queryByText('No more results')).not.toBeInTheDocument()
  })

  it('should not render the loader when there are no more pages', () => {
    render(
      <InfiniteScroll
        hasNextPage={false}
        loadMore={async () => {}}
        loader={<span>Loading</span>}
        eof="No more results"
      >
        <div>Child 1</div>
        <div>Child 2</div>
      </InfiniteScroll>
    )

    expect(screen.queryByText('Loading')).not.toBeInTheDocument()
    expect(screen.getByText('No more results')).toBeInTheDocument()
  })

  // FIXME: not support scroll in jsdom yet
  // it('should call the loadMore function when the waypoint is reached', () => {
  //   const loadMoreMock = vi.fn()

  //    render(
  //     <InfiniteScroll hasNextPage={true} loadMore={loadMoreMock} eof={null}>
  //       <div>Child 1</div>
  //       <div>Child 2</div>
  //     </InfiniteScroll>
  //   )
  // })
})
