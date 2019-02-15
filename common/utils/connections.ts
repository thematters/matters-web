import _ from 'lodash'

export const mergeConnections = ({
  oldData,
  newData,
  path
}: {
  oldData: any
  newData: any
  path: string
}) => {
  const { edges: oldEdges, pageInfo: oldPageInfo, ...rest } = _.get(
    oldData,
    path
  )
  const { edges: newEdges, pageInfo: newPageInfo } = _.get(newData, path)

  const result = oldData
  if (newPageInfo.endCursor !== oldPageInfo.endCursor) {
    _.set(result, path, {
      ...rest,
      pageInfo: newPageInfo,
      edges: [...oldEdges, ...newEdges]
    })
  }

  return result
}
