import { useApolloClient } from '@apollo/react-hooks'
import { Fragment, useEffect, useState } from 'react'

import { toPath } from '~/common/utils'
import {
  Menu,
  Spinner,
  TagDigest,
  UserDigest,
  useResponsive,
  useRoute,
} from '~/components'
import { QuickResultQuery } from '~/gql/graphql'

import { QUICK_RESULT } from './gql'
import TriggerFullSearchItem from './TriggerFullSearchItem'

interface QuickSearchProps {
  searchKey: string
  activeItem?: string
  onUpdateData?: (data: QuickResultQuery | undefined) => void
  inPage?: boolean
}

export const SearchQuickResult = (props: QuickSearchProps) => {
  // TODO: Just test for team, will be removed when release
  const { getQuery } = useRoute()
  const version = getQuery('version')

  const { searchKey, inPage, activeItem, onUpdateData } = props
  const isLargeUp = useResponsive('lg-up')
  const client = useApolloClient()
  const [data, setData] = useState<QuickResultQuery>()
  const clearData = () => setData(undefined)
  const [loading, setLoading] = useState(false)

  const { edges: userEdges } = data?.user || {}
  const { edges: tagEdges } = data?.tag || {}

  const hasUsers = userEdges && userEdges.length > 0
  const hasTags = tagEdges && tagEdges.length > 0

  useEffect(() => {
    if (onUpdateData) {
      onUpdateData(data)
    }
  }, [JSON.stringify(data)])

  useEffect(() => {
    ;(async () => {
      clearData()
      if (
        '@#＠＃'.includes(searchKey[0]) &&
        (searchKey.length < 3 || searchKey.length > 11)
      ) {
        return
      }

      if (searchKey.length < 2 || searchKey.length > 10) return

      setLoading(true)
      // Why not useLazyQuery 👇🔗
      // https://github.com/apollographql/apollo-client/issues/5912
      const response = await client.query({
        query: QUICK_RESULT,
        variables: {
          key: searchKey,
          version: version === '' ? undefined : version,
        },
        fetchPolicy: 'no-cache',
      })
      setData(response.data)
      setLoading(response.loading)
    })()
  }, [searchKey])

  if (loading) {
    return (
      <Menu width={inPage ? undefined : 'md'}>
        <Spinner />
      </Menu>
    )
  }

  if (!hasUsers && !hasTags) {
    return null
  }

  return (
    <Menu width={inPage ? undefined : 'md'}>
      {!isLargeUp && (
        <>
          <TriggerFullSearchItem searchKey={searchKey} />
          <Menu.Divider />
        </>
      )}
      {hasUsers &&
        userEdges.map(
          ({ node, cursor }, i) =>
            node.__typename === 'User' && (
              <Fragment key={cursor}>
                <Menu.Item
                  bgActiveColor="grey-lighter"
                  isActive={`user${cursor}` === activeItem}
                  {...toPath({
                    page: 'userProfile',
                    userName: node.userName || '',
                  })}
                >
                  <UserDigest.Concise
                    user={node}
                    avatarSize="lg"
                    nameStyle="tight"
                  />
                </Menu.Item>
              </Fragment>
            )
        )}
      {hasUsers && hasTags && <Menu.Divider />}
      {hasTags &&
        tagEdges.map(
          ({ node, cursor }, i) =>
            node.__typename === 'Tag' && (
              <Fragment key={cursor}>
                <Menu.Item
                  spacing={['base', 'base']}
                  bgActiveColor="grey-lighter"
                  isActive={`tag${cursor}` === activeItem}
                  {...toPath({
                    page: 'tagDetail',
                    tag: node,
                  })}
                >
                  <TagDigest.Concise tag={node} textSize="sm" />
                </Menu.Item>
              </Fragment>
            )
        )}
    </Menu>
  )
}
