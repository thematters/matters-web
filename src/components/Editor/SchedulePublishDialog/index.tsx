import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Dialog, Spacer, useDialogSwitch } from '~/components'

import SelectDate from './SelectDate'

interface SchedulePublishDialogProps {
  onConfirm: (date: Date) => void
  confirmButtonText?: React.ReactNode

  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const BaseSchedulePublishDialog = ({
  onConfirm,
  confirmButtonText,
  children,
}: SchedulePublishDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const SubmitButton = (
    <Dialog.TextButton
      text={
        confirmButtonText || (
          <FormattedMessage defaultMessage="Next Step" id="8cv9D4" />
        )
      }
      disabled={!selectedDate}
      color="greyDarker"
      onClick={() => {
        if (selectedDate) {
          onConfirm(selectedDate)
        }
      }}
    />
  )

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
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
