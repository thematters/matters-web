import gql from 'graphql-tag'
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
        id
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
  // TODO: remove this after annual questionnaire is over
  const isAnnualQuestionnaire = campaign.id === 'Q2FtcGFpZ246OQ'

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

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            isInApplicationPeriod ? (
              <FormattedMessage
                defaultMessage="Confirm application"
                id="on+DYO"
              />
            ) : (
              <FormattedMessage defaultMessage="Confirm to join" id="ErV/vT" />
            )
          }
        />

        <Dialog.Content>
          <Dialog.Content.Message>
            <p>
              {isAnnualQuestionnaire && isInApplicationPeriod ? (
                <FormattedMessage
                  defaultMessage="Sign up now and start writing the annual questionnaire. Please check the announcement for event details."
                  id="JCZFqh"
                />
              ) : isInApplicationPeriod ? (
                <FormattedMessage
                  defaultMessage="Apply now. The writing journey will begin in a few days. For event details, please check the Event Information. "
                  id="l0tvVM"
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
              <Dialog.RoundedButton
                text={
                  isInApplicationPeriod ? (
                    <FormattedMessage defaultMessage="Yes, apply" id="B9IFMF" />
                  ) : (
                    <FormattedMessage
                      defaultMessage="Confirm"
                      description="src/views/CampaignDetail/Apply/Dialog/index.tsx"
                      id="f5jWMJ"
                    />
                  )
                }
                loading={loading}
                onClick={() => onApplyAfterPeriod()}
              />
              <Dialog.RoundedButton
                text={
                  isInApplicationPeriod ? (
                    <FormattedMessage defaultMessage="Not yet" id="lO7wKc" />
                  ) : (
                    <FormattedMessage defaultMessage="Understood" id="GcvLBC" />
                  )
                }
                color="greyDarker"
                onClick={closeDialog}
              />
            </>
          }
          smUpBtns={
            <>
              <Dialog.TextButton
                text={
                  isInApplicationPeriod ? (
                    <FormattedMessage defaultMessage="Not yet" id="lO7wKc" />
                  ) : (
                    <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
                  )
                }
                color="greyDarker"
                onClick={closeDialog}
              />
              <Dialog.TextButton
                text={
                  isInApplicationPeriod ? (
                    <FormattedMessage defaultMessage="Yes, apply" id="B9IFMF" />
                  ) : (
                    <FormattedMessage
                      defaultMessage="Confirm"
                      description="src/views/CampaignDetail/Apply/Dialog/index.tsx"
                      id="f5jWMJ"
                    />
                  )
                }
                loading={loading}
                color="green"
                onClick={() => onApplyAfterPeriod()}
              />
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
