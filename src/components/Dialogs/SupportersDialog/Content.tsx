import { useQuery } from '@apollo/react-hooks'
import { FormattedMessage } from 'react-intl'

import { BREAKPOINTS } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'
import {
  Dialog,
  InfiniteScroll,
  List,
  QueryError,
  Spinner,
  useMediaQuery,
} from '~/components'
import { UserDigest } from '~/components/UserDigest'
import {
  ArticleDonatorsQuery,
  SupportsDialogArticleFragment,
} from '~/gql/graphql'

import { ARTICLE_DONATORS } from './gql'
import styles from './styles.module.css'

interface SupportersDialogContentProps {
  article: SupportsDialogArticleFragment
  closeDialog: () => void
}

const SupportersDialogContent = ({
  article,
  closeDialog,
}: SupportersDialogContentProps) => {
  const { data, loading, error, fetchMore } = useQuery<ArticleDonatorsQuery>(
    ARTICLE_DONATORS,
    { variables: { id: article.id } }
  )

  const isSmUp = useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`)

  const connectionPath = 'article.donations'
  const { edges, pageInfo } =
    (data?.article?.__typename === 'Article' && data?.article?.donations) || {}
  const totalCount =
    (data?.article?.__typename === 'Article' &&
      data?.article?.donations.totalCount) ||
    0

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return null
  }

  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'donators',
      location: edges.length,
    })
    return fetchMore({
      variables: { after: pageInfo.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        })
      },
    })
  }

  return (
    <>
      <Dialog.Header
        title={
          <>
            <FormattedMessage
              defaultMessage="Supporter"
              id="Hyr5ET"
              description="src/components/Dialogs/SupportersDialog/Content.tsx"
            />
            <sup className={styles.count}>{totalCount}</sup>
          </>
        }
        titleLeft
        rightBtn={
          <Dialog.TextButton
            text={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
            color="greyDarker"
            onClick={closeDialog}
          />
        }
      />

      <Dialog.Content noSpacing>
        <InfiniteScroll
          loader={<Spinner />}
          loadMore={loadMore}
          hasNextPage={pageInfo.hasNextPage}
        >
          <List
            hasBorder={false}
            spacing={isSmUp ? ['base', 'baseLoose'] : ['base', 'base']}
          >
            {edges.map(({ node, cursor }, i) => (
              <List.Item key={cursor}>
                <UserDigest.Rich
                  user={node}
                  key={cursor}
                  onClick={() => {
                    analytics.trackEvent('click_feed', {
                      type: 'donators',
                      contentType: 'user',
                      location: i,
                      id: node.id,
                    })
                  }}
                  hasFollow={false}
                  spacing={[0, 0]}
                />
              </List.Item>
            ))}
          </List>
        </InfiniteScroll>
      </Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <Dialog.TextButton
            text={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
            color="greyDarker"
            onClick={closeDialog}
          />
        }
      />
    </>
  )
}

export default SupportersDialogContent
