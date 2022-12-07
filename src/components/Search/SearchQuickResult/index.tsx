import { useLazyQuery } from '@apollo/react-hooks'
import { Fragment, useEffect } from 'react'

import {
  Menu,
  Spinner,
  TagDigest,
  UserDigest,
  useResponsive,
} from '~/components'

import { toPath } from '~/common/utils'

import { QUICK_RESULT } from './gql'
import TriggerFullSearchItem from './TriggerFullSearchItem'

import { QuickResult } from './__generated__/QuickResult'

interface QuickSearchProps {
  searchKey: string
  inPage?: boolean
}

export const SearchQuickResult = (props: QuickSearchProps) => {
  const { searchKey, inPage } = props
  const isSmallUp = useResponsive('sm-up')
  const [getQuickResult, { data, loading }] = useLazyQuery<QuickResult>(
    QUICK_RESULT,
    {
      variables: { key: searchKey },
    }
  )

  const { edges: userEdges } = data?.user || {}
  const { edges: tagEdges } = data?.tag || {}

  const hasUsers = userEdges && userEdges.length > 0
  const hasTags = tagEdges && tagEdges.length > 0

  useEffect(() => {
    if (searchKey.length < 2) return

    if (
      '@#＠＃'.includes(searchKey[0]) &&
      (searchKey.length < 3 || searchKey.length > 10)
    ) {
      return
    }

    getQuickResult()
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
      {!isSmallUp && (
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
