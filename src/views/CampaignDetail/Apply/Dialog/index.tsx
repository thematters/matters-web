import gql from 'graphql-tag'
import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import { Dialog, useDialogSwitch, useMutation } from '~/components'
import {
  ApplyCampaignMutation,
  ApplyCampaignPrivateFragment,
  ApplyCampaignPublicFragment,
} from '~/gql/graphql'

const APPLY_CAMPAIGN = gql`
  mutation ApplyCampaign($id: ID!) {
    applyCampaign(input: { id: $id }) {
      id
      ... on WritingChallenge {
        applicationState
      }
    }
  }
`

export interface ApplyCampaignDialogProps {
  campaign: ApplyCampaignPublicFragment & Partial<ApplyCampaignPrivateFragment>
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const ApplyCampaignDialog = ({
  campaign,
  children,
}: ApplyCampaignDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const now = new Date()
  const { end: appEnd } = campaign.applicationPeriod || {}
  const isInApplicationPeriod = !appEnd || now < new Date(appEnd)

  const [applyCampaign, { loading }] = useMutation<ApplyCampaignMutation>(
    APPLY_CAMPAIGN,
    {
      variables: { id: campaign.id },
      optimisticResponse: {
        applyCampaign: {
          id: campaign.id,
          applicationState: 'pending' as any,
          __typename: 'WritingChallenge',
        },
      },
    }
  )

  const onApplyAfterPeriod = async () => {
    await applyCampaign()
    closeDialog()
  }

  // auto apply
  useEffect(() => {
    if (!isInApplicationPeriod) return

    applyCampaign()
  }, [isInApplicationPeriod])

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            isInApplicationPeriod ? (
              <FormattedMessage
                defaultMessage="Application has been submitted 🎉"
                id="oLOus+"
              />
            ) : (
              <FormattedMessage
                defaultMessage="Confirm to participate"
                id="FM+YIG"
              />
            )
          }
        />

        <Dialog.Content>
          <Dialog.Content.Message>
            <p>
              {isInApplicationPeriod ? (
                <FormattedMessage
                  defaultMessage="We will review your application as soon as possible, so stay tuned for the event!"
                  id="N3xGd5"
                />
              ) : (
                <FormattedMessage
                  defaultMessage="If you miss the official registration period, you can still submit works after successful registration, but you will not be able to obtain the Grand Slam badge. Remember to register early next time for a chance to get a badge!"
                  id="fH6B/f"
                />
              )}
            </p>
          </Dialog.Content.Message>
        </Dialog.Content>

        <Dialog.Footer
          btns={
            <>
              {!isInApplicationPeriod && (
                <Dialog.RoundedButton
                  text={
                    <FormattedMessage
                      defaultMessage="Confirm"
                      description="src/views/CampaignDetail/Apply/Dialog/index.tsx"
                      id="f5jWMJ"
                    />
                  }
                  loading={loading}
                  onClick={() => onApplyAfterPeriod()}
                />
              )}
              <Dialog.RoundedButton
                text={
                  <FormattedMessage defaultMessage="Understood" id="GcvLBC" />
                }
                color="greyDarker"
                onClick={closeDialog}
              />
            </>
          }
          smUpBtns={
            <>
              {isInApplicationPeriod && (
                <Dialog.TextButton
                  text={
                    <FormattedMessage defaultMessage="Understood" id="GcvLBC" />
                  }
                  color="greyDarker"
                  onClick={closeDialog}
                />
              )}
              {!isInApplicationPeriod && (
                <Dialog.TextButton
                  text={
                    <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
                  }
                  color="greyDarker"
                  onClick={closeDialog}
                />
              )}
              {!isInApplicationPeriod && (
                <Dialog.TextButton
                  text={
                    <FormattedMessage
                      defaultMessage="Confirm"
                      description="src/views/CampaignDetail/Apply/Dialog/index.tsx"
                      id="f5jWMJ"
                    />
                  }
                  loading={loading}
                  color="green"
                  onClick={() => onApplyAfterPeriod()}
                />
              )}
            </>
          }
        />
      </Dialog>
    </>
  )
}

const LazyApplyCampaignDialog = (props: ApplyCampaignDialogProps) => (
  <Dialog.Lazy mounted={<ApplyCampaignDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default LazyApplyCampaignDialog
