import { FormattedMessage } from 'react-intl'

import { Dialog, useDialogSwitch, useMutation } from '~/components'
import { UnsubscribeCircleMutation } from '~/gql/graphql'

import { UNSUBSCRIBE_CIRCLE } from './gql'

interface BaseUnsubscribeCircleDialogProps {
  id: string
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const BaseUnsubscribeCircleDialog = ({
  id,
  children,
}: BaseUnsubscribeCircleDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const [unsubscribe, { loading, data }] =
    useMutation<UnsubscribeCircleMutation>(UNSUBSCRIBE_CIRCLE, {
      variables: { id },
    })
  const isMember = data?.unsubscribeCircle.isMember
  const isUnsubscribed = typeof isMember === 'boolean' && !isMember

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            isUnsubscribed ? (
              <FormattedMessage defaultMessage="Unsubscribed" id="6/kgzs" />
            ) : (
              <FormattedMessage defaultMessage="Subscribe Circle" id="hG2cBH" />
            )
          }
        />

        <Dialog.Content>
          <Dialog.Content.Message>
            {isUnsubscribed ? (
              <p>
                <FormattedMessage
                  defaultMessage="You have unsubscribed the circle."
                  id="aTmmkr"
                />
                <br />
                <FormattedMessage
                  defaultMessage="Let's go check out the other circles."
                  id="cPSexq"
                />
              </p>
            ) : (
              <p>
                <FormattedMessage
                  defaultMessage="Unsubscribe cirlce will immediately lose your membership, The next billing date (the 1st of each month) will not incur any charges."
                  id="fjBDmp"
                />
              </p>
            )}
          </Dialog.Content.Message>
        </Dialog.Content>

        <Dialog.Footer
          closeDialog={closeDialog}
          closeText={
            isUnsubscribed ? (
              <FormattedMessage defaultMessage="Close" id="rbrahO" />
            ) : (
              <FormattedMessage
                defaultMessage="Let me think about it"
                id="IjNYll"
              />
            )
          }
          btns={
            isUnsubscribed ? null : (
              <Dialog.RoundedButton
                text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
                color={loading ? 'green' : 'red'}
                loading={loading}
                onClick={() => unsubscribe()}
              />
            )
          }
          smUpBtns={
            isUnsubscribed ? null : (
              <Dialog.TextButton
                text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
                color={loading ? 'green' : 'red'}
                loading={loading}
                onClick={() => unsubscribe()}
              />
            )
          }
        />
      </Dialog>
    </>
  )
}

export const UnsubscribeCircleDialog = (
  props: BaseUnsubscribeCircleDialogProps
) => (
  <Dialog.Lazy mounted={<BaseUnsubscribeCircleDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
