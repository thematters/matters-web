import _get from 'lodash/get'
import _set from 'lodash/set'
import _uniqBy from 'lodash/uniqBy'

export const mergeConnections = ({
  oldData,
  newData,
  path,
  dedupe = false,
}: {
  oldData: any
  newData: any
  path: string
  dedupe?: boolean
}) => {
  try {
    const { edges: oldEdges, pageInfo: oldPageInfo, ...rest } = _get(
      oldData,
      path
    )

    const { edges: newEdges, pageInfo: newPageInfo } = _get(newData, path)

    const result = oldData

    if (newPageInfo.endCursor !== oldPageInfo.endCursor) {
      const copy = JSON.parse(JSON.stringify(result))

      const edges = dedupe
        ? _uniqBy([...oldEdges, ...newEdges], (edge) => edge.node.id)
        : [...oldEdges, ...newEdges]

      return _set(copy, path, {
        ...rest,
        pageInfo: newPageInfo,
        edges,
      })
    }

    return result
  } catch (err) {
    console.error('Cannot get edges from path, skipping', err)
    return oldData
  }
}

export const unshiftConnections = ({
  oldData,
  newData,
  path,
}: {
  oldData: any
  newData: any
  path: string
}) => {
  const { edges: oldEdges, pageInfo: oldPageInfo } = _get(oldData, path)
  const { edges: newEdges, pageInfo: newPageInfo, ...rest } = _get(
    newData,
    path
  )
  const copy = JSON.parse(JSON.stringify(newData))
  return _set(copy, path, {
    ...rest,
    pageInfo: {
      ...newPageInfo,
      endCursor: oldPageInfo.endCursor,
      hasNextPage: oldPageInfo.hasNextPage,
    },
    edges: [...newEdges, ...oldEdges],
  })
}
