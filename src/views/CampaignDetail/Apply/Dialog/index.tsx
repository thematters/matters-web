import gql from 'graphql-tag'
import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import { Dialog, toast, useDialogSwitch, useMutation } from '~/components'
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
        application {
          state
          createdAt
        }
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
    { variables: { id: campaign.id } }
  )

  const onApplyAfterPeriod = async () => {
    try {
      await applyCampaign()
      closeDialog()
    } catch (error) {
      toast.error({
        message: (
          <FormattedMessage
            defaultMessage="System or connection abnormality, please refresh the page and click “Join” again."
            id="9OPnTz"
          />
        ),
      })
    }
  }

  const onApplyDuringPeriod = async () => {
    try {
      await applyCampaign()
    } catch (error) {
      toast.error({
        message: (
          <FormattedMessage
            defaultMessage="System or connection abnormality, please refresh the page and click “Apply” again."
            id="HB2VOx"
          />
        ),
      })
      closeDialog()
    }
  }

  // auto apply
  useEffect(() => {
    if (!isInApplicationPeriod) return

    onApplyDuringPeriod()
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
              <FormattedMessage defaultMessage="Confirm to join" id="ErV/vT" />
            )
          }
        />

        <Dialog.Content>
          <Dialog.Content.Message>
            <p>
              {isInApplicationPeriod ? (
                <FormattedMessage
                  defaultMessage="We will review your application shortly, stay tuned for the event!"
                  id="5y5rID"
                />
              ) : (
                <FormattedMessage
                  defaultMessage="You missed the registration period, you can still join as a latecomer. Apply earlier next time for the chance to get the badge."
                  id="aKEiNd"
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
