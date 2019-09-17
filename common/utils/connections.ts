import _get from 'lodash/get'
import _set from 'lodash/set'

export const mergeConnections = ({
  oldData,
  newData,
  path
}: {
  oldData: any
  newData: any
  path: string
}) => {
  const { edges: oldEdges, pageInfo: oldPageInfo, ...rest } = _get(
    oldData,
    path
  )
  const { edges: newEdges, pageInfo: newPageInfo } = _get(newData, path)

  const result = oldData

  if (newPageInfo.endCursor !== oldPageInfo.endCursor) {
    const copy = JSON.parse(JSON.stringify(result))
    return _set(copy, path, {
      ...rest,
      pageInfo: newPageInfo,
      edges: [...oldEdges, ...newEdges]
    })
  }

  return result
}

export const unshiftConnections = ({
  oldData,
  newData,
  path
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
  if (newPageInfo.endCursor !== oldPageInfo.startCursor) {
    return _set(copy, path, {
      ...rest,
      pageInfo: {
        ...newPageInfo,
        endCursor: oldPageInfo.endCursor,
        hasNextPage: oldPageInfo.hasNextPage
      },
      edges: [...newEdges, ...oldEdges]
    })
  }
  return oldData
}
