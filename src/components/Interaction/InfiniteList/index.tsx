import { ReactNode, useState } from 'react'
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  Index,
  IndexRange,
  InfiniteLoader,
  List,
  ListRowProps
} from 'react-virtualized'

export interface RowRendererProps {
  datum: { [key: string]: any }
  index: number
  parentProps: any
}

interface Props {
  data: Array<{ [key: string]: any }>
  loader: ReactNode
  loadMore: (callback: () => void) => Promise<any>
  parentProps: any
  renderer: (props: RowRendererProps) => ReactNode
  totalCount: number

  defaultListHeight?: number
  defaultListMaxHeight?: number
  defaultRowHeight?: number
  threshold?: number
}

export const InfiniteList = ({
  data,
  loader,
  loadMore,
  parentProps,
  renderer,
  totalCount,

  defaultListHeight = 10,
  defaultListMaxHeight,
  defaultRowHeight,
  threshold = 1
}: Props) => {
  const cache: CellMeasurerCache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: defaultListHeight
  })

  const [listHeight, setListHeight] = useState(
    defaultRowHeight ? defaultRowHeight * data.length : defaultListHeight
  )

  const [maxHeight] = useState(
    defaultListMaxHeight || window?.innerHeight || defaultListHeight
  )

  const isRowLoaded = ({ index }: Index) => !!data[index]

  const loadMoreRows = ({ startIndex }: IndexRange) =>
    loadMore(() => cache.clear(startIndex, 0))

  const rowRenderer = ({ index, key, parent, style }: ListRowProps) => {
    const datum = data[index]
    const props = { cache, columnIndex: 0, key, parent, rowIndex: index }
    return (
      <CellMeasurer {...props}>
        <div style={style}>
          {datum ? renderer({ index, datum, parentProps }) : loader}
        </div>
      </CellMeasurer>
    )
  }

  const calculate = () =>
    [...Array(data.length).keys()].reduce(
      (sum, index) => sum + cache.getHeight(index, 0),
      0
    )

  const onRowsHaveRendered = () => {
    if (listHeight < maxHeight) {
      const current = calculate()
      if (listHeight < current) {
        setListHeight(Math.min(maxHeight, current))
      }
    }
  }

  const count = data?.length || 0

  const rowCount = (totalCount || 0) > count ? count + 1 : count

  const listStyle = { height: `${Math.min(maxHeight, listHeight)}px` }

  return (
    <div className="infinite-list" style={listStyle}>
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={totalCount}
        threshold={threshold}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer>
            {({ width, height }) => (
              <List
                width={width}
                height={height}
                deferredMeasurementCache={cache}
                ref={registerChild}
                rowHeight={cache.rowHeight}
                rowRenderer={rowRenderer}
                rowCount={rowCount}
                onRowsRendered={params => {
                  onRowsRendered(params)
                  onRowsHaveRendered()
                }}
                overscanRowCount={0}
              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </div>
  )
}
