import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconTime2 from '@/public/static/icons/24px/time-2.svg'
import { TEST_ID } from '~/common/enums'
import { datetimeFormat } from '~/common/utils'
import {
  Button,
  Dialog,
  Icon,
  LanguageContext,
  toast,
  Tooltip,
  useDialogSwitch,
  useMutation,
  ViewerContext,
} from '~/components'
import {
  CancelScheduleArticleMutation,
  CancelScheduleButtonDraftFragment,
} from '~/gql/graphql'

import styles from './styles.module.css'

interface CancelScheduleButtonProps {
  draft: CancelScheduleButtonDraftFragment
}

const CANCEL_SCHEDULE_ARTICLE = gql`
  mutation CancelScheduleArticle($id: ID!) {
    publishArticle(input: { id: $id, publishAt: null }) {
      id
      publishAt
      updatedAt
    }
  }
`

const fragments = {
  draft: gql`
    fragment CancelScheduleButtonDraft on Draft {
      id
      title
      publishAt
      updatedAt
    }
  `,
}

const CancelScheduleButton = ({ draft }: CancelScheduleButtonProps) => {
  const { lang } = useContext(LanguageContext)
  const { show, openDialog, closeDialog } = useDialogSwitch(false)
  const intl = useIntl()
  const viewer = useContext(ViewerContext)

  const [cancelSchedule] = useMutation<CancelScheduleArticleMutation>(
    CANCEL_SCHEDULE_ARTICLE,
    {
      variables: { id: draft.id },
      optimisticResponse: {
        publishArticle: {
          id: draft.id,
          publishAt: null,
          updatedAt: new Date(),
        },
      },
      update: (cache) => {
        cache.modify({
          id: cache.identify(viewer),
          fields: {
            drafts(existingDrafts, { readField }) {
              let scheduledDrafts = existingDrafts.edges.filter(
                ({ node }: { node: CancelScheduleButtonDraftFragment }) =>
                  readField('publishAt', node)
              )
              let nonScheduledDrafts = existingDrafts.edges.filter(
                ({ node }: { node: CancelScheduleButtonDraftFragment }) =>
                  !readField('publishAt', node)
              )

              // Remove the draft from the scheduled drafts
              scheduledDrafts = scheduledDrafts.filter(
                ({ node }: { node: CancelScheduleButtonDraftFragment }) =>
                  readField('id', node) !== draft.id
              )

              // Add the draft to the non-scheduled drafts
              nonScheduledDrafts = [draft, ...nonScheduledDrafts]

              const edges = [...scheduledDrafts, ...nonScheduledDrafts]

              return {
                ...existingDrafts,
                edges,
              }
            },
          },
        })
      },
    }
  )

  const onCancel = async () => {
    await cancelSchedule()

    toast.success({
      message: (
        <FormattedMessage defaultMessage="Canceled successfully" id="+So1dD" />
      ),
    })
  }

  return (
    <>
      <Tooltip
        placement="bottom"
        content={intl.formatMessage({
          defaultMessage: 'Cancel schedule',
          id: 'OwMuXW',
        })}
      >
        <Button
          onClick={openDialog}
          textColor="greyDarker"
          textActiveColor="red"
          className={styles.cancelScheduleButton}
          aria-label={intl.formatMessage({
            defaultMessage: 'Cancel schedule',
            id: 'OwMuXW',
          })}
        >
          <Icon icon={IconTime2} size={22} />
        </Button>
      </Tooltip>

      <Dialog
        isOpen={show}
        onDismiss={closeDialog}
        testId={TEST_ID.DIALOG_CANCEL_SCHEDULE_DRAFT}
      >
        <Dialog.Header
          title={
            <FormattedMessage defaultMessage="Cancel schedule" id="OwMuXW" />
          }
        />

        <Dialog.Content>
          <Dialog.Content.Message>
            <p>
              <FormattedMessage
                defaultMessage='Are you sure you want to cancel the publish of "{title}" originally scheduled for {time} {date}? After cancelling, you can edit the content again or reschedule the publish time.'
                id="KU53D5"
                values={{
                  title: (
                    <span className={styles.highlight}>{draft.title}</span>
                  ),
                  time: (
                    <span className={styles.highlight}>
                      {new Date(draft.publishAt).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })}
                    </span>
                  ),
                  date: (
                    <span className={styles.highlight}>
                      {datetimeFormat.absolute({
                        date: draft.publishAt,
                        lang,
                      })}
                    </span>
                  ),
                }}
              />
            </p>
          </Dialog.Content.Message>
        </Dialog.Content>

        <Dialog.Footer
          closeText={
            <FormattedMessage defaultMessage="Do not cancel" id="9MEe0P" />
          }
          closeDialog={closeDialog}
          btns={
            <Dialog.RoundedButton
              text={
                <FormattedMessage
                  defaultMessage="Cancel schedule"
                  description="confirm cancel schedule button"
                  id="oEHAIT"
                />
              }
              color="red"
              onClick={() => {
                onCancel()
                closeDialog()
              }}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={
                <FormattedMessage
                  defaultMessage="Cancel schedule"
                  description="confirm cancel schedule button"
                  id="oEHAIT"
                />
              }
              color="red"
              onClick={() => {
                onCancel()
                closeDialog()
              }}
            />
          }
        />
      </Dialog>
    </>
  )
}

CancelScheduleButton.fragments = fragments

export default CancelScheduleButton
