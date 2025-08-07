import { useLazyQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { Dialog, Spacer, toast, useDialogSwitch, useRoute } from '~/components'
import {
  EditorPreviewDialogDraftFragment,
  GetDraftPublishAtQuery,
} from '~/gql/graphql'

import SelectDate from './SelectDate'

interface SchedulePublishDialogProps {
  draft: EditorPreviewDialogDraftFragment

  onConfirm: (date: Date) => void
  confirmButtonText?: React.ReactNode

  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const GET_DRAFT_PUBLISH_AT = gql`
  query GetDraftPublishAt($id: ID!) {
    node(input: { id: $id }) {
      ... on Draft {
        id
        publishAt
      }
    }
  }
`

const BaseSchedulePublishDialog = ({
  draft,
  onConfirm,
  confirmButtonText,
  children,
}: SchedulePublishDialogProps) => {
  const { router } = useRoute()
  const { show, openDialog, closeDialog } = useDialogSwitch(true)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const [getDraftPublishAt] = useLazyQuery<GetDraftPublishAtQuery>(
    GET_DRAFT_PUBLISH_AT,
    {
      fetchPolicy: 'network-only',
      variables: { id: draft.id },
    }
  )

  const handleSubmit = async () => {
    if (!selectedDate) {
      return
    }

    // Show a toast if the selected date is in the past (5 minutes from now)
    if (selectedDate < new Date(Date.now() + 5 * 60 * 1000)) {
      toast.error({
        message: (
          <FormattedMessage
            defaultMessage="The selected time has expired, please choose again."
            id="PtlWaj"
          />
        ),
      })
      return
    }

    // Check if the draft has been added to the schedule
    const { data } = await getDraftPublishAt()
    const draftPublishAt =
      data?.node?.__typename === 'Draft' && data.node.publishAt
        ? data.node.publishAt
        : null
    if (draftPublishAt) {
      toast.error({
        message: (
          <FormattedMessage
            defaultMessage='This work has been added to the schedule. Please go to the "My Works" page to confirm'
            id="lYVn31"
          />
        ),
        actions: [
          {
            content: <FormattedMessage defaultMessage="Go" id="nSwpYg" />,
            onClick: () => {
              router.push(PATHS.ME_DRAFTS)
            },
          },
        ],
      })
      return
    }

    onConfirm(selectedDate)
  }

  const SubmitButton = (
    <Dialog.TextButton
      text={
        confirmButtonText || (
          <FormattedMessage defaultMessage="Next Step" id="8cv9D4" />
        )
      }
      disabled={!selectedDate}
      color="green"
      onClick={handleSubmit}
    />
  )

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} innerOverflowHidden={false}>
        <Dialog.Header
          title={
            <FormattedMessage
              defaultMessage="Schedule publication"
              id="sbhWw+"
            />
          }
          closeDialog={closeDialog}
          closeText={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
          rightBtn={SubmitButton}
        />

        <Dialog.Content>
          <SelectDate
            onSelect={(date) => {
              setSelectedDate(date)
            }}
          />
          <Spacer size="sp8" />
        </Dialog.Content>

        <Dialog.Footer
          smUpBtns={
            <>
              <Dialog.TextButton
                text={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
                color="greyDarker"
                onClick={closeDialog}
              />
              {SubmitButton}
            </>
          }
        />
      </Dialog>
    </>
  )
}

export const SchedulePublishDialog = (props: SchedulePublishDialogProps) => (
  <Dialog.Lazy mounted={<BaseSchedulePublishDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
