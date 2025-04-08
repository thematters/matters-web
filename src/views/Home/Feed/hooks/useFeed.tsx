import { useContext, useEffect, useRef } from 'react'

import { mergeConnections } from '~/common/utils'
import { usePublicQuery, ViewerContext } from '~/components'

interface UseFeedProps {
  query: any
  variables: Record<string, any>
  connectionPath: string
  privateQueryFn: (publicData: any) => void
  keyPrefix: string
}

export const useFeed = ({
  query,
  variables,
  connectionPath,
  privateQueryFn,
  keyPrefix,
}: UseFeedProps) => {
  const viewer = useContext(ViewerContext)

  const { data, error, loading, fetchMore, client } = usePublicQuery(query, {
    variables,
  })

  let result
  const pathParts = connectionPath.split('.')
  let current = data
  for (const part of pathParts) {
    current = current?.[part]
    if (!current) break
  }
  result = current

  const { edges, pageInfo } = result || {}
  const fetchedPrivateSortsRef = useRef<string[]>([])

  // fetch private data for first page
  useEffect(() => {
    const key = `${keyPrefix}`
    const fetched = fetchedPrivateSortsRef.current.indexOf(key) >= 0
    if (loading || !edges || fetched || !viewer.isAuthed) {
      return
    }

    privateQueryFn(data)
    fetchedPrivateSortsRef.current = [...fetchedPrivateSortsRef.current, key]
  }, [!!edges, loading, viewer.id, keyPrefix])

  const loadMore = async () => {
    if (loading) {
      return
    }

    const { data: newData } = await fetchMore({
      variables: {
        ...variables,
        after: pageInfo?.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
          dedupe: true,
        }),
    })

    privateQueryFn(newData)
    return { newData, count: edges?.length || 0 }
  }

  return {
    data,
    error,
    loading,
    edges,
    pageInfo,
    loadMore,
    client,
  }
}
