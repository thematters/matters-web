import { useApolloClient } from '@apollo/client'
import { Fragment, useEffect, useState } from 'react'

import {
  MAX_QUICK_SEARCH_KEY_LENGTH,
  MIN_QUICK_SEARCH_KEY_LENGTH,
  SEARCH_START_FLAG,
} from '~/common/enums'
import { analytics, toPath } from '~/common/utils'
import {
  Media,
  Menu,
  // Spacer,
  SpinnerBlock,
  TagDigest,
  UserDigest,
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
  const { searchKey, inPage, activeItem, onUpdateData, closeDropdown } = props
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
          key: searchKey,
        },
        fetchPolicy: 'no-cache',
      })
      analytics.trackEvent('load_more', {
        type: 'quick_search',
        location: 0,
        searchKey: searchKey,
      })
      setData(response.data)
      setLoading(response.loading)
    })()
  }, [searchKey])

  if (loading) {
    return (
      <Menu width={inPage ? undefined : 'md'}>
        <SpinnerBlock />
      </Menu>
    )
  }

  if (!hasUsers && !hasTags) {
    return null
  }

  return (
    <Menu width={inPage ? undefined : 'md'}>
      <Media lessThan="lg">
        <TriggerFullSearchItem searchKey={searchKey} />
        <Menu.Divider />
      </Media>

      {hasUsers &&
        userEdges.map(
          ({ node, cursor }, i) =>
            node.__typename === 'User' && (
              <Fragment key={node.id}>
                <Menu.Item
                  bgActiveColor="greyHover"
                  isActive={`user${cursor}` === activeItem}
                  {...toPath({
                    page: 'userProfile',
                    userName: node.userName || '',
                  })}
                  onClick={() => {
                    closeDropdown()
                    analytics.trackEvent('click_feed', {
                      type: 'quick_search_user',
                      contentType: 'user',
                      location: i,
                      id: node.id,
                      searchKey: searchKey,
                    })
                  }}
                >
                  <UserDigest.Rich
                    user={node}
                    size="sm"
                    bgColor="transparent"
                    bgActiveColor="transparent"
                    hasFollow={false}
                    hasState={false}
                    spacing={[0, 0]}
                    subtitle={`@${node.userName}`}
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
              <Fragment key={node.id}>
                <Menu.Item
                  spacing={[16, 16]}
                  bgActiveColor="greyHover"
                  isActive={`tag${cursor}` === activeItem}
                  {...toPath({
                    page: 'tagDetail',
                    tag: node,
                  })}
                  onClick={() => {
                    closeDropdown()
                    analytics.trackEvent('click_feed', {
                      type: 'quick_search_tag',
                      contentType: 'tag',
                      location: i,
                      id: node.id,
                      searchKey: searchKey,
                    })
                  }}
                >
                  <TagDigest.Concise tag={node} textSize={14} />
                </Menu.Item>
              </Fragment>
            )
        )}
    </Menu>
  )
}
