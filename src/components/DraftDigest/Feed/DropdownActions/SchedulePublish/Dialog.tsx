import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { useMutation, ViewerContext } from '~/components'
import { SchedulePublishDialog } from '~/components/Editor/SchedulePublishDialog'
import {
  SchedulePublishArticleMutation,
  SchedulePublishButtonDraftFragment,
} from '~/gql/graphql'

const SCHEDULE_PUBLISH_ARTICLE = gql`
  mutation SchedulePublishArticle($id: ID!, $publishAt: DateTime!) {
    publishArticle(input: { id: $id, publishAt: $publishAt }) {
      id
      publishAt
      updatedAt
    }
  }
`

export interface SchedulePublishDialogProps {
  draft: SchedulePublishButtonDraftFragment
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const SchedulePublishDialogComponent = ({
  draft,
  children,
}: SchedulePublishDialogProps) => {
  const viewer = useContext(ViewerContext)

  const [schedulePublishArticle] = useMutation<SchedulePublishArticleMutation>(
    SCHEDULE_PUBLISH_ARTICLE
  )

  const onSchedulePublish = async (date: Date) => {
    await schedulePublishArticle({
      variables: { id: draft.id, publishAt: date },
      optimisticResponse: {
        publishArticle: {
          id: draft.id,
          publishAt: date,
          updatedAt: new Date(),
        },
      },
      update: (cache) => {
        cache.modify({
          id: cache.identify(viewer),
          fields: {
            drafts(existingDrafts, { readField }) {
              // Target edge
              const targetEdge = existingDrafts.edges.find(
                ({ node }: { node: SchedulePublishButtonDraftFragment }) =>
                  readField('id', node) === draft.id
              )

              let scheduledDrafts = existingDrafts.edges.filter(
                ({ node }: { node: SchedulePublishButtonDraftFragment }) =>
                  readField('publishAt', node) &&
                  readField('id', node) !== draft.id
              )
              let nonScheduledDrafts = existingDrafts.edges.filter(
                ({ node }: { node: SchedulePublishButtonDraftFragment }) =>
                  !readField('publishAt', node) &&
                  readField('id', node) !== draft.id
              )

              // Add the draft to the scheduled drafts
              // and order by publishAt desc
              scheduledDrafts = [targetEdge, ...scheduledDrafts].sort(
                (a, b) => {
                  const aDate = new Date(readField('publishAt', a.node)!)
                  const bDate = new Date(readField('publishAt', b.node)!)
                  return aDate.getTime() - bDate.getTime()
                }
              )

              // Remove the draft from the non-scheduled drafts
              nonScheduledDrafts = nonScheduledDrafts.filter(
                ({ node }: { node: SchedulePublishButtonDraftFragment }) =>
                  readField('id', node) !== draft.id
              )

              return {
                ...existingDrafts,
                edges: [...scheduledDrafts, ...nonScheduledDrafts],
              }
            },
          },
        })
      },
    })
  }

  return (
    <SchedulePublishDialog
      draft={draft}
      onConfirm={onSchedulePublish}
      confirmButtonText={
        <FormattedMessage defaultMessage="Schedule Publish" id="Km6eJ2" />
      }
    >
      {({ openDialog }: { openDialog: () => void }) => children({ openDialog })}
    </SchedulePublishDialog>
  )
}

export default SchedulePublishDialogComponent
