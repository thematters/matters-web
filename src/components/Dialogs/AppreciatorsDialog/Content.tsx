import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  Dialog,
  InfiniteList,
  RowRendererProps,
  Spinner,
  Translate,
  useResponsive,
} from '~/components'
import { QueryError } from '~/components/GQL'
import { UserDigest } from '~/components/UserDigest'

import { analytics, mergeConnections } from '~/common/utils'

import styles from './styles.css'

import {
  ArticleAppreciators,
  ArticleAppreciators_article_appreciationsReceived_edges,
} from './__generated__/ArticleAppreciators'

interface AppreciatorsDialogContentProps {
  mediaHash: string
  closeDialog: () => void
}

const ARTICLE_APPRECIATORS = gql`
  query ArticleAppreciators($mediaHash: String, $after: String) {
    article(input: { mediaHash: $mediaHash }) {
      id
      appreciationsReceived(input: { first: 10, after: $after }) {
        totalCount
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ... on Appreciation {
              amount
              sender {
                ...UserDigestRichUser
              }
            }
          }
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user}
`

const AppreciatorsDialogContent = ({
  mediaHash,
  closeDialog,
}: AppreciatorsDialogContentProps) => {
  const isSmallUp = useResponsive('sm-up')
  const { data, loading, error, fetchMore } = useQuery<ArticleAppreciators>(
    ARTICLE_APPRECIATORS,
    { variables: { mediaHash } }
  )

  const article = data?.article
  const connectionPath = 'article.appreciationsReceived'
  const { edges, pageInfo } = data?.article?.appreciationsReceived || {}

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo || !article) {
    return null
  }

  const ListRow = ({
    index,
    datum,
  }: RowRendererProps<
    ArticleAppreciators_article_appreciationsReceived_edges
  >) => {
    const { node, cursor } = datum
    return (
      <div className="appreciator-item" key={cursor}>
        {node.sender && (
          <UserDigest.Rich
            user={node.sender}
            avatarBadge={
              <span className="appreciation-amount">{node.amount}</span>
            }
            onClick={() => {
              analytics.trackEvent('click_feed', {
                type: 'appreciators',
                contentType: 'user',
                styleType: 'card',
                location: index,
              })
            }}
          />
        )}
        <style jsx>{styles}</style>
      </div>
    )
  }

  const loadMore = (callback: () => void) => {
    analytics.trackEvent('load_more', {
      type: 'appreciators',
      location: edges.length,
    })
    return fetchMore({
      variables: {
        after: pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        callback()
        return mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        })
      },
    })
  }

  const totalCount = data?.article?.appreciationsReceived.totalCount || 0

  // estimate a safe default height
  const calcContentMaxHeight = () => {
    if (window) {
      const dialogMaxHeight = window.innerHeight * 0.01 * 90
      const head = 1.5 + (isSmallUp ? 2 + 0.5 : 0.75 * 2)
      const spacing = 0.75 * 2
      return dialogMaxHeight - (head + spacing + 1) * 16
    }
    return
  }

  const defaultListMaxHeight = calcContentMaxHeight()

  return (
    <>
      <Dialog.Header
        title={
          <Translate
            zh_hant={`${totalCount} 人讚賞了作品`}
            zh_hans={`${totalCount} 人赞赏了作品`}
          />
        }
        close={closeDialog}
        closeTextId="close"
      />

      <Dialog.Content>
        <div className="dialog-appreciators-list">
          <InfiniteList
            data={edges}
            defaultListMaxHeight={defaultListMaxHeight}
            defaultRowHeight={70}
            loader={<Spinner />}
            loadMore={loadMore}
            renderer={ListRow}
            totalCount={totalCount}
          />
        </div>
        <style jsx>{styles}</style>
      </Dialog.Content>
    </>
  )
}

export default AppreciatorsDialogContent
