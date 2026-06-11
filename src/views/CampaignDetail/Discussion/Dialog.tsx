import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconTimes from '@/public/static/icons/24px/times.svg'
import { filterComments, mergeConnections } from '~/common/utils'
import {
  CircleCommentForm,
  CircleThreadComment,
  Dialog,
  EmptyComment,
  Icon,
  InfiniteScroll,
  List,
  SpinnerBlock,
  toast,
  useDialogSwitch,
  usePublicQuery,
  ViewerContext,
} from '~/components'
import { CampaignDiscussionCommentsQuery } from '~/gql/graphql'

import { CAMPAIGN_DISCUSSION_COMMENTS } from './gql'
import styles from './styles.module.css'

type DiscussionConnection = NonNullable<
  Extract<
    NonNullable<CampaignDiscussionCommentsQuery['campaign']>,
    { __typename: 'WritingChallenge' }
  >['discussion']
>
type Comment = NonNullable<DiscussionConnection['edges']>[0]['node']

const RESPONSES_COUNT = 15

interface DiscussionDialogProps {
  campaignId: string
  shortHash: string
  canComment: boolean
  totalCount: number
  afterSubmit?: () => void
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const BaseDiscussionDialog = ({
  campaignId,
  shortHash,
  canComment,
  totalCount,
  afterSubmit,
  children,
}: DiscussionDialogProps) => {
  const viewer = useContext(ViewerContext)
  const intl = useIntl()
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const { data, loading, fetchMore, refetch } =
    usePublicQuery<CampaignDiscussionCommentsQuery>(
      CAMPAIGN_DISCUSSION_COMMENTS,
      { variables: { shortHash } },
      { publicQuery: !viewer.isAuthed }
    )

  const campaign =
    data?.campaign?.__typename === 'WritingChallenge'
      ? data.campaign
      : undefined
  const { edges, pageInfo } = campaign?.discussion || {}
  const comments = filterComments<Comment>(
    (edges || []).map(({ node }) => node)
  )

  const loadMore = async () =>
    fetchMore({
      variables: { after: pageInfo?.endCursor, first: RESPONSES_COUNT },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: 'campaign.discussion',
        }),
    })

  const submitCallback = () => {
    toast.info({
      message: <FormattedMessage defaultMessage="Comment sent" id="iSUeWj" />,
    })
    refetch()
    afterSubmit?.()
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <>
              <FormattedMessage
                defaultMessage="Discussion"
                id="aLkBs2"
                description="src/views/CampaignDetail/Discussion"
              />{' '}
              {totalCount > 0 && (
                <span className={styles.count}>{totalCount}</span>
              )}
            </>
          }
          titleLeft
          rightBtn={
            <button onClick={closeDialog}>
              <Icon icon={IconTimes} size={24} />
            </button>
          }
        />

        <Dialog.Content>
          {canComment && (
            <CircleCommentForm
              campaignId={campaignId}
              type="campaignDiscussion"
              placeholder={intl.formatMessage({
                defaultMessage: 'Share your thoughts with other participants',
                id: 'b3aGfp',
                description: 'src/views/CampaignDetail/Discussion',
              })}
              submitCallback={submitCallback}
            />
          )}

          {loading && <SpinnerBlock />}

          {!loading && comments.length <= 0 && (
            <EmptyComment
              description={intl.formatMessage({
                defaultMessage: 'No discussion yet',
                id: 'Mh+PgK',
                description: 'src/views/CampaignDetail/Discussion',
              })}
            />
          )}

          {!loading && comments.length > 0 && (
            <InfiniteScroll
              hasNextPage={!!pageInfo?.hasNextPage}
              loadMore={loadMore}
              eof
            >
              <List spacing={['xloose', 0]}>
                {comments.map((comment) => (
                  <List.Item key={comment.id}>
                    <CircleThreadComment
                      comment={comment}
                      type="campaignDiscussion"
                      hasLink
                      hasUpvote={false}
                      hasDownvote={false}
                      hasPin={false}
                    />
                  </List.Item>
                ))}
              </List>
            </InfiniteScroll>
          )}
        </Dialog.Content>
      </Dialog>
    </>
  )
}

const DiscussionDialog = (props: DiscussionDialogProps) => (
  <Dialog.Lazy mounted={<BaseDiscussionDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default DiscussionDialog
