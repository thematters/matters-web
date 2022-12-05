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

  useEffect(() => {
    getQuickResult()
  }, [searchKey])

  if (loading) {
    return (
      <Menu width={inPage ? undefined : 'md'}>
        <Spinner />
      </Menu>
    )
  }

  if (
    (!userEdges || userEdges.length <= 0) &&
    (!tagEdges || tagEdges.length <= 0)
  ) {
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
      {userEdges &&
        userEdges.length > 0 &&
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
      {userEdges && userEdges.length > 0 && tagEdges && tagEdges.length > 0 && (
        <Menu.Divider />
      )}
      {tagEdges &&
        tagEdges.length > 0 &&
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
