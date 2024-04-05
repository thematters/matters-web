import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import { BindEmailHintDialog, Dialog, ViewerContext } from '~/components'
import type { DialogTextButtonProps } from '~/components/Dialog/Buttons'
import { UserDonationRecipientFragment } from '~/gql/graphql'

type SubmitButtonProps = {
  mode: 'text' | 'rounded'
  currency: CURRENCY
  formId: string
  recipient: UserDonationRecipientFragment

  isValid: boolean
  isSubmitting: boolean
  isExceededAllowance: boolean
  isBalanceInsufficient: boolean
  switchToAddCredit: () => void
}

const WrapperButton: React.FC<
  Omit<DialogTextButtonProps, 'color'> & Pick<SubmitButtonProps, 'mode'>
> = ({ mode, ...restProps }) => {
  if (mode === 'text') {
    return <Dialog.TextButton {...restProps} />
  } else {
    return <Dialog.RoundedButton {...restProps} color="white" bgColor="green" />
  }
}

const HKDSubmitButton: React.FC<SubmitButtonProps> = ({
  mode,
  formId,
  isValid,
  isSubmitting,
  isBalanceInsufficient,
  switchToAddCredit,
}) => {
  const viewer = useContext(ViewerContext)
  const hasEmail = !!viewer.info.email
  if (isBalanceInsufficient) {
    const props = {
      mode,
      text: <FormattedMessage defaultMessage="Top Up" id="dTOtPO" />,
      form: formId,
    }
    return (
      <>
        <BindEmailHintDialog>
          {({ openDialog }) => {
            return (
              <WrapperButton
                type="button"
                onClick={hasEmail ? switchToAddCredit : openDialog}
                {...props}
              />
            )
          }}
        </BindEmailHintDialog>
      </>
    )
  }

  return (
    <WrapperButton
      mode={mode}
      text={<FormattedMessage defaultMessage="Next Step" id="8cv9D4" />}
      type="submit"
      form={formId}
      disabled={!isValid || isSubmitting || isBalanceInsufficient}
      loading={isSubmitting}
    />
  )
}

const LIKESubmitButton: React.FC<SubmitButtonProps> = ({
  mode,
  formId,
  recipient,
  isValid,
  isSubmitting,
  isBalanceInsufficient,
}) => {
  return (
    <>
      {/* {recipient.liker.likerId && (
        <CivicLikerButton likerId={recipient.liker.likerId} />
      )} */}

      <WrapperButton
        mode={mode}
        text={<FormattedMessage defaultMessage="Next Step" id="8cv9D4" />}
        type="submit"
        form={formId}
        disabled={!isValid || isSubmitting || isBalanceInsufficient}
        loading={isSubmitting}
      />
    </>
  )
}

const USDTSubmitButton: React.FC<SubmitButtonProps> = ({
  mode,
  formId,
  isValid,
  isSubmitting,
  isBalanceInsufficient,
}) => {
  return (
    <WrapperButton
      mode={mode}
      text={<FormattedMessage defaultMessage="Next Step" id="8cv9D4" />}
      type="submit"
      form={formId}
      disabled={!isValid || isSubmitting || isBalanceInsufficient}
      loading={isSubmitting}
    />
  )
}

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  const isUSDT = props.currency === CURRENCY.USDT
  const isHKD = props.currency === CURRENCY.HKD
  const isLIKE = props.currency === CURRENCY.LIKE

  if (isUSDT) {
    return <USDTSubmitButton {...props} />
  }

  if (isHKD) {
    return <HKDSubmitButton {...props} />
  }

  if (isLIKE) {
    return <LIKESubmitButton {...props} />
  }

  return null
}

export default SubmitButton
