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
    _set(result, path, {
      ...rest,
      pageInfo: newPageInfo,
      edges: [...oldEdges, ...newEdges]
    })
  }

  return result
}
