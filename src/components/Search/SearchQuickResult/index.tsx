import { useApolloClient } from '@apollo/react-hooks'
import { Fragment, useEffect, useState } from 'react'

import {
  MAX_QUICK_SEARCH_KEY_LENGTH,
  MIN_QUICK_SEARCH_KEY_LENGTH,
  SEARCH_START_FLAG,
} from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  Menu,
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
  closeDropdown: () => void
  inPage?: boolean
}

export const SearchQuickResult = (props: QuickSearchProps) => {
  // TODO: Just test for team, will be removed when release
  const { getQuery } = useRoute()
  const version = getQuery('version')

  const { searchKey, inPage, activeItem, onUpdateData, closeDropdown } = props
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
        SEARCH_START_FLAG.includes(searchKey[0]) &&
        (searchKey.length < MIN_QUICK_SEARCH_KEY_LENGTH + 1 ||
          searchKey.length > MAX_QUICK_SEARCH_KEY_LENGTH + 1)
      ) {
        return
      }

      if (
        searchKey.length < MIN_QUICK_SEARCH_KEY_LENGTH ||
        searchKey.length > MAX_QUICK_SEARCH_KEY_LENGTH
      )
        return

      setLoading(true)
      // Why not useLazyQuery 👇🔗
      // https://github.com/apollographql/apollo-client/issues/5912
      const response = await client.query({
        query: QUICK_RESULT,
        variables: {
          key: SEARCH_START_FLAG.includes(searchKey[0])
            ? searchKey.slice(1)
            : searchKey,
          version: version === '' ? undefined : version,
        },
        fetchPolicy: 'no-cache',
      })
      setData(response.data)
      setLoading(response.loading)
    })()
  }, [searchKey])

  if (loading) {
    return null
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
                  activeOutline="auto"
                  isActive={`user${cursor}` === activeItem}
                  {...toPath({
                    page: 'userProfile',
                    userName: node.userName || '',
                  })}
                  onClick={closeDropdown}
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
                  activeOutline="auto"
                  isActive={`tag${cursor}` === activeItem}
                  {...toPath({
                    page: 'tagDetail',
                    tag: node,
                  })}
                  onClick={closeDropdown}
                >
                  <TagDigest.Concise tag={node} textSize="sm" />
                </Menu.Item>
              </Fragment>
            )
        )}
    </Menu>
  )
}
