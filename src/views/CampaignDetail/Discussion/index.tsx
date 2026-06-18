import { useContext } from 'react'
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
import { CampaignDiscussionCommentsQuery } from '~/gql/graphql'

import DiscussionDialog from './Dialog'
import { CAMPAIGN_DISCUSSION_COMMENTS } from './gql'
import styles from './styles.module.css'

type DiscussionConnection = NonNullable<
  NonNullable<CampaignDiscussionCommentsQuery['campaign']>['discussion']
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

  const { data, refetch } =
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

  // the discussion is open to every logged-in user (relaxed from
  // participant-only); the server enforces the same rule
  const canComment = viewer.isAuthed

  const submitCallback = () => {
    toast.info({
      message: <FormattedMessage defaultMessage="Comment sent" id="fyKoL1" />,
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
          // mirror the Apply button's Secondary (outlined green pill) so the
          // discussion entry sits one clear level below it
          <Button
            className={styles.chipEntry}
            borderColor="green"
            textColor="green"
            borderWidth="sm"
            size={['100%', '3rem']}
            onClick={openDialog}
            aria-haspopup="dialog"
          >
            <TextIcon size={16} weight="normal">
              <FormattedMessage
                defaultMessage="Discussion"
                id="2/u1aP"
                description="src/views/CampaignDetail/Discussion"
              />
              {totalCount > 0 && (
                <span className={styles.count}>{totalCount}</span>
              )}
            </TextIcon>
          </Button>
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
            id="2/u1aP"
            description="src/views/CampaignDetail/Discussion"
          />
          {totalCount > 0 && <span className={styles.count}>{totalCount}</span>}
        </h2>
      </header>

      {canComment ? (
        <CircleCommentForm
          campaignId={campaignId}
          type="campaignDiscussion"
          inlineFooter
          placeholder={intl.formatMessage({
            defaultMessage: 'Share your thoughts with other participants',
            id: 'dHVTYM',
            description: 'src/views/CampaignDetail/Discussion',
          })}
          submitCallback={submitCallback}
        />
      ) : (
        <section className={styles.hint}>
          <FormattedMessage
            defaultMessage="Only participants can join the discussion."
            id="VyV+WO"
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
                hasUpvote
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
            <div className={styles.viewAll}>
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
                    id="b8LMpq"
                    description="src/views/CampaignDetail/Discussion"
                    values={{ count: totalCount }}
                  />
                </TextIcon>
              </Button>
            </div>
          )}
        </DiscussionDialog>
      )}
    </section>
  )
}

export default CampaignDiscussion
