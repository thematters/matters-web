import { useContext, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { filterComments } from '~/common/utils'
import {
  Button,
  CircleCommentForm,
  CircleThreadComment,
  TextIcon,
  toast,
  usePublicQuery,
  ViewerContext,
} from '~/components'
import {
  CampaignDiscussionCommentsQuery,
  CampaignDiscussionViewerQuery,
} from '~/gql/graphql'

import DiscussionDialog from './Dialog'
import { CAMPAIGN_DISCUSSION_COMMENTS, CAMPAIGN_DISCUSSION_VIEWER } from './gql'
import styles from './styles.module.css'

type DiscussionConnection = NonNullable<
  Extract<
    NonNullable<CampaignDiscussionCommentsQuery['campaign']>,
    { __typename: 'WritingChallenge' }
  >['discussion']
>
type Comment = NonNullable<DiscussionConnection['edges']>[0]['node']

// how many latest comments to preview in the compact module
const PREVIEW_COUNT = 3

interface CampaignDiscussionProps {
  campaignId: string
  shortHash: string
  // 'module': compact module (desktop right aside) — input box + latest few
  // comments + "view all". 'chip': one-line entry button (mobile main column)
  // that opens the full discussion dialog.
  entry?: 'module' | 'chip'
}

const CampaignDiscussion = ({
  campaignId,
  shortHash,
  entry = 'module',
}: CampaignDiscussionProps) => {
  const viewer = useContext(ViewerContext)
  const intl = useIntl()

  const { data, refetch, client } =
    usePublicQuery<CampaignDiscussionCommentsQuery>(
      CAMPAIGN_DISCUSSION_COMMENTS,
      { variables: { shortHash, first: PREVIEW_COUNT } },
      { publicQuery: !viewer.isAuthed }
    )

  const campaign =
    data?.campaign?.__typename === 'WritingChallenge'
      ? data.campaign
      : undefined
  const totalCount = campaign?.discussion?.totalCount ?? 0
  const comments = filterComments<Comment>(
    (campaign?.discussion?.edges || []).map(({ node }) => node)
  ).slice(0, PREVIEW_COUNT)

  // viewer's participation decides whether they may post
  const [canComment, setCanComment] = useState(false)
  useEffect(() => {
    if (!viewer.isAuthed) {
      setCanComment(false)
      return
    }
    ;(async () => {
      try {
        const { data: viewerData } =
          await client.query<CampaignDiscussionViewerQuery>({
            query: CAMPAIGN_DISCUSSION_VIEWER,
            fetchPolicy: 'network-only',
            variables: { shortHash },
          })
        const c =
          viewerData?.campaign?.__typename === 'WritingChallenge'
            ? viewerData.campaign
            : undefined
        setCanComment(c?.application?.state === 'succeeded')
      } catch {
        setCanComment(false)
      }
    })()
  }, [viewer.id])

  const submitCallback = () => {
    toast.info({
      message: <FormattedMessage defaultMessage="Comment sent" id="iSUeWj" />,
    })
    refetch()
  }

  // mobile: one-line entry that opens the full discussion dialog
  if (entry === 'chip') {
    return (
      <DiscussionDialog
        campaignId={campaignId}
        shortHash={shortHash}
        canComment={canComment}
        totalCount={totalCount}
        afterSubmit={refetch}
      >
        {({ openDialog }) => (
          <button
            type="button"
            className={styles.chip}
            onClick={openDialog}
            aria-haspopup="dialog"
          >
            <span>
              💬{' '}
              <FormattedMessage
                defaultMessage="Discussion"
                id="aLkBs2"
                description="src/views/CampaignDetail/Discussion"
              />
              {totalCount > 0 && (
                <span className={styles.count}>{totalCount}</span>
              )}
            </span>
            <span className={styles.chevron}>›</span>
          </button>
        )}
      </DiscussionDialog>
    )
  }

  return (
    <section className={styles.discussion}>
      <header className={styles.header}>
        <h2 className={styles.title}>
          <FormattedMessage
            defaultMessage="Discussion"
            id="aLkBs2"
            description="src/views/CampaignDetail/Discussion"
          />
          {totalCount > 0 && <span className={styles.count}>{totalCount}</span>}
        </h2>
      </header>

      {canComment ? (
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
      ) : (
        <section className={styles.hint}>
          <FormattedMessage
            defaultMessage="Only participants can join the discussion."
            id="Aq0aMp"
            description="src/views/CampaignDetail/Discussion"
          />
        </section>
      )}

      {comments.length > 0 && (
        <ul className={styles.preview}>
          {comments.map((comment) => (
            <li key={comment.id}>
              <CircleThreadComment
                comment={comment}
                type="campaignDiscussion"
                hasLink
                hasUpvote={false}
                hasDownvote={false}
                hasPin={false}
              />
            </li>
          ))}
        </ul>
      )}

      {totalCount > comments.length && (
        <DiscussionDialog
          campaignId={campaignId}
          shortHash={shortHash}
          canComment={canComment}
          totalCount={totalCount}
          afterSubmit={refetch}
        >
          {({ openDialog }) => (
            <Button
              spacing={[8, 0]}
              textColor="green"
              textActiveColor="greenDark"
              onClick={openDialog}
              aria-haspopup="dialog"
            >
              <TextIcon size={14} weight="medium">
                <FormattedMessage
                  defaultMessage="View all {count} comments"
                  id="Vj0Hbd"
                  description="src/views/CampaignDetail/Discussion"
                  values={{ count: totalCount }}
                />
              </TextIcon>
            </Button>
          )}
        </DiscussionDialog>
      )}
    </section>
  )
}

export default CampaignDiscussion
