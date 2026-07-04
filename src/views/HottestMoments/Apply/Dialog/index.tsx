import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { ERROR_CODES } from '~/common/enums'
import { Dialog, toast, useDialogSwitch, useMutation } from '~/components'
import { ApplyMomentFeedMutation } from '~/gql/graphql'

const APPLY_MOMENT_FEED = gql`
  mutation ApplyMomentFeed {
    applyMomentFeed {
      id
      isMomentFeedApplied
    }
  }
`

export interface ApplyMomentFeedDialogProps {
  onApplied?: () => void
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const ApplyMomentFeedDialog = ({
  onApplied,
  children,
}: ApplyMomentFeedDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const [applyMomentFeed, { loading }] = useMutation<ApplyMomentFeedMutation>(
    APPLY_MOMENT_FEED,
    undefined,
    {
      customErrors: {
        [ERROR_CODES.BAD_USER_INPUT]: (
          <FormattedMessage
            defaultMessage="You have already applied, please wait for the review."
            id="LXZyce"
          />
        ),
      },
    }
  )

  const onConfirm = async () => {
    try {
      await applyMomentFeed()
      closeDialog()
      onApplied?.()
      toast.success({
        message: (
          <FormattedMessage
            defaultMessage="Application submitted, pending review"
            id="I1eVEY"
          />
        ),
      })
    } catch {}
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <FormattedMessage
              defaultMessage="Join the Moments channel"
              id="7DJ8wF"
            />
          }
        />

        <Dialog.Content>
          <Dialog.Content.Message>
            <p>
              <FormattedMessage
                defaultMessage="Once you request to join and are approved, the moments you post will appear in this channel."
                id="tYDhrI"
              />
            </p>
          </Dialog.Content.Message>
        </Dialog.Content>

        <Dialog.Footer
          btns={
            <>
              <Dialog.RoundedButton
                text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
                loading={loading}
                onClick={onConfirm}
              />
              <Dialog.RoundedButton
                text={
                  <FormattedMessage
                    defaultMessage="Let me think about it"
                    description="src/views/HottestMoments/Apply/Dialog/index.tsx"
                    id="d95AX1"
                  />
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
                  <FormattedMessage
                    defaultMessage="Let me think about it"
                    description="src/views/HottestMoments/Apply/Dialog/index.tsx"
                    id="d95AX1"
                  />
                }
                color="greyDarker"
                onClick={closeDialog}
              />
              <Dialog.TextButton
                text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
                loading={loading}
                color="green"
                onClick={onConfirm}
              />
            </>
          }
        />
      </Dialog>
    </>
  )
}

const LazyApplyMomentFeedDialog = (props: ApplyMomentFeedDialogProps) => (
  <Dialog.Lazy mounted={<ApplyMomentFeedDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default LazyApplyMomentFeedDialog
