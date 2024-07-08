import dynamic from 'next/dynamic'
import { FormattedMessage } from 'react-intl'

import { Dialog, SpinnerBlock, useDialogSwitch } from '~/components'
import { InfoHeaderParticipantsCampaignFragment } from '~/gql/graphql'

interface ParticipantsDialogProps {
  campaign: InfoHeaderParticipantsCampaignFragment
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <SpinnerBlock />,
})

const BaseParticipantsDialog = ({
  campaign,
  children,
}: ParticipantsDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={`寫作者 ${campaign.participants.totalCount}`}
          closeDialog={closeDialog}
          closeText={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
        />

        <DynamicContent />

        <Dialog.Footer
          smUpBtns={
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
              color="greyDarker"
              onClick={closeDialog}
            />
          }
        />
      </Dialog>
    </>
  )
}

export const ParticipantsDialog = (props: ParticipantsDialogProps) => (
  <Dialog.Lazy mounted={<BaseParticipantsDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
